
import { Phone, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  
  return !otpSent ? (
    <div className="space-y-2">
      <Label htmlFor="phone">Phone Number</Label>
      <div className="flex space-x-2">
        <div className="flex h-10 w-14 rounded-md border border-input bg-background px-3 py-2 text-sm items-center justify-center">
          +91
        </div>
        <Input
          id="phone"
          placeholder="Enter phone number"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
        />
      </div>
      <Button 
        className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90" 
        onClick={handleSendOTP}
        disabled={phoneNumber.length !== 10 || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isRecaptchaVerifying ? "Verifying reCAPTCHA..." : "Sending OTP..."}
          </>
        ) : (
          <>
            Get OTP
            <Phone className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  ) : (
    <div className="space-y-2">
      <Label htmlFor="otp">Enter OTP</Label>
      <Input
        id="otp"
        placeholder="Enter 6-digit OTP"
        type="text"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
      />
      <div className="text-sm text-muted-foreground mt-2 flex justify-between">
        <span>OTP sent to +91 {phoneNumber}</span>
        {retryOTP && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-auto p-0 text-primary" 
            onClick={retryOTP}
            disabled={isLoading}
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Resend
          </Button>
        )}
      </div>
      <Button 
        className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90" 
        onClick={handleLoginWithOTP}
        disabled={otp.length !== 6 || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          <>
            Verify & Login
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
      <Button 
        variant="link" 
        className="w-full" 
        onClick={() => setOtpSent(false)}
        disabled={isLoading}
      >
        Change Phone Number
      </Button>
    </div>
  );
};
