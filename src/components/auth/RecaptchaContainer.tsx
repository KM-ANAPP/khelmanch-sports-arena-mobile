
import { useEffect } from 'react';

export const RecaptchaContainer = () => {
  // Ensure the container is cleaned up on unmount
  useEffect(() => {
    return () => {
      const container = document.getElementById('recaptcha-container');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
      id="recaptcha-container" 
      className="invisible"
      aria-hidden="true"
    ></div>
  );
};
