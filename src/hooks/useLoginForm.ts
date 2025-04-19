
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login, verifyOTP } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isGeneratingOTP, setIsGeneratingOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [tempOTP, setTempOTP] = useState("");
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
    
    setIsGeneratingOTP(true);
    
    try {
      const { requiresOTP, tempOTP: generatedOTP } = await login({ phone: phoneNumber });
      
      if (requiresOTP) {
        setIs2FARequired(true);
        setOtpSent(true);
        if (generatedOTP) {
          setTempOTP(generatedOTP);
        }
        toast({
          title: "OTP Sent",
          description: `OTP sent to +91 ${phoneNumber}`,
        });
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "Please check your phone number and try again",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingOTP(false);
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
    
    try {
      const success = await verifyOTP(otp, tempOTP);
      if (success) {
        navigate("/home");
      }
    } catch (error) {
      // Error is already handled in the verifyOTP function
    }
  };

  return {
    phoneNumber,
    setPhoneNumber,
    isGeneratingOTP,
    otpSent,
    setOtpSent,
    otp,
    setOtp,
    is2FARequired,
    handleSendOTP,
    handleLoginWithOTP
  };
};
