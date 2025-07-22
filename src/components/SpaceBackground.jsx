import { useEffect } from 'react';
import './SpaceBackground.css';

const SpaceBackground = () => {
  useEffect(() => {
    const applyBackgroundBasedOnTheme = () => {
      const sections = document.querySelectorAll('section:not(#home)');
      const body = document.body;
      
      // Check if current theme is dark by looking for the correct theme class
      const isDarkTheme = body.classList.contains('dark-theme') || 
                         body.className.includes('dark-theme');
      
      console.log('Theme check:', { 
        bodyClasses: body.className, 
        isDarkTheme,
        sectionsFound: sections.length 
      });
      
      sections.forEach(section => {
        if (isDarkTheme) {
          // Apply space background only in dark theme
          section.classList.add('space-bg');
          console.log('Added space-bg to:', section.id);
        } else {
          // Remove space background in light theme
          section.classList.remove('space-bg');
          console.log('Removed space-bg from:', section.id);
        }
      });
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
        section.classList.remove('space-bg', 'fade-in-up', 'animate-in');
        scrollObserver.unobserve(section);
      });
      themeObserver.disconnect();
    };
  }, []);

  return null;
};

export default SpaceBackground;
