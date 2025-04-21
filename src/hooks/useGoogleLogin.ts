
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// Define proper return type for login function
interface LoginResult {
  requiresOTP?: boolean;
  success: boolean;
}

export const useGoogleLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      // Cast the result to the expected interface
      const result = await login({ email: "google@example.com" }) as LoginResult;
      
      if (result && !result.requiresOTP) {
        navigate("/home");
      }
    } catch (error) {
      // Error is already handled in the login function
      console.error("Google login error:", error);
    }
  };

  return { handleGoogleLogin };
};
