
import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { FeaturedAthletes } from "@/components/sections/featured-athletes";
import { PrimaryActions } from "@/components/sections/primary-actions";
import { PopularGrounds } from "@/components/sections/popular-grounds";
import { UpcomingTournaments } from "@/components/sections/upcoming-tournaments";
import { SportsPicker } from "@/components/sections/sports-picker";
import { KhelmanchPass } from "@/components/sections/khelmanch-pass";
import { useAuth } from "@/context/AuthContext";
import { Shimmer } from "@/components/ui/shimmer";
import '@/styles/main.scss';

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
    
    // Simulate loading time for shimmer effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div style={{ backgroundColor: '#1E2539' }} className="min-h-screen">
        <MobileLayout isLoggedIn={isLoggedIn}>
          <div className="home-page">
            <div className="content-section space-y-6">
              {/* Featured Athletes Shimmer */}
              <div className="space-y-4">
                <Shimmer height="200px" className="rounded-xl" />
                <div className="flex space-x-4">
                  <Shimmer width="50%" height="40px" className="rounded-lg" />
                  <Shimmer width="50%" height="40px" className="rounded-lg" />
                </div>
              </div>
              
              {/* Sports Picker Shimmer */}
              <div className="space-y-4">
                <Shimmer height="24px" width="200px" className="rounded" />
                <div className="flex space-x-4 overflow-hidden">
                  {[...Array(4)].map((_, i) => (
                    <Shimmer key={i} width="160px" height="180px" className="rounded-xl flex-shrink-0" />
                  ))}
                </div>
              </div>
              
              {/* Popular Grounds Shimmer */}
              <div className="space-y-4">
                <Shimmer height="24px" width="180px" className="rounded" />
                <div className="flex space-x-4 overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <Shimmer key={i} width="240px" height="250px" className="rounded-xl flex-shrink-0" />
                  ))}
                </div>
              </div>
              
              {/* Tournaments Shimmer */}
              <div className="space-y-4">
                <Shimmer height="24px" width="220px" className="rounded" />
                {[...Array(2)].map((_, i) => (
                  <Shimmer key={i} height="300px" className="rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </MobileLayout>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#1E2539' }} className="min-h-screen">
      <MobileLayout isLoggedIn={isLoggedIn}>
        <div className="home-page">
          <div className="content-section">
            <FeaturedAthletes />
            <PrimaryActions />
            <SportsPicker />
            <PopularGrounds />
            <KhelmanchPass isLoggedIn={isLoggedIn} />
            <UpcomingTournaments />
          </div>
        </div>
      </MobileLayout>
    </div>
  );
}
