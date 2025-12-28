import React, { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MagicCard from './MagicCard';

const certifications = [
  {
    title: 'AWS: Generative AI Foundation',
    provider: 'Amazon Web Services',
    description: 'Foundational knowledge of generative AI concepts and AWS AI services. Gained insights into various AWS AI tools and their practical applications.',
    date: 'JUL 2025',
    image: '/certificates/AWS.png',
  },
  {
    title: 'Fundamentals of Generative AI',
    provider: 'Microsoft',
    description: 'Core principles and applications of generative artificial intelligence. Learned about Large Language Models and their ethical implications.',
    date: 'OCT 2024',
    image: '/certificates/MicrosoftGenAi.png',
  },
  {
    title: 'Prompt Design in Vertex AI',
    provider: 'Google Cloud Skills',
    description: "Advanced prompt engineering techniques for Google Cloud's Vertex AI. Mastered the art of crafting effective prompts for optimal AI responses.",
    date: 'JUL 2025',
    image: '/certificates/prompt-design-in-vertex-ai-skill-badge.png',
  },
  {
    title: 'Develop GenAI Apps with Gemini and Streamlit',
    provider: 'Google Cloud Skills',
    description: 'Building generative AI applications using Gemini API and Streamlit framework. Hands-on experience in deploying AI-powered web apps.',
    date: 'JUL 2025',
    image: '/certificates/develop-genai-apps-with-gemini-and-streamlit-skill-.png',
  },
  {
    title: 'Communication Skills',
    provider: 'TCS iON',
    description: 'Professional communication and interpersonal skills development. Enhanced ability to articulate ideas clearly and effectively in a corporate setting.',
    date: 'JAN 2025',
    image: '/certificates/TCSion.png',
  },
  {
    title: 'Python Programming',
    provider: 'PrepInsta',
    description: 'Comprehensive Python programming fundamentals and advanced concepts.',
    date: 'JUN 2025',
    image: '/certificates/python.png',
  },
  {
    title: 'JavaScript Programming',
    provider: 'ScholarHat',
    description: 'Comprehensive JavaScript programming fundamentals and advanced concepts in web development.',
    date: 'AUG 2025',
    image: '/certificates/JavaSccript.png',
  }
];

const CertificationsSection = ({ theme, getThemeClasses }) => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  const glowColor = '0, 255, 255';

  useEffect(() => {
    if (!api) {
      return;
    }

    // Connect to embla api events
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    // Initial sync
    setCurrent(api.selectedScrollSnap());

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Safe access to current cert
  const currentCert = certifications[current] || certifications[0];

  return (
    <section
      id="certifications"
      className={`bg-transparent pt-0 pb-10 px-2 sm:px-4 md:px-8 transition-colors duration-500`}
    >
      <div className="container mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className={`${getThemeClasses('heading')} text-2xl sm:text-3xl md:text-4xl font-bold border-b-4 pb-2 sm:pb-4 inline-block font-press-start`}>
            Certifications
          </h2>
        </div>

        {/* Carousel Feature Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16 max-w-7xl mx-auto">

          {/* Left Column: Text Content */}
          <div className="flex gap-6 flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 animate-fade-in-up">
            <div>
              <Badge className={`${theme === 'dark' ? 'bg-blue-600/20 text-blue-300 border-blue-500/50' : 'bg-blue-100 text-blue-800 border-blue-200'} border px-4 py-1.5 text-sm rounded-full transition-all duration-300`}>
                {currentCert.provider}
              </Badge>
            </div>
            <div className="flex gap-4 flex-col w-full">
              <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} transition-colors duration-300 font-press-start leading-snug min-h-[3em] lg:min-h-[auto] flex items-center justify-center lg:justify-start`}>
                {currentCert.title}
              </h2>
              <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-vt323 min-h-[4em]`}>
                {currentCert.description}
              </p>
              {currentCert.date && (
                <p className={`text-sm font-semibold tracking-wide uppercase ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  Issued: {currentCert.date}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Carousel */}
          <div className="w-full max-w-full px-0 lg:px-6 order-1 lg:order-2">
            <Carousel setApi={setApi} className="w-full" opts={{ align: "start", loop: true }}>
              <CarouselContent>
                {certifications.map((cert, index) => (
                  <CarouselItem key={index}>
                    <MagicCard
                      className={`flex rounded-2xl aspect-[4/3] items-center justify-center p-2 relative overflow-hidden ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'} border-[1px] ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} shadow-2xl transition-all duration-500 group`}
                      glowColor={glowColor}
                      enableBorderGlow={true}
                      enableParticles={true}
                    >
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-200/20'} blur-xl`}></div>

                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-contain z-10 rounded-lg hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </MagicCard>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* Desktop Only Buttons */}
              <CarouselPrevious className={`${theme === 'dark' ? 'bg-gray-900/80 border-gray-700 text-white hover:bg-gray-800' : 'bg-white/80 border-gray-200 text-gray-900 hover:bg-gray-50'} shadow-lg hidden lg:flex lg:-left-12`} />
              <CarouselNext className={`${theme === 'dark' ? 'bg-gray-900/80 border-gray-700 text-white hover:bg-gray-800' : 'bg-white/80 border-gray-200 text-gray-900 hover:bg-gray-50'} shadow-lg hidden lg:flex lg:-right-12`} />

              {/* Mobile Controls & Pagination Dots */}
              <div className="flex items-center justify-center mt-6 gap-4">
                {/* Mobile Prev */}
                <CarouselPrevious className={`${theme === 'dark' ? 'bg-gray-900/80 border-gray-700 text-white hover:bg-gray-800' : 'bg-white/80 border-gray-200 text-gray-900 hover:bg-gray-50'} shadow-lg flex lg:hidden static translate-y-0`} />

                {/* Dots */}
                <div className="flex gap-2">
                  {certifications.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => api && api.scrollTo(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === current
                        ? (theme === 'dark' ? 'bg-blue-500 w-6' : 'bg-blue-600 w-6')
                        : (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300')
                        }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Mobile Next */}
                <CarouselNext className={`${theme === 'dark' ? 'bg-gray-900/80 border-gray-700 text-white hover:bg-gray-800' : 'bg-white/80 border-gray-200 text-gray-900 hover:bg-gray-50'} shadow-lg flex lg:hidden static translate-y-0`} />
              </div>
            </Carousel>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
