
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AnimatedSportsSlide } from "@/components/onboarding/animated-sports-slide";

const onboardingData = [
  {
    title: "Master Your Game",
    description: "Connect with fellow cricket enthusiasts, book practice sessions, and participate in tournaments across the city.",
    sportName: "Cricket",
    sportIcon: "🏏",
    sportColor: "#10B981" // green
  },
  {
    title: "Score Big",
    description: "Join football leagues, find teammates for weekend matches, and book the best football grounds in your area.",
    sportName: "Football", 
    sportIcon: "⚽",
    sportColor: "#F59E0B" // orange
  },
  {
    title: "Shoot Your Shot",
    description: "Discover basketball courts, join pickup games, and compete in tournaments with players of your skill level.",
    sportName: "Basketball",
    sportIcon: "🏀",
    sportColor: "#8B5CF6" // purple
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    console.log("Next clicked, current slide:", currentSlide);
    if (currentSlide < onboardingData.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      localStorage.setItem("onboardingComplete", "true");
      navigate("/login");
    }
  };

  const handleSkip = () => {
    console.log("Skip clicked");
    localStorage.setItem("onboardingComplete", "true");
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        <AnimatedSportsSlide
          key={`slide-${currentSlide}`}
          {...onboardingData[currentSlide]}
          currentIndex={currentSlide}
          totalSlides={onboardingData.length}
          onNext={handleNext}
          onSkip={handleSkip}
        />
      </AnimatePresence>
    </div>
  );
}
