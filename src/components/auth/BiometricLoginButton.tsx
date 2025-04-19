
import { Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBiometricAuth } from "@/hooks/useBiometricAuth";

export const BiometricLoginButton = () => {
  const { biometricAvailable, biometricLoading, handleBiometricLogin } = useBiometricAuth();

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
