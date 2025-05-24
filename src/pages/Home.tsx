
import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { FeaturedAthletes } from "@/components/sections/featured-athletes";
import { PrimaryActions } from "@/components/sections/primary-actions";
import { PopularGrounds } from "@/components/sections/popular-grounds";
import { UpcomingTournaments } from "@/components/sections/upcoming-tournaments";
import { StatsSection } from "@/components/sections/stats-section";
import { SpotlightsSection } from "@/components/sections/spotlights-section";
import { HelpSection } from "@/components/sections/help-section";
import { SportsPicker } from "@/components/sections/sports-picker";
import { KhelmanchPass } from "@/components/sections/khelmanch-pass";
import { useAuth } from "@/context/AuthContext";
import '@/styles/main.scss';

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  
  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <MobileLayout isLoggedIn={isLoggedIn}>
      <div className="home-page">
        <div className="content-section">
          <FeaturedAthletes />
          <PrimaryActions />
          <SportsPicker />
          <PopularGrounds />
          <KhelmanchPass isLoggedIn={isLoggedIn} />
          <UpcomingTournaments />
          <StatsSection />
          <SpotlightsSection />
          <HelpSection />
        </div>
      </div>
    </MobileLayout>
  );
}
