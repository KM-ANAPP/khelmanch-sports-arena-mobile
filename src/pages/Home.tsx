
import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Trophy, Users, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

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
      <div className="p-4 space-y-6">
        
        {/* Hero Section */}
        <Card className="bg-gradient-to-r from-primary to-secondary text-white overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-2">Book Your Game</h2>
            <p className="text-white/80 mb-4">Find grounds & join tournaments</p>
            <div className="flex gap-2">
              <Link to="/booking">
                <Button size="sm" variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                  Book Now
                </Button>
              </Link>
              <Link to="/tournaments">
                <Button size="sm" variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                  Tournaments
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/booking">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Find Grounds</h3>
                <p className="text-sm text-muted-foreground">Book sports venues</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/tournaments">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <Trophy className="h-8 w-8 text-secondary mx-auto mb-2" />
                <h3 className="font-semibold">Tournaments</h3>
                <p className="text-sm text-muted-foreground">Join competitions</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Featured */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Popular This Week</h3>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Cricket Championship</h4>
                  <p className="text-sm text-muted-foreground">Mumbai • This Weekend</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">Registration Open</Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Users className="h-3 w-3 mr-1" />
                      24 teams
                    </div>
                  </div>
                </div>
                <Button size="sm">Join</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-secondary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Elite Sports Complex</h4>
                  <p className="text-sm text-muted-foreground">Andheri • Available Today</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center text-xs">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      4.8
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      ₹500/hr
                    </div>
                  </div>
                </div>
                <Button size="sm">Book</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
}
