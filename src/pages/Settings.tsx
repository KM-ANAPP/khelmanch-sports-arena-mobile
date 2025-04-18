
import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Bell, MapPin, Lock, User, Info, LogOut } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import notificationService from "@/utils/notifications";
import locationService from "@/utils/location";

// Define a type for notification preferences
interface NotificationPreferences {
  transactions: boolean;
  bookings: boolean;
  tournaments: boolean;
  promotions: boolean;
}

export default function Settings() {
  const [isLoggedIn] = useState(true);
  
  // Notification settings with proper typing
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreferences>({
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
    // Ensure we're setting the state with a properly typed object
    setNotificationPrefs({
      transactions: prefs.transactions ?? true,
      bookings: prefs.bookings ?? true,
      tournaments: prefs.tournaments ?? true,
      promotions: prefs.promotions ?? true
    });
    
    // Check location status
    const currentLocation = locationService.getCurrentLocation();
    setLocationEnabled(!!currentLocation);
  }, []);
  
  const handleNotificationChange = (channel: keyof NotificationPreferences) => {
    const newPrefs = {
      ...notificationPrefs,
      [channel]: !notificationPrefs[channel]
    };
    
    setNotificationPrefs(newPrefs);
    notificationService.savePreferences(newPrefs);
    
    toast(`${channel.charAt(0).toUpperCase() + channel.slice(1)} notifications ${newPrefs[channel] ? 'enabled' : 'disabled'}.`);
  };
  
  const requestLocationPermission = async () => {
    const granted = await locationService.requestPermission();
    setLocationEnabled(granted);
    
    if (granted) {
      toast("Location Access Granted", {
        description: "You'll now receive location-based recommendations."
      });
      locationService.initialize();
    } else {
      toast("Location Access Denied", {
        description: "Enable location in your device settings to use this feature."
      });
    }
  };
  
  const toggleBackgroundLocation = () => {
    // In a real app, this would request additional permissions
    setBackgroundLocationEnabled(!backgroundLocationEnabled);
    
    toast("Background Location", {
      description: `Background location ${!backgroundLocationEnabled ? 'enabled' : 'disabled'}.`
    });
  };
  
  return (
    <MobileLayout isLoggedIn={isLoggedIn}>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        
        {/* Notification Settings */}
        <Card className="p-4">
          <div className="flex items-center mb-4">
            <Bell className="w-5 h-5 mr-2 text-primary" />
            <h2 className="text-lg font-semibold">Notification Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="transaction-notifications" className="flex-1">
                Transaction updates
              </Label>
              <Switch 
                id="transaction-notifications" 
                checked={notificationPrefs.transactions}
                onCheckedChange={() => handleNotificationChange('transactions')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="booking-notifications" className="flex-1">
                Booking reminders
              </Label>
              <Switch 
                id="booking-notifications" 
                checked={notificationPrefs.bookings}
                onCheckedChange={() => handleNotificationChange('bookings')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="tournament-notifications" className="flex-1">
                Tournament updates
              </Label>
              <Switch 
                id="tournament-notifications" 
                checked={notificationPrefs.tournaments}
                onCheckedChange={() => handleNotificationChange('tournaments')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="promo-notifications" className="flex-1">
                Promotions and offers
              </Label>
              <Switch 
                id="promo-notifications" 
                checked={notificationPrefs.promotions}
                onCheckedChange={() => handleNotificationChange('promotions')}
              />
            </div>
          </div>
        </Card>
        
        {/* Location Settings */}
        <Card className="p-4">
          <div className="flex items-center mb-4">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            <h2 className="text-lg font-semibold">Location Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="location-access" className="flex-1">
                Location access
              </Label>
              <Switch 
                id="location-access" 
                checked={locationEnabled}
                onCheckedChange={requestLocationPermission}
              />
            </div>
            
            {locationEnabled && (
              <div className="flex items-center justify-between">
                <Label htmlFor="background-location" className="flex-1">
                  Background location
                </Label>
                <Switch 
                  id="background-location" 
                  checked={backgroundLocationEnabled}
                  onCheckedChange={toggleBackgroundLocation}
                />
              </div>
            )}
          </div>
        </Card>
        
        {/* Privacy Settings */}
        <Card className="p-4">
          <div className="flex items-center mb-4">
            <Lock className="w-5 h-5 mr-2 text-primary" />
            <h2 className="text-lg font-semibold">Privacy Settings</h2>
          </div>
          
          <div className="space-y-2">
            <div className="p-2 rounded-md hover:bg-muted">
              Change password
            </div>
            <div className="p-2 rounded-md hover:bg-muted">
              Privacy policy
            </div>
            <div className="p-2 rounded-md hover:bg-muted">
              Terms of service
            </div>
          </div>
        </Card>
        
        {/* Account Settings */}
        <Card className="p-4">
          <div className="flex items-center mb-4">
            <User className="w-5 h-5 mr-2 text-primary" />
            <h2 className="text-lg font-semibold">Account Settings</h2>
          </div>
          
          <div className="space-y-2">
            <div className="p-2 rounded-md hover:bg-muted">
              Edit profile
            </div>
            <div className="p-2 rounded-md hover:bg-muted">
              Linked accounts
            </div>
            <Separator className="my-2" />
            <div className="p-2 rounded-md text-destructive hover:bg-destructive/10">
              <div className="flex items-center">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </div>
            </div>
          </div>
        </Card>
        
        {/* About */}
        <Card className="p-4">
          <div className="flex items-center mb-4">
            <Info className="w-5 h-5 mr-2 text-primary" />
            <h2 className="text-lg font-semibold">About</h2>
          </div>
          
          <div className="space-y-2">
            <div className="p-2 rounded-md hover:bg-muted">
              App version: 1.0.0
            </div>
            <div className="p-2 rounded-md hover:bg-muted">
              Contact support
            </div>
            <div className="p-2 rounded-md hover:bg-muted">
              Rate the app
            </div>
          </div>
        </Card>
      </div>
    </MobileLayout>
  );
}
