import { CertificationCard } from './Cards';

const CertificationsSection = ({ theme, getThemeClasses }) => (
  <section 
    id="certifications" 
    className={`${getThemeClasses('sectionBgSecondary')} py-20 px-8 transition-colors duration-300`}
  >
    <div className="container mx-auto text-center">
      <h2 className={`${getThemeClasses('heading')} text-4xl font-bold mb-12 border-b-4 pb-4 inline-block font-press-start`}>
        Certifications
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <CertificationCard 
          title="AWS: Generative AI Foundation" 
          provider="Amazon Web Services"
          description="Foundational knowledge of generative AI concepts and AWS AI services"
          date="2025"
          theme={theme} 
          getThemeClasses={getThemeClasses}
          certificateUrl="/certificates/AWSAcademy12NEW20250720-27-cqixnz.pdf"
        />
        <CertificationCard 
          title="Fundamentals of Generative AI" 
          provider="Microsoft"
          description="Core principles and applications of generative artificial intelligence"
          date="2024"
          theme={theme} 
          getThemeClasses={getThemeClasses}
          certificateUrl="/certificates/microsoftgenai.pdf"
        />
        <CertificationCard 
          title="Prompt Design in Vertex AI" 
          provider="Google Cloud Skills"
          description="Advanced prompt engineering techniques for Google Cloud's Vertex AI"
          date="2024"
          theme={theme} 
          getThemeClasses={getThemeClasses}
          certificateUrl="/certificates/prompt-design-in-vertex-ai-skill-badge.png"
        />
        <CertificationCard 
          title="Develop GenAI Apps with Gemini and Streamlit" 
          provider="Google Cloud Skills"
          description="Building generative AI applications using Gemini API and Streamlit framework"
          date="2025"
          theme={theme} 
          getThemeClasses={getThemeClasses}
          certificateUrl="/certificates/develop-genai-apps-with-gemini-and-streamlit-skill-.png"
        />
        <CertificationCard 
          title="Communication Skills" 
          provider="TCS iON"
          description="Professional communication and interpersonal skills development"
          date="2025"
          theme={theme} 
          getThemeClasses={getThemeClasses}
          certificateUrl="/certificates/tcsion.pdf"
        />
        <CertificationCard 
          title="Python Programming" 
          provider="PrepInsta"
          description="Comprehensive Python programming fundamentals and advanced concepts"
          date="2025"
          theme={theme} 
          getThemeClasses={getThemeClasses}
          certificateUrl="/certificates/certificate_Python_348190.pdf"
        />
      </div>
    </div>
  </section>
);

export default CertificationsSection;
