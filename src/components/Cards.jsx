import React, { useState } from 'react';
import { useModal } from '../utils/ModalContext';
import getSkillIcon from './SkillIcons';

// Certificate Modal Content Component
const CertificateModalContent = ({ certificateData, theme }) => {
  // Support navigation for 'Other Certification' card
  const isOther = Array.isArray(certificateData.certificates);
  const [current, setCurrent] = useState(isOther ? 0 : 0);
  
  const cert = isOther ? certificateData.certificates[current] : certificateData;
  const { certificateUrl, title, provider, description, date } = cert;
  const isImage = /\.(png|jpg|jpeg|webp)$/i.test(certificateUrl);

  const handleNext = () => {
    if (isOther && current < certificateData.certificates.length - 1) {
      setCurrent(current + 1);
    }
  };
  
  const handlePrev = () => {
    if (isOther && current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center w-full h-full">
      {/* Left: Certificate Image with animation */}
      <div className="relative flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-6 md:p-10 min-w-[300px] rounded-lg">
        {isImage && (
          <img 
            src={certificateUrl} 
            alt="Certificate" 
            className="max-h-[60vh] w-auto rounded-lg shadow-xl transition-transform"
          />
        )}
        
        {/* Navigation for Other Certification */}
        {isOther && (
          <>
            {current < certificateData.certificates.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg z-20"
                aria-label="Next Certificate"
              >
                &gt;
              </button>
            )}
            {current > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg z-20"
                aria-label="Previous Certificate"
              >
                &lt;
              </button>
            )}
          </>
        )}
      </div>
      
      {/* Right: Certificate Details */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-10 text-left">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 font-press-start text-gray-900 dark:text-white">{title}</h3>
        <p className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300 font-vt323">{provider}</p>
        <p className="text-md mb-2 text-gray-500 dark:text-gray-400 font-vt323">{date}</p>
        <p className="text-base text-gray-800 dark:text-gray-200 font-vt323 mt-4">{description}</p>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, description, technologies, date, theme, getThemeClasses, githubUrl, about, aboutDetails }) => {
  const { showModal } = useModal();
  
  const handleShowDetails = () => {
    showModal(
      <div>
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-bold mb-3 font-press-start text-gray-900 dark:text-white">{title}</h3>
          <p className={`${getThemeClasses('cardDate')} text-sm mb-2 font-vt323`}>
            {date}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <span 
                key={index} 
                className={`${getThemeClasses('techTag')} text-xs font-semibold px-3 py-1 rounded-full`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="text-sm md:text-base text-gray-700 dark:text-gray-200 font-vt323 whitespace-pre-line mb-6">
          {aboutDetails}
        </div>
        
        {githubUrl && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 rounded font-bold text-sm transition-colors duration-200 shadow-neon-blue
                ${theme === 'dark' 
                  ? 'bg-gray-900 text-white hover:bg-gray-800' 
                  : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-100'}`}
              style={{ textDecoration: 'none', minWidth: 120, textAlign: 'center' }}
            >
              View on GitHub
            </a>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className={`${getThemeClasses('cardBg')} text-left rounded-xl shadow-lg p-6 flex flex-col justify-between h-full transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl`}>
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
          {technologies.map((tech, index) => (
            <span 
              key={index} 
              className={`${getThemeClasses('techTag')} text-xs font-semibold px-3 py-1 rounded-full`}
            >
              {tech}
            </span>
          ))}
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
          onClick={handleShowDetails}
          className={`px-3 py-1 rounded font-bold text-xs transition-colors duration-200 shadow-neon-blue ml-auto
            ${theme === 'dark' 
              ? 'bg-gray-900 text-white hover:bg-gray-800' 
              : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-100'}`}
          style={{ textDecoration: 'none', minWidth: 90, textAlign: 'center' }}
        >
          About Project
        </button>
      </div>
    </div>
  );
};

const ExperienceCard = ({ title, company, duration, achievements, theme, getThemeClasses }) => (
  <div className={`${getThemeClasses('cardBg')} rounded-xl shadow-lg p-8 transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl`}>
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
      {achievements.map((achievement, index) => (
        <li key={index}>{achievement}</li>
      ))}
    </ul>
  </div>
);

const SkillCard = ({ skill, theme, getThemeClasses }) => {
  const words = skill.trim().split(/\s+/);
  const singleWord = words.length === 1;
  const containerStyle = { fontSize: '1rem', padding: '1.25rem', minWidth: 200, width: 'clamp(220px, 24vw, 360px)' };
  const singleStyle = { fontSize: '1.02rem', lineHeight: '1.2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
  const multiStyle = { fontSize: '1.02rem', lineHeight: '1.2', whiteSpace: 'normal' };

  return (
    <div
      className={`${getThemeClasses('cardBg')} rounded-lg shadow-md p-6 text-center transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center`}
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

const CertificationCard = ({ title, provider, description, date, theme, getThemeClasses, certificateUrl, certificateData, isOtherCertificate }) => {
  const { showModal } = useModal();
  
  const handleViewCertificate = () => {
    if (!certificateData) return;
    
    // For multi-certificate cards
    if (isOtherCertificate && certificateData.certificates) {
      const [currentCert, ...otherCerts] = certificateData.certificates;
      showModal(
        <CertificateModalContent 
          certificateData={certificateData}
          theme={theme}
        />
      );
      return;
    }
    
    // For single certificate cards
    showModal(
      <CertificateModalContent 
        certificateData={certificateData}
        theme={theme}
      />
    );
  };
  
  return (
    <div className={`${getThemeClasses('cardBg')} text-left rounded-xl shadow-lg p-6 flex flex-col justify-between h-full transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl`}>
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
              onClick={handleViewCertificate}
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
};

export { ProjectCard, ExperienceCard, SkillCard, ContactInfoItem, CertificationCard };