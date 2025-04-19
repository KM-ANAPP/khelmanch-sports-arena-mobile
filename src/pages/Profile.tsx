
import { useEffect } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileContent } from "@/components/profile/ProfileContent";
import { ProfileActions } from "@/components/profile/ProfileActions";
import { QuickLinks } from "@/components/profile/QuickLinks";
import { useProfileState } from "@/hooks/use-profile-state";

const availableSports = ["Cricket", "Football", "Basketball", "Tennis", "Badminton", "Table Tennis", "Volleyball"];
const skillOptions = ["Beginner", "Intermediate", "Advanced", "Professional"];

export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  const state = useProfileState();
  
  useEffect(() => {
    if (user) {
      state.setName(user.name || "");
      state.setEmail(user.email || "");
      state.setPhone(user.phone || "");
      state.setProfileImage(user.profileImage || null);
      
      if (user.notificationPreferences) {
        state.setEmailNotifications(user.notificationPreferences.email);
        state.setPushNotifications(user.notificationPreferences.push);
        state.setSmsNotifications(user.notificationPreferences.sms);
      }
      
      if (user.sports) {
        state.setSelectedSports(user.sports);
      }
      
      if (user.skillLevels) {
        state.setSkillLevels(user.skillLevels);
      }
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        state.setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const toggleSportSelection = (sport: string) => {
    if (state.selectedSports.includes(sport)) {
      state.setSelectedSports(state.selectedSports.filter(s => s !== sport));
      const newSkillLevels = { ...state.skillLevels };
      delete newSkillLevels[sport];
      state.setSkillLevels(newSkillLevels);
    } else {
      state.setSelectedSports([...state.selectedSports, sport]);
      state.setSkillLevels({ ...state.skillLevels, [sport]: "Beginner" });
    }
  };
  
  const setSkillLevel = (sport: string, level: string) => {
    state.setSkillLevels({ ...state.skillLevels, [sport]: level });
  };

  return (
    <MobileLayout isLoggedIn={isAuthenticated}>
      <div className="p-4 space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">My Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProfileHeader 
              profileImage={state.profileImage}
              handleImageChange={handleImageChange}
            />
            
            <ProfileContent
              activeTab={state.activeTab}
              setActiveTab={state.setActiveTab}
              name={state.name}
              email={state.email}
              phone={state.phone}
              setName={state.setName}
              setEmail={state.setEmail}
              setPhone={state.setPhone}
              availableSports={availableSports}
              selectedSports={state.selectedSports}
              skillLevels={state.skillLevels}
              skillOptions={skillOptions}
              toggleSportSelection={toggleSportSelection}
              setSkillLevel={setSkillLevel}
              emailNotifications={state.emailNotifications}
              pushNotifications={state.pushNotifications}
              smsNotifications={state.smsNotifications}
              setEmailNotifications={state.setEmailNotifications}
              setPushNotifications={state.setPushNotifications}
              setSmsNotifications={state.setSmsNotifications}
            />
            
            <ProfileActions
              name={state.name}
              email={state.email}
              phone={state.phone}
              profileImage={state.profileImage}
              isLoading={state.isLoading}
              setIsLoading={state.setIsLoading}
              selectedSports={state.selectedSports}
              skillLevels={state.skillLevels}
              notificationSettings={{
                email: state.emailNotifications,
                push: state.pushNotifications,
                sms: state.smsNotifications
              }}
            />
          </CardContent>
        </Card>
        
        <QuickLinks setActiveTab={state.setActiveTab} />
      </div>
    </MobileLayout>
  );
}
