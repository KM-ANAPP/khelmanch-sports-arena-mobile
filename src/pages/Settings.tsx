
import React, { useState, useEffect } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import notificationService from "@/utils/notifications";
import { Bell, MapPin, Moon, Sun } from "lucide-react";

interface NotificationPreferences {
  transactions: boolean;
  bookings: boolean;
  tournaments: boolean;
  promotions: boolean;
}

export default function Settings() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>({
    transactions: true,
    bookings: true,
    tournaments: true,
    promotions: true,
  });

  useEffect(() => {
    // Load notification preferences
    const savedPreferences = notificationService.getPreferences();
    setNotificationPreferences(savedPreferences as NotificationPreferences);
  }, []);

  const handleNotificationChange = (channel: keyof NotificationPreferences) => {
    const updatedPreferences = {
      ...notificationPreferences,
      [channel]: !notificationPreferences[channel],
    };
    setNotificationPreferences(updatedPreferences);
    
    // Save to notification service
    notificationService.savePreferences(updatedPreferences);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    
    toast({
      description: `Theme changed to ${newTheme} mode`,
    });
  };

  const requestLocationPermission = async () => {
    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
      
      if (permission.state === 'granted') {
        toast({
          description: "Location permission already granted",
        });
      } else if (permission.state === 'prompt') {
        navigator.geolocation.getCurrentPosition(
          () => {
            toast({
              description: "Location permission granted",
            });
          },
          () => {
            toast({
              description: "Location permission denied",
            });
          }
        );
      } else {
        toast({
          description: "Location permission blocked. Please update your browser settings",
        });
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
      toast({
        description: "Error requesting location permission",
      });
    }
  };

  return (
    <MobileLayout isLoggedIn={true}>
      <div className="container p-4">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Bell className="mr-2 h-5 w-5" /> Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="transactions" className="flex-1">
                Transaction Updates
              </Label>
              <Switch
                id="transactions"
                checked={notificationPreferences.transactions}
                onCheckedChange={() => handleNotificationChange("transactions")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="bookings" className="flex-1">
                Booking Reminders
              </Label>
              <Switch
                id="bookings"
                checked={notificationPreferences.bookings}
                onCheckedChange={() => handleNotificationChange("bookings")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="tournaments" className="flex-1">
                Tournament Announcements
              </Label>
              <Switch
                id="tournaments"
                checked={notificationPreferences.tournaments}
                onCheckedChange={() => handleNotificationChange("tournaments")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="promotions" className="flex-1">
                Promotional Messages
              </Label>
              <Switch
                id="promotions"
                checked={notificationPreferences.promotions}
                onCheckedChange={() => handleNotificationChange("promotions")}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <MapPin className="mr-2 h-5 w-5" /> Location Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={requestLocationPermission} className="w-full">
              Update Location Permissions
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Enable location services for venue recommendations and nearby events
            </p>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              {theme === "light" ? (
                <Sun className="mr-2 h-5 w-5" />
              ) : (
                <Moon className="mr-2 h-5 w-5" />
              )}{" "}
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-toggle" className="flex-1">
                Dark Mode
              </Label>
              <Switch
                id="theme-toggle"
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              <strong>Version:</strong> 1.0.0
            </p>
            <Separator />
            <div className="flex justify-between">
              <Button variant="link" className="p-0 h-auto">
                Privacy Policy
              </Button>
              <Button variant="link" className="p-0 h-auto">
                Terms of Service
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
}
