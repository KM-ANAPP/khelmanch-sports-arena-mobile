
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";

export const GoogleLoginButton = () => {
  const { handleGoogleLogin } = useGoogleLogin();

  return (
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
  );
};
