// 1. CHANGED: Bump version to force update on mobile
const CACHE_VERSION = 'v5';
const STATIC_CACHE = `aslam-portfolio-static-${CACHE_VERSION}`;
const PAGE_CACHE = `aslam-portfolio-pages-${CACHE_VERSION}`;
const ASSET_CACHE = `aslam-portfolio-assets-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';

// Time (in ms) to wait for network before falling back to cache
const NETWORK_TIMEOUT_MS = 3000; 

const PRECACHE_URLS = [
  new Request('/', { cache: 'reload' }),
  new Request('/index.html', { cache: 'reload' }),
  new Request('/?source=pwa', { cache: 'reload' }),
  OFFLINE_URL,
  '/manifest.webmanifest',
  '/favicon.ico',
  '/favicon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/preview.png'
];

const ASSET_DESTINATIONS = new Set(['style', 'script', 'worker', 'image', 'font']);

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', (event) => {
  const currentCaches = [STATIC_CACHE, PAGE_CACHE, ASSET_CACHE];
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => !currentCaches.includes(key))
          .map((staleKey) => caches.delete(staleKey))
      )
    )
  );
  if (self.registration.navigationPreload) {
    event.waitUntil(self.registration.navigationPreload.enable());
  }
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestURL = new URL(event.request.url);

  // Ignore Analytics/Tracking
  if (/google-analytics|googletagmanager|clarity|facebook/.test(requestURL.hostname)) {
    return;
  }

  // 1. Navigation (HTML) - Network First with Timeout
  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirstWithTimeout(event));
    return;
  }

  // 2. Assets (CSS/JS/Images) - Stale While Revalidate
  if (requestURL.origin === self.location.origin && ASSET_DESTINATIONS.has(event.request.destination)) {
    event.respondWith(staleWhileRevalidateAsset(event.request));
  }
});

// --- HELPER FUNCTIONS ---

// 2. NEW: Timeout Helper to prevent "hanging" on mobile
function timeout(ms) {
  return new Promise((_, reject) => 
    setTimeout(() => reject(new Error("Network timeout")), ms)
  );
}

async function networkFirstWithTimeout(event) {
  try {
    const preloadResponse = await event.preloadResponse;
    if (preloadResponse) return preloadResponse;

    // 3. IMPROVED: Race the network request against a 3-second timer
    // If network takes > 3s, it throws an error and goes to cache immediately.
    const networkResponse = await Promise.race([
      fetch(event.request),
      timeout(NETWORK_TIMEOUT_MS)
    ]);

    // Check if valid response (not 404 or 500 error)
    if (networkResponse.status === 200) {
      const cache = await caches.open(PAGE_CACHE);
      cache.put(event.request, networkResponse.clone());
    }
    
    return networkResponse;

  } catch (error) {
    // Network failed or timed out -> Check Cache
    console.warn('Network failed or timed out, falling back to cache.', error);
    
    const cache = await caches.open(PAGE_CACHE);
    const cachedPage = await cache.match(event.request);
    
    if (cachedPage) {
      return cachedPage;
    }

    // If no cache, show Offline Page
    const staticCache = await caches.open(STATIC_CACHE);
    const offlineFallback = await staticCache.match(OFFLINE_URL);
    return offlineFallback || Response.error();
  }
}

async function staleWhileRevalidateAsset(request) {
  const cache = await caches.open(ASSET_CACHE);
  const cachedResponse = await cache.match(request);

  // If cached, return it IMMEDIATELY (Fast!)
  if (cachedResponse) {
    // Update cache in background
    fetch(request).then((networkResponse) => {
        if(networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
        }
    }).catch(() => {});
    
    return cachedResponse;
  }

  // If not in cache, go to network
  try {
    const networkResponse = await fetch(request);
    if(networkResponse.status === 200) {
        cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Asset request failed and no cache available.', error);
    return Response.error();
  }
}