
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
    const permissionGranted = await this.requestPermission();
    if (permissionGranted) {
      this.startLocationUpdates();
    } else {
      this.fallbackToIpGeolocation();
    }
    console.log("Location service initialized");
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

export default LocationService.getInstance();
export type { LocationData, Geofence };
