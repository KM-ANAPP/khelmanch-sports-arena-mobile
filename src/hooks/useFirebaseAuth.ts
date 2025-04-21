
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

export const useFirebaseAuth = () => {
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  // Cleanup recaptchaVerifier when component unmounts
  useEffect(() => {
    return () => {
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
        recaptchaVerifier = null;
      }
    };
  }, []);

  const setupRecaptcha = () => {
    // Create recaptchaVerifier only if it doesn't exist
    if (!recaptchaVerifier) {
      // Ensure the container exists
      let container = document.getElementById('recaptcha-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'recaptcha-container';
        document.body.appendChild(container);
      }

      recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA solved');
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
          }
        }
      });
    }
    
    return recaptchaVerifier;
  };

  const sendOTP = async (phoneNumber: string): Promise<boolean> => {
    try {
      const recaptcha = setupRecaptcha();
      
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
          recaptchaVerifier.clear();
          recaptchaVerifier = null;
        }
        // Attempt to reinitialize recaptchaVerifier after a short delay
        setTimeout(() => setupRecaptcha(), 3000);  // Retry after 3 seconds
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
