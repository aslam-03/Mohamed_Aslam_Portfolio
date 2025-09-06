import { SkillCard } from './Cards';

const SkillsSection = ({ theme, getThemeClasses }) => (
  <section 
    id="skills" 
    className={`${getThemeClasses('sectionBgSecondary')} py-20 px-8 transition-colors duration-300`}
  >
    <div className="container mx-auto text-center">
      <h2 className={`${getThemeClasses('heading')} text-4xl font-bold mb-12 border-b-4 pb-4 inline-block font-press-start`}>
        Skills
      </h2>
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Programming */}
        <div>
          <h3 className="text-2xl font-bold mb-4 font-vt323">Programming</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="flex justify-center"><SkillCard skill="Python" theme={theme} getThemeClasses={getThemeClasses} /></div>
            <div className="flex justify-center"><SkillCard skill="JavaScript" theme={theme} getThemeClasses={getThemeClasses} /></div>
            <div className="flex justify-center"><SkillCard skill="HTML" theme={theme} getThemeClasses={getThemeClasses} /></div>
            <div className="flex justify-center"><SkillCard skill="CSS" theme={theme} getThemeClasses={getThemeClasses} /></div>
          </div>
        </div>
        {/* Machine Learning & AI */}
        <div>
          <h3 className="text-2xl font-bold mb-4 font-vt323">Technical Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="flex justify-center"><SkillCard skill="Machine Learning" theme={theme} getThemeClasses={getThemeClasses} /></div>
            <div className="flex justify-center"><SkillCard skill="GenAI" theme={theme} getThemeClasses={getThemeClasses} /></div>
            <div className="flex justify-center"><SkillCard skill="Frontend development" theme={theme} getThemeClasses={getThemeClasses} /></div>
          </div>
        </div>
        {/* Tools */}
        <div>
          <h3 className="text-2xl font-bold mb-4 font-vt323">Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="flex justify-center"><SkillCard skill="Git" theme={theme} getThemeClasses={getThemeClasses} /></div>
            <div className="flex justify-center"><SkillCard skill="GitHub" theme={theme} getThemeClasses={getThemeClasses} /></div>
            <div className="flex justify-center"><SkillCard skill="DagsHub" theme={theme} getThemeClasses={getThemeClasses} /></div>
            <div className="flex justify-center"><SkillCard skill="n8n" theme={theme} getThemeClasses={getThemeClasses} /></div>
            <div className="flex justify-center"><SkillCard skill="VSCode" theme={theme} getThemeClasses={getThemeClasses} /></div>
            <div className="flex justify-center"><SkillCard skill="Docker" theme={theme} getThemeClasses={getThemeClasses} /></div>
          </div>
        </div>
        {/* Frameworks */}
        <div>
          <h3 className="text-2xl font-bold mb-4 font-vt323">Frameworks</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="flex justify-center"><SkillCard skill="React" theme={theme} getThemeClasses={getThemeClasses} /></div>
            <div className="flex justify-center"><SkillCard skill="Streamlit" theme={theme} getThemeClasses={getThemeClasses} /></div>
            <div className="flex justify-center"><SkillCard skill="Flask" theme={theme} getThemeClasses={getThemeClasses} /></div>
          </div>
        </div>
        {/* Soft Skills */}
        <div>
          <h3 className="text-2xl font-bold mb-4 font-vt323">Soft Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="flex justify-center"><SkillCard skill="Problem Solving" theme={theme} getThemeClasses={getThemeClasses} /></div>
            <div className="flex justify-center"><SkillCard skill="Time Management" theme={theme} getThemeClasses={getThemeClasses} /></div>
            <div className="flex justify-center"><SkillCard skill="Team Collaboration" theme={theme} getThemeClasses={getThemeClasses} /></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SkillsSection;
