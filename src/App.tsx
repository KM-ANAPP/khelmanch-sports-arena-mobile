
import React, { useState, useEffect, createContext } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Services
import notificationService from "./utils/notifications";
import locationService from "./utils/location";
import { AuthProvider } from "./context/AuthContext";
import ChatbotSupport from "./components/ai/ChatbotSupport";

// Pages
import NotFound from "./pages/NotFound";
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Tournaments from "./pages/Tournaments";
import TournamentDetails from "./pages/TournamentDetails";
import Booking from "./pages/Booking";
import GroundDetails from "./pages/GroundDetails";
import Profile from "./pages/Profile";
import Index from "./pages/Index";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import Settings from "./pages/Settings";
import MyBookings from "./pages/MyBookings";
import MyTeams from "./pages/MyTeams";
import Messages from "./pages/Messages";
import Community from "./pages/Community";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [splashCompleted, setSplashCompleted] = useState(false);
  const [servicesInitialized, setServicesInitialized] = useState(false);

  // Initialize services
  useEffect(() => {
    const initializeServices = async () => {
      try {
        // Initialize notification service
        await notificationService.initialize();
        
        // Initialize location service
        await locationService.initialize();
        
        setServicesInitialized(true);
        console.log("All services initialized successfully");
      } catch (error) {
        console.error("Error initializing services:", error);
        // Continue even if services fail to initialize
        setServicesInitialized(true);
      }
    };

    initializeServices();
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setSplashCompleted(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {showSplash ? (
            <SplashScreen onComplete={handleSplashComplete} />
          ) : (
            <BrowserRouter>
              <Routes>
                {/* Redirect to login after splash screen completes */}
                {splashCompleted && (
                  <Route 
                    path="/" 
                    element={<Navigate to="/login" replace />} 
                  />
                )}
                
                {/* Authentication Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Main App Routes */}
                <Route path="/home" element={<Home />} />
                <Route path="/tournaments" element={<Tournaments />} />
                <Route path="/tournaments/:id" element={<TournamentDetails />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/booking/:id" element={<GroundDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/settings" element={<Settings />} />
                
                {/* Communication & Community Routes */}
                <Route path="/messages" element={<Messages />} />
                <Route path="/community" element={<Community />} />
                
                {/* My Items Routes */}
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/my-tickets" element={<MyBookings />} />
                <Route path="/my-teams" element={<MyTeams />} />
                
                {/* For any old Index page route, redirect to Home */}
                <Route path="/index" element={<Index />} />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              {/* Global AI Chatbot Support */}
              <ChatbotSupport />
            </BrowserRouter>
          )}
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
