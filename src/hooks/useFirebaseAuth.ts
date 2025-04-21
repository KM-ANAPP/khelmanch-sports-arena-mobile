
import { useState, useEffect, useRef } from 'react';
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  ConfirmationResult 
} from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { toast } from '@/hooks/use-toast';

export const useFirebaseAuth = () => {
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const isRecaptchaInitializedRef = useRef<boolean>(false);

  // Clean up recaptcha on unmount
  useEffect(() => {
    return () => {
      clearRecaptcha();
    };
  }, []);

  const clearRecaptcha = () => {
    if (recaptchaVerifierRef.current) {
      try {
        recaptchaVerifierRef.current.clear();
        console.log('Cleared existing reCAPTCHA');
      } catch (error) {
        console.error('Error clearing reCAPTCHA:', error);
      }
      recaptchaVerifierRef.current = null;
      isRecaptchaInitializedRef.current = false;
    }
  };

  const setupRecaptcha = async (): Promise<boolean> => {
    try {
      // Clear existing reCAPTCHA first
      clearRecaptcha();
      
      // Get the container
      const container = document.getElementById('recaptcha-container');
      if (!container) {
        console.error('RecaptchaContainer not found in DOM');
        return false;
      }

      // Make sure container is empty
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      // Create new verifier
      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA verified');
          isRecaptchaInitializedRef.current = true;
        },
        'expired-callback': () => {
          toast({
            title: "reCAPTCHA Expired",
            description: "Please try again",
            variant: "destructive",
          });
          clearRecaptcha();
        }
      });
      
      // Render the reCAPTCHA
      await verifier.render();
      recaptchaVerifierRef.current = verifier;
      isRecaptchaInitializedRef.current = true;
      console.log('reCAPTCHA rendered successfully');
      
      return true;
    } catch (error) {
      console.error('Error setting up reCAPTCHA:', error);
      clearRecaptcha();
      return false;
    }
  };

  const sendOTP = async (phoneNumber: string): Promise<boolean> => {
    let retryCount = 0;
    const MAX_RETRIES = 2;
    
    try {
      if (!recaptchaVerifierRef.current || !isRecaptchaInitializedRef.current) {
        const setup = await setupRecaptcha();
        if (!setup) {
          toast({
            title: "reCAPTCHA Error",
            description: "Failed to initialize verification. Please try again.",
            variant: "destructive",
          });
          return false;
        }
      }
      
      // Format the phone number appropriately
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      console.log(`Attempting to send OTP to ${formattedPhone}`);
      
      const attemptSendOTP = async (): Promise<boolean> => {
        try {
          const result = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifierRef.current!);
          setConfirmationResult(result);
          
          toast({
            title: "OTP Sent",
            description: `OTP sent to ${phoneNumber}`,
          });
          
          return true;
        } catch (error: any) {
          console.error(`Error sending OTP (attempt ${retryCount + 1}):`, error);
          
          // If captcha failed and we haven't reached max retries, try again
          if (error.code === 'auth/captcha-check-failed' && retryCount < MAX_RETRIES) {
            retryCount++;
            // Wait a bit and retry
            await new Promise(resolve => setTimeout(resolve, 1000));
            await setupRecaptcha(); // Setup recaptcha again
            return attemptSendOTP();
          }
          
          // Handle other errors
          let errorMessage = "Failed to send OTP";
          if (error.code === 'auth/invalid-phone-number') {
            errorMessage = "Please enter a valid phone number";
          } else if (error.code === 'auth/too-many-requests') {
            errorMessage = "Too many attempts. Please try again later.";
          }
          
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
          
          clearRecaptcha();
          return false;
        }
      };
      
      return await attemptSendOTP();
    } catch (error: any) {
      console.error('Unexpected error in sendOTP:', error);
      clearRecaptcha();
      
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
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
        clearRecaptcha();
        
        toast({
          title: "Success",
          description: "Phone number verified successfully",
        });
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      
      let errorMessage = "Failed to verify OTP";
      if (error.code === 'auth/invalid-verification-code') {
        errorMessage = "Invalid OTP. Please try again.";
      } else if (error.code === 'auth/code-expired') {
        errorMessage = "OTP expired. Please request a new one.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
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
