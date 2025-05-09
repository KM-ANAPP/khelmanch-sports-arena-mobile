
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { loginWithCredentials } from "@/utils/wordpress-auth";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const handleLoginWithCredentials = async () => {
    if (!username || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoggingIn(true);
    try {
      console.log("Attempting to log in with:", username);
      const authResult = await loginWithCredentials(username, password);
      
      if (authResult.token) {
        console.log("Login successful");
        // Update the app's auth context
        await login({ 
          // You can pass user details to your auth context
          email: authResult.user_email,
          username: authResult.user_nicename,
          displayName: authResult.user_display_name,
          userId: authResult.user_id.toString()
        });
        
        toast({
          title: "Login Successful",
          description: `Welcome, ${authResult.user_display_name}!`,
        });
        
        navigate("/home");
      } else {
        console.log("Login failed");
        toast({
          title: "Login Failed",
          description: "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in handleLoginWithCredentials:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return {
    phoneNumber,
    setPhoneNumber,
    username,
    setUsername,
    password,
    setPassword,
    isLoggingIn,
    handleLoginWithCredentials
  };
};
