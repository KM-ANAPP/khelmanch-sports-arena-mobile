
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

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
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { phone?: string; email?: string; otp?: string }) => Promise<void>;
  register: (userData: Partial<UserProfile>) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
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

  const login = async (credentials: { phone?: string; email?: string; otp?: string }): Promise<void> => {
    setIsLoading(true);
    try {
      // In a real app, this would make an API request to validate credentials
      // For demo, we'll create a mock user
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
        teamVisibility: 'public'
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: "Login Successful",
        description: "Welcome back to Khelmanch!",
      });
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
