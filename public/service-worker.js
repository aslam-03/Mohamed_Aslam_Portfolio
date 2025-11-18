const STATIC_CACHE = 'aslam-portfolio-static-v2';
const RUNTIME_CACHE = 'aslam-portfolio-runtime-v1';
const OFFLINE_URL = '/offline.html';

const PRECACHE_ASSETS = [
  '/index.html',
  OFFLINE_URL,
  '/manifest.webmanifest',
  '/favicon.ico',
  '/favicon.png',
  '/favicon_16X16.png',
  '/favicon_32x32.png',
  '/favicon_180X180.png',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable-512.png',
  '/preview.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
          .map((staleKey) => caches.delete(staleKey))
      )
    )
  );
  self.clients.claim();
  if (self.registration.navigationPreload) {
    event.waitUntil(self.registration.navigationPreload.enable());
  }
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const requestURL = new URL(event.request.url);

  // Skip runtime caching for analytics or external tracking
  if (/google-analytics|googletagmanager|clarity|facebook/.test(requestURL.hostname)) {
    return;
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(event));
    return;
  }

  if (requestURL.origin === self.location.origin) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  event.respondWith(networkFirst(event.request));
});

async function handleNavigationRequest(event) {
  try {
    const preloadResponse = await event.preloadResponse;
    if (preloadResponse) {
      return preloadResponse;
    }

    const networkResponse = await fetch(event.request);
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(event.request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(RUNTIME_CACHE);
    const cachedPage = await cache.match(event.request);
    if (cachedPage) {
      return cachedPage;
    }
    const staticCache = await caches.open(STATIC_CACHE);
    const offlineFallback = await staticCache.match(OFFLINE_URL);
    return offlineFallback || Response.error();
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    const runtimeCache = await caches.open(RUNTIME_CACHE);
    runtimeCache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    return Response.error();
  }
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(RUNTIME_CACHE);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return Response.error();
  }
}
