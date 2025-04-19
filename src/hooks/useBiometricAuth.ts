
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { isBiometricAvailable, authenticateWithBiometric } from "@/utils/biometric-auth";

export const useBiometricAuth = () => {
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

  return {
    biometricAvailable,
    biometricLoading,
    handleBiometricLogin
  };
};
