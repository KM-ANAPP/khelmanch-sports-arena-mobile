
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "@/components/theme/theme-provider";

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
import ProductDetails from "./pages/ProductDetails";
import SportDetail from "./pages/SportDetail";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [servicesInitialized, setServicesInitialized] = useState(false);

  // Initialize services
  useEffect(() => {
    const initializeServices = async () => {
      try {
        await notificationService.initialize();
        await locationService.initialize();
        setServicesInitialized(true);
      } catch (error) {
        console.error("Error initializing services:", error);
        setServicesInitialized(true);
      }
    };

    initializeServices();
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {showSplash ? (
              <SplashScreen onComplete={handleSplashComplete} />
            ) : (
              <BrowserRouter>
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route 
                      path="/" 
                      element={
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Navigate to="/login" replace />
                        </motion.div>
                      } 
                    />
                    
                    <Route 
                      path="/login" 
                      element={
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Login />
                        </motion.div>
                      } 
                    />
                    
                    {[
                      { path: "/register", element: <Register /> },
                      { path: "/home", element: <Home /> },
                      { path: "/tournaments", element: <Tournaments /> },
                      { path: "/tournaments/:id", element: <TournamentDetails /> },
                      { path: "/booking", element: <Booking /> },
                      { path: "/booking/:id", element: <GroundDetails /> },
                      { path: "/profile", element: <Profile /> },
                      { path: "/checkout", element: <Checkout /> },
                      { path: "/payment-success", element: <PaymentSuccess /> },
                      { path: "/settings", element: <Settings /> },
                      { path: "/messages", element: <Messages /> },
                      { path: "/community", element: <Community /> },
                      { path: "/my-bookings", element: <MyBookings /> },
                      { path: "/my-tickets", element: <MyBookings /> },
                      { path: "/my-teams", element: <MyTeams /> },
                      { path: "/index", element: <Index /> },
                      { path: "/sport/:sportId", element: <SportDetail /> },
                    ].map(({ path, element }) => (
                      <Route
                        key={path}
                        path={path}
                        element={
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            {element}
                          </motion.div>
                        }
                      />
                    ))}
                    
                    <Route 
                      path="/products/:id" 
                      element={
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ProductDetails />
                        </motion.div>
                      } 
                    />
                    
                    <Route 
                      path="*" 
                      element={
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <NotFound />
                        </motion.div>
                      } 
                    />
                  </Routes>
                </AnimatePresence>
                <ChatbotSupport />
              </BrowserRouter>
            )}
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
