
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const useGoogleLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const result = await login({ email: "google@example.com" });
      if (result && !result.requiresOTP) {
        navigate("/home");
      }
    } catch (error) {
      // Error is already handled in the login function
    }
  };

  return { handleGoogleLogin };
};
