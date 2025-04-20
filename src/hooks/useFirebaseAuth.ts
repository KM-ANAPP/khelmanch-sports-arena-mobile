
import { useState } from 'react';
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  ConfirmationResult 
} from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { toast } from '@/hooks/use-toast';

export const useFirebaseAuth = () => {
  const [verificationId, setVerificationId] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const setupRecaptcha = (phoneNumber: string) => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved, allow signInWithPhoneNumber
        sendOTP(phoneNumber, recaptchaVerifier);
      },
      'expired-callback': () => {
        toast({
          title: "reCAPTCHA Expired",
          description: "Please try again",
          variant: "destructive",
        });
      }
    });
    return recaptchaVerifier;
  };

  const sendOTP = async (phoneNumber: string, recaptchaVerifier?: RecaptchaVerifier) => {
    try {
      setLoading(true);
      if (!recaptchaVerifier) {
        recaptchaVerifier = setupRecaptcha(phoneNumber);
      }
      
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier);
      setVerificationId(confirmationResult);
      
      toast({
        title: "OTP Sent",
        description: `OTP sent to ${phoneNumber}`,
      });
      
      return true;
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      toast({
        title: "Failed to send OTP",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    if (!verificationId) {
      toast({
        title: "Error",
        description: "Please request OTP first",
        variant: "destructive",
      });
      return false;
    }

    try {
      setLoading(true);
      const result = await verificationId.confirm(otp);
      
      if (result.user) {
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
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    sendOTP,
    verifyOTP,
    loading
  };
};
