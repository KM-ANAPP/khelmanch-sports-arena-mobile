
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
// WordPress authentication removed

export const usePhoneLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isGeneratingOTP, setIsGeneratingOTP] = useState(false);
  const { sendOTP, verifyOTP, isRecaptchaVerifying } = useFirebaseAuth();

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
      const success = await sendOTP(phoneNumber);
      if (success) {
        setOtpSent(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    } finally {
      setIsGeneratingOTP(false);
    }
  };
  
  const resendOTP = async () => {
    setIsGeneratingOTP(true);
    try {
      await sendOTP(phoneNumber);
      toast({
        title: "OTP Resent",
        description: `A new OTP has been sent to +91 ${phoneNumber}`,
      });
    } catch (error) {
      console.error("Error resending OTP:", error);
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
    
    setIsGeneratingOTP(true);
    try {
      // Verify OTP with Firebase
      const verified = await verifyOTP(otp);
      
      if (verified) {
        // Set user data in local auth context
        await login({ 
          phone: phoneNumber,
          username: phoneNumber,
          displayName: "User",
          userId: Date.now().toString()
        });
        
        toast({
          title: "Login Successful",
          description: "You have been successfully logged in",
        });
        
        navigate("/home");
      } else {
        toast({
          title: "Verification Failed",
          description: "The OTP you entered is incorrect",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast({
        title: "Verification Error",
        description: "Could not verify OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingOTP(false);
    }
  };
  
  return {
    phoneNumber,
    setPhoneNumber,
    otpSent,
    setOtpSent,
    otp,
    setOtp,
    isGeneratingOTP,
    isVerifying: isRecaptchaVerifying,
    handleSendOTP,
    handleLoginWithOTP,
    resendOTP
  };
};
