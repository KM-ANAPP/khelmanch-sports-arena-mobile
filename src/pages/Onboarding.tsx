
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { OnboardingSlide } from "@/components/onboarding/onboarding-slide";

const onboardingData = [
  {
    title: "Welcome to Khelmanch",
    description: "Your ultimate sports destination. Book venues, join tournaments, and connect with fellow sports enthusiasts.",
    imageUrls: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
      "https://images.unsplash.com/photo-1591216105236-5ba45c8d6add",
    ],
  },
  {
    title: "Find Your Perfect Venue",
    description: "Browse and book sports facilities near you. Real-time availability and instant confirmations.",
    imageUrls: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9f2",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
      "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8",
    ],
  },
  {
    title: "Join Tournaments",
    description: "Participate in local tournaments, track live scores, and compete with the best players.",
    imageUrls: [
      "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff",
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
      "https://images.unsplash.com/photo-1599474924187-334a1197c64e",
    ],
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < onboardingData.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      // Store that onboarding is completed
      localStorage.setItem("onboardingComplete", "true");
      navigate("/login");
    }
  };

  const handleSkip = () => {
    localStorage.setItem("onboardingComplete", "true");
    navigate("/login");
  };

  return (
    <AnimatePresence mode="wait">
      <OnboardingSlide
        key={currentSlide}
        {...onboardingData[currentSlide]}
        currentIndex={currentSlide}
        totalSlides={onboardingData.length}
        onNext={handleNext}
        onSkip={handleSkip}
      />
    </AnimatePresence>
  );
}
