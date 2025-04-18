
import React from 'react';
import { toast } from "@/components/ui/sonner";

// Mock implementation for location services
export class LocationService {
  private static instance: LocationService;
  private currentLocation: GeolocationCoordinates | null = null;
  private locationWatchId: number | null = null;
  private hasPermission = false;

  private constructor() {
    // Private constructor to enforce singleton
  }

  public static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  public async initialize(): Promise<void> {
    try {
      // Request permission and get initial location
      await this.requestLocationPermission();
      console.log("Location service initialized");
    } catch (error) {
      console.error("Error initializing location service:", error);
      this.fallbackToIPGeolocation();
    }
  }

  public async requestLocationPermission(): Promise<boolean> {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser");
      this.fallbackToIPGeolocation();
      return false;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          (error) => {
            console.error("Error requesting location permission:", error);
            reject(error);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        );
      });

      this.hasPermission = true;
      this.updateCurrentLocation(position.coords);
      return true;
    } catch (error) {
      console.error("Error requesting location permission:", error);
      this.fallbackToIPGeolocation();
      return false;
    }
  }

  private fallbackToIPGeolocation(): void {
    console.log("Using IP-based geolocation as fallback");
    // In a real app, you would call an IP geolocation service
    // For demo purposes, we'll use a hardcoded Mumbai location
    toast(
      <div>
        <p>Location permission denied. Using approximate location.</p>
      </div>
    );
  }

  private updateCurrentLocation(coords: GeolocationCoordinates): void {
    this.currentLocation = coords;
  }

  public getCurrentLocation(): GeolocationCoordinates | null {
    return this.currentLocation;
  }

  public startWatchingLocation(): boolean {
    if (!navigator.geolocation || !this.hasPermission) {
      return false;
    }

    this.locationWatchId = navigator.geolocation.watchPosition(
      (position) => {
        this.updateCurrentLocation(position.coords);
      },
      (error) => {
        console.error("Error watching location:", error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );

    return true;
  }

  public stopWatchingLocation(): void {
    if (this.locationWatchId !== null) {
      navigator.geolocation.clearWatch(this.locationWatchId);
      this.locationWatchId = null;
    }
  }

  public getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // Calculate distance between two coordinates using Haversine formula
    // Returns distance in kilometers
    const R = 6371; // Radius of the Earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}

export default LocationService.getInstance();
