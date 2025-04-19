
import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Camera, Phone, Mail, Save, Bell, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export default function Profile() {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  
  // Sports preferences
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [skillLevels, setSkillLevels] = useState<Record<string, string>>({});
  
  const availableSports = ["Cricket", "Football", "Basketball", "Tennis", "Badminton", "Table Tennis", "Volleyball"];
  const skillOptions = ["Beginner", "Intermediate", "Advanced", "Professional"];

  // Load user data
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setProfileImage(user.profileImage || null);
      
      // Notification preferences
      if (user.notificationPreferences) {
        setEmailNotifications(user.notificationPreferences.email);
        setPushNotifications(user.notificationPreferences.push);
        setSmsNotifications(user.notificationPreferences.sms);
      }
      
      // Sports preferences
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
    // Validation
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

    // Submit profile data
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
      // Error handling is done in the updateProfile function
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
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-primary">
                  {profileImage ? (
                    <AvatarImage src={profileImage} alt="Profile" />
                  ) : (
                    <AvatarFallback className="bg-secondary text-white">
                      <User className="h-10 w-10" />
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <label htmlFor="profile-image" className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground p-2 rounded-full cursor-pointer">
                  <Camera className="h-4 w-4" />
                  <input 
                    id="profile-image" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Tap the camera icon to update your profile picture</p>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="sports">Sports</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 mt-4">
                {/* Personal Details Form */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="sports" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base mb-2 block">Select Sports You Play</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableSports.map(sport => (
                        <Button
                          key={sport}
                          type="button"
                          variant={selectedSports.includes(sport) ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => toggleSportSelection(sport)}
                        >
                          {sport}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {selectedSports.length > 0 && (
                    <div>
                      <Label className="text-base mb-2 block">Your Skill Levels</Label>
                      <div className="space-y-3">
                        {selectedSports.map(sport => (
                          <div key={sport} className="flex items-center">
                            <div className="w-1/3">{sport}:</div>
                            <div className="w-2/3">
                              <select
                                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1"
                                value={skillLevels[sport] || 'Beginner'}
                                onChange={(e) => setSkillLevel(sport, e.target.value)}
                              >
                                {skillOptions.map(level => (
                                  <option key={level} value={level}>{level}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications on your device
                      </p>
                    </div>
                    <Switch 
                      checked={pushNotifications} 
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via text message
                      </p>
                    </div>
                    <Switch 
                      checked={smsNotifications} 
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <h4 className="font-medium mb-2">Notification Types</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Select which types of notifications you want to receive
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="booking-confirm" checked />
                      <Label htmlFor="booking-confirm">Booking confirmations</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="booking-reminder" checked />
                      <Label htmlFor="booking-reminder">Booking reminders</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="tournament-updates" checked />
                      <Label htmlFor="tournament-updates">Tournament updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="promotions" checked={false} />
                      <Label htmlFor="promotions">Promotional offers</Label>
                    </div>
                  </div>
                </div>
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
        
        {/* Quick links */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 flex flex-col items-center justify-center text-center">
            <Settings className="h-6 w-6 mb-2" />
            <h3 className="font-medium">Account Settings</h3>
            <p className="text-xs text-muted-foreground mt-1">Manage your account</p>
            <Button variant="link" className="mt-2 p-0 h-auto" onClick={() => navigate('/settings')}>
              Go to Settings
            </Button>
          </Card>
          <Card className="p-4 flex flex-col items-center justify-center text-center">
            <Bell className="h-6 w-6 mb-2" />
            <h3 className="font-medium">Notifications</h3>
            <p className="text-xs text-muted-foreground mt-1">Manage preferences</p>
            <Button 
              variant="link" 
              className="mt-2 p-0 h-auto" 
              onClick={() => setActiveTab('notifications')}
            >
              Configure
            </Button>
          </Card>
        </div>
        
        {/* Teams and Bookings links */}
        <div className="grid grid-cols-1 gap-4">
          <Button 
            variant="outline" 
            className="w-full justify-between" 
            onClick={() => navigate('/my-teams')}
          >
            <span>My Teams</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-between" 
            onClick={() => navigate('/my-bookings')}
          >
            <span>My Bookings</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
