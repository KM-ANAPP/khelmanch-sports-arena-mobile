
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
import { KhelmanchPass } from "@/components/sections/khelmanch-pass";
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
        
        {/* Fitness Goal Banner */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 p-4 mx-4 mt-4 rounded-2xl border border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500 rounded-full">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-orange-900 dark:text-orange-100">Set your weekly sports goal</h3>
                <p className="text-sm text-orange-700 dark:text-orange-300">Keep yourself active!</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-orange-600" />
          </div>
        </div>

        {/* START PLAYING Section */}
        <div className="px-4 py-6">
          <div className="bg-card rounded-2xl p-4 border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-foreground">START PLAYING!</h2>
                <p className="text-sm text-muted-foreground">Create Game</p>
                <p className="text-xs text-muted-foreground mt-1">No games in your calendar</p>
              </div>
              <Button size="sm" className="bg-primary text-primary-foreground">
                Create
              </Button>
            </div>
            <Button variant="outline" className="w-full" onClick={() => navigate('/my-bookings')}>
              View My Calendar
            </Button>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="px-4 pb-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="relative overflow-hidden h-48 border-0 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000" 
                  alt="Players" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
              </div>
              <CardContent className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
                <div>
                  <h3 className="text-xl font-bold mb-2">Play</h3>
                  <p className="text-sm mb-4 text-white/90">Find players and join their activities</p>
                  <Button size="sm" variant="secondary" onClick={() => navigate('/community')}>
                    <Play className="h-4 w-4 mr-2" />
                    Join Game
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden h-48 border-0 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600">
                <img 
                  src="https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=1000" 
                  alt="Venue" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
              </div>
              <CardContent className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
                <div>
                  <h3 className="text-xl font-bold mb-2">Book</h3>
                  <p className="text-sm mb-4 text-white/90">Book your slots in venues nearby</p>
                  <Button size="sm" variant="secondary" onClick={handleBookNow}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tournament Organizer Section */}
        <div className="px-4 pb-6">
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=200" 
                  alt="Tournament Management" 
                  className="w-16 h-16 rounded-2xl object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-blue-900 dark:text-blue-100">Organize Tournaments</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">Create and manage professional tournaments with ease</p>
              </div>
              <ArrowRight className="h-5 w-5 text-blue-600" />
            </div>
          </Card>
        </div>

        <div className="px-4 space-y-6">
          
          {/* Sports Categories */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Sports Categories</h2>
              <Badge variant="secondary">8+ Sports</Badge>
            </div>
            <SportsPicker />
          </div>

          {/* Quick Access Grid */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Access</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/booking">
                <Card className="p-4 hover:shadow-lg transition-all border-2 hover:border-primary/20">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-xl">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Bookings</h3>
                        <p className="text-xs text-muted-foreground">Game History</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/community">
                <Card className="p-4 hover:shadow-lg transition-all border-2 hover:border-secondary/20">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-secondary/10 rounded-xl">
                        <UserPlus className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Playpals</h3>
                        <p className="text-xs text-muted-foreground">Manage Players</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* Popular Grounds */}
          <div>
            <PopularGrounds />
          </div>

          {/* Upcoming Tournaments - Vertical Slider */}
          <div>
            <UpcomingTournaments />
          </div>

          {/* KhelManch Pass */}
          <div>
            <KhelmanchPass isLoggedIn={isAuthenticated} />
          </div>



          {/* Referral Section */}
          <div className="pb-6">
            <Card className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500 rounded-2xl">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-green-900 dark:text-green-100">Refer a Sports Enthusiast</h3>
                  <p className="text-sm text-green-700 dark:text-green-300">Earn 50 karma points by inviting your friends</p>
                </div>
                <ArrowRight className="h-5 w-5 text-green-600" />
              </div>
            </Card>
          </div>

          {/* Stats Section */}
          <div>
            <StatsSection />
          </div>

        </div>
      </div>
    </MobileLayout>
  );
}
