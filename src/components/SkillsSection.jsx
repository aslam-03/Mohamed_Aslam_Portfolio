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
            <SkillCard skill="Python" theme={theme} getThemeClasses={getThemeClasses} />
            <SkillCard skill="HTML" theme={theme} getThemeClasses={getThemeClasses} />
            <SkillCard skill="CSS" theme={theme} getThemeClasses={getThemeClasses} />
            
          </div>
        </div>
        {/* Machine Learning & AI */}
        <div>
          <h3 className="text-2xl font-bold mb-4 font-vt323">Technical Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <SkillCard skill="Machine Learning" theme={theme} getThemeClasses={getThemeClasses} />
            <SkillCard skill="Gen AI" theme={theme} getThemeClasses={getThemeClasses} />
            <SkillCard skill="Frontend development" theme={theme} getThemeClasses={getThemeClasses} />
          </div>
        </div>
        {/* Tools */}
        <div>
          <h3 className="text-2xl font-bold mb-4 font-vt323">Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <SkillCard skill="Git" theme={theme} getThemeClasses={getThemeClasses} />
            <SkillCard skill="GitHub" theme={theme} getThemeClasses={getThemeClasses} />
            <SkillCard skill="DagsHub" theme={theme} getThemeClasses={getThemeClasses} />
            <SkillCard skill="n8n" theme={theme} getThemeClasses={getThemeClasses} />
            <SkillCard skill="VS Code" theme={theme} getThemeClasses={getThemeClasses} />
            <SkillCard skill="Docker" theme={theme} getThemeClasses={getThemeClasses} />
            <SkillCard skill="Streamlit" theme={theme} getThemeClasses={getThemeClasses} />
          </div>
        </div>
        {/* Soft Skills */}
        <div>
          <h3 className="text-2xl font-bold mb-4 font-vt323">Soft Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <SkillCard skill="Problem Solving" theme={theme} getThemeClasses={getThemeClasses} />
            <SkillCard skill="Time Management" theme={theme} getThemeClasses={getThemeClasses} />
            <SkillCard skill="Team Collaboration" theme={theme} getThemeClasses={getThemeClasses} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SkillsSection;
