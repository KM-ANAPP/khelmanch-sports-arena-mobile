
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    console.log("handleNext called - current slide:", currentSlide);
    console.log("Total slides:", onboardingData.length);
    
    if (currentSlide < onboardingData.length - 1) {
      const nextSlide = currentSlide + 1;
      console.log("Moving to next slide:", nextSlide);
      setCurrentSlide(nextSlide);
    } else {
      console.log("Completing onboarding, navigating to login");
      localStorage.setItem("onboardingComplete", "true");
      navigate("/login");
    }
  };

  const handleSkip = () => {
    console.log("handleSkip called");
    localStorage.setItem("onboardingComplete", "true");
    navigate("/login");
  };

  console.log("Onboarding component rendered - current slide:", currentSlide);

  return (
    <div className="min-h-screen">
      <AnimatedSportsSlide
        key={`onboarding-slide-${currentSlide}`}
        {...onboardingData[currentSlide]}
        currentIndex={currentSlide}
        totalSlides={onboardingData.length}
        onNext={handleNext}
        onSkip={handleSkip}
      />
    </div>
  );
}
