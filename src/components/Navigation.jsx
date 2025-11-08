
import { useState, useRef, useEffect } from 'react';
import { Home, User, GraduationCap, Briefcase, Code, Award, Mail, Sun, Moon } from './Icons';

const NavItem = ({ icon, label, sectionId, activeSection, onClick, getThemeClasses }) => {
  const isActive = activeSection === sectionId;
  const IconComponent = icon;
  return (
    <button 
      type="button"
      onClick={() => onClick(sectionId)} 
      className={`${isActive ? getThemeClasses('navItemActive') : getThemeClasses('navItem')} flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300`}
    >
      <IconComponent size={18} />
      <span className="font-vt323">{label}</span>
    </button>
  );
};


const Navigation = ({ activeSection, scrollToSection, theme, toggleTheme, getThemeClasses }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleOutsideClick = (e) => {
      // If click is outside the navRef element, close mobile menu
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };

    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileOpen]);

  const handleNavClick = (sectionId) => {
    if (!sectionId || typeof sectionId !== 'string') return;
    const id = sectionId.trim();
    scrollToSection(id);
    setMobileOpen(false);
  };

  return (
  <nav ref={navRef} className={`${getThemeClasses('nav')} fixed top-0 left-0 right-0 z-50 shadow-lg transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className={`${getThemeClasses('navText')} text-2xl font-bold transition-colors duration-300 font-press-start`}>
          IM ASLAM
        </div>
        {/* Desktop Nav */}
        <div className="hidden lg:flex space-x-4 items-center">
          {/* Centralized nav items to ensure desktop/mobile parity */}
          {[
            { icon: Home, label: 'Home', sectionId: 'home' },
            { icon: User, label: 'About', sectionId: 'about' },
            { icon: Briefcase, label: 'Experience', sectionId: 'experience' },
            { icon: Code, label: 'Skills', sectionId: 'skills' },
            { icon: GraduationCap, label: 'Projects', sectionId: 'academia' },
            { icon: Award, label: 'Certifications', sectionId: 'certifications' },
            { icon: Mail, label: 'Contact', sectionId: 'contact' },
          ].map(item => (
            <NavItem
              key={item.sectionId}
              icon={item.icon}
              label={item.label}
              sectionId={item.sectionId}
              activeSection={activeSection}
              onClick={handleNavClick}
              getThemeClasses={getThemeClasses}
            />
          ))}
          <button 
            onClick={toggleTheme} 
            className={`${getThemeClasses('navItem')} flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300`} 
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
        {/* Mobile Burger Button */}
        <button
          className={`lg:hidden flex items-center px-3 py-2 rounded-lg focus:outline-none transition-all duration-300
            ${mobileOpen
              ? 'bg-white/80 dark:bg-gray-900/80 shadow-lg'
              : 'bg-white/30 dark:bg-gray-900/30 hover:bg-white/50 dark:hover:bg-gray-900/50'}
            border border-transparent`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* Mobile Nav Items */}
      <div
        className={`lg:hidden absolute right-4 z-40 transition-all duration-500 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ top: '60px', width: 'fit-content', minWidth: '220px' }}
        aria-hidden={!mobileOpen}
      >
        <div className={`bg-white/90 dark:bg-gray-900/90 shadow-2xl px-6 pt-6 pb-8 space-y-3 flex flex-col items-start rounded-b-2xl animate-slide-down`}
          style={{ transform: mobileOpen ? 'translateY(0)' : 'translateY(-30px)', transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)', minWidth: '220px', maxWidth: '90vw' }}
        >
          {[
            { icon: Home, label: 'Home', sectionId: 'home' },
            { icon: User, label: 'About', sectionId: 'about' },
            { icon: Briefcase, label: 'Experience', sectionId: 'experience' },
            { icon: Code, label: 'Skills', sectionId: 'skills' },
            { icon: GraduationCap, label: 'Projects', sectionId: 'academia' },
            { icon: Award, label: 'Certifications', sectionId: 'certifications' },
            { icon: Mail, label: 'Contact', sectionId: 'contact' },
          ].map((item, idx) => (
            <div
              key={item.sectionId}
              style={{
                animation: mobileOpen ? `fade-in-stagger 0.4s ${0.08 * idx + 0.08}s both` : 'none',
                width: '100%'
              }}
            >
              <NavItem
                icon={item.icon}
                label={item.label}
                sectionId={item.sectionId}
                activeSection={activeSection}
                onClick={handleNavClick}
                getThemeClasses={getThemeClasses}
              />
            </div>
          ))}
          <div
            style={{
              animation: mobileOpen ? `fade-in-stagger 0.4s ${0.08 * 7 + 0.08}s both` : 'none',
              width: '100%'
            }}
          >
            <button
              onClick={toggleTheme}
              className={`${getThemeClasses('navItem')} flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
        <style jsx>{`
          @keyframes slide-down {
            0% { opacity: 0; transform: translateY(-30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-down {
            animation: slide-down 0.4s cubic-bezier(0.4,0,0.2,1) both;
          }
          @keyframes fade-in-stagger {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </nav>
  );
};

export default Navigation;
