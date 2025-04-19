
import { useState } from "react";

export function useProfileState() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [skillLevels, setSkillLevels] = useState<Record<string, string>>({});

  return {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    profileImage,
    setProfileImage,
    isLoading,
    setIsLoading,
    activeTab,
    setActiveTab,
    emailNotifications,
    setEmailNotifications,
    pushNotifications,
    setPushNotifications,
    smsNotifications,
    setSmsNotifications,
    selectedSports,
    setSelectedSports,
    skillLevels,
    setSkillLevels
  };
}
