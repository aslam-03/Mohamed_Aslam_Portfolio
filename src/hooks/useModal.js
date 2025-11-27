import { useContext } from 'react';
import ModalContext from '../utils/modalContextStore';

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export default useModal;
