import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Shimmer } from "@/components/ui/shimmer";

interface ProfileActionsProps {
  name: string;
  email: string;
  phone: string;
  profileImage: string | null;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  selectedSports: string[];
  skillLevels: Record<string, string>;
  notificationSettings: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

export function ProfileActions({
  name,
  email,
  phone,
  profileImage,
  isLoading,
  setIsLoading,
  selectedSports,
  skillLevels,
  notificationSettings
}: ProfileActionsProps) {
  const { updateProfile } = useAuth();

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (phone && phone.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await updateProfile({
        name,
        email,
        phone,
        profileImage,
        sports: selectedSports,
        skillLevels,
        notificationPreferences: notificationSettings
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Shimmer className="w-full h-10 rounded-md" />
  ) : (
    <Button 
      onClick={handleSaveProfile}
      disabled={isLoading}
      className="w-full mt-4"
    >
      {isLoading ? "Saving..." : "Save Profile"}
      <Save className="ml-2 h-4 w-4" />
    </Button>
  );
}
