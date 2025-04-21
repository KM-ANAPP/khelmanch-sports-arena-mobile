import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '@/utils/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  currentUser: User | null;
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
  phone?: string;
  email?: string;
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      
      if (user) {
        setIsAuthenticated(true);
        // In a real app, fetch user profile from a database
        // For demo, we'll use localStorage to mock this
        const savedProfile = localStorage.getItem(`user_profile_${user.uid}`);
        if (savedProfile) {
          setUserProfile(JSON.parse(savedProfile));
        } else {
          // Create a basic profile if none exists
          const newProfile: UserProfile = {
            id: user.uid,
            name: user.displayName || 'User',
            phone: user.phoneNumber || undefined,
            email: user.email || undefined,
            photoURL: user.photoURL || undefined,
            createdAt: Date.now()
          };
          
          localStorage.setItem(`user_profile_${user.uid}`, JSON.stringify(newProfile));
          setUserProfile(newProfile);
        }
      } else {
        setIsAuthenticated(false);
        setUserProfile(null);
      }
      
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (userData: UserLoginData): Promise<{ requiresOTP?: boolean }> => {
    try {
      // The actual Firebase authentication happens in useFirebaseAuth hook
      // Here we just handle the post-authentication logic
      
      // This would typically fetch user data from a database
      // For now, we'll just show a success message
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });

      // Return an object that might include requiresOTP flag
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
      // Normally we'd create a user in Firebase Auth here
      // But for this demo, we assume the user is already authenticated via OTP
      if (!currentUser) {
        throw new Error("Authentication required before registration");
      }
      
      // Create or update user profile
      const profile: UserProfile = {
        id: currentUser.uid,
        name: userData.name,
        phone: userData.phone || currentUser.phoneNumber || undefined,
        email: userData.email || currentUser.email || undefined,
        photoURL: currentUser.photoURL || undefined,
        sports: userData.sports || [],
        skillLevels: userData.skillLevels || {},
        createdAt: Date.now()
      };
      
      // Save to localStorage (in a real app, this would be a database operation)
      localStorage.setItem(`user_profile_${currentUser.uid}`, JSON.stringify(profile));
      setUserProfile(profile);
      
      toast({
        title: "Registration Complete",
        description: "Your account has been created successfully!",
      });
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
      await signOut(auth);
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
      
      const updatedProfile = {
        ...userProfile,
        ...data,
      };
      
      // Save to localStorage (in a real app, this would be a database operation)
      localStorage.setItem(`user_profile_${currentUser.uid}`, JSON.stringify(updatedProfile));
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

  // Add missing functions for 2FA
  const toggle2FA = async (enabled: boolean): Promise<boolean> => {
    try {
      // In a real app, this would update the user's 2FA settings in the database
      // For demo, we'll just use localStorage
      if (currentUser) {
        localStorage.setItem(`2fa_enabled_${currentUser.uid}`, JSON.stringify(enabled));
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
        const enabled = localStorage.getItem(`2fa_enabled_${currentUser.uid}`);
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
