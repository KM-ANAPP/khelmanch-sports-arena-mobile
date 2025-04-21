
import React, { useEffect, useRef } from 'react';

export const RecaptchaContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    // Create the container if it doesn't exist
    if (!document.getElementById('recaptcha-container')) {
      const container = document.createElement('div');
      container.id = 'recaptcha-container';
      container.style.position = 'fixed';
      container.style.bottom = '0';
      container.style.right = '0';
      container.style.zIndex = '9999';
      container.style.visibility = 'hidden';
      document.body.appendChild(container);
      containerRef.current = container;
      console.log('RecaptchaContainer: Created new container');
    }

    // Cleanup on unmount
    return () => {
      if (containerRef.current && containerRef.current.parentNode) {
        containerRef.current.parentNode.removeChild(containerRef.current);
        console.log('RecaptchaContainer: Removed container on unmount');
      }
    };
  }, []);

  return null; // We're managing the DOM element imperatively
};
