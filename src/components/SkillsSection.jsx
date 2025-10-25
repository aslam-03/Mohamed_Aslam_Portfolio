import { SkillCategoryCard } from './Cards';

const SkillsSection = ({ theme, getThemeClasses }) => {
  // Skill categories data with properly segregated skills
  const skillCategories = [
    {
      title: "Frontend",
      tagline: "Crafting pixel-perfect, interactive web experiences that users love",
      skills: ["React", "JavaScript", "HTML", "CSS"]
    },
    {
      title: "AI/ML",
      tagline: "Transforming data into intelligent solutions with cutting-edge ML algorithms",
      skills: ["Python", "TensorFlow", "Numpy", "Pandas", "scikit learn"]
    },
    {
      title: "Backend",
      tagline: "Building robust, scalable APIs that power modern applications",
      skills: ["FastAPI", "REST APIs", "Flask", "MySQL"]
    },
    {
      title: "Tools",
      tagline: "Leveraging industry-standard tools for seamless development workflows",
      skills: ["Git", "GitHub", "Vercel", "n8n", "VSCode", "Docker"]
    }
  ];

  return (
    <section 
      id="skills" 
      className={`bg-transparent py-10 px-2 sm:px-4 md:px-8 transition-colors duration-500`}
    >
      <div className="container mx-auto text-center">
        <h2 className={`${getThemeClasses('heading')} text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 border-b-4 pb-2 sm:pb-4 inline-block font-press-start`}>
          Skills
        </h2>
        
        {/* Skill category cards - horizontal layout like projects */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12 max-w-4xl mx-auto text-left">
          {skillCategories.map((category, index) => (
            <SkillCategoryCard
              key={index}
              title={category.title}
              tagline={category.tagline}
              skills={category.skills}
              theme={theme}
              getThemeClasses={getThemeClasses}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
