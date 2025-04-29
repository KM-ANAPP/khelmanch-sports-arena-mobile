
import SportsAnimatedSplashScreen from "@/components/sports-animated-splash-screen";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  return <SportsAnimatedSplashScreen onComplete={onComplete} />;
}
