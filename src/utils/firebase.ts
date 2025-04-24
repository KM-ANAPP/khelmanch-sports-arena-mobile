
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';

const firebaseConfig = {
  apiKey: "AIzaSyAbHbaj6dA_eGt6yvzOIYnKw-K8tcXyNys",
  authDomain: "khelmanch-4b535.firebaseapp.com",
  projectId: "khelmanch-4b535",
  storageBucket: "khelmanch-4b535.appspot.com",
  messagingSenderId: "986412070485",
  appId: "1:986412070485:android:093279930683f89fa306dc"
};

// For Android configuration
export const androidConfig = {
  packageName: "app.lovable.aae24903253a4a22a677e35a688ad26c",
  appNickname: "Khelmanch Sports Arena",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize auth with proper settings for development environments
// For production, this should always be set to false
auth.settings.appVerificationDisabledForTesting = false;

// Log the platform information
console.log(`Running on ${Capacitor.getPlatform()} platform`);
console.log(`Is native: ${Capacitor.isNativePlatform()}`);

