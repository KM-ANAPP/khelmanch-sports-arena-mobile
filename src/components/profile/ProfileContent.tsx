
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalDetailsForm } from "./PersonalDetailsForm";
import { SportsPreferences } from "./SportsPreferences";
import { NotificationSettings } from "./NotificationSettings";

interface ProfileContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  name: string;
  email: string;
  phone: string;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  availableSports: string[];
  selectedSports: string[];
  skillLevels: Record<string, string>;
  skillOptions: string[];
  toggleSportSelection: (sport: string) => void;
  setSkillLevel: (sport: string, level: string) => void;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  setEmailNotifications: (value: boolean) => void;
  setPushNotifications: (value: boolean) => void;
  setSmsNotifications: (value: boolean) => void;
}

export function ProfileContent({
  activeTab,
  setActiveTab,
  name,
  email,
  phone,
  setName,
  setEmail,
  setPhone,
  availableSports,
  selectedSports,
  skillLevels,
  skillOptions,
  toggleSportSelection,
  setSkillLevel,
  emailNotifications,
  pushNotifications,
  smsNotifications,
  setEmailNotifications,
  setPushNotifications,
  setSmsNotifications,
}: ProfileContentProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="sports">Sports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="space-y-4 mt-4">
        <PersonalDetailsForm
          name={name}
          email={email}
          phone={phone}
          setName={setName}
          setEmail={setEmail}
          setPhone={setPhone}
        />
      </TabsContent>
      
      <TabsContent value="sports" className="space-y-4 mt-4">
        <SportsPreferences
          availableSports={availableSports}
          selectedSports={selectedSports}
          skillLevels={skillLevels}
          skillOptions={skillOptions}
          toggleSportSelection={toggleSportSelection}
          setSkillLevel={setSkillLevel}
        />
      </TabsContent>
      
      <TabsContent value="notifications" className="space-y-4 mt-4">
        <NotificationSettings
          emailNotifications={emailNotifications}
          pushNotifications={pushNotifications}
          smsNotifications={smsNotifications}
          setEmailNotifications={setEmailNotifications}
          setPushNotifications={setPushNotifications}
          setSmsNotifications={setSmsNotifications}
        />
      </TabsContent>
    </Tabs>
  );
}
