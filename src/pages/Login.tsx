
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, ArrowRight, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Login() {
  const navigate = useNavigate();
  const { login, verifyOTP } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isGeneratingOTP, setIsGeneratingOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [tempOTP, setTempOTP] = useState("");
  const [is2FARequired, setIs2FARequired] = useState(false);

  const handleSendOTP = async () => {
    // Validate phone number
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
      // Attempt login which will return if 2FA is required
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
        // No 2FA required, redirect to home
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
    // Validate OTP
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

  const handleGoogleLogin = async () => {
    try {
      const { requiresOTP } = await login({ email: "google@example.com" });
      if (!requiresOTP) {
        navigate("/home");
      }
    } catch (error) {
      // Error is already handled in the login function
    }
  };

  const handleSkipLogin = () => {
    toast({
      title: "Guest Mode",
      description: "You are browsing as a guest. Some features may be limited.",
    });
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-6">
              <img src="/lovable-uploads/cba4a2dc-5021-4756-98a0-b154222d7523.png" alt="Khelmanch Logo" className="h-8" />
            </div>
            <CardTitle className="text-2xl text-center">Welcome to Khelmanch</CardTitle>
            <CardDescription className="text-center">
              Login to access all features
            </CardDescription>
            
            {is2FARequired && (
              <Alert className="bg-amber-50 border-amber-200">
                <Shield className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-amber-700">
                  Two-factor authentication is enabled for your account
                </AlertDescription>
              </Alert>
            )}
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
            
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account?</span>{" "}
              <Link to="/register" className="text-primary font-medium">Register now</Link>
            </div>
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
      </motion.div>
    </div>
  );
}
