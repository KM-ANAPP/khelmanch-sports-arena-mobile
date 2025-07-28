
import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Trophy, Users, Clock, Star, Zap, Target, Award, ArrowRight, Play, BookOpen, UserPlus, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SportsPicker } from "@/components/sections/sports-picker";
import { PopularGrounds } from "@/components/sections/popular-grounds";
import { UpcomingTournaments } from "@/components/sections/upcoming-tournaments";
import { FeaturedAthletes } from "@/components/sections/featured-athletes";

import { StatsSection } from "@/components/sections/stats-section";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleBookNow = () => {
    navigate('/checkout', {
      state: {
        orderDetails: {
          sportName: "Quick Book",
          venueName: "Available Venues",
          price: 999,
          duration: "1 hour"
        }
      }
    });
  };

  if (isLoading) {
    return (
      <MobileLayout isLoggedIn={isAuthenticated}>
        <div className="p-4 space-y-4">
          <div className="h-40 bg-muted animate-pulse rounded-2xl"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 bg-muted animate-pulse rounded-2xl"></div>
            <div className="h-32 bg-muted animate-pulse rounded-2xl"></div>
          </div>
          <div className="space-y-3">
            <div className="h-6 bg-muted animate-pulse rounded"></div>
            <div className="h-20 bg-muted animate-pulse rounded-xl"></div>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout isLoggedIn={isAuthenticated}>
      <div className="space-y-0">
        
        {/* Earn KHELMANCH COINS Banner */}
        <div 
          className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 p-4 mx-4 mt-4 rounded-2xl border border-orange-200 dark:border-orange-800 cursor-pointer hover:shadow-lg transition-all"
          onClick={() => navigate('/activities')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500 rounded-full">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-orange-900 dark:text-orange-100">Earn KHELMANCH COINS</h3>
                <p className="text-sm text-orange-700 dark:text-orange-300">Join tournaments & refer friends!</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-orange-600" />
          </div>
        </div>

        {/* Main Action Card - Play Only */}
        <div className="px-4 py-6">
          <Card className="relative overflow-hidden h-48 border-0 shadow-lg w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000" 
                alt="Players" 
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
            </div>
            <CardContent className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
              <div>
                <h3 className="text-2xl font-bold mb-2">Play</h3>
                <p className="text-base mb-4 text-white/90">Find tournaments and compete</p>
                <Button size="lg" variant="secondary" onClick={() => navigate('/tournaments')} className="w-full">
                  <Trophy className="h-5 w-5 mr-2" />
                  View Tournaments
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>


        <div className="px-4 space-y-6">
          
          {/* Pick a sport section */}
          <div>
            <SportsPicker />
          </div>

          {/* Upcoming Tournaments - Vertical Slider */}
          <div>
            <UpcomingTournaments />
          </div>





          {/* Stats Section */}
          <div>
            <StatsSection />
          </div>

          {/* Contact Us Section */}
          <div className="pb-6" onClick={() => navigate('/contact')}>
            <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-800 cursor-pointer hover:shadow-lg transition-all">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=200" 
                    alt="Contact Us" 
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-blue-900 dark:text-blue-100">Contact Us</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Get in touch for partnerships and support</p>
                </div>
                <ArrowRight className="h-5 w-5 text-blue-600" />
              </div>
            </Card>
          </div>

        </div>
      </div>
    </MobileLayout>
  );
}
