
import React, { useState } from 'react';

const CertificateModal = ({ isOpen, onClose, certificate }) => {
  if (!isOpen || !certificate) return null;

  // Support navigation for 'Other Certification' card
  const isOther = Array.isArray(certificate.certificates);
  const [current, setCurrent] = useState(isOther ? certificate.current : 0);
  const cert = isOther ? certificate.certificates[current] : certificate;
  const { certificateUrl, title, provider, description, date } = cert;
  const isImage = /\.(png|jpg|jpeg|webp)$/i.test(certificateUrl);

  const handleNext = () => {
    if (isOther && current < certificate.certificates.length - 1) {
      setCurrent(current + 1);
    }
  };
  const handlePrev = () => {
    if (isOther && current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in">
  <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-0 max-w-4xl w-full animate-pop-up overflow-hidden max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 dark:text-gray-200 hover:text-red-500 text-2xl font-bold focus:outline-none z-10"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center w-full h-full">
          {/* Left: Certificate Image with animation */}
          <div className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-6 md:p-10 min-w-[300px] animate-certificate-rotate">
            {isImage && (
              <img 
                src={certificateUrl} 
                alt="Certificate" 
                className="max-h-[60vh] w-auto rounded-lg shadow-xl transform transition-all duration-700 ease-in-out animate-certificate-rotate"
                style={{ transformOrigin: 'center left' }}
              />
            )}
            {/* Navigation for Other Certification */}
            {isOther && (
              <>
                {current < certificate.certificates.length - 1 && (
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
          <div className="flex-1 flex flex-col justify-center p-8 md:p-10 text-left animate-fade-in">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-press-start text-gray-900 dark:text-white">{title}</h3>
            <p className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300 font-vt323">{provider}</p>
            <p className="text-md mb-2 text-gray-500 dark:text-gray-400 font-vt323">{date}</p>
            <p className="text-base text-gray-800 dark:text-gray-200 font-vt323 mt-4">{description}</p>
          </div>
        </div>
      </div>
      {/* Animations */}
      <style jsx>{`
        @keyframes certificate-rotate {
          0% { transform: rotateY(-90deg) scale(0.8); opacity: 0; }
          60% { transform: rotateY(10deg) scale(1.05); opacity: 1; }
          100% { transform: rotateY(0deg) scale(1); opacity: 1; }
        }
        .animate-certificate-rotate {
          animation: certificate-rotate 0.7s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease both;
        }
        .animate-pop-up {
          animation: fade-in 0.4s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </div>
  );
};

export default CertificateModal;
