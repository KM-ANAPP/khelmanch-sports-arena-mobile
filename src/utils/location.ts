import { toast } from "@/components/ui/sonner";

// Interfaces
export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: number;
  source: 'gps' | 'network' | 'ip';
}

export class LocationService {
  private static instance: LocationService;
  private isPermissionGranted = false;
  private currentLocation: LocationData | null = null;
  private watchId: number | null = null;
  private geofences: Array<{
    id: string;
    lat: number;
    lng: number;
    radius: number;
    onEnter?: () => void;
    onExit?: () => void;
  }> = [];

  private constructor() {
    // Private constructor to enforce singleton
  }

  public static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

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

  public async initialize(): Promise<void> {
    const permissionGranted = await this.requestPermission();
    if (permissionGranted) {
      this.startLocationUpdates();
    } else {
      this.fallbackToIpGeolocation();
    }
    console.log("Location service initialized");
  }

  private startLocationUpdates(): void {
    if (!this.isPermissionGranted || !navigator.geolocation) {
      return;
    }

    // Get an immediate position update
    navigator.geolocation.getCurrentPosition(
      this.handlePositionUpdate.bind(this),
      this.handlePositionError.bind(this),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    // Start watching position for updates
    this.watchId = navigator.geolocation.watchPosition(
      this.handlePositionUpdate.bind(this),
      this.handlePositionError.bind(this),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  private handlePositionUpdate(position: GeolocationPosition): void {
    const newLocation: LocationData = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: position.timestamp,
      source: 'gps'
    };

    this.updateLocation(newLocation);
    this.checkGeofences(newLocation);
  }

  private handlePositionError(error: GeolocationPositionError): void {
    console.error("Error getting location:", error);
    this.fallbackToIpGeolocation();
  }

  private async fallbackToIpGeolocation(): Promise<void> {
    // In a real app, this would call an IP geolocation API
    // For demo purposes, we'll use a mock location for Delhi, India
    const mockDelhiLocation: LocationData = {
      latitude: 28.6139,
      longitude: 77.2090,
      timestamp: Date.now(),
      source: 'ip'
    };

    this.updateLocation(mockDelhiLocation);
    console.log("Using IP-based geolocation as fallback");
  }

  private updateLocation(location: LocationData): void {
    this.currentLocation = location;
    this.saveLocationToStorage(location);
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

    // Try to get from storage if not in memory
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

  public addGeofence(
    id: string,
    lat: number,
    lng: number,
    radius: number,
    onEnter?: () => void,
    onExit?: () => void
  ): void {
    this.geofences.push({ id, lat, lng, radius, onEnter, onExit });
  }

  public removeGeofence(id: string): void {
    this.geofences = this.geofences.filter(fence => fence.id !== id);
  }

  private checkGeofences(location: LocationData): void {
    if (!location) return;

    this.geofences.forEach(fence => {
      const distance = this.calculateDistance(
        location.latitude,
        location.longitude,
        fence.lat,
        fence.lng
      );

      const isInside = distance <= fence.radius;
      const wasInside = this.isInsideGeofence(fence.id);

      if (isInside && !wasInside && fence.onEnter) {
        fence.onEnter();
        this.setGeofenceStatus(fence.id, true);
      } else if (!isInside && wasInside && fence.onExit) {
        fence.onExit();
        this.setGeofenceStatus(fence.id, false);
      }
    });
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    // Haversine formula to calculate distance between two points on Earth
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  }

  private isInsideGeofence(fenceId: string): boolean {
    try {
      const geofenceStatuses = JSON.parse(localStorage.getItem('geofenceStatuses') || '{}');
      return !!geofenceStatuses[fenceId];
    } catch (error) {
      console.error("Error checking geofence status:", error);
      return false;
    }
  }

  private setGeofenceStatus(fenceId: string, isInside: boolean): void {
    try {
      const geofenceStatuses = JSON.parse(localStorage.getItem('geofenceStatuses') || '{}');
      geofenceStatuses[fenceId] = isInside;
      localStorage.setItem('geofenceStatuses', JSON.stringify(geofenceStatuses));
    } catch (error) {
      console.error("Error setting geofence status:", error);
    }
  }

  // Helper method to get nearby venues based on current location
  public getNearbyVenues(): Array<{ id: string; name: string; distance: string }> {
    // In a real app, this would call an API with the current location
    // For demo purposes, we'll return mock data
    return [
      { id: "venue1", name: "Jawaharlal Nehru Stadium", distance: "1.2 km" },
      { id: "venue2", name: "Indira Gandhi Sports Complex", distance: "3.5 km" },
      { id: "venue3", name: "Major Dhyan Chand National Stadium", distance: "5.8 km" }
    ];
  }
}

export default LocationService.getInstance();
