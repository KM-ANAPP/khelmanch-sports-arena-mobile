
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Your Firebase config values
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// For Android configuration
export const androidConfig = {
  packageName: "app.lovable.aae24903253a4a22a677e35a688ad26c",
  appNickname: "Khelmanch Sports Arena",
  // Optional: Add SHA-1 certificate fingerprint in Firebase console
  // This is required for Phone Authentication and Google Sign-In
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
