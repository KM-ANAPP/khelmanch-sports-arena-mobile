
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const useGoogleLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const { requiresOTP } = await login({ email: "google@example.com" });
      if (!requiresOTP) {
        navigate("/home");
      }
    } catch (error) {
      // Error is already handled in the login function
    }
  };

  return { handleGoogleLogin };
};
