
import { LocationData } from './core';

export interface Geofence {
  id: string;
  lat: number;
  lng: number;
  radius: number;
  onEnter?: () => void;
  onExit?: () => void;
}

class GeofencingService {
  private geofences: Geofence[] = [];

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

  public checkGeofences(location: LocationData): void {
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
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return R * c;
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
}

export const geofencingService = new GeofencingService();
