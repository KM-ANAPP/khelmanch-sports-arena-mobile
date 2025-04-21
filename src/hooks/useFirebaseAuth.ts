
import { useState, useEffect } from 'react';
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  ConfirmationResult 
} from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { toast } from '@/hooks/use-toast';

// Keep a single instance of recaptchaVerifier to prevent multiple instances
let recaptchaVerifier: RecaptchaVerifier | null = null;
let recaptchaInitialized = false;

export const useFirebaseAuth = () => {
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  // Cleanup recaptchaVerifier when component unmounts
  useEffect(() => {
    // Ensure reCAPTCHA container exists
    if (!document.getElementById('recaptcha-container')) {
      const container = document.createElement('div');
      container.id = 'recaptcha-container';
      container.style.position = 'fixed';
      container.style.bottom = '0';
      container.style.right = '0';
      container.style.zIndex = '9999';
      container.style.visibility = 'hidden';
      document.body.appendChild(container);
    }

    return () => {
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
        recaptchaVerifier = null;
        recaptchaInitialized = false;
      }
    };
  }, []);

  const setupRecaptcha = () => {
    // Clear existing reCAPTCHA if it exists
    if (recaptchaVerifier) {
      try {
        recaptchaVerifier.clear();
      } catch (error) {
        console.error('Error clearing reCAPTCHA:', error);
      }
      recaptchaVerifier = null;
      recaptchaInitialized = false;
    }

    // Create new reCAPTCHA instance
    try {
      // Ensure the container exists
      let container = document.getElementById('recaptcha-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'recaptcha-container';
        container.style.position = 'fixed';
        container.style.bottom = '0';
        container.style.right = '0';
        container.style.zIndex = '9999';
        container.style.visibility = 'hidden';
        document.body.appendChild(container);
      }

      recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA solved');
          recaptchaInitialized = true;
        },
        'expired-callback': () => {
          toast({
            title: "reCAPTCHA Expired",
            description: "Please try again",
            variant: "destructive",
          });
          // Reset recaptcha when expired
          if (recaptchaVerifier) {
            recaptchaVerifier.clear();
            recaptchaVerifier = null;
            recaptchaInitialized = false;
          }
        }
      });
      
      // Explicitly render the reCAPTCHA to ensure it's initialized
      return recaptchaVerifier.render()
        .then(() => {
          recaptchaInitialized = true;
          return recaptchaVerifier;
        })
        .catch((error) => {
          console.error('Error rendering reCAPTCHA:', error);
          recaptchaVerifier = null;
          recaptchaInitialized = false;
          throw error;
        });
    } catch (error) {
      console.error('Error setting up reCAPTCHA:', error);
      recaptchaVerifier = null;
      recaptchaInitialized = false;
      throw error;
    }
  };

  const sendOTP = async (phoneNumber: string): Promise<boolean> => {
    try {
      // Set up reCAPTCHA and wait for it to be rendered
      const recaptcha = await setupRecaptcha();
      
      if (!recaptcha || !recaptchaInitialized) {
        throw new Error('reCAPTCHA not initialized properly');
      }
      
      // Format phone number if needed
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      
      // Send verification code
      const result = await signInWithPhoneNumber(auth, formattedPhone, recaptcha);
      setConfirmationResult(result);
      
      toast({
        title: "OTP Sent",
        description: `OTP sent to ${phoneNumber}`,
      });
      
      return true;
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      
      // Handle specific Firebase errors with better user messages
      let errorMessage = error.message;
      
      if (error.code === 'auth/invalid-phone-number') {
        errorMessage = 'Please enter a valid phone number';
      } else if (error.code === 'auth/captcha-check-failed') {
        errorMessage = 'Domain verification failed. Please try again or contact support.';
        
        // Reset recaptcha on error
        if (recaptchaVerifier) {
          try {
            recaptchaVerifier.clear();
          } catch (e) {
            console.error('Error clearing reCAPTCHA after failure:', e);
          }
          recaptchaVerifier = null;
          recaptchaInitialized = false;
        }
        
        // Attempt to reinitialize recaptchaVerifier after a short delay
        setTimeout(() => {
          try {
            setupRecaptcha().catch(console.error);
          } catch (e) {
            console.error('Error during reCAPTCHA retry:', e);
          }
        }, 3000);  // Retry after 3 seconds
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many attempts. Please try again later.';
      }
      
      toast({
        title: "Failed to send OTP",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    }
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    if (!confirmationResult) {
      toast({
        title: "Error",
        description: "Please request OTP first",
        variant: "destructive",
      });
      return false;
    }

    try {
      const result = await confirmationResult.confirm(otp);
      
      if (result.user) {
        // Clear recaptcha after successful verification
        if (recaptchaVerifier) {
          recaptchaVerifier.clear();
          recaptchaVerifier = null;
          recaptchaInitialized = false;
        }
        
        toast({
          title: "Success",
          description: "Phone number verified successfully",
        });
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      toast({
        title: "Invalid OTP",
        description: error.message || "The verification code is invalid",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    sendOTP,
    verifyOTP
  };
};
