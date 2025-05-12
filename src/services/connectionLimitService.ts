
import { toast } from "@/hooks/use-toast";

// Constants
const CONNECTION_REQUESTS_KEY = "khelmanch_connection_requests";
const CONNECTION_RESET_TIME_KEY = "khelmanch_connection_reset_time";
const MAX_FREE_CONNECTIONS = 3;
const RESET_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface ConnectionRequest {
  playerId: string;
  timestamp: number;
}

export const connectionLimitService = {
  /**
   * Get the current connection requests made by the user
   */
  getConnectionRequests(): ConnectionRequest[] {
    try {
      const savedRequests = localStorage.getItem(CONNECTION_REQUESTS_KEY);
      if (!savedRequests) return [];
      
      return JSON.parse(savedRequests);
    } catch (error) {
      console.error("Error getting connection requests:", error);
      return [];
    }
  },

  /**
   * Get the next reset time for connection limits
   */
  getResetTime(): number {
    try {
      const resetTime = localStorage.getItem(CONNECTION_RESET_TIME_KEY);
      return resetTime ? parseInt(resetTime, 10) : 0;
    } catch (error) {
      console.error("Error getting reset time:", error);
      return 0;
    }
  },

  /**
   * Check if the user can make more connection requests (within free tier)
   */
  canMakeConnection(): boolean {
    // Check if the reset time has passed
    const resetTime = this.getResetTime();
    const now = Date.now();
    
    if (resetTime && now >= resetTime) {
      // Reset connection count if the time has passed
      this.resetConnections();
      return true;
    }
    
    // Check connection count
    const connections = this.getConnectionRequests();
    return connections.length < MAX_FREE_CONNECTIONS;
  },

  /**
   * Get the number of remaining free connections
   */
  getRemainingConnections(): number {
    const connections = this.getConnectionRequests();
    return Math.max(0, MAX_FREE_CONNECTIONS - connections.length);
  },

  /**
   * Record a connection request
   */
  recordConnection(playerId: string): void {
    try {
      const connections = this.getConnectionRequests();
      
      // Check if we've already recorded this connection
      if (connections.some(conn => conn.playerId === playerId)) {
        return;
      }
      
      const now = Date.now();
      connections.push({
        playerId,
        timestamp: now
      });
      
      // Save to localStorage
      localStorage.setItem(CONNECTION_REQUESTS_KEY, JSON.stringify(connections));
      
      // Set reset time if not already set
      if (!this.getResetTime()) {
        const resetTime = now + RESET_INTERVAL_MS;
        localStorage.setItem(CONNECTION_RESET_TIME_KEY, resetTime.toString());
      }
    } catch (error) {
      console.error("Error recording connection:", error);
    }
  },

  /**
   * Reset the connection count
   */
  resetConnections(): void {
    localStorage.removeItem(CONNECTION_REQUESTS_KEY);
    localStorage.removeItem(CONNECTION_RESET_TIME_KEY);
  },

  /**
   * Get time until reset in a readable format
   */
  getTimeUntilReset(): string {
    const resetTime = this.getResetTime();
    if (!resetTime) return "24 hours";
    
    const now = Date.now();
    const timeLeft = Math.max(0, resetTime - now);
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  }
};
