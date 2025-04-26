import { useState } from 'react';
import { 
  signInWithPhoneNumber, 
  ConfirmationResult,
  UserCredential 
} from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { toast } from '@/hooks/use-toast';

const FIREBASE_TIMEOUT = 60000; // 60 seconds

export const useFirebaseAuth = () => {
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isRecaptchaVerifying, setIsRecaptchaVerifying] = useState(false);

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
      
      try {
        const result = await Promise.race([
          signInWithPhoneNumber(auth, formattedPhone, null),
          createTimeoutPromise(FIREBASE_TIMEOUT)
        ]) as ConfirmationResult;
        
        setConfirmationResult(result);
        console.log('OTP sent successfully');
        
        toast({
          title: "OTP Sent",
          description: `OTP sent to ${phoneNumber}`,
        });
        
        return true;
      } catch (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      
      let errorMessage = "Failed to send OTP";
      
      if (error.message && error.message.includes('timed out')) {
        errorMessage = "Request timed out. Please check your internet connection and try again.";
      } else if (error.code === 'auth/invalid-phone-number') {
        errorMessage = "Please enter a valid phone number";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many attempts. Please try again later.";
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
