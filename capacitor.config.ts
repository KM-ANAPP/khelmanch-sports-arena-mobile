
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.aae24903253a4a22a677e35a688ad26c',
  appName: 'khelmanch-sports-arena-mobile',
  webDir: 'dist',
  server: {
    url: 'https://aae24903-253a-4a22-a677-e35a688ad26c.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      minSdkVersion: 23
    }
  },
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["phone", "google"]
    }
  }
};

export default config;
