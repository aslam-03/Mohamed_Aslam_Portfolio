import { useEffect } from 'react';
import './SpaceBackground.css';

const SpaceBackground = () => {
  useEffect(() => {
    const applyBackgroundBasedOnTheme = () => {
      const wrapper = document.getElementById('content-wrapper');
      const body = document.body;
      // Theme is managed by body className being either 'dark-theme' or 'light-theme' like patterns
      const isDarkTheme = body.className.includes('dark');

      if (!wrapper) return;

      if (isDarkTheme) {
        wrapper.classList.add('space-bg');
      } else {
        wrapper.classList.remove('space-bg');
      }
    };

    // Apply background initially with a small delay
    setTimeout(() => {
      applyBackgroundBasedOnTheme();
    }, 100);

    // Watch for theme changes
    const themeObserver = new MutationObserver(() => {
      console.log('Theme change detected');
      applyBackgroundBasedOnTheme();
    });

    // Observe body class changes (theme switching)
    themeObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    // New: one-time reveal observer (0.8s duration, 150ms stagger)
    const observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -10% 0px'
    };

    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          obs.unobserve(el);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section:not(#home)');
    sections.forEach(section => {
      section.classList.add('reveal');

      // mark direct children and grid children as reveal items
      const items = section.querySelectorAll(':scope > *, :scope .grid > *');
      items.forEach((child, idx) => {
        child.classList.add('reveal-item');
        child.style.setProperty('--r-delay', `${idx * 100}ms`); // 100ms stagger
      });

      // Additionally set staggered delays for any .wave-item inside this section
      const waveItems = section.querySelectorAll('.wave-item');
      waveItems.forEach((el, wIdx) => {
        // offset slightly so wave starts after section-level reveal begins
        el.style.setProperty('--wave-delay', `${wIdx * 100 + 40}ms`);
      });

      revealObserver.observe(section);
    });

    // Cleanup function
    return () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        section.classList.remove('fade-in-up', 'animate-in', 'reveal', 'revealed');
        const items = section.querySelectorAll('.reveal-item');
        items.forEach(item => {
          item.classList.remove('reveal-item');
          item.style.removeProperty('--r-delay');
        });
      });
      revealObserver.disconnect();
      const wrapper = document.getElementById('content-wrapper');
      if (wrapper) wrapper.classList.remove('space-bg');
      themeObserver.disconnect();
    };
  }, []);

  return null;
};

export default SpaceBackground;
