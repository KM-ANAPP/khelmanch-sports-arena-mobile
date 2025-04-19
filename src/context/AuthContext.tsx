import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { generateOTP, sendOTP, validateOTP, is2FAEnabled, save2FAPreference } from "@/utils/two-factor-auth";

// Define user type
interface UserProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  profileImage?: string;
  sports?: string[];
  skillLevels?: Record<string, string>; // e.g. { "cricket": "intermediate" }
  notificationPreferences?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  teamVisibility?: 'public' | 'friends' | 'private';
  twoFactorEnabled?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { phone?: string; email?: string; otp?: string }) => Promise<{ requiresOTP: boolean, tempOTP?: string }>;
  verifyOTP: (otp: string, tempOTP: string) => Promise<boolean>;
  register: (userData: Partial<UserProfile>) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  toggle2FA: (enabled: boolean) => Promise<boolean>;
  is2FAEnabled: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on load
  useEffect(() => {
    const checkExistingSession = () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Failed to restore user session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  const login = async (credentials: { phone?: string; email?: string; otp?: string }): Promise<{ requiresOTP: boolean, tempOTP?: string }> => {
    setIsLoading(true);
    try {
      // First, validate basic credentials (without 2FA)
      // In a real app, this would make an API request to validate credentials
      const validCredentials = true; // Mock validation
      
      if (!validCredentials) {
        throw new Error('Invalid credentials');
      }
      
      // Check if 2FA is required
      const requires2FA = true; // In real app, check if user has 2FA enabled
      
      if (requires2FA && credentials.phone) {
        // Generate OTP
        const otp = generateOTP();
        // Send OTP (in real app)
        await sendOTP(credentials.phone, otp);
        
        setIsLoading(false);
        // Return the need for 2FA verification
        return { requiresOTP: true, tempOTP: otp };
      }
      
      // If 2FA not required or OTP already provided, proceed with login
      const newUser: UserProfile = {
        id: '1234567890',
        name: 'Demo User',
        phone: credentials.phone,
        email: credentials.email || 'demo@example.com',
        sports: ['Cricket', 'Football'],
        skillLevels: { 'Cricket': 'intermediate', 'Football': 'beginner' },
        notificationPreferences: {
          email: true,
          push: true,
          sms: true
        },
        teamVisibility: 'public',
        twoFactorEnabled: true
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: "Login Successful",
        description: "Welcome back to Khelmanch!",
      });
      
      return { requiresOTP: false };
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const verifyOTP = async (userInputOTP: string, tempOTP: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Validate OTP
      const isValid = validateOTP(userInputOTP, tempOTP);
      
      if (!isValid) {
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is incorrect. Please try again.",
          variant: "destructive",
        });
        return false;
      }
      
      // OTP is valid, complete login
      const newUser: UserProfile = {
        id: '1234567890',
        name: 'Demo User',
        phone: '1234567890', // This would come from the initial login attempt
        email: 'demo@example.com',
        sports: ['Cricket', 'Football'],
        skillLevels: { 'Cricket': 'intermediate', 'Football': 'beginner' },
        notificationPreferences: {
          email: true,
          push: true,
          sms: true
        },
        teamVisibility: 'public',
        twoFactorEnabled: true
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: "Login Successful",
        description: "Welcome back to Khelmanch!",
      });
      
      return true;
    } catch (error) {
      console.error('OTP verification failed:', error);
      toast({
        title: "Verification Failed",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<UserProfile>): Promise<void> => {
    setIsLoading(true);
    try {
      // In a real app, this would make an API request to register a new user
      // For demo, we'll create a mock user
      const newUser: UserProfile = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name || 'New User',
        phone: userData.phone,
        email: userData.email,
        sports: userData.sports || [],
        skillLevels: userData.skillLevels || {},
        notificationPreferences: {
          email: true,
          push: true,
          sms: true
        },
        teamVisibility: 'public'
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: "Registration Successful",
        description: "Welcome to Khelmanch!",
      });
    } catch (error) {
      console.error('Registration failed:', error);
      toast({
        title: "Registration Failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<void> => {
    setIsLoading(true);
    try {
      // In a real app, this would make an API request to update user profile
      if (!user) throw new Error('No user logged in');
      
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Profile update failed:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const toggle2FA = async (enabled: boolean): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to change 2FA settings",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      // In a real app, this would make an API call to update 2FA settings
      await save2FAPreference(user.id, enabled);
      
      // Update local user state
      const updatedUser = { ...user, twoFactorEnabled: enabled };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast({
        title: "2FA Settings Updated",
        description: `Two-factor authentication has been ${enabled ? 'enabled' : 'disabled'}`,
      });
      
      return true;
    } catch (error) {
      console.error('Failed to update 2FA settings:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update 2FA settings. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };
  
  const checkIs2FAEnabled = async (): Promise<boolean> => {
    if (!user) return false;
    
    // In a real app, this would check user preferences in the database
    return user.twoFactorEnabled || false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        verifyOTP,
        register,
        logout,
        updateProfile,
        toggle2FA,
        is2FAEnabled: checkIs2FAEnabled,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
