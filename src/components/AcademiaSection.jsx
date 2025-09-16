import { ProjectCard } from './Cards';

const AcademiaSection = ({ theme, getThemeClasses }) => (
  <section 
    id="academia" 
    className={`bg-transparent py-10 px-2 sm:px-4 md:px-8 transition-colors duration-500`}
  >
    <div className="container mx-auto text-center">
      <h2 className={`${getThemeClasses('heading')} text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 border-b-4 pb-2 sm:pb-4 inline-block font-press-start`}>
        Projects
      </h2>
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 place-items-center">
          <ProjectCard 
            title="ClauseWise - AI-Powered Legal Document Analyzer" 
            description="AI-powered contract analysis for risk-aware decision making"
            technologies={['Python', 'NLP', 'GeminiApi']} 
            date="MAY 2025" 
            theme={theme} 
            getThemeClasses={getThemeClasses} 
            githubUrl="https://github.com/aslam-03/Clausewise-Legal-Document-Analyzer"
            aboutDetails={`Project Description\nClauseWise is an intelligent legal document analyzer that automatically:\n\n• Extracts key clauses from contracts/NDAs\n• Identifies potential risks and obligations\n• Provides plain-English explanations\n• Flags unusual terms\n\nKey Features\n- Multi-Format Support: Processes PDF, DOCX, and plain text\n- Smart Clause Detection: Identifies 50+ clause types using NLP\n- Risk Assessment: Flags high-risk terms with severity scoring\n- Penalty Detection: Extracts financial obligations automatically\n- Visualization: Interactive risk dashboard and reports\n\nHow it helps:\nDeveloped an NLP-powered tool to analyze contracts/NDAs by extracting key clauses, identifying legal risks & financial penalties, and generating plain-English summaries. Enabled multi-format document input (PDF, DOCX, TXT) and delivered interactive risk dashboards for faster legal reviews.`}
          />
          <ProjectCard 
            title="Indian Sign Language to Text Conversion" 
            description="A real-time ISL to Text Converter using computer vision and deep learning."
            technologies={['Python', 'CNN', 'TensorFlow', 'OpenCV']} 
            date="OCT 2024" 
            theme={theme} 
            getThemeClasses={getThemeClasses} 
            githubUrl="https://github.com/aslam-03/ISL-Conversion"
            aboutDetails={`ISL Hand Sign Recognition System\nA real-time Indian Sign Language (ISL) to Text Converter that uses computer vision and deep learning to recognize hand gestures and convert them into readable text. This web-based application provides an accessible solution for ISL communication through advanced hand tracking and gesture recognition technology.\n\n🚀 Features\nCore Functionality\n- Real-time Hand Detection: Advanced hand tracking using MediaPipe with 21-point hand landmark detection\n- ISL Gesture Recognition: Recognizes 36 different ISL gestures (A-Z alphabets and 0-9 numbers)\n- Live Video Feed: Real-time camera integration with hand gesture visualization\n- Instant Text Conversion: Single-shot and continuous prediction modes\n\nUser Interface\n- Hand Sign to Text: Capture and predict individual hand gestures\n- Real-time Text Mode: Continuous gesture recognition with automatic text composition\n- Prediction Confidence: Visual confidence meter showing prediction accuracy\n- Prediction History: Track recent predictions with timestamps\n- Composed Text Area: Accumulate predictions into readable text with copy functionality\n- Visual Hand Landmarks: Real-time hand skeleton overlay on video feed\n\nTechnical Features\n- Enhanced Accuracy: Multi-frame prediction averaging for improved accuracy\n- Image Enhancement: Automatic contrast and brightness optimization\n- Responsive Design: Modern web interface with Font Awesome icons\n- Error Handling: Comprehensive error management and user feedback\n- Background Processing: Non-blocking prediction processing\n\n🛠️ Tech Stack\nBackend\n- Framework: Flask 2.3.3 (Python web framework)\n- Deep Learning: TensorFlow 2.13.0 with Keras\n- Computer Vision: OpenCV 4.8.1.78 for image processing\n- Hand Detection: MediaPipe for real-time hand tracking\n- Model Architecture: MobileNetV2 (pre-trained CNN for efficient inference)\nFrontend\n- Web Technologies: HTML5, CSS3, JavaScript (ES6+)\n- Styling: Custom CSS with Font Awesome 6.0.0 icons\n- Real-time Communication: Fetch API for backend communication\n- Video Handling: HTML5 Canvas and Video APIs\n\nHow it helps:\nBuilt a real-time sign language recognition system using CNN and MobileNetV2. Deployed with Flask + OpenCV and a custom HTML/JavaScript frontend, converting live webcam gestures into real-time text and speech output.`}
          />
        </div>
      </div>
  </div>
  </section>
);

export default AcademiaSection;
