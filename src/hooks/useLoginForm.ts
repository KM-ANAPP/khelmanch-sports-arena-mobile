
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { sendOTP: firebaseSendOTP, verifyOTP: firebaseVerifyOTP, loading } = useFirebaseAuth();
  
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [is2FARequired, setIs2FARequired] = useState(false);
  
  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }
    
    // Add recaptcha container if not exists
    if (!document.getElementById('recaptcha-container')) {
      const container = document.createElement('div');
      container.id = 'recaptcha-container';
      document.body.appendChild(container);
    }
    
    const success = await firebaseSendOTP(phoneNumber);
    
    if (success) {
      setIs2FARequired(true);
      setOtpSent(true);
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
    
    const success = await firebaseVerifyOTP(otp);
    
    if (success) {
      // After Firebase verification, log in to your app
      await login({ phone: phoneNumber });
      navigate("/home");
    }
  };

  return {
    phoneNumber,
    setPhoneNumber,
    loading,
    otpSent,
    setOtpSent,
    otp,
    setOtp,
    is2FARequired,
    handleSendOTP,
    handleLoginWithOTP
  };
};
