import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
// Authentication utilities removed - using Firebase only

interface AuthContextType {
  currentUser: UserProfile | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (userData: UserLoginData) => Promise<{ requiresOTP?: boolean }>;
  register: (userData: UserRegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  toggle2FA: (enabled: boolean) => Promise<boolean>;
  is2FAEnabled: () => Promise<boolean>;
}

interface UserLoginData {
  username?: string;
  phone?: string;
  email?: string;
  displayName?: string;
  userId?: string;
}

interface UserRegisterData {
  name: string;
  phone?: string;
  email?: string;
  sports?: string[];
  skillLevels?: Record<string, string>;
}

interface UserProfile {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  photoURL?: string;
  profileImage?: string;
  sports?: string[];
  skillLevels?: Record<string, string>;
  notificationPreferences?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  createdAt: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check local storage for existing user session
        const savedUser = localStorage.getItem('current_user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setCurrentUser(userData);
          setUserProfile(userData);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setCurrentUser(null);
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  const login = async (userData: UserLoginData): Promise<{ requiresOTP?: boolean }> => {
    try {
      // This function is mainly for post-authentication with WordPress JWT
      // The actual authentication happens in wordpress-auth.ts
      
      if (userData.userId) {
        const profile: UserProfile = {
          id: userData.userId,
          name: userData.displayName || 'User',
          email: userData.email,
          phone: userData.phone,
          createdAt: Date.now()
        };
        
        setCurrentUser(profile);
        setUserProfile(profile);
        setIsAuthenticated(true);
        
        // Save to local storage for persistence
        localStorage.setItem(`user_profile_${userData.userId}`, JSON.stringify(profile));
      }
      
      return { requiresOTP: false };
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (userData: UserRegisterData): Promise<void> => {
    try {
      // Registration would need to be implemented with a WordPress API
      // This is a placeholder for future implementation
      toast({
        title: "Registration Not Available",
        description: "Please register on the website directly.",
        variant: "destructive",
      });
      throw new Error("Registration via the app is not implemented yet");
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Clear local storage
      localStorage.removeItem('current_user');
      
      // Clear user state
      setCurrentUser(null);
      setUserProfile(null);
      setIsAuthenticated(false);
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
    } catch (error: any) {
      toast({
        title: "Logout Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<void> => {
    try {
      if (!currentUser || !userProfile) {
        throw new Error("You must be logged in to update your profile");
      }
      
      // In a real implementation, this would update the WordPress user profile
      const updatedProfile = {
        ...userProfile,
        ...data,
      };
      
      // Save locally for the demo
      localStorage.setItem(`user_profile_${currentUser.id}`, JSON.stringify(updatedProfile));
      setUserProfile(updatedProfile);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const toggle2FA = async (enabled: boolean): Promise<boolean> => {
    try {
      // In a real app, this would update the user's 2FA settings in the database
      // For demo, we'll just use localStorage
      if (currentUser) {
        localStorage.setItem(`2fa_enabled_${currentUser.id}`, JSON.stringify(enabled));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to toggle 2FA:", error);
      return false;
    }
  };

  const is2FAEnabled = async (): Promise<boolean> => {
    try {
      // In a real app, this would check the user's 2FA settings in the database
      // For demo, we'll just use localStorage
      if (currentUser) {
        const enabled = localStorage.getItem(`2fa_enabled_${currentUser.id}`);
        return enabled ? JSON.parse(enabled) : false;
      }
      return false;
    } catch (error) {
      console.error("Failed to check 2FA status:", error);
      return false;
    }
  };

  const value = {
    currentUser,
    userProfile,
    isLoading,
    isAuthenticated,
    user: userProfile, // Add user as alias of userProfile for consistency
    login,
    register,
    logout,
    updateProfile,
    toggle2FA,
    is2FAEnabled
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
