
import { useState } from 'react';
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  ConfirmationResult,
  AuthError,
  UserCredential 
} from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { toast } from '@/hooks/use-toast';
import { Capacitor } from '@capacitor/core';

const FIREBASE_TIMEOUT = 60000; // 60 seconds

export const useFirebaseAuth = () => {
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isRecaptchaVerifying, setIsRecaptchaVerifying] = useState(false);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);

  const clearExistingRecaptcha = () => {
    // First, dispose of any existing recaptcha verifier
    if (recaptchaVerifier) {
      try {
        recaptchaVerifier.clear();
        console.log('Cleared existing RecaptchaVerifier');
      } catch (error) {
        console.error('Error clearing RecaptchaVerifier:', error);
      }
      setRecaptchaVerifier(null);
    }
    
    // Then clear the container
    const container = document.getElementById('recaptcha-container');
    if (container) {
      container.innerHTML = '';
      console.log('Cleared existing reCAPTCHA container');
    }
  };

  const createTimeoutPromise = (ms: number) => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Operation timed out after ${ms}ms`));
      }, ms);
    });
  };

  const sendOTP = async (phoneNumber: string): Promise<boolean> => {
    try {
      setIsRecaptchaVerifying(true);
      
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      console.log(`Sending OTP to ${formattedPhone}`);
      
      const isNative = Capacitor.isNativePlatform();
      
      if (isNative) {
        console.log('Using native phone auth verification');
        
        try {
          const result = await Promise.race([
            signInWithPhoneNumber(auth, formattedPhone, null),
            createTimeoutPromise(FIREBASE_TIMEOUT)
          ]) as ConfirmationResult;
          
          setConfirmationResult(result);
          console.log('OTP sent successfully using native verification');
          
          toast({
            title: "OTP Sent",
            description: `OTP sent to ${phoneNumber}`,
          });
          
          return true;
        } catch (error) {
          throw error;
        }
      } else {
        // Always clear existing reCAPTCHA before creating a new one
        clearExistingRecaptcha();
        
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
        
        console.log('Creating new RecaptchaVerifier for web');
        
        const newRecaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
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

        // Set the new recaptcha verifier
        setRecaptchaVerifier(newRecaptchaVerifier);
        
        try {
          const result = await Promise.race([
            signInWithPhoneNumber(auth, formattedPhone, newRecaptchaVerifier),
            createTimeoutPromise(FIREBASE_TIMEOUT)
          ]) as ConfirmationResult;
          
          setConfirmationResult(result);
          console.log('OTP sent successfully via web reCAPTCHA');
          
          toast({
            title: "OTP Sent",
            description: `OTP sent to ${phoneNumber}`,
          });
          
          return true;
        } catch (error) {
          throw error;
        }
      }
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      
      clearExistingRecaptcha();
      
      let errorMessage = "Failed to send OTP";
      
      if (error.message && error.message.includes('timed out')) {
        errorMessage = "Request timed out. Please check your internet connection and try again.";
      } else if (error.code === 'auth/invalid-phone-number') {
        errorMessage = "Please enter a valid phone number";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many attempts. Please try again later.";
      } else if (error.code === 'auth/captcha-check-failed') {
        errorMessage = "Verification failed. Please try again.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsRecaptchaVerifying(false);
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
      
      const userCredential = await Promise.race([
        confirmationResult.confirm(otp),
        createTimeoutPromise(FIREBASE_TIMEOUT)
      ]) as UserCredential;
      
      if (userCredential.user) {
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
      if (error.message && error.message.includes('timed out')) {
        errorMessage = "Verification timed out. Please try again.";
      } else if (error.code === 'auth/code-expired') {
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
    verifyOTP,
    isRecaptchaVerifying
  };
};
