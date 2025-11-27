import { useState } from 'react';
import ModalContext from './modalContextStore';

// Provider component
export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const showModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };
  
  const hideModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setModalContent(null);
    }, 300); // Wait for animation to complete
    document.body.style.overflow = ''; // Restore scrolling
  };
  
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      hideModal();
    }
  };
  
  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      
      {modalContent && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black ${isOpen ? 'bg-opacity-50 backdrop-blur-md' : 'bg-opacity-0 backdrop-blur-none'} transition-all duration-300 modal-overlay`}
          onClick={handleOutsideClick}
          style={{ opacity: isOpen ? 1 : 0 }}
        >
          <div
            className={`relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-6 md:p-8 w-full max-w-4xl mx-4 transition-all duration-300 modal-content overflow-y-auto ${isOpen ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'}`}
            style={{ maxHeight: '85vh' }}
          >
            <button
              onClick={hideModal}
              className="absolute top-4 right-4 text-gray-700 dark:text-gray-200 hover:text-red-500 text-2xl font-bold focus:outline-none z-10"
              aria-label="Close"
            >
              &times;
            </button>
            {modalContent}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};