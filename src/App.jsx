import { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import AcademiaSection from './components/AcademiaSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import CertificationsSection from './components/CertificationsSection';
import ContactSection from './components/ContactSection';
import ShootingStarCursor from './components/ShootingStarCursor';
import ScrollToTop from './components/ScrollToTop';
import SpaceBackground from './components/SpaceBackground';
import ThemeTransition from './components/ThemeTransition';
import { getThemeClasses } from './utils/theme';
import { ModalProvider } from './utils/ModalContext';

const _allSections = ['home', 'about', 'experience', 'skills', 'academia', 'certifications', 'contact'];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // Set body class on initial load
    document.body.className = `${savedTheme || 'dark'}-theme`;
    return savedTheme || 'dark';
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextTheme, setNextTheme] = useState(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    setActiveSection(id);
    if (window.handleManualNav) {
      window.handleManualNav();
    }
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setNextTheme(newTheme);
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    // The theme class is already set on the body by the transition component.
    // Now, we sync React's state and localStorage to match.
    if (nextTheme) {
      setTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
    }
    setIsTransitioning(false);
    setNextTheme(null);
  };

  const themeClasses = (elementKey) => getThemeClasses(theme, elementKey);
  
  useEffect(() => {
    let isManualScrolling = false;
    let scrollTimeout;

    window.handleManualNav = () => {
      isManualScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isManualScrolling = false;
      }, 1000);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrolling) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-90px 0px -50% 0px',
        threshold: 0.01,
      }
    );

    _allSections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      _allSections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <ModalProvider>
      <div className={themeClasses('body')}>
        {isTransitioning && <ThemeTransition onTransitionComplete={handleTransitionComplete} nextTheme={nextTheme} />}
        
        <ShootingStarCursor />
        <Navigation 
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          theme={theme}
          toggleTheme={toggleTheme}
          getThemeClasses={themeClasses}
        />

        <main className="pt-16">
          <HomeSection 
            scrollToSection={scrollToSection}
            theme={theme}
            getThemeClasses={themeClasses}
          />
          <div id="content-wrapper" className="unified-bg relative min-h-screen">
            <AboutSection 
              theme={theme}
              getThemeClasses={themeClasses}
            />
            <ExperienceSection 
              theme={theme}
              getThemeClasses={themeClasses}
            />
            <SkillsSection 
              theme={theme}
              getThemeClasses={themeClasses}
            />
            <AcademiaSection 
              theme={theme}
              getThemeClasses={themeClasses}
            />
            <CertificationsSection 
              theme={theme}
              getThemeClasses={themeClasses}
            />
            <ContactSection 
              theme={theme}
              getThemeClasses={themeClasses}
            />
          </div>
        </main>

        <footer className={`${themeClasses('footer')} py-8 text-center transition-colors duration-300`}>
          <p className="font-vt323">
            &copy; {new Date().getFullYear()} Mohamed Aslam I. All rights reserved.
          </p>
        </footer>

        <ScrollToTop />
        <SpaceBackground />
      </div>
    </ModalProvider>
  );
}

export default App;
