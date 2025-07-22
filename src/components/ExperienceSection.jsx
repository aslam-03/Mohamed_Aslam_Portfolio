import { ExperienceCard } from './Cards';

const ExperienceSection = ({ theme, getThemeClasses }) => (
  <section 
    id="experience" 
    className={`${getThemeClasses('sectionBgPrimary')} py-20 px-8 transition-colors duration-300`}
  >
    <div className="container mx-auto text-center">
      <h2 className={`${getThemeClasses('heading')} text-4xl font-bold mb-12 border-b-4 pb-4 inline-block font-press-start`}>
        Professional Experience
      </h2>
      <div className="space-y-12 max-w-4xl mx-auto text-left">
        <ExperienceCard 
          title="Frontend Developer Virtual Internship" 
          company="Ceeras IT Services" 
          duration="SEP-DEC 2024" 
          achievements={[
            "Developed and maintained responsive web pages using HTML, CSS, JavaScript, and React.", 
            "Focused on creating clean, reusable code and improving frontend performance."
          ]} 
          theme={theme} 
          getThemeClasses={getThemeClasses} 
        />
        <ExperienceCard 
          title="Python Programming Virtual Internship" 
          company="Codsoft IT Services and Consultancy" 
          duration="NOV-DEC 2023" 
          achievements={[
            "Completed hands-on assignments such as creating a calculator, a to-do list, and a rock-paper-scissors game using Python."
          ]} 
          theme={theme} 
          getThemeClasses={getThemeClasses} 
        />
      </div>
    </div>
  </section>
);

export default ExperienceSection;
