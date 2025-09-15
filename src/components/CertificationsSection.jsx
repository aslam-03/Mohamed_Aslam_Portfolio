import { CertificationCard } from './Cards';
import React, { useState } from 'react';
import CertificateModal from './CertificateModal';


const CertificationsSection = ({ theme, getThemeClasses }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleViewCertificate = (certificate) => {
    setModalData(certificate);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  return (
    <section 
      id="certifications" 
      className={`${getThemeClasses('sectionBgSecondary')} py-10 px-2 sm:px-4 md:px-8 transition-colors duration-300`}
    >
      <div className="container mx-auto text-center">
        <h2 className={`${getThemeClasses('heading')} text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 border-b-4 pb-2 sm:pb-4 inline-block font-press-start`}>
          Certifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-6xl mx-auto">
          <CertificationCard 
            title="AWS: Generative AI Foundation" 
            provider="Amazon Web Services"
            description="Foundational knowledge of generative AI concepts and AWS AI services"
            date="2025"
            theme={theme} 
            getThemeClasses={getThemeClasses}
            certificateUrl="/certificates/AWS.png"
            onViewCertificate={() => handleViewCertificate({
              title: 'AWS: Generative AI Foundation',
              provider: 'Amazon Web Services',
              description: 'Foundational knowledge of generative AI concepts and AWS AI services',
              date: '2025',
              certificateUrl: '/certificates/AWS.png',
            })}
          />
          <CertificationCard 
            title="Fundamentals of Generative AI" 
            provider="Microsoft"
            description="Core principles and applications of generative artificial intelligence"
            date="2024"
            theme={theme} 
            getThemeClasses={getThemeClasses}
            certificateUrl="/certificates/MicrosoftGenAi.png"
            onViewCertificate={() => handleViewCertificate({
              title: 'Fundamentals of Generative AI',
              provider: 'Microsoft',
              description: 'Core principles and applications of generative artificial intelligence',
              date: '2024',
              certificateUrl: '/certificates/MicrosoftGenAi.png',
            })}
          />
          <CertificationCard 
            title="Prompt Design in Vertex AI" 
            provider="Google Cloud Skills"
            description="Advanced prompt engineering techniques for Google Cloud's Vertex AI"
            date="2024"
            theme={theme} 
            getThemeClasses={getThemeClasses}
            certificateUrl="/certificates/prompt-design-in-vertex-ai-skill-badge.png"
            onViewCertificate={() => handleViewCertificate({
              title: 'Prompt Design in Vertex AI',
              provider: 'Google Cloud Skills',
              description: 'Advanced prompt engineering techniques for Google Cloud\'s Vertex AI',
              date: '2024',
              certificateUrl: '/certificates/prompt-design-in-vertex-ai-skill-badge.png',
            })}
          />
          <CertificationCard 
            title="Develop GenAI Apps with Gemini and Streamlit" 
            provider="Google Cloud Skills"
            description="Building generative AI applications using Gemini API and Streamlit framework"
            date="2025"
            theme={theme} 
            getThemeClasses={getThemeClasses}
            certificateUrl="/certificates/develop-genai-apps-with-gemini-and-streamlit-skill-.png"
            onViewCertificate={() => handleViewCertificate({
              title: 'Develop GenAI Apps with Gemini and Streamlit',
              provider: 'Google Cloud Skills',
              description: 'Building generative AI applications using Gemini API and Streamlit framework',
              date: '2025',
              certificateUrl: '/certificates/develop-genai-apps-with-gemini-and-streamlit-skill-.png',
            })}
          />
          <CertificationCard 
            title="Communication Skills" 
            provider="TCS iON"
            description="Professional communication and interpersonal skills development"
            date="2025"
            theme={theme} 
            getThemeClasses={getThemeClasses}
            certificateUrl="/certificates/TCSion.png"
            onViewCertificate={() => handleViewCertificate({
              title: 'Communication Skills',
              provider: 'TCS iON',
              description: 'Professional communication and interpersonal skills development',
              date: '2025',
              certificateUrl: '/certificates/TCSion.png',
            })}
          />
          <CertificationCard 
            title="Other Certification" 
            provider={<span>PrepInsta <span className="mx-2">|</span> ScholarHat</span>}
            description={<span>2025<br/>Python Programming, JavaScript</span>}
            date=""
            theme={theme} 
            getThemeClasses={getThemeClasses}
            certificateUrl="/certificates/python.png"
            onViewCertificate={() => handleViewCertificate({
              certificates: [
                {
                  title: 'Python Programming',
                  provider: 'PrepInsta | ScholarHat',
                  description: 'Comprehensive Python programming fundamentals and advanced concepts',
                  date: '2025',
                  certificateUrl: '/certificates/python.png',
                },
                {
                  title: 'JavaScript Programming Course',
                  provider: 'ScholarHat',
                  description: 'Comprehensive JavaScript programming fundamentals and advanced concepts',
                  date: '2025',
                  certificateUrl: '/certificates/JavaSccript.png',
                }
              ],
              current: 0
            })}
            isOtherCertificate
          />
        </div>
        <CertificateModal isOpen={modalOpen} onClose={handleCloseModal} certificate={modalData} />
      </div>
    </section>
  );
};

export default CertificationsSection;
