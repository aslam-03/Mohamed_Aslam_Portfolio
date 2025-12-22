import MagicCard from './MagicCard';
import SkillIcon from './SkillIcons';

const SkillsSection = ({ theme, getThemeClasses }) => {
  // Skill categories data
  const skillCategories = [
    {
      title: "Frontend",
      tagline: "Crafting pixel-perfect, interactive web experiences",
      skills: ["React", "JavaScript", "HTML", "CSS"]
    },
    {
      title: "AI/ML",
      tagline: "Transforming data into intelligent solutions",
      skills: ["Python", "TensorFlow", "Numpy", "Pandas", "scikit learn"]
    },
    {
      title: "Backend",
      tagline: "Building robust, scalable APIs & databases",
      skills: ["FastAPI", "REST APIs", "Flask", "MySQL"]
    },
    {
      title: "Tools",
      tagline: "Leveraging industry-standard development workflows",
      skills: ["Git", "GitHub", "Vercel", "n8n", "VSCode", "Docker"]
    }
  ];

  return (
    <section
      id="skills"
      className={`bg-transparent pt-0 pb-10 px-2 sm:px-4 md:px-8 transition-colors duration-500`}
    >
      <div className="container mx-auto text-center">
        <h2 className={`${getThemeClasses('heading')} text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 border-b-4 pb-2 sm:pb-4 inline-block font-press-start`}>
          Skills
        </h2>

        {/* Skill Cards - Vertical Cards in One Line (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto text-left">
          {skillCategories.map((category, idx) => (
            <MagicCard
              key={idx}
              className={`${getThemeClasses('cardBg')} rounded-xl shadow-lg p-6 flex flex-col h-full transform transition-all duration-500 hover:-translate-y-2`}
              glowColor="0, 255, 255"
              enableTilt={false}
              enableMagnetism={false}
              enableBorderGlow={true}
              enableParticles={true}
              particleCount={6}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="mb-4">
                  <h3 className={`${getThemeClasses('cardTitle')} text-lg sm:text-xl font-bold font-press-start mb-2 h-12 flex items-center`}>
                    {category.title}
                  </h3>
                  <div className={`h-1 w-12 rounded-full ${getThemeClasses('techTag')} mb-3`}></div>
                  <p className={`${getThemeClasses('cardText')} text-sm font-vt323 opacity-80 min-h-[40px] leading-tight`}>
                    {category.tagline}
                  </p>
                </div>

                {/* Skills Grid inside Card */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white/5 transition-colors group">
                      <div
                        className={`${getThemeClasses('skillIconChip')} mb-2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110`}
                      >
                        <SkillIcon skill={skill} size={24} />
                      </div>
                      <span className={`${getThemeClasses('cardText')} text-xs font-vt323 text-center`}>
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
