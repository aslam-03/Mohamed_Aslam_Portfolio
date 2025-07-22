const ProjectCard = ({ title, description, technologies, date, theme, getThemeClasses, githubUrl }) => (
  <div className={`${getThemeClasses('cardBg')} text-left rounded-xl shadow-lg p-6 flex flex-col justify-between h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl`}>
    <div>
      <h3 className={`${getThemeClasses('cardTitle')} text-xl font-bold mb-3 font-press-start`}>
        {title}
      </h3>
      <p className={`${getThemeClasses('cardDate')} text-sm mb-2 font-vt323`}>
        {date}
      </p>
      <p className={`${getThemeClasses('cardText')} mb-4 font-vt323`}>
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => 
          <span 
            key={index} 
            className={`${getThemeClasses('techTag')} text-xs font-semibold px-3 py-1 rounded-full`}
          >
            {tech}
          </span>
        )}
      </div>
    </div>
    {githubUrl && (
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-4 inline-block px-4 py-2 rounded font-bold transition-colors duration-200 text-center shadow-neon-blue
          ${theme === 'dark' 
            ? 'bg-gray-900 text-white hover:bg-gray-800' 
            : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-100'}`}
        style={{ textDecoration: 'none' }}
      >
        View In Github
      </a>
    )}
  </div>
);

const ExperienceCard = ({ title, company, duration, achievements, theme, getThemeClasses }) => (
  <div className={`${getThemeClasses('cardBg')} rounded-xl shadow-lg p-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl`}>
    <h3 className={`${getThemeClasses('cardTitle')} text-2xl font-bold mb-2 font-press-start`}>
      {title}
    </h3>
    <p className={`${getThemeClasses('cardText')} text-xl mb-2 font-vt323`}>
      {company}
    </p>
    <p className={`${getThemeClasses('cardDate')} text-sm mb-4 font-vt323`}>
      {duration}
    </p>
    <ul className={`${getThemeClasses('cardText')} list-disc list-inside space-y-2 font-vt323`}>
      {achievements.map((achievement, index) => 
        <li key={index}>{achievement}</li>
      )}
    </ul>
  </div>
);

const SkillCard = ({ skill, theme, getThemeClasses }) => (
  <div
    className={`${getThemeClasses('cardBg')} rounded-lg shadow-md p-6 text-center min-h-[70px] flex items-center justify-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl`}
    style={{ fontSize: '1.12rem', padding: '2rem', minWidth: '320px', maxWidth: '100%' }}
  >
    <h3
      className={`${getThemeClasses('cardTitle')} font-press-start font-semibold`}
      style={{ fontSize: '1.08rem', lineHeight: '1.3', wordBreak: 'break-word', whiteSpace: 'normal' }}
    >
      {skill}
    </h3>
  </div>
);

const ContactInfoItem = ({ icon: Icon, label, value, link, theme, getThemeClasses }) => (
  <div className={`${getThemeClasses('cardBg')} flex items-center space-x-4 p-4 rounded-lg shadow-inner`}>
    <Icon size={24} className={`${getThemeClasses('cardTitle')} flex-shrink-0`} />
    <div>
      <p className={`${getThemeClasses('cardDate')} text-sm font-vt323`}>
        {label}
      </p>
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`${getThemeClasses('cardText')} text-md font-semibold hover:underline font-vt323`}
      >
        {value}
      </a>
    </div>
  </div>
);

const CertificationCard = ({ title, provider, description, date, theme, getThemeClasses, certificateUrl }) => (
  <div className={`${getThemeClasses('cardBg')} text-left rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between h-full`}>
    <div>
      <div className="mb-4">
        <h3 className={`${getThemeClasses('cardTitle')} text-lg font-bold mb-2 font-press-start`}>
          {title}
        </h3>
        <p className={`${getThemeClasses('cardDate')} text-base font-semibold mb-2 font-vt323`}>
          {provider}
        </p>
        <p className={`${getThemeClasses('cardDate')} text-sm mb-3 font-vt323`}>
          {date}
        </p>
      </div>
      <p className={`${getThemeClasses('cardText')} text-base leading-relaxed font-vt323 mb-4`}>
        {description}
      </p>
    </div>
    <div className="mt-auto">
      <div className="flex justify-between items-center pt-4 border-t border-opacity-20">
        <span className={`${getThemeClasses('techTag')} text-xs font-semibold px-3 py-1 rounded-full`}>
          Certified
        </span>
        {certificateUrl && (
          <a
            href={certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-3 py-1 rounded font-bold transition-colors duration-200 text-center shadow-neon-blue text-sm
              ${theme === 'dark' 
                ? 'bg-gray-900 text-white hover:bg-gray-800' 
                : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-100'}`}
            style={{ textDecoration: 'none' }}
          >
            View Certificate
          </a>
        )}
      </div>
    </div>
  </div>
);

export { ProjectCard, ExperienceCard, SkillCard, ContactInfoItem, CertificationCard };
