
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export function WordPressRegistrationForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  
  const handleRegister = async () => {
    // Simple validation
    if (!username || !email || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (!acceptedTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions",
        variant: "destructive",
      });
      return;
    }
    
    setIsRegistering(true);
    
    try {
      // This would normally call your registration API
      // For WordPress, this might require a custom endpoint
      toast({
        title: "Registration Information",
        description: "WordPress typically requires registration through the website or a custom API endpoint. This is a placeholder for a real implementation.",
      });
      
      // Navigate to login after a delay (simulating successful registration)
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="terms" 
          checked={acceptedTerms}
          onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I accept the terms and conditions
        </label>
      </div>
      
      <Button 
        className="w-full"
        onClick={handleRegister}
        disabled={isRegistering}
      >
        {isRegistering ? "Registering..." : "Create Account"}
      </Button>
    </div>
  );
}
