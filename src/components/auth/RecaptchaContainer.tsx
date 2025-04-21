
import React, { useEffect, useRef } from 'react';

export const RecaptchaContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    // If there's already a container in the DOM with this ID that isn't our ref, don't create another
    const existingContainer = document.getElementById('recaptcha-container');
    if (existingContainer && existingContainer !== containerRef.current) {
      console.log('RecaptchaContainer: A container already exists in the DOM');
      return;
    }

    // Create a container if it doesn't exist
    if (!existingContainer) {
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

    // Cleanup when unmounted - only remove if it's our container
    return () => {
      if (containerRef.current && containerRef.current.parentNode) {
        containerRef.current.parentNode.removeChild(containerRef.current);
        console.log('RecaptchaContainer: Removed container on unmount');
      }
    };
  }, []);

  return null; // We're managing the DOM element imperatively
};
