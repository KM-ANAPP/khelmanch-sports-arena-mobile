
// This is a mock implementation for demo purposes
// In a real app, you would use a native biometric plugin

export async function isBiometricAvailable(): Promise<boolean> {
  try {
    // In a real app, you'd check device capabilities here
    return true; // Mock response
  } catch (error) {
    console.error("Error checking biometric availability:", error);
    return false;
  }
}

export async function isBiometricEnabled(userId: string): Promise<boolean> {
  try {
    const stored = localStorage.getItem(`biometric_enabled_${userId}`);
    return stored ? JSON.parse(stored) : false;
  } catch (error) {
    console.error("Error checking biometric status:", error);
    return false;
  }
}

export async function saveBiometricPreference(userId: string, enabled: boolean): Promise<boolean> {
  try {
    localStorage.setItem(`biometric_enabled_${userId}`, JSON.stringify(enabled));
    
    // Also store if user has registered biometrics - for the mock flow
    if (enabled) {
      localStorage.setItem("userHasBiometrics", "true");
    } else {
      localStorage.removeItem("userHasBiometrics");
    }
    
    return true;
  } catch (error) {
    console.error("Error saving biometric preference:", error);
    return false;
  }
}

export async function authenticateWithBiometric(): Promise<{ success: boolean, message?: string }> {
  try {
    // In a real app, this would trigger the native biometric prompt
    // For demo, we'll simulate success
    const hasRegisteredBiometrics = localStorage.getItem("userHasBiometrics");
    
    if (hasRegisteredBiometrics) {
      return { success: true };
    } else {
      return { 
        success: false, 
        message: "Biometric authentication not set up"
      };
    }
  } catch (error) {
    console.error("Error during biometric authentication:", error);
    return { 
      success: false, 
      message: "Authentication failed"
    };
  }
}
