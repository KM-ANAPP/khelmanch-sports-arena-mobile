
import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Bell, MapPin, Lock, User, Info, LogOut } from "lucide-react";
import notificationService from "@/utils/notifications";
import locationService from "@/utils/location";

export default function Settings() {
  const { toast } = useToast();
  const [isLoggedIn] = useState(true);
  
  // Notification settings
  const [notificationPrefs, setNotificationPrefs] = useState({
    transactions: true,
    bookings: true,
    tournaments: true,
    promotions: true
  });
  
  // Location settings
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [backgroundLocationEnabled, setBackgroundLocationEnabled] = useState(false);
  
  useEffect(() => {
    // Load notification preferences
    const prefs = notificationService.getPreferences();
    setNotificationPrefs(prefs);
    
    // Check location status
    const currentLocation = locationService.getCurrentLocation();
    setLocationEnabled(!!currentLocation);
  }, []);
  
  const handleNotificationChange = (channel: keyof typeof notificationPrefs) => {
    const newPrefs = {
      ...notificationPrefs,
      [channel]: !notificationPrefs[channel]
    };
    
    setNotificationPrefs(newPrefs);
    notificationService.savePreferences(newPrefs);
    
    toast({
      title: "Preferences Updated",
      description: `${channel.charAt(0).toUpperCase() + channel.slice(1)} notifications ${newPrefs[channel] ? 'enabled' : 'disabled'}.`
    });
  };
  
  const requestLocationPermission = async () => {
    const granted = await locationService.requestPermission();
    setLocationEnabled(granted);
    
    if (granted) {
      toast({
        title: "Location Access Granted",
        description: "You'll now receive location-based recommendations."
      });
      locationService.initialize();
    } else {
      toast({
        title: "Location Access Denied",
        description: "Enable location in your device settings to use this feature.",
        variant: "destructive"
      });
    }
  };
  
  const toggleBackgroundLocation = () => {
    // In a real app, this would request additional permissions
    setBackgroundLocationEnabled(!backgroundLocationEnabled);
    
    toast({
      title: "Background Location",
      description: `Background location ${!backgroundLocationEnabled ? 'enabled' : 'disabled'}.`
    });
  };
  
  const handleTestNotification = () => {
    notificationService.sendNotification(
      "Test Notification",
      "This is a test notification from Khelmanch Sports",
      "promotions",
      "https://lovableproject.com/assets/logos/khelmanch-logo.png",
      "/home"
    );
  };

  return (
    <MobileLayout isLoggedIn={isLoggedIn}>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        
        <Card className="p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </h2>
          <Separator className="my-4" />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Transaction Updates</h3>
                <p className="text-sm text-muted-foreground">Payment confirmations and receipts</p>
              </div>
              <Switch 
                checked={notificationPrefs.transactions} 
                onCheckedChange={() => handleNotificationChange('transactions')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Booking Reminders</h3>
                <p className="text-sm text-muted-foreground">Upcoming ground bookings and check-ins</p>
              </div>
              <Switch 
                checked={notificationPrefs.bookings} 
                onCheckedChange={() => handleNotificationChange('bookings')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Tournament Announcements</h3>
                <p className="text-sm text-muted-foreground">New tournaments and updates</p>
              </div>
              <Switch 
                checked={notificationPrefs.tournaments} 
                onCheckedChange={() => handleNotificationChange('tournaments')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Promotional Messages</h3>
                <p className="text-sm text-muted-foreground">Offers and special events</p>
              </div>
              <Switch 
                checked={notificationPrefs.promotions} 
                onCheckedChange={() => handleNotificationChange('promotions')}
              />
            </div>
            
            <Button 
              variant="outline" 
              className="mt-2 w-full"
              onClick={handleTestNotification}
            >
              Send Test Notification
            </Button>
          </div>
        </Card>
        
        <Card className="p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location Services
          </h2>
          <Separator className="my-4" />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Enable Location Access</h3>
                <p className="text-sm text-muted-foreground">For venue recommendations and directions</p>
              </div>
              <Switch 
                checked={locationEnabled} 
                onCheckedChange={requestLocationPermission}
              />
            </div>
            
            {locationEnabled && (
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Background Location</h3>
                  <p className="text-sm text-muted-foreground">For venue check-ins when app is closed</p>
                </div>
                <Switch 
                  checked={backgroundLocationEnabled} 
                  onCheckedChange={toggleBackgroundLocation}
                />
              </div>
            )}
            
            <div className="bg-muted/50 p-3 rounded-md text-sm">
              <p>Current location data is only used to enhance your experience with venue recommendations and check-ins. We do not share your location with third parties.</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <User className="h-5 w-5" />
            Account Settings
          </h2>
          <Separator className="my-4" />
          
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Info className="mr-2 h-4 w-4" />
              Privacy Policy
            </Button>
            <Button variant="destructive" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        </Card>
      </div>
    </MobileLayout>
  );
}
