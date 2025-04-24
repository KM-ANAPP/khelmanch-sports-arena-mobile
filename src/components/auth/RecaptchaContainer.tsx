
import React, { useEffect, useRef } from 'react';

export const RecaptchaContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
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
      
      // Store reference to allow proper cleanup
      containerRef.current = container;
    }

    // Cleanup on unmount
    return () => {
      // Only clear contents, don't remove the container itself
      // This prevents reCAPTCHA from losing its container during re-renders
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        console.log('RecaptchaContainer: Cleared container contents');
      }
    };
  }, []);

  return null;
};
