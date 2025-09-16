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

    // Set up scroll animations for all sections
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections except hero for scroll animations
    const allSections = document.querySelectorAll('section:not(#home)');
    allSections.forEach(section => {
      section.classList.add('fade-in-up');
      scrollObserver.observe(section);
    });

    // Cleanup function
    return () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        section.classList.remove('fade-in-up', 'animate-in');
        scrollObserver.unobserve(section);
      });
      const wrapper = document.getElementById('content-wrapper');
      if (wrapper) wrapper.classList.remove('space-bg');
      themeObserver.disconnect();
    };
  }, []);

  return null;
};

export default SpaceBackground;
