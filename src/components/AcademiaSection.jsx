import { ProjectCard } from './Cards';

const AcademiaSection = ({ theme, getThemeClasses }) => (
  <section 
    id="academia" 
    className={`${getThemeClasses('sectionBgSecondary')} py-20 px-8 transition-colors duration-300`}
  >
    <div className="container mx-auto text-center">
      <h2 className={`${getThemeClasses('heading')} text-4xl font-bold mb-12 border-b-4 pb-4 inline-block font-press-start`}>
        Projects
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        <ProjectCard 
          title="Stock Volatility Predictor" 
          description="Developed a stock price volatility prediction system using LSTM and GARCH models..." 
          technologies={['Python', 'LSTM', 'GARCH', 'MLflow', 'Streamlit']} 
          date="JUL 2025" 
          theme={theme} 
          getThemeClasses={getThemeClasses} 
          githubUrl="https://github.com/aslam-03/Stock_Price_Volatility_Predictor"
        />
        <ProjectCard 
          title="ClauseWise - AI-Powered Legal Document Analyzer" 
          description="Built an intelligent NLP-based tool to analyze contracts/NDAs..." 
          technologies={['Python', 'NLP', 'GeminiApi']} 
          date="MAY 2025" 
          theme={theme} 
          getThemeClasses={getThemeClasses} 
          githubUrl="https://github.com/aslam-03/Clausewise-Legal-Document-Analyzer"
        />
        <ProjectCard 
          title="Indian Sign Language to Text Conversion" 
          description="Developed a real-time sign language recognition system using CNN and MobileNetV2..." 
          technologies={['Python', 'CNN', 'TensorFlow', 'OpenCV']} 
          date="OCT 2024" 
          theme={theme} 
          getThemeClasses={getThemeClasses} 
          githubUrl="https://github.com/aslam-03/ISL-Conversion"
        />
      </div>
    </div>
  </section>
);

export default AcademiaSection;
