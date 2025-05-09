
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

      // Determine if we're in development preview environment from the URL
      const isDevPreview = window.location.hostname.includes('id-preview--');
      
      if (isDevPreview) {
        console.log("Development preview detected, using mock Google auth flow");
        
        // In development preview, we'll use mock data for testing
        const mockUserData = {
          email: "test.user@example.com",
          displayName: "Test User"
        };
        
        try {
          // Call WordPress authentication with mock Google data
          const wpAuthResult = await loginWithGoogle(
            mockUserData.email,
            mockUserData.displayName
          );
          
          // Handle app-specific login with the WordPress token
          await login({ 
            email: mockUserData.email,
            username: wpAuthResult.user_nicename || mockUserData.displayName,
            displayName: wpAuthResult.user_display_name || mockUserData.displayName,
            userId: wpAuthResult.user_id?.toString() || ''
          });
          
          toast({
            title: "Development Login",
            description: "You have been logged in with test credentials",
          });
          
          navigate("/home");
        } catch (wpError) {
          console.error("WordPress Authentication Error:", wpError);
          throw new Error("Could not authenticate with WordPress");
        }
        
        return;
      }
      
      // For production environments, use regular Google sign-in flow
      
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
      
      // Provide more user-friendly error messages
      let errorMessage = "Could not sign in with Google";
      
      if (error.code === 'auth/unauthorized-domain') {
        errorMessage = "This domain is not authorized for Google sign-in. Please use the app on a production domain.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleGoogleLogin, isLoading };
};
