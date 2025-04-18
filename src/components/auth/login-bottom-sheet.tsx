
import { useState } from "react";
import { Drawer, DrawerContent, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Phone, ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface LoginBottomSheetProps {
  open: boolean;
  onDismiss: () => void;
  onLogin: () => void;
}

export function LoginBottomSheet({ open, onDismiss, onLogin }: LoginBottomSheetProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendOTP = () => {
    if (phoneNumber.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }
    
    // Show loading state
    setIsLoading(true);
    
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: `OTP sent to +91 ${phoneNumber}`,
      });
    }, 1500);
  };
  
  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }
    
    // Show loading state
    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
      onDismiss();
      toast({
        title: "Login Successful",
        description: "You have been successfully logged in",
      });
    }, 1500);
  };

  return (
    <Drawer open={open} onOpenChange={(open) => !open && onDismiss()}>
      <DrawerContent className="px-4 pb-8">
        <div className="flex justify-between items-center pt-4 pb-2">
          <h2 className="text-lg font-semibold">Login to Khelmanch</h2>
          <DrawerClose onClick={onDismiss}>
            <X className="h-5 w-5" />
          </DrawerClose>
        </div>
        
        <div className="space-y-4 mt-2">
          {!otpSent ? (
            <>
              <p className="text-sm text-muted-foreground">
                Login to access all features and manage your bookings
              </p>
              
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
                    className="flex-1"
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSendOTP} 
                disabled={phoneNumber.length !== 10 || isLoading}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {isLoading ? "Sending OTP..." : "Get OTP"}
                <Phone className="ml-2 h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit OTP sent to +91 {phoneNumber}
              </p>
              
              <div className="space-y-2">
                <Label htmlFor="otp">One-Time Password</Label>
                <Input
                  id="otp"
                  placeholder="Enter 6-digit OTP"
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                />
              </div>
              
              <Button 
                onClick={handleVerifyOTP} 
                disabled={otp.length !== 6 || isLoading}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {isLoading ? "Verifying..." : "Verify & Login"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                variant="link" 
                className="w-full" 
                onClick={() => setOtpSent(false)}
                disabled={isLoading}
              >
                Change Phone Number
              </Button>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
