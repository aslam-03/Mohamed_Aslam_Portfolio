import { Suspense } from 'react';
import HeroAnimation from './HeroAnimation';
import { Download, Mail } from './Icons';

const HomeSection = ({ scrollToSection, theme, getThemeClasses }) => (
  <section 
    id="home" 
    className={`${getThemeClasses('sectionBgPrimary')} h-screen flex items-center justify-center text-center p-8 relative overflow-hidden transition-colors duration-300`}
  >
    <Suspense fallback={<div>Loading Animation...</div>}>
      <HeroAnimation />
    </Suspense>
    <div className="max-w-4xl mx-auto relative z-10">
      <h1 className={`${getThemeClasses('heading')} text-5xl font-extrabold mb-4 leading-tight animate-fade-in-up font-press-start`}>
        Hi, I'm <br /><span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}>MOHAMED ASLAM I</span>
      </h1>
      <p className={`${getThemeClasses('paragraph')} text-xl mb-8 animate-fade-in-up delay-200 font-vt323`}>
        Aspiring AI and Data Science Undergraduate with hands-on experience in Machine learning, Generative AI, and Fullstack projects.
      </p>
      <div className="flex justify-center space-x-4 animate-fade-in-up delay-400">
        <a 
          href="./Mohamed_Aslam_Resume.pdf" 
          download="Mohamed_Aslam_Resume.pdf" 
          className={`${getThemeClasses('buttonPrimary')} inline-flex items-center px-6 py-3 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105`}
        >
          <Download className="mr-2" size={20} /> Download Resume
        </a>
        <button 
          onClick={() => scrollToSection('contact')} 
          className={`${getThemeClasses('buttonSecondary')} inline-flex items-center px-6 py-3 border font-semibold rounded-lg transition-all duration-300 transform hover:scale-105`}
        >
          <Mail className="mr-2" size={20} /> Contact Me
        </button>
      </div>
    </div>
  </section>
);

export default HomeSection;

