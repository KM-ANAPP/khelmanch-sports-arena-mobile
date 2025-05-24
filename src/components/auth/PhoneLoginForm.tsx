
import { Phone, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface PhoneLoginFormProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  otpSent: boolean;
  setOtpSent: (value: boolean) => void;
  otp: string;
  setOtp: (value: string) => void;
  isGeneratingOTP: boolean;
  handleSendOTP: () => void;
  handleLoginWithOTP: () => void;
  retryOTP?: () => void;
  isRecaptchaVerifying?: boolean;
}

export const PhoneLoginForm = ({
  phoneNumber,
  setPhoneNumber,
  otpSent,
  setOtpSent,
  otp,
  setOtp,
  isGeneratingOTP,
  handleSendOTP,
  handleLoginWithOTP,
  retryOTP,
  isRecaptchaVerifying
}: PhoneLoginFormProps) => {
  const isLoading = isGeneratingOTP || isRecaptchaVerifying;
  
  const fadeAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3 }
  };
  
  return (
    <motion.div
      key={otpSent ? "otp" : "phone"}
      initial={fadeAnimation.initial}
      animate={fadeAnimation.animate}
      exit={fadeAnimation.exit}
      transition={fadeAnimation.transition}
      className="w-full"
    >
      {!otpSent ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-200">
              Phone Number
            </Label>
            <div className="flex space-x-2">
              <div className="flex h-12 w-14 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm items-center justify-center font-medium text-gray-200 backdrop-blur-sm">
                +91
              </div>
              <Input
                id="phone"
                placeholder="Enter phone number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="h-12 rounded-xl text-base bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 backdrop-blur-sm"
              />
            </div>
          </div>
          <Button 
            className="w-full h-12 mt-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-xl text-base transition-all duration-200 shadow-md hover:shadow-lg backdrop-blur-sm" 
            onClick={handleSendOTP}
            disabled={phoneNumber.length !== 10 || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {isRecaptchaVerifying ? "Verifying..." : "Sending OTP..."}
              </>
            ) : (
              <>
                Get OTP
                <Phone className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp" className="text-sm font-medium text-gray-200">
              Enter OTP
            </Label>
            <Input
              id="otp"
              placeholder="Enter 6-digit OTP"
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="h-12 rounded-xl text-base text-center tracking-widest font-medium bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 backdrop-blur-sm"
            />
          </div>
          <div className="text-sm text-gray-300 mt-2 flex justify-between items-center">
            <span>OTP sent to +91 {phoneNumber}</span>
            {retryOTP && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-auto p-0 text-blue-300 hover:text-blue-200 hover:bg-transparent" 
                onClick={retryOTP}
                disabled={isLoading}
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Resend
              </Button>
            )}
          </div>
          <Button 
            className="w-full h-12 mt-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-xl text-base transition-all duration-200 shadow-md hover:shadow-lg backdrop-blur-sm" 
            onClick={handleLoginWithOTP}
            disabled={otp.length !== 6 || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                Verify & Login
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
          <Button 
            variant="link" 
            className="w-full text-gray-300 hover:text-white hover:no-underline" 
            onClick={() => setOtpSent(false)}
            disabled={isLoading}
          >
            Change Phone Number
          </Button>
        </div>
      )}
    </motion.div>
  );
};
