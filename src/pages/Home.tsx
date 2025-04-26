
import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { FeaturedAthletes } from "@/components/sections/featured-athletes";
import { PrimaryActions } from "@/components/sections/primary-actions";
import { PopularGrounds } from "@/components/sections/popular-grounds";
import { UpcomingTournaments } from "@/components/sections/upcoming-tournaments";
import { StatsSection } from "@/components/sections/stats-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { SpotlightsSection } from "@/components/sections/spotlights-section";
import { ContactSection } from "@/components/sections/contact-section";
import { LoginBottomSheet } from "@/components/auth/login-bottom-sheet";
import { HelpSection } from "@/components/sections/help-section";

export default function Home() {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user dismissed login prompt this session
    const hasSeenPrompt = sessionStorage.getItem("loginPromptDismissed");
    
    if (!isLoggedIn && !hasSeenPrompt) {
      // Show login prompt after a short delay
      const timer = setTimeout(() => {
        setShowLoginPrompt(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);
  
  const handleDismissLoginPrompt = () => {
    setShowLoginPrompt(false);
    // Remember that user dismissed the prompt for this session
    sessionStorage.setItem("loginPromptDismissed", "true");
  };

  return (
    <MobileLayout isLoggedIn={isLoggedIn}>
      <div className="p-4 space-y-6">
        <FeaturedAthletes />
        <PrimaryActions />
        <PopularGrounds />
        <UpcomingTournaments />
        <StatsSection />
        <PartnersSection />
        <SpotlightsSection />
        <HelpSection />
        <ContactSection />
      </div>
      
      <LoginBottomSheet 
        open={showLoginPrompt} 
        onDismiss={handleDismissLoginPrompt}
        onLogin={() => setIsLoggedIn(true)}
        inSplashScreen={false}
      />
    </MobileLayout>
  );
}
