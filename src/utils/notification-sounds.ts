
/**
 * Custom notification sounds utility
 */

// Default notification sounds
export const defaultSounds = {
  booking: "/sounds/booking.mp3",
  message: "/sounds/message.mp3",
  tournament: "/sounds/tournament.mp3",
  payment: "/sounds/payment.mp3",
  general: "/sounds/notification.mp3"
};

// User preferences for notification sounds
export interface SoundPreferences {
  booking: string;
  message: string;
  tournament: string;
  payment: string;
  general: string;
}

// Get saved sound preferences
export const getSoundPreferences = (): SoundPreferences => {
  try {
    const saved = localStorage.getItem('notification_sounds');
    return saved ? JSON.parse(saved) : defaultSounds;
  } catch (error) {
    console.error("Error loading sound preferences:", error);
    return defaultSounds;
  }
};

// Save sound preferences
export const saveSoundPreferences = (preferences: Partial<SoundPreferences>): boolean => {
  try {
    const current = getSoundPreferences();
    const updated = { ...current, ...preferences };
    localStorage.setItem('notification_sounds', JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error("Error saving sound preferences:", error);
    return false;
  }
};

// Play a notification sound
export const playNotificationSound = (type: keyof SoundPreferences = 'general'): void => {
  try {
    const preferences = getSoundPreferences();
    const soundUrl = preferences[type] || defaultSounds[type];
    
    if (!soundUrl) return;
    
    const audio = new Audio(soundUrl);
    audio.play().catch(error => {
      console.error("Error playing notification sound:", error);
    });
  } catch (error) {
    console.error("Error with notification sound:", error);
  }
};

// Upload a custom notification sound
export const uploadCustomSound = async (file: File, type: keyof SoundPreferences): Promise<string> => {
  try {
    // In a real app, this would upload the file to a server
    // For demo purposes, we'll create an object URL
    const objectUrl = URL.createObjectURL(file);
    
    // Save the preference
    const preferences = getSoundPreferences();
    preferences[type] = objectUrl;
    saveSoundPreferences(preferences);
    
    return objectUrl;
  } catch (error) {
    console.error("Error uploading custom sound:", error);
    throw new Error("Failed to upload custom sound");
  }
};

// Reset notification sound to default
export const resetSoundToDefault = (type: keyof SoundPreferences): void => {
  try {
    const preferences = getSoundPreferences();
    preferences[type] = defaultSounds[type];
    saveSoundPreferences(preferences);
  } catch (error) {
    console.error("Error resetting sound preferences:", error);
  }
};
