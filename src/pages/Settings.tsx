
import React, { useState, useEffect } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { AlertCircle, Lock, Bell, Eye, LogOut } from "lucide-react";

export default function Settings() {
  const { user, isAuthenticated, logout, toggle2FA, is2FAEnabled } = useAuth();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkTwoFactorStatus = async () => {
      if (isAuthenticated) {
        const enabled = await is2FAEnabled();
        setTwoFactorEnabled(enabled);
      }
    };
    
    checkTwoFactorStatus();
  }, [isAuthenticated, is2FAEnabled]);

  const handleToggle2FA = async (checked: boolean) => {
    setIsLoading(true);
    try {
      const success = await toggle2FA(checked);
      if (success) {
        setTwoFactorEnabled(checked);
      }
    } catch (error) {
      console.error("Failed to toggle 2FA:", error);
      toast({
        title: "Error",
        description: "Failed to update two-factor authentication settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <MobileLayout isLoggedIn={isAuthenticated}>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        <div className="space-y-6">
          {/* Security Settings */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Lock className="mr-2 h-5 w-5" />
              Security
            </h2>
            <Separator className="my-2" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label htmlFor="two-factor" className="font-medium">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch 
                  id="two-factor" 
                  checked={twoFactorEnabled}
                  onCheckedChange={handleToggle2FA}
                  disabled={isLoading || !isAuthenticated}
                />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label htmlFor="biometric" className="font-medium">Biometric Login</Label>
                  <p className="text-sm text-muted-foreground">
                    Use fingerprint or face recognition to log in
                  </p>
                </div>
                <Switch id="biometric" />
              </div>
            </div>
          </Card>
          
          {/* Notifications Settings */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notifications
            </h2>
            <Separator className="my-2" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label htmlFor="push-notifications" className="font-medium">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts about bookings and updates
                  </p>
                </div>
                <Switch id="push-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates about your account
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
            </div>
          </Card>
          
          {/* Privacy Settings */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Eye className="mr-2 h-5 w-5" />
              Privacy
            </h2>
            <Separator className="my-2" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label htmlFor="profile-visibility" className="font-medium">Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">
                    Control who can see your profile
                  </p>
                </div>
                <Switch id="profile-visibility" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label htmlFor="location-tracking" className="font-medium">Location Services</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow app to access your location
                  </p>
                </div>
                <Switch id="location-tracking" defaultChecked />
              </div>
            </div>
          </Card>
          
          {/* Account Actions */}
          <div className="space-y-3">
            {isAuthenticated && (
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            )}
            
            <Button variant="outline" className="w-full">
              <AlertCircle className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
