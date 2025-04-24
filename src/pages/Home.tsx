
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { Card, CardContent } from "@/components/ui/card";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <MobileLayout isLoggedIn={isLoggedIn}>
      <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-[#2AA9DD]/10 to-transparent -z-10"></div>
        <div className="absolute bottom-0 right-0 w-3/4 h-96 bg-gradient-to-tl from-[#DFE61C]/10 to-transparent -z-10"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-40 right-10 w-16 h-16 rounded-full bg-[#DFE61C]/20 backdrop-blur-md transform rotate-12 -z-5 animate-pulse"></div>
        <div className="absolute bottom-60 left-5 w-20 h-20 rounded-full bg-[#2AA9DD]/10 backdrop-blur-md -z-5 animate-pulse" style={{ animationDelay: "1s" }}></div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 p-4"
        >
          <motion.div variants={itemVariants}>
            <WelcomeHero />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border border-white/50 bg-white/80 backdrop-filter backdrop-blur-sm shadow-lg hover:shadow-xl transition-all rounded-2xl">
              <CardContent className="p-0">
                <SportSelection />
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border border-white/50 bg-white/80 backdrop-filter backdrop-blur-sm shadow-lg hover:shadow-xl transition-all rounded-2xl">
              <CardContent className="p-0">
                <PopularGrounds />
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border border-white/50 bg-white/80 backdrop-filter backdrop-blur-sm shadow-lg hover:shadow-xl transition-all rounded-2xl">
              <CardContent className="p-0">
                <UpcomingTournaments />
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <StatsSection />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <PartnersSection />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <SpotlightsSection />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <HelpSection />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <ContactSection />
          </motion.div>
        </motion.div>
        
        <LoginBottomSheet 
          open={showLoginPrompt} 
          onDismiss={handleDismissLoginPrompt}
          onLogin={() => setIsLoggedIn(true)}
          inSplashScreen={false}
        />
      </div>
    </MobileLayout>
  );
}
