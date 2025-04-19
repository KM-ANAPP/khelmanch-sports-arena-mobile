import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { PersonalDetailsForm } from "@/components/profile/PersonalDetailsForm";
import { SportsPreferences } from "@/components/profile/SportsPreferences";
import { NotificationSettings } from "@/components/profile/NotificationSettings";
import { QuickLinks } from "@/components/profile/QuickLinks";

export default function Profile() {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const navigate = useNavigate();
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [skillLevels, setSkillLevels] = useState<Record<string, string>>({});
  
  const availableSports = ["Cricket", "Football", "Basketball", "Tennis", "Badminton", "Table Tennis", "Volleyball"];
  const skillOptions = ["Beginner", "Intermediate", "Advanced", "Professional"];

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setProfileImage(user.profileImage || null);
      
      if (user.notificationPreferences) {
        setEmailNotifications(user.notificationPreferences.email);
        setPushNotifications(user.notificationPreferences.push);
        setSmsNotifications(user.notificationPreferences.sms);
      }
      
      if (user.sports) {
        setSelectedSports(user.sports);
      }
      
      if (user.skillLevels) {
        setSkillLevels(user.skillLevels);
      }
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
        notificationPreferences: {
          email: emailNotifications,
          push: pushNotifications,
          sms: smsNotifications
        }
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleSportSelection = (sport: string) => {
    if (selectedSports.includes(sport)) {
      setSelectedSports(selectedSports.filter(s => s !== sport));
      const newSkillLevels = { ...skillLevels };
      delete newSkillLevels[sport];
      setSkillLevels(newSkillLevels);
    } else {
      setSelectedSports([...selectedSports, sport]);
      setSkillLevels({ ...skillLevels, [sport]: "Beginner" });
    }
  };
  
  const setSkillLevel = (sport: string, level: string) => {
    setSkillLevels({ ...skillLevels, [sport]: level });
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
              profileImage={profileImage}
              handleImageChange={handleImageChange}
            />
            
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
            
            <Button 
              onClick={handleSaveProfile}
              disabled={isLoading}
              className="w-full mt-4"
            >
              {isLoading ? "Saving..." : "Save Profile"}
              <Save className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        <QuickLinks setActiveTab={setActiveTab} />
      </div>
    </MobileLayout>
  );
}
