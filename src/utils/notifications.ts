
import { toast } from "@/components/ui/sonner";
import { playNotificationSound } from "./notification-sounds";

// Mock implementation for FCM since we can't use actual Firebase in this environment
// In a real implementation, this would integrate with Firebase Cloud Messaging
export class NotificationService {
  private static instance: NotificationService;
  private isPermissionGranted = false;
  private notificationChannels = {
    transactions: true,
    bookings: true,
    tournaments: true,
    promotions: true
  };
  
  private notificationSoundEnabled = true;

  private constructor() {
    // Private constructor to enforce singleton
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public async requestPermission(): Promise<boolean> {
    try {
      if (!("Notification" in window)) {
        console.log("This browser does not support notifications");
        return false;
      }

      if (Notification.permission === "granted") {
        this.isPermissionGranted = true;
        return true;
      }

      if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        this.isPermissionGranted = permission === "granted";
        return this.isPermissionGranted;
      }

      return false;
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return false;
    }
  }

  public async initialize(): Promise<void> {
    await this.requestPermission();
    this.loadPreferences();
    console.log("Notification service initialized");
  }

  private loadPreferences(): void {
    const savedPreferences = localStorage.getItem('notificationPreferences');
    if (savedPreferences) {
      this.notificationChannels = JSON.parse(savedPreferences);
    }
    
    const soundEnabled = localStorage.getItem('notificationSoundEnabled');
    this.notificationSoundEnabled = soundEnabled === null ? true : soundEnabled === 'true';
  }

  public savePreferences(preferences: Record<string, boolean>): void {
    this.notificationChannels = {
      ...this.notificationChannels,
      ...preferences
    };
    localStorage.setItem('notificationPreferences', JSON.stringify(this.notificationChannels));
  }

  public setSoundEnabled(enabled: boolean): void {
    this.notificationSoundEnabled = enabled;
    localStorage.setItem('notificationSoundEnabled', String(enabled));
  }

  public isSoundEnabled(): boolean {
    return this.notificationSoundEnabled;
  }

  public getPreferences(): Record<string, boolean> {
    return { ...this.notificationChannels };
  }

  public async sendNotification(
    title: string, 
    body: string, 
    channel: 'transactions' | 'bookings' | 'tournaments' | 'promotions',
    soundType?: 'booking' | 'message' | 'tournament' | 'payment' | 'general',
    imageUrl?: string,
    deepLink?: string
  ): Promise<boolean> {
    if (!this.isPermissionGranted || !this.notificationChannels[channel]) {
      return false;
    }

    // In a real app, this would send to FCM
    // For now, we'll use the browser's Notification API as a fallback
    try {
      // Play notification sound if enabled
      if (this.notificationSoundEnabled && soundType) {
        playNotificationSound(soundType);
      }
      
      if ("Notification" in window && Notification.permission === "granted") {
        const notification = new Notification(title, {
          body,
          icon: imageUrl || 'https://lovableproject.com/assets/logos/khelmanch-logo.png'
        });

        notification.onclick = () => {
          if (deepLink) {
            window.location.href = deepLink;
          }
          notification.close();
        };

        // Also show in-app toast
        toast(title, {
          description: body,
        });

        return true;
      }
      
      // Fallback to just toast if notifications aren't supported
      toast(body);
      
      return true;
    } catch (error) {
      console.error("Error sending notification:", error);
      return false;
    }
  }
}

export default NotificationService.getInstance();
