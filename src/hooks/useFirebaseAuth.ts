
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
  const [lastOTPRequestTime, setLastOTPRequestTime] = useState<number>(0);
  const OTP_COOLDOWN_PERIOD = 60000; // 1 minute cooldown
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const isRecaptchaRenderedRef = useRef<boolean>(false);

  // Cleanup recaptchaVerifier when component unmounts
  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
        } catch (error) {
          console.error('Error clearing reCAPTCHA:', error);
        }
        recaptchaVerifierRef.current = null;
        isRecaptchaRenderedRef.current = false;
      }
    };
  }, []);

  const setupRecaptcha = async (): Promise<RecaptchaVerifier | null> => {
    try {
      // Clear existing reCAPTCHA if it exists
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
        } catch (error) {
          console.error('Error clearing reCAPTCHA:', error);
        }
        recaptchaVerifierRef.current = null;
        isRecaptchaRenderedRef.current = false;
      }

      // Ensure reCAPTCHA container exists
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

      // Create new reCAPTCHA verifier
      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA solved');
          isRecaptchaRenderedRef.current = true;
        },
        'expired-callback': () => {
          toast({
            title: "reCAPTCHA Expired",
            description: "Please try again",
            variant: "destructive",
          });
          if (recaptchaVerifierRef.current) {
            try {
              recaptchaVerifierRef.current.clear();
            } catch (error) {
              console.error('Error clearing expired reCAPTCHA:', error);
            }
            recaptchaVerifierRef.current = null;
            isRecaptchaRenderedRef.current = false;
          }
        }
      });
      
      // Explicitly render the reCAPTCHA
      try {
        await verifier.render();
        recaptchaVerifierRef.current = verifier;
        isRecaptchaRenderedRef.current = true;
        return verifier;
      } catch (error) {
        console.error('Error rendering reCAPTCHA:', error);
        if (recaptchaVerifierRef.current) {
          try {
            recaptchaVerifierRef.current.clear();
          } catch (e) {
            console.error('Error clearing failed reCAPTCHA:', e);
          }
        }
        recaptchaVerifierRef.current = null;
        isRecaptchaRenderedRef.current = false;
        return null;
      }
    } catch (error) {
      console.error('Error setting up reCAPTCHA:', error);
      recaptchaVerifierRef.current = null;
      isRecaptchaRenderedRef.current = false;
      return null;
    }
  };

  const sendOTP = async (phoneNumber: string): Promise<boolean> => {
    let retryCount = 0;
    const MAX_RETRIES = 2;
    
    try {
      // Check rate limiting
      const now = Date.now();
      if (now - lastOTPRequestTime < OTP_COOLDOWN_PERIOD) {
        const remainingTime = Math.ceil((OTP_COOLDOWN_PERIOD - (now - lastOTPRequestTime)) / 1000);
        toast({
          title: "Please Wait",
          description: `Please wait ${remainingTime} seconds before requesting another OTP`,
          variant: "destructive",
        });
        return false;
      }
      
      // Function to attempt sending OTP with retries
      const attemptSendOTP = async (): Promise<boolean> => {
        try {
          // Setup reCAPTCHA if not already set up
          if (!recaptchaVerifierRef.current || !isRecaptchaRenderedRef.current) {
            const verifier = await setupRecaptcha();
            if (!verifier) {
              toast({
                title: "reCAPTCHA Error",
                description: "Failed to initialize reCAPTCHA. Please try again.",
                variant: "destructive",
              });
              return false;
            }
          }
          
          // Format phone number
          const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
          
          console.log(`Attempting to send OTP to ${formattedPhone}, attempt #${retryCount + 1}`);
          
          // Send verification code
          const result = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifierRef.current!);
          setConfirmationResult(result);
          setLastOTPRequestTime(now);
          
          toast({
            title: "OTP Sent",
            description: `OTP sent to ${phoneNumber}`,
          });
          
          return true;
        } catch (error: any) {
          console.error(`Error sending OTP (attempt ${retryCount + 1}):`, error);
          
          // Handle specific Firebase errors
          if (error.code === 'auth/captcha-check-failed' && retryCount < MAX_RETRIES) {
            retryCount++;
            console.log(`Retrying reCAPTCHA setup, attempt ${retryCount}`);
            
            // Clear and reset reCAPTCHA before retrying
            if (recaptchaVerifierRef.current) {
              try {
                recaptchaVerifierRef.current.clear();
              } catch (e) {
                console.error('Error clearing reCAPTCHA before retry:', e);
              }
              recaptchaVerifierRef.current = null;
              isRecaptchaRenderedRef.current = false;
            }
            
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, 1500));
            return attemptSendOTP();
          }
          
          // Handle other errors or max retries reached
          let errorMessage = error.message;
          
          if (error.code === 'auth/invalid-phone-number') {
            errorMessage = 'Please enter a valid phone number';
          } else if (error.code === 'auth/captcha-check-failed') {
            errorMessage = 'Domain verification failed. Please try again or contact support.';
          } else if (error.code === 'auth/too-many-requests') {
            errorMessage = 'Too many attempts. Please try again later.';
          } else if (error.code === 'auth/quota-exceeded') {
            errorMessage = "Daily quota exceeded. Please try again tomorrow.";
          }
          
          toast({
            title: "Failed to send OTP",
            description: errorMessage,
            variant: "destructive",
          });
          
          return false;
        }
      };
      
      return await attemptSendOTP();
    } catch (error: any) {
      console.error('Unexpected error in sendOTP:', error);
      
      toast({
        title: "Failed to send OTP",
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
        if (recaptchaVerifierRef.current) {
          try {
            recaptchaVerifierRef.current.clear();
          } catch (error) {
            console.error('Error clearing reCAPTCHA after verification:', error);
          }
          recaptchaVerifierRef.current = null;
          isRecaptchaRenderedRef.current = false;
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
      
      let errorMessage = "Failed to verify OTP";
      if (error.code === 'auth/invalid-verification-code') {
        errorMessage = "Invalid OTP. Please try again.";
      } else if (error.code === 'auth/code-expired') {
        errorMessage = "OTP expired. Please request a new one.";
      }
      
      toast({
        title: "Invalid OTP",
        description: error.message || errorMessage,
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
