
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, GraduationCap, Briefcase, Code, Award, Mail } from './Icons';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { name: 'Home', url: 'home', icon: Home },
  { name: 'About', url: 'about', icon: User },
  { name: 'Experience', url: 'experience', icon: Briefcase },
  { name: 'Skills', url: 'skills', icon: Code },
  { name: 'Projects', url: 'academia', icon: GraduationCap },
  { name: 'Certifications', url: 'certifications', icon: Award },
  { name: 'Contact', url: 'contact', icon: Mail },
];

const Navigation = ({ activeSection, scrollToSection, theme, toggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleOutsideClick = (e) => {
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

  return (
    <div className="fixed top-6 z-50 w-full max-w-fit px-4 sm:px-0 left-0 md:left-1/2 md:-translate-x-1/2 transition-all duration-300" ref={navRef}>
      <motion.div
        layout
        className={`
          flex items-center gap-2 sm:gap-4 py-2 px-4 rounded-full shadow-lg border backdrop-blur-md transition-all duration-300
          bg-white/70 border-white/20 dark:bg-black/50 dark:border-white/10
        `}
      >
        {/* Mobile Burger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            <motion.div
              animate={mobileOpen ? "open" : "closed"}
              className="w-6 h-6 flex flex-col justify-center items-center gap-1.5"
            >
              <motion.span
                variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 5.5 } }}
                className="w-5 h-0.5 bg-current block rounded-full origin-center"
              />
              <motion.span
                variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                className="w-5 h-0.5 bg-current block rounded-full"
              />
              <motion.span
                variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -5.5 } }}
                className="w-5 h-0.5 bg-current block rounded-full origin-center"
              />
            </motion.div>
          </button>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.url;
            return (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.url)}
                className={`
                  relative cursor-pointer text-lg font-medium px-4 py-2 rounded-full transition-colors z-10
                  ${isActive
                    ? 'text-blue-700 dark:text-cyan-400'
                    : 'text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-cyan-300'}
                  font-vt323 tracking-wide
                `}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-blue-500/10 dark:bg-cyan-400/10 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 dark:bg-cyan-400 rounded-t-full">
                      <div className="absolute w-12 h-6 bg-blue-600/20 dark:bg-cyan-400/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-blue-600/20 dark:bg-cyan-400/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-blue-600/20 dark:bg-cyan-400/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>

        {/* Theme Toggle Button */}
        <div className="pl-2 border-l border-gray-400/20 dark:border-white/10 ml-1">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`
              md:hidden absolute top-full left-0 mt-3 w-56 p-2 rounded-2xl shadow-xl border backdrop-blur-xl
              bg-white/80 border-white/20 dark:bg-gray-900/80 dark:border-white/10
              flex flex-col gap-1 overflow-hidden
            `}
          >
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeSection === item.url;
              return (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => {
                    scrollToSection(item.url);
                    setMobileOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                    ${isActive
                      ? 'bg-blue-50 dark:bg-white/5 text-blue-600 dark:text-cyan-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5'}
                  `}
                >
                  <Icon size={18} />
                  <span className="font-vt323 text-lg">{item.name}</span>
                  {isActive && (
                    <motion.div className="ml-auto w-1.5 h-1.5 rounded-full bg-current" layoutId="mobile-dot" />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navigation;
