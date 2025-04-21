
import React, { useEffect } from 'react';

export const RecaptchaContainer: React.FC = () => {
  useEffect(() => {
    // Make sure we only have one container
    let container = document.getElementById('recaptcha-container');
    
    if (!container) {
      // Create the container if it doesn't exist
      container = document.createElement('div');
      container.id = 'recaptcha-container';
      container.style.position = 'fixed';
      container.style.bottom = '0';
      container.style.right = '0';
      container.style.zIndex = '9999';
      document.body.appendChild(container);
      console.log('RecaptchaContainer: Created container');
    }

    // Cleanup on unmount
    return () => {
      const containerToRemove = document.getElementById('recaptcha-container');
      if (containerToRemove) {
        containerToRemove.innerHTML = ''; // Clear all children first
        console.log('RecaptchaContainer: Cleared container contents');
      }
    };
  }, []);

  return null;
};
