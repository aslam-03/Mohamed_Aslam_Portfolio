import { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import HomeSection from './components/HomeSection';
import AcademiaSection from './components/AcademiaSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import CertificationsSection from './components/CertificationsSection';
import ContactSection from './components/ContactSection';
import ShootingStarCursor from './components/ShootingStarCursor';
import ScrollToTop from './components/ScrollToTop';
import SpaceBackground from './components/SpaceBackground';
import { getThemeClasses } from './utils/theme';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.className = `${theme}-theme`;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const toggleTheme = () => setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');

  const themeClasses = (elementKey) => getThemeClasses(theme, elementKey);

  const allSections = ['home', 'academia', 'experience', 'skills', 'contact'];
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: "-50% 0px -50% 0px" });

    allSections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => allSections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.unobserve(el);
    });
  }, []);

  return (
    <div className={`${themeClasses('body')} transition-colors duration-300`}>
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
        
        <AcademiaSection 
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
        
        <CertificationsSection 
          theme={theme}
          getThemeClasses={themeClasses}
        />
        
        <ContactSection 
          theme={theme}
          getThemeClasses={themeClasses}
        />
      </main>

      <footer className={`${themeClasses('footer')} py-8 text-center transition-colors duration-300`}>
        <p className="font-vt323">
          &copy; {new Date().getFullYear()} Mohamed Aslam I. All rights reserved.
        </p>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
      
      {/* Space Background for all sections except hero */}
      <SpaceBackground />
    </div>
  );
}

export default App;
