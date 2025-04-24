
import React, { useEffect, useRef } from 'react';
import { isPlatform } from '@capacitor/core';

export const RecaptchaContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    // Skip reCAPTCHA container creation for native platforms
    // Firebase will use native verification on Android/iOS
    if (isPlatform('android') || isPlatform('ios')) {
      console.log('RecaptchaContainer: Native platform detected, skipping web reCAPTCHA');
      return;
    }

    // For web platforms, create the reCAPTCHA container
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
      console.log('RecaptchaContainer: Created container for web');
      
      // Store reference to allow proper cleanup
      containerRef.current = container as HTMLDivElement;
    }

    // Cleanup on unmount
    return () => {
      // Only clear contents, don't remove the container itself
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        console.log('RecaptchaContainer: Cleared container contents');
      }
    };
  }, []);

  return null;
};
