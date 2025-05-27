
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAbHbaj6dA_eGt6yvzOIYnKw-K8tcXyNys",
  authDomain: "khelmanch-4b535.firebaseapp.com",
  projectId: "khelmanch-4b535",
  storageBucket: "khelmanch-4b535.appspot.com",
  messagingSenderId: "986412070485",
  appId: "1:986412070485:android:093279930683f89fa306dc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize Firestore emulator for development (optional)
const isDevelopment = window.location.hostname === 'localhost';
if (isDevelopment) {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    console.log('Connected to Firestore emulator');
  } catch (error) {
    console.log('Firestore emulator connection failed or already connected');
  }
}
