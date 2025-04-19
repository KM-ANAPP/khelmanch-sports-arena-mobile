
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface NotificationSettingsProps {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  setEmailNotifications: (value: boolean) => void;
  setPushNotifications: (value: boolean) => void;
  setSmsNotifications: (value: boolean) => void;
}

export function NotificationSettings({
  emailNotifications,
  pushNotifications,
  smsNotifications,
  setEmailNotifications,
  setPushNotifications,
  setSmsNotifications,
}: NotificationSettingsProps) {
  return (
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

      <div className="pt-4">
        <h4 className="font-medium mb-2">Notification Types</h4>
        <p className="text-sm text-muted-foreground mb-2">
          Select which types of notifications you want to receive
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch id="booking-confirm" defaultChecked />
            <Label htmlFor="booking-confirm">Booking confirmations</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="booking-reminder" defaultChecked />
            <Label htmlFor="booking-reminder">Booking reminders</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="tournament-updates" defaultChecked />
            <Label htmlFor="tournament-updates">Tournament updates</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="promotions" defaultChecked={false} />
            <Label htmlFor="promotions">Promotional offers</Label>
          </div>
        </div>
      </div>
    </div>
  );
}
