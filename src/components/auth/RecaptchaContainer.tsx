
import React, { useEffect } from 'react';

export const RecaptchaContainer: React.FC = () => {
  useEffect(() => {
    // Ensure the container exists
    if (!document.getElementById('recaptcha-container')) {
      const container = document.createElement('div');
      container.id = 'recaptcha-container';
      document.body.appendChild(container);
    }

    // Cleanup when unmounted
    return () => {
      const container = document.getElementById('recaptcha-container');
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, []);

  return <div id="recaptcha-container" style={{ display: 'none' }} />;
};
