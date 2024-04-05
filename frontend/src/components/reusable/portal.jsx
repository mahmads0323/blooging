import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children, isOpen }) => {
  const portalContainer = document.getElementById('portal');
  const element = document.createElement('div');

  useEffect(() => {
    portalContainer.appendChild(element);
    return () => portalContainer.removeChild(element);
  }, [portalContainer, element]);

  if (!isOpen) {
    return null;
  }
  return createPortal(children, element);
};

export default Portal;
