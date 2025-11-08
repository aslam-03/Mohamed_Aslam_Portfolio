import { CertificationCard } from './Cards';
import React from 'react';

const CertificationsSection = ({ theme, getThemeClasses }) => {
  return (
    <section 
        id="certifications" 
        className={`bg-transparent py-10 px-2 sm:px-4 md:px-8 transition-colors duration-500 scroll-mt-24 md:scroll-mt-28`}
      >
      <div className="container mx-auto text-center">
        <h2 className={`${getThemeClasses('heading')} text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 border-b-4 pb-2 sm:pb-4 inline-block font-press-start`}>
          Certifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          <CertificationCard 
            title="AWS: Generative AI Foundation" 
            provider="Amazon Web Services"
            description="Foundational knowledge of generative AI concepts and AWS AI services"
            date="2025"
            theme={theme} 
            getThemeClasses={getThemeClasses}
            certificateUrl="/certificates/AWS.png"
            certificateData={{
              title: 'AWS: Generative AI Foundation',
              provider: 'Amazon Web Services',
              description: 'Foundational knowledge of generative AI concepts and AWS AI services',
              date: '2025',
              certificateUrl: '/certificates/AWS.png',
            }}
          />
          <CertificationCard 
            title="Fundamentals of Generative AI" 
            provider="Microsoft"
            description="Core principles and applications of generative artificial intelligence"
            date="2024"
            theme={theme} 
            getThemeClasses={getThemeClasses}
            certificateUrl="/certificates/MicrosoftGenAi.png"
            certificateData={{
              title: 'Fundamentals of Generative AI',
              provider: 'Microsoft',
              description: 'Core principles and applications of generative artificial intelligence',
              date: '2024',
              certificateUrl: '/certificates/MicrosoftGenAi.png',
            }}
          />
          <CertificationCard 
            title="Prompt Design in Vertex AI" 
            provider="Google Cloud Skills"
            description="Advanced prompt engineering techniques for Google Cloud's Vertex AI"
            date="2024"
            theme={theme} 
            getThemeClasses={getThemeClasses}
            certificateUrl="/certificates/prompt-design-in-vertex-ai-skill-badge.png"
            certificateData={{
              title: 'Prompt Design in Vertex AI',
              provider: 'Google Cloud Skills',
              description: 'Advanced prompt engineering techniques for Google Cloud\'s Vertex AI',
              date: '2024',
              certificateUrl: '/certificates/prompt-design-in-vertex-ai-skill-badge.png',
            }}
          />
          <CertificationCard 
            title="Develop GenAI Apps with Gemini and Streamlit" 
            provider="Google Cloud Skills"
            description="Building generative AI applications using Gemini API and Streamlit framework"
            date="2025"
            theme={theme} 
            getThemeClasses={getThemeClasses}
            certificateUrl="/certificates/develop-genai-apps-with-gemini-and-streamlit-skill-.png"
            certificateData={{
              title: 'Develop GenAI Apps with Gemini and Streamlit',
              provider: 'Google Cloud Skills',
              description: 'Building generative AI applications using Gemini API and Streamlit framework',
              date: '2025',
              certificateUrl: '/certificates/develop-genai-apps-with-gemini-and-streamlit-skill-.png',
            }}
          />
          <CertificationCard 
            title="Communication Skills" 
            provider="TCS iON"
            description="Professional communication and interpersonal skills development"
            date="2025"
            theme={theme} 
            getThemeClasses={getThemeClasses}
            certificateUrl="/certificates/TCSion.png"
            certificateData={{
              title: 'Communication Skills',
              provider: 'TCS iON',
              description: 'Professional communication and interpersonal skills development',
              date: '2025',
              certificateUrl: '/certificates/TCSion.png',
            }}
          />
          <CertificationCard 
            title="Other Certification" 
            provider={<span>PrepInsta <span className="mx-2">|</span> ScholarHat</span>}
            description={<span>2025<br/>Python Programming, JavaScript</span>}
            date=""
            theme={theme} 
            getThemeClasses={getThemeClasses}
            certificateUrl="/certificates/python.png"
            certificateData={{
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
              ]
            }}
            isOtherCertificate
          />
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
