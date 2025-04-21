
import { useState } from 'react';
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  ConfirmationResult 
} from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { toast } from '@/hooks/use-toast';

export const useFirebaseAuth = () => {
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  // Function to clear any existing recaptcha
  const clearExistingRecaptcha = () => {
    const container = document.getElementById('recaptcha-container');
    if (container) {
      container.innerHTML = '';
      console.log('Cleared existing reCAPTCHA');
    }
  };

  const sendOTP = async (phoneNumber: string): Promise<boolean> => {
    try {
      // Always clear any existing reCAPTCHA before creating a new one
      clearExistingRecaptcha();
      
      // Get the container
      const container = document.getElementById('recaptcha-container');
      if (!container) {
        console.error('recaptcha-container not found');
        toast({
          title: "Error",
          description: "reCAPTCHA initialization failed. Please reload the page.",
          variant: "destructive",
        });
        return false;
      }
      
      console.log('Creating new RecaptchaVerifier');
      
      // Create a new verifier
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          clearExistingRecaptcha();
          toast({
            title: "reCAPTCHA Expired",
            description: "Please try again",
            variant: "destructive",
          });
        }
      });
      
      // Format the phone number for Firebase
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      console.log(`Sending OTP to ${formattedPhone}`);
      
      // Attempt to send the OTP
      const result = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier);
      
      setConfirmationResult(result);
      console.log('OTP sent successfully');
      
      toast({
        title: "OTP Sent",
        description: `OTP sent to ${phoneNumber}`,
      });
      
      return true;
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      
      // Clean up
      clearExistingRecaptcha();
      
      // User-friendly error messages
      let errorMessage = "Failed to send OTP";
      if (error.code === 'auth/invalid-phone-number') {
        errorMessage = "Please enter a valid phone number";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many attempts. Please try again later.";
      } else if (error.code === 'auth/captcha-check-failed') {
        errorMessage = "reCAPTCHA verification failed. Please try again.";
      }
      
      toast({
        title: "Error",
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
      console.log('Verifying OTP');
      const result = await confirmationResult.confirm(otp);
      
      if (result.user) {
        console.log('OTP verified successfully');
        toast({
          title: "Success",
          description: "Phone number verified successfully",
        });
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      
      let errorMessage = "Invalid OTP. Please try again.";
      if (error.code === 'auth/code-expired') {
        errorMessage = "OTP expired. Please request a new one.";
      } else if (error.code === 'auth/invalid-verification-code') {
        errorMessage = "Invalid OTP. Please check and try again.";
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
