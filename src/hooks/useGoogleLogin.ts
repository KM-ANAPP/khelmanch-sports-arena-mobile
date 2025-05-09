
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { loginWithGoogle } from "@/utils/wordpress-auth";

export const useGoogleLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);

      // Sign in with Google using Capacitor Firebase Authentication plugin
      const result = await FirebaseAuthentication.signInWithGoogle();
      
      if (!result.credential?.idToken) {
        throw new Error("Failed to get ID token from Google sign in");
      }

      // Create a credential with the token
      const credential = GoogleAuthProvider.credential(result.credential.idToken);
      
      // Sign in to Firebase with the credential
      await signInWithCredential(auth, credential);
      
      // Authenticate with WordPress using the Google email
      if (result.user?.email) {
        try {
          // Call WordPress authentication with Google email and display name
          const wpAuthResult = await loginWithGoogle(
            result.user.email,
            result.user.displayName || undefined
          );
          
          // Handle app-specific login with the WordPress token
          await login({ 
            email: result.user.email,
            username: wpAuthResult.user_nicename || result.user.displayName || '',
            displayName: wpAuthResult.user_display_name || result.user.displayName || '',
            userId: wpAuthResult.user_id?.toString() || ''
          });
          
          toast({
            title: "Login Successful",
            description: "You have been successfully logged in with Google",
          });
          
          navigate("/home");
        } catch (wpError) {
          console.error("WordPress Authentication Error:", wpError);
          throw new Error("Could not authenticate with WordPress");
        }
      } else {
        throw new Error("No email provided from Google sign in");
      }
      
    } catch (error: any) {
      console.error("Google login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Could not sign in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleGoogleLogin, isLoading };
};
