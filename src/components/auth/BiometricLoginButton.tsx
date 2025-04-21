
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Fingerprint } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Device } from '@capacitor/device';

interface DeviceInfo {
  name?: string;
  model?: string;
  platform?: string;
  operatingSystem?: string;
  osVersion?: string;
  manufacturer?: string;
  isVirtual?: boolean;
  webViewVersion?: string;
  biometrics?: {
    isAvailable: boolean;
  };
}

export function BiometricLoginButton() {
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    try {
      const info: DeviceInfo = await Device.getInfo();
      const biometricEnabled = info.biometrics?.isAvailable || false;
      setIsAvailable(biometricEnabled);
    } catch (error) {
      console.error('Error checking biometric availability:', error);
      setIsAvailable(false);
    }
  };

  const handleBiometricLogin = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, you would use a native plugin to perform biometric authentication
      // Since this is just a demo, we'll simulate the authentication
      
      // Simulate delay for authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const hasRegisteredBiometrics = localStorage.getItem("userHasBiometrics");
      
      if (hasRegisteredBiometrics) {
        toast({
          title: "Biometric Authentication Successful",
          description: "Welcome back!",
        });
        navigate("/home");
      } else {
        toast({
          title: "Biometric Setup Required",
          description: "Please set up biometric authentication first",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Authentication Failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAvailable) {
    return null;
  }

  return (
    <Button
      variant="secondary"
      className="w-full h-11 flex items-center justify-center gap-2"
      onClick={handleBiometricLogin}
      disabled={isLoading}
    >
      <Fingerprint className="h-5 w-5" />
      <span>{isLoading ? "Authenticating..." : "Login with Biometric"}</span>
    </Button>
  );
}
