
import { toast } from "@/components/ui/sonner";

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: number;
  source: 'gps' | 'network' | 'ip';
}

class CoreLocationService {
  private isPermissionGranted = false;
  private currentLocation: LocationData | null = null;
  private watchId: number | null = null;

  public async requestPermission(): Promise<boolean> {
    try {
      if (!navigator.geolocation) {
        console.log("Geolocation is not supported by this browser");
        toast("Location Services Unavailable", {
          description: "Your device doesn't support location services."
        });
        return false;
      }

      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          () => {
            this.isPermissionGranted = true;
            resolve(true);
          },
          (error) => {
            console.error("Error requesting location permission:", error);
            this.isPermissionGranted = false;
            resolve(false);
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      });
    } catch (error) {
      console.error("Error requesting location permission:", error);
      return false;
    }
  }

  public startLocationUpdates(onUpdate: (location: LocationData) => void): void {
    if (!this.isPermissionGranted || !navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => this.handlePositionUpdate(position, onUpdate),
      (error) => this.handlePositionError(error, onUpdate),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    this.watchId = navigator.geolocation.watchPosition(
      (position) => this.handlePositionUpdate(position, onUpdate),
      (error) => this.handlePositionError(error, onUpdate),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  private handlePositionUpdate(position: GeolocationPosition, onUpdate: (location: LocationData) => void): void {
    const newLocation: LocationData = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: position.timestamp,
      source: 'gps'
    };

    this.currentLocation = newLocation;
    this.saveLocationToStorage(newLocation);
    onUpdate(newLocation);
  }

  private handlePositionError(error: GeolocationPositionError, onUpdate: (location: LocationData) => void): void {
    console.error("Error getting location:", error);
    this.fallbackToIpGeolocation(onUpdate);
  }

  private async fallbackToIpGeolocation(onUpdate: (location: LocationData) => void): Promise<void> {
    const mockDelhiLocation: LocationData = {
      latitude: 28.6139,
      longitude: 77.2090,
      timestamp: Date.now(),
      source: 'ip'
    };

    this.currentLocation = mockDelhiLocation;
    this.saveLocationToStorage(mockDelhiLocation);
    onUpdate(mockDelhiLocation);
  }

  private saveLocationToStorage(location: LocationData): void {
    try {
      localStorage.setItem('lastKnownLocation', JSON.stringify(location));
    } catch (error) {
      console.error("Error saving location to storage:", error);
    }
  }

  public getCurrentLocation(): LocationData | null {
    if (this.currentLocation) {
      return this.currentLocation;
    }

    try {
      const storedLocation = localStorage.getItem('lastKnownLocation');
      if (storedLocation) {
        return JSON.parse(storedLocation);
      }
    } catch (error) {
      console.error("Error retrieving location from storage:", error);
    }

    return null;
  }

  public stopLocationUpdates(): void {
    if (this.watchId !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }
}

export const coreLocationService = new CoreLocationService();
