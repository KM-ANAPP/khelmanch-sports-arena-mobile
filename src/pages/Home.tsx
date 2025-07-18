
import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Trophy, Users, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { SportsPicker } from "@/components/sections/sports-picker";
import { PopularGrounds } from "@/components/sections/popular-grounds";
import { UpcomingTournaments } from "@/components/sections/upcoming-tournaments";
import { FeaturedAthletes } from "@/components/sections/featured-athletes";
import { KhelmanchPass } from "@/components/sections/khelmanch-pass";
import { PrimaryActions } from "@/components/sections/primary-actions";
import { StatsSection } from "@/components/sections/stats-section";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <MobileLayout isLoggedIn={isAuthenticated}>
        <div className="p-4 space-y-4">
          <div className="h-32 bg-muted animate-pulse rounded-2xl"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 bg-muted animate-pulse rounded-xl"></div>
            <div className="h-24 bg-muted animate-pulse rounded-xl"></div>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout isLoggedIn={isAuthenticated}>
      <div className="space-y-6">
        
        {/* Hero Section with Primary Actions */}
        <div className="bg-gradient-to-br from-primary via-primary/90 to-secondary p-6 text-white rounded-b-3xl -mt-2">
          <div className="space-y-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Welcome to Khelmanch</h1>
              <p className="text-white/80">Your ultimate sports booking destination</p>
            </div>
            
            {/* Primary Action Buttons */}
            <PrimaryActions />
          </div>
        </div>

        <div className="px-4 space-y-8">
          
          {/* Sports Categories - Similar to "What's on your mind" in food apps */}
          <div>
            <h2 className="text-xl font-bold mb-4">What sport are you in the mood for?</h2>
            <SportsPicker />
          </div>

          {/* Popular Grounds - Similar to "Popular restaurants" */}
          <div>
            <PopularGrounds />
          </div>

          {/* Upcoming Tournaments - Similar to "Offers" section */}
          <div>
            <UpcomingTournaments />
          </div>

          {/* KhelManch Pass - Similar to membership/subscription offers */}
          <div>
            <KhelmanchPass isLoggedIn={isAuthenticated} />
          </div>

          {/* Featured Athletes/Content - Similar to "Featured" content */}
          <div>
            <FeaturedAthletes />
          </div>

          {/* Stats Section - Similar to testimonials/social proof */}
          <div>
            <StatsSection />
          </div>

          {/* Quick Links Section */}
          <div className="grid grid-cols-2 gap-4 pb-6">
            <Link to="/community">
              <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-accent/50">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold">Community</h3>
                  <p className="text-sm text-muted-foreground">Connect with players</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/my-bookings">
              <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-secondary/50">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <h3 className="font-semibold">My Bookings</h3>
                  <p className="text-sm text-muted-foreground">View your history</p>
                </CardContent>
              </Card>
            </Link>
          </div>

        </div>
      </div>
    </MobileLayout>
  );
}
