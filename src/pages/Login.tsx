
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, ArrowRight } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isGeneratingOTP, setIsGeneratingOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOTP = () => {
    // In a real app, this would call an API to send OTP
    setIsGeneratingOTP(true);
    setTimeout(() => {
      setIsGeneratingOTP(false);
      setOtpSent(true);
      // For demo, we would display a success message here
    }, 1500);
  };

  const handleLoginWithOTP = () => {
    // In a real app, this would verify the OTP with an API
    // For demo, we'll just navigate to home
    navigate("/");
  };

  const handleGoogleLogin = () => {
    // In a real app, this would initiate Google OAuth
    // For demo, we'll just navigate to home
    navigate("/");
  };

  const handleSkipLogin = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            <img src="/src/assets/logos/khelmanch-logo.svg" alt="Khelmanch Logo" className="h-12" />
          </div>
          <CardTitle className="text-2xl text-center">Welcome to Khelmanch</CardTitle>
          <CardDescription className="text-center">
            Login to access all features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="phone" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="phone">Phone</TabsTrigger>
              <TabsTrigger value="google">Google</TabsTrigger>
            </TabsList>
            <TabsContent value="phone" className="space-y-4">
              {!otpSent ? (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex space-x-2">
                    <div className="flex h-10 w-14 rounded-md border border-input bg-background px-3 py-2 text-sm">
                      +91
                    </div>
                    <Input
                      id="phone"
                      placeholder="Enter phone number"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <Button 
                    className="w-full mt-4" 
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
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <div className="text-sm text-muted-foreground mt-2">
                    OTP sent to +91 {phoneNumber}
                  </div>
                  <Button 
                    className="w-full mt-4" 
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
              )}
            </TabsContent>
            <TabsContent value="google">
              <div className="space-y-4">
                <p className="text-sm text-center text-muted-foreground">
                  Login with your Google account for a seamless experience
                </p>
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700" 
                  onClick={handleGoogleLogin}
                >
                  Login with Google
                  <Mail className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button 
            variant="ghost" 
            className="w-full"
            onClick={handleSkipLogin}
          >
            Skip Login for Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
