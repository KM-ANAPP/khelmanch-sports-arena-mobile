
import React from "react";
import ModernSportsSplash from "./splash-screens/modern-sports-splash";

interface SportySplashScreenProps {
  onComplete: () => void;
}

export default function SportySplashScreen({ onComplete }: SportySplashScreenProps) {
  return <ModernSportsSplash onComplete={onComplete} />;
}
