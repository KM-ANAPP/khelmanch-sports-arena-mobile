
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PhoneLoginForm } from "@/components/auth/PhoneLoginForm";
import { BiometricLoginButton } from "@/components/auth/BiometricLoginButton";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { useLoginForm } from "@/hooks/useLoginForm";

export default function Login() {
  const navigate = useNavigate();
  const {
    phoneNumber,
    setPhoneNumber,
    loadingState,
    otpSent,
    setOtpSent,
    otp,
    setOtp,
    is2FARequired,
    handleSendOTP,
    handleLoginWithOTP
  } = useLoginForm();

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
            <BiometricLoginButton />
            
            <Tabs defaultValue="phone" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="phone">Phone</TabsTrigger>
                <TabsTrigger value="google">Google</TabsTrigger>
              </TabsList>
              <TabsContent value="phone" className="space-y-4">
                <PhoneLoginForm
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  otpSent={otpSent}
                  setOtpSent={setOtpSent}
                  otp={otp}
                  setOtp={setOtp}
                  isGeneratingOTP={loadingState.isGeneratingOTP}
                  handleSendOTP={handleSendOTP}
                  handleLoginWithOTP={handleLoginWithOTP}
                />
              </TabsContent>
              <TabsContent value="google">
                <GoogleLoginButton />
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
