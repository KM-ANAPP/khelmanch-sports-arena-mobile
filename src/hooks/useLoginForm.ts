import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
// WordPress authentication removed

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: 'username' | 'password') => (value: string) => {
    if (field === 'username') {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  const handleLoginWithCredentials = async () => {
    if (!username.trim()) {
      toast({
        title: "Username Required",
        description: "Please enter your username",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log("Mock login with credentials:", username);
      
      // Mock authentication for demo purposes
      await login({ 
        email: `${username}@example.com`,
        username: username,
        displayName: username,
        userId: Date.now().toString()
      });
      
      toast({
        title: "Login Successful",
        description: `Welcome, ${username}!`,
      });
      
      navigate("/home");
    } catch (error) {
      console.error("Error in handleLoginWithCredentials:", error);
      toast({
        title: "Login Error",
        description: "There was a problem processing your login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    password,
    isLoading,
    handleInputChange,
    handleLoginWithCredentials
  };
};