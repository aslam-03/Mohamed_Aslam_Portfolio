import { Home, GraduationCap, Briefcase, Code, Award, Mail, Sun, Moon } from './Icons';

const NavItem = ({ icon: Icon, label, sectionId, activeSection, onClick, theme, getThemeClasses }) => {
  const isActive = activeSection === sectionId;
  return (
    <button 
      onClick={() => onClick(sectionId)} 
      className={`${isActive ? getThemeClasses('navItemActive') : getThemeClasses('navItem')} flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300`}
    >
      <Icon size={18} />
      <span className="hidden lg:inline font-vt323">{label}</span>
    </button>
  );
};

const Navigation = ({ activeSection, scrollToSection, theme, toggleTheme, getThemeClasses }) => {
  return (
    <nav className={`${getThemeClasses('nav')} fixed top-0 left-0 right-0 z-50 shadow-lg transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className={`${getThemeClasses('navText')} text-2xl font-bold transition-colors duration-300 font-press-start`}>
          IM ASLAM
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          <NavItem 
            icon={Home} 
            label="Home" 
            sectionId="home" 
            activeSection={activeSection} 
            onClick={scrollToSection} 
            theme={theme} 
            getThemeClasses={getThemeClasses} 
          />
          <NavItem 
            icon={GraduationCap} 
            label="Projects" 
            sectionId="academia" 
            activeSection={activeSection} 
            onClick={scrollToSection} 
            theme={theme} 
            getThemeClasses={getThemeClasses} 
          />
          <NavItem 
            icon={Briefcase} 
            label="Experience" 
            sectionId="experience" 
            activeSection={activeSection} 
            onClick={scrollToSection} 
            theme={theme} 
            getThemeClasses={getThemeClasses} 
          />
          <NavItem 
            icon={Code} 
            label="Skills" 
            sectionId="skills" 
            activeSection={activeSection} 
            onClick={scrollToSection} 
            theme={theme} 
            getThemeClasses={getThemeClasses} 
          />
          <NavItem 
            icon={Award} 
            label="Certifications" 
            sectionId="certifications" 
            activeSection={activeSection} 
            onClick={scrollToSection} 
            theme={theme} 
            getThemeClasses={getThemeClasses} 
          />
          <NavItem 
            icon={Mail} 
            label="Contact" 
            sectionId="contact" 
            activeSection={activeSection} 
            onClick={scrollToSection} 
            theme={theme} 
            getThemeClasses={getThemeClasses} 
          />
          <button 
            onClick={toggleTheme} 
            className={`${getThemeClasses('navItem')} flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300`} 
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
