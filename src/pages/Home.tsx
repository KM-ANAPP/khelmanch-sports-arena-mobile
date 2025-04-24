
import { useState } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { WelcomeHero } from "@/components/sections/welcome-hero";
import { SportSelection } from "@/components/sections/sport-selection";
import { PopularGrounds } from "@/components/sections/popular-grounds";
import { UpcomingTournaments } from "@/components/sections/upcoming-tournaments";
import { StatsSection } from "@/components/sections/stats-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { SpotlightsSection } from "@/components/sections/spotlights-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HelpSection } from "@/components/sections/help-section";
import { LoginBottomSheet } from "@/components/auth/login-bottom-sheet";

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
      <div className="flex flex-col gap-6 p-4">
        <WelcomeHero />
        <SportSelection />
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
