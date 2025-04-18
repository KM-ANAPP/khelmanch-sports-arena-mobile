
import { useState } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Camera, Phone, Mail, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSaveProfile = () => {
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

    if (!phone || phone.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }

    // Submit profile data
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated",
      });
    }, 1500);
  };

  return (
    <MobileLayout isLoggedIn={true}>
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
              
              <Button 
                onClick={handleSaveProfile}
                disabled={isLoading}
                className="w-full mt-4"
              >
                {isLoading ? "Saving..." : "Save Profile"}
                <Save className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Placeholder for Bookings and Tickets */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">My Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground py-8">
              You don't have any bookings yet
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">My Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground py-8">
              You don't have any tickets yet
            </p>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
}
