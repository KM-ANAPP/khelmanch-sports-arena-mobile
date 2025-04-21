
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '@/utils/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  login: (userData: UserLoginData) => Promise<void>;
  register: (userData: UserRegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
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
  sports?: string[];
  skillLevels?: Record<string, string>;
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      
      if (user) {
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
        setUserProfile(null);
      }
      
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (userData: UserLoginData): Promise<void> => {
    try {
      // The actual Firebase authentication happens in useFirebaseAuth hook
      // Here we just handle the post-authentication logic
      
      // This would typically fetch user data from a database
      // For now, we'll just show a success message
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
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

  const value = {
    currentUser,
    userProfile,
    isLoading,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
