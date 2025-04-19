
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { isBiometricAvailable, authenticateWithBiometric } from "@/utils/biometric-auth";

export const BiometricLoginButton = () => {
  const navigate = useNavigate();
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricLoading, setBiometricLoading] = useState(false);

  useEffect(() => {
    const checkBiometricAvailability = async () => {
      const available = await isBiometricAvailable();
      setBiometricAvailable(available);
    };
    
    checkBiometricAvailability();
  }, []);

  const handleBiometricLogin = async () => {
    setBiometricLoading(true);
    try {
      const result = await authenticateWithBiometric();
      
      if (result.success) {
        toast({
          title: "Biometric Authentication Successful",
          description: "Logging you in...",
        });
        
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        toast({
          title: "Authentication Failed",
          description: "Biometric authentication was unsuccessful",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Biometric authentication error:", error);
      toast({
        title: "Authentication Error",
        description: "There was a problem with biometric authentication",
        variant: "destructive",
      });
    } finally {
      setBiometricLoading(false);
    }
  };

  if (!biometricAvailable) return null;

  return (
    <div className="text-center">
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center gap-2"
        onClick={handleBiometricLogin}
        disabled={biometricLoading}
      >
        <Fingerprint className="h-4 w-4" />
        <span>{biometricLoading ? "Authenticating..." : "Login with Biometric"}</span>
      </Button>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-muted" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
    </div>
  );
};
