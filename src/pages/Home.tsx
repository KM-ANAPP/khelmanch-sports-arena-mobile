
import { useState, useEffect } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { PrimaryActions } from "@/components/sections/primary-actions";
import { PopularGrounds } from "@/components/sections/popular-grounds";
import { UpcomingTournaments } from "@/components/sections/upcoming-tournaments";
import { SportsPicker } from "@/components/sections/sports-picker";
import { useAuth } from "@/context/AuthContext";
import { Shimmer } from "@/components/ui/shimmer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, MapPin, Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";

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
      <MobileLayout isLoggedIn={isLoggedIn}>
        <div className="p-4 space-y-6">
          {/* Quick Actions Shimmer */}
          <div className="grid grid-cols-2 gap-4">
            <Shimmer height="120px" className="rounded-2xl" />
            <Shimmer height="120px" className="rounded-2xl" />
          </div>
          
          {/* Sports Picker Shimmer */}
          <div className="space-y-4">
            <Shimmer height="24px" width="200px" className="rounded-xl" />
            <div className="flex space-x-4 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <Shimmer key={i} width="160px" height="180px" className="rounded-2xl flex-shrink-0" />
              ))}
            </div>
          </div>
          
          {/* Popular Grounds Shimmer */}
          <div className="space-y-4">
            <Shimmer height="24px" width="180px" className="rounded-xl" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Shimmer key={i} height="250px" className="rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout isLoggedIn={isLoggedIn}>
      <div className="p-4 space-y-6 min-h-screen">
        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4"
        >
          <Card className="material-surface-elevated android-ripple cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm">Book Grounds</h3>
              <p className="text-xs text-muted-foreground mt-1">Find & book sports grounds</p>
            </CardContent>
          </Card>
          
          <Card className="material-surface-elevated android-ripple cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-sm">Tournaments</h3>
              <p className="text-xs text-muted-foreground mt-1">Join competitive events</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Actions */}
        <PrimaryActions />
        
        {/* Sports Selection */}
        <SportsPicker />
        
        {/* Popular Grounds */}
        <PopularGrounds />
        
        {/* Upcoming Tournaments */}
        <UpcomingTournaments />
      </div>
    </MobileLayout>
  );
}
