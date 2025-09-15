import React, { useState } from 'react';

const ProjectCard = ({ title, description, technologies, date, theme, getThemeClasses, githubUrl, about, aboutDetails }) => {
  const [showModal, setShowModal] = useState(false);
  return (
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
      <div className="flex items-center justify-between mt-2">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-3 py-1 rounded font-bold text-xs transition-colors duration-200 shadow-neon-blue
              ${theme === 'dark' 
                ? 'bg-gray-900 text-white hover:bg-gray-800' 
                : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-100'}`}
            style={{ textDecoration: 'none', minWidth: 90, textAlign: 'center' }}
          >
            GitHub
          </a>
        )}
        <button
          onClick={() => setShowModal(true)}
          className={`px-3 py-1 rounded font-bold text-xs transition-colors duration-200 shadow-neon-blue ml-auto
            ${theme === 'dark' 
              ? 'bg-blue-900 text-white hover:bg-blue-800' 
              : 'bg-blue-100 text-blue-900 border border-blue-300 hover:bg-blue-200'}`}
          style={{ minWidth: 90 }}
        >
          About Project
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in">
          <div
            className="relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-6 max-w-lg w-full animate-pop-up"
            style={
              title.includes('ClauseWise')
                ? { maxHeight: '80vh', overflowY: 'auto' }
                : undefined
            }
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-700 dark:text-gray-200 hover:text-red-500 text-2xl font-bold focus:outline-none"
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-2 font-press-start text-gray-900 dark:text-white">{title}</h3>
            <div className="text-sm text-gray-700 dark:text-gray-200 font-vt323 whitespace-pre-line">
              {aboutDetails}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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

import getSkillIcon from './SkillIcons';
import CertificateModal from './CertificateModal';

const SkillCard = ({ skill, theme, getThemeClasses }) => {
  const words = skill.trim().split(/\s+/);
  const singleWord = words.length === 1;
  const containerStyle = { fontSize: '1rem', padding: '1.25rem', minWidth: 200, width: 'clamp(220px, 24vw, 360px)' };
  const singleStyle = { fontSize: '1.02rem', lineHeight: '1.2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
  const multiStyle = { fontSize: '1.02rem', lineHeight: '1.2', whiteSpace: 'normal' };

  return (
    <div
      className={`${getThemeClasses('cardBg')} rounded-lg shadow-md p-6 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center`}
      style={containerStyle}
    >
      <div className="mb-3 flex items-center justify-center" style={{ minHeight: 56 }}>
        {getSkillIcon(skill, { size: 56 })}
      </div>
      <h3
        className={`${getThemeClasses('cardTitle')} font-press-start font-semibold`}
        style={singleWord ? singleStyle : multiStyle}
      >
        {singleWord ? (
          skill
        ) : (
          <>
            <span>{words[0]}</span>
            <br />
            <span>{words.slice(1).join(' ')}</span>
          </>
        )}
      </h3>
    </div>
  );
};

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

// Removed duplicate CertificationCard definition. Only the new one with onViewCertificate is kept.
const CertificationCard = ({ title, provider, description, date, theme, getThemeClasses, certificateUrl, onViewCertificate }) => (
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
          <button
            onClick={() => onViewCertificate(certificateUrl)}
            className={`px-3 py-1 rounded font-bold transition-colors duration-200 text-center shadow-neon-blue text-sm
              ${theme === 'dark' 
                ? 'bg-gray-900 text-white hover:bg-gray-800' 
                : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-100'}`}
            style={{ textDecoration: 'none' }}
          >
            View Certificate
          </button>
        )}
      </div>
    </div>
  </div>
);

export { ProjectCard, ExperienceCard, SkillCard, ContactInfoItem, CertificationCard };
