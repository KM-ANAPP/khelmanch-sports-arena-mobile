
import { useState } from "react";
import { PhoneLoginForm } from "@/components/auth/PhoneLoginForm";
import { usePhoneLogin } from "@/hooks/usePhoneLogin";

export function PhoneLoginTab() {
  const {
    phoneNumber,
    setPhoneNumber,
    otpSent,
    setOtpSent,
    otp,
    setOtp,
    isGeneratingOTP,
    isVerifying,
    handleSendOTP,
    handleLoginWithOTP,
    resendOTP
  } = usePhoneLogin();

  return (
    <PhoneLoginForm
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      otpSent={otpSent}
      setOtpSent={setOtpSent}
      otp={otp}
      setOtp={setOtp}
      isGeneratingOTP={isGeneratingOTP}
      handleSendOTP={handleSendOTP}
      handleLoginWithOTP={handleLoginWithOTP}
      retryOTP={resendOTP}
      isRecaptchaVerifying={isVerifying}
    />
  );
}
