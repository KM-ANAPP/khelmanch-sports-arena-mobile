
import { Phone, ArrowRight } from "lucide-react";
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
  handleLoginWithOTP
}: PhoneLoginFormProps) => {
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
        disabled={phoneNumber.length !== 10 || isGeneratingOTP}
      >
        {isGeneratingOTP ? "Sending OTP..." : "Get OTP"}
        <Phone className="ml-2 h-4 w-4" />
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
      <div className="text-sm text-muted-foreground mt-2">
        OTP sent to +91 {phoneNumber}
      </div>
      <Button 
        className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90" 
        onClick={handleLoginWithOTP}
        disabled={otp.length !== 6}
      >
        Verify & Login
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <Button 
        variant="link" 
        className="w-full" 
        onClick={() => setOtpSent(false)}
      >
        Change Phone Number
      </Button>
    </div>
  );
};
