
/**
 * Biometric authentication utility functions
 */

// Check if biometric authentication is available on the device
export const isBiometricAvailable = async (): Promise<boolean> => {
  try {
    // In a real implementation, this would use the WebAuthn API or native capabilities via Capacitor
    // For demo purposes, we'll assume it's available on modern devices
    return true;
  } catch (error) {
    console.error("Error checking biometric availability:", error);
    return false;
  }
};

// Authenticate using biometric credentials
export const authenticateWithBiometric = async (): Promise<{success: boolean; userId?: string}> => {
  try {
    // In a real app, this would integrate with platform APIs via Capacitor
    // For demo purposes, we'll simulate a successful authentication
    console.log("[DEMO] Initiating biometric authentication flow");
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate successful authentication
    console.log("[DEMO] Biometric authentication successful");
    return { 
      success: true,
      userId: "user-123" // This would be the actual user ID in a real app
    };
  } catch (error) {
    console.error("Biometric authentication error:", error);
    return { success: false };
  }
};

// Register biometric credentials for a user
export const registerBiometricCredential = async (userId: string): Promise<boolean> => {
  try {
    // In a real app, this would register the user's biometric credentials
    console.log(`[DEMO] Registering biometric credentials for user ${userId}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log(`[DEMO] Biometric credentials successfully registered for user ${userId}`);
    return true;
  } catch (error) {
    console.error("Failed to register biometric credentials:", error);
    return false;
  }
};

// Delete biometric credentials for a user
export const deleteBiometricCredential = async (userId: string): Promise<boolean> => {
  try {
    console.log(`[DEMO] Removing biometric credentials for user ${userId}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log(`[DEMO] Biometric credentials successfully removed for user ${userId}`);
    return true;
  } catch (error) {
    console.error("Failed to remove biometric credentials:", error);
    return false;
  }
};

// Check if biometric login is enabled for a user
export const isBiometricEnabled = async (userId: string): Promise<boolean> => {
  // In a real app, this would check if the user has registered biometric credentials
  // For demo purposes, we'll check local storage
  const enabled = localStorage.getItem(`biometric_enabled_${userId}`) === 'true';
  return enabled;
};

// Save biometric login preference
export const saveBiometricPreference = async (userId: string, enabled: boolean): Promise<boolean> => {
  try {
    localStorage.setItem(`biometric_enabled_${userId}`, enabled ? 'true' : 'false');
    return true;
  } catch (error) {
    console.error("Failed to save biometric preference:", error);
    return false;
  }
};
