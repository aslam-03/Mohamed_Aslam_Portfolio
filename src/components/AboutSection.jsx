const AboutSection = ({ getThemeClasses }) => (
  <section 
    id="about" 
    className={`bg-transparent py-20 px-4 sm:px-6 md:px-8 transition-colors duration-300 scroll-mt-24 md:scroll-mt-28`}
  >
    <div className="container mx-auto">
      <div className={`${getThemeClasses('cardBg')} p-8 sm:p-12 rounded-xl shadow-2xl transition-colors duration-300`}>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          
          {/* Image Section */}
          <div 
            className="md:w-1/3 flex-shrink-0 reveal-item"
          >
            <img 
              src="/Aslam.jpg" 
              alt="Aslam" 
              className="rounded-full shadow-lg w-56 h-56 sm:w-64 sm:h-64 object-cover mx-auto border-4 border-gray-400 dark:border-gray-600 hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Content Section */}
          <div 
            className="md:w-2/3 text-center md:text-left reveal-item"
          >
            {/* Section header */}
            <div className="mb-6">
              <h2 className={`${getThemeClasses('heading')} text-3xl sm:text-4xl md:text-5xl font-bold border-b-4 pb-2 inline-block font-press-start`}>
                About Me
              </h2>
            </div>
            
            {/* Content - Left aligned text */}
            <div className="max-w-4xl">
              <p className={`${getThemeClasses('paragraph')} text-base sm:text-lg md:text-xl leading-relaxed font-vt323`}>
                Innovative AI & Data Science undergraduate with hands-on experience in Machine Learning, Generative AI, and Full-Stack Web Development. Skilled in designing intelligent systems and end-to-end web solutions integrating AI capabilities. Proven track record of building impactful projects including a Legal Document Analyzer and Real-time Sign Language Translator. Recognized for strong problem-solving, collaboration, and adaptability with a passion for building deployable, real-world AI systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;