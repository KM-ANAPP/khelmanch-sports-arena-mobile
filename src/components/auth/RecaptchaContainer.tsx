
import React, { useEffect, useRef } from 'react';

export const RecaptchaContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    // If there's already a container in the DOM with this ID, remove it first
    const existingContainer = document.getElementById('recaptcha-container');
    if (existingContainer && existingContainer !== containerRef.current) {
      existingContainer.parentNode?.removeChild(existingContainer);
    }

    // Add the container to the body if it's not already there
    if (containerRef.current && !document.body.contains(containerRef.current)) {
      document.body.appendChild(containerRef.current);
    }

    // Cleanup when unmounted
    return () => {
      // Only remove if it's our container and it exists in the DOM
      if (containerRef.current && document.body.contains(containerRef.current)) {
        document.body.removeChild(containerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      id="recaptcha-container" 
      style={{ 
        position: 'fixed', 
        bottom: 0, 
        right: 0, 
        zIndex: 9999,
        visibility: 'hidden' 
      }} 
    />
  );
};
