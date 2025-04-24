
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

interface LoadingState {
  isGeneratingOTP: boolean;
  isVerifyingOTP: boolean;
}

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { sendOTP, verifyOTP, isRecaptchaVerifying } = useFirebaseAuth();
  
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [is2FARequired, setIs2FARequired] = useState(false);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isGeneratingOTP: false,
    isVerifyingOTP: false
  });
  
  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }
    
    setLoadingState(prev => ({ ...prev, isGeneratingOTP: true }));
    try {
      console.log("Attempting to send OTP to", phoneNumber);
      const success = await sendOTP(phoneNumber);
      
      if (success) {
        setIs2FARequired(true);
        setOtpSent(true);
        console.log("OTP sent successfully");
      } else {
        console.log("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error in handleSendOTP:", error);
    } finally {
      setLoadingState(prev => ({ ...prev, isGeneratingOTP: false }));
    }
  };

  const handleLoginWithOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }
    
    setLoadingState(prev => ({ ...prev, isVerifyingOTP: true }));
    try {
      console.log("Verifying OTP:", otp);
      const success = await verifyOTP(otp);
      
      if (success) {
        console.log("OTP verified successfully");
        // After Firebase verification, log in to your app
        await login({ phone: phoneNumber });
        navigate("/home");
      } else {
        console.log("OTP verification failed");
      }
    } catch (error) {
      console.error("Error in handleLoginWithOTP:", error);
    } finally {
      setLoadingState(prev => ({ ...prev, isVerifyingOTP: false }));
    }
  };

  const retryOTP = async () => {
    setOtp("");
    setOtpSent(false);
    // Wait a moment before allowing another attempt
    setTimeout(() => {
      handleSendOTP();
    }, 1000);
  };

  return {
    phoneNumber,
    setPhoneNumber,
    loadingState,
    otpSent,
    setOtpSent,
    otp,
    setOtp,
    is2FARequired,
    handleSendOTP,
    handleLoginWithOTP,
    retryOTP,
    isRecaptchaVerifying
  };
};
