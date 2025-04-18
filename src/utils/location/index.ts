
import { coreLocationService, LocationData } from './core';
import { geofencingService, Geofence } from './geofencing';
import { venuesService } from './venues';

class LocationService {
  private static instance: LocationService;

  private constructor() {}

  public static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  public async initialize(): Promise<void> {
    try {
      const permissionGranted = await this.requestPermission();
      if (permissionGranted) {
        this.startLocationUpdates();
      } else {
        this.fallbackToIpGeolocation();
      }
      console.log("Location service initialized");
    } catch (error) {
      console.error("Error initializing location service:", error);
      // Fallback to default behavior
      this.fallbackToIpGeolocation();
    }
  }

  public requestPermission(): Promise<boolean> {
    return coreLocationService.requestPermission();
  }

  private startLocationUpdates(): void {
    coreLocationService.startLocationUpdates((location: LocationData) => {
      geofencingService.checkGeofences(location);
    });
  }

  private fallbackToIpGeolocation(): void {
    coreLocationService.startLocationUpdates((location: LocationData) => {
      geofencingService.checkGeofences(location);
    });
  }

  public getCurrentLocation(): LocationData | null {
    return coreLocationService.getCurrentLocation();
  }

  public stopLocationUpdates(): void {
    coreLocationService.stopLocationUpdates();
  }

  public addGeofence(
    id: string,
    lat: number,
    lng: number,
    radius: number,
    onEnter?: () => void,
    onExit?: () => void
  ): void {
    geofencingService.addGeofence(id, lat, lng, radius, onEnter, onExit);
  }

  public removeGeofence(id: string): void {
    geofencingService.removeGeofence(id);
  }

  public getNearbyVenues() {
    return venuesService.getNearbyVenues();
  }
}

const locationService = LocationService.getInstance();
export default locationService;
export type { LocationData, Geofence };
