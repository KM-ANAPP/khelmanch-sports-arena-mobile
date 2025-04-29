
import SportySplashScreen from "@/components/splash-screen";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  return <SportySplashScreen onComplete={onComplete} />;
}
