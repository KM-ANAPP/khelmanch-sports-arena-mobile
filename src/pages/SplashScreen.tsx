
import AnimatedSplashScreen from "@/components/animated-splash-screen";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  return <AnimatedSplashScreen onComplete={onComplete} />;
}
