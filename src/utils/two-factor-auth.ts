
/**
 * Two-factor authentication utility functions
 */

// Generate a random 6-digit OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// In a real application, this would send the OTP via SMS or email
// For demo purposes, we'll just log it to the console
export function sendOTP(phoneNumber: string, otp: string): Promise<boolean> {
  console.log(`[DEMO] Sending OTP ${otp} to ${phoneNumber}`);
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[DEMO] OTP ${otp} successfully sent to ${phoneNumber}`);
      resolve(true);
    }, 1000);
  });
}

// Validate the OTP
export function validateOTP(userInputOTP: string, actualOTP: string): boolean {
  return userInputOTP === actualOTP;
}

// Check if 2FA is enabled for a user
export function is2FAEnabled(userId: string): Promise<boolean> {
  // In a real app, this would check user preferences in the database
  // For demo, we'll assume it's enabled for all users
  return Promise.resolve(true);
}

// Save 2FA preferences
export function save2FAPreference(userId: string, enabled: boolean): Promise<boolean> {
  console.log(`[DEMO] Saving 2FA preference for user ${userId}: ${enabled ? 'enabled' : 'disabled'}`);
  // Simulate API call
  return Promise.resolve(true);
}
