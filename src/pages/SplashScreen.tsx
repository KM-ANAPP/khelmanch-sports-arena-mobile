
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SplashScreen() {
  const [redirect, setRedirect] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);
  
  if (redirect) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary overflow-hidden relative">
      {/* Animated sports elements */}
      <motion.div 
        className="absolute"
        initial={{ left: "-100px", top: "30%" }}
        animate={{ left: "110%", top: "40%" }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        <div className="w-12 h-12 rounded-full bg-secondary"></div>
      </motion.div>
      
      <motion.div 
        className="absolute"
        initial={{ right: "-100px", top: "60%" }}
        animate={{ right: "110%", top: "50%" }}
        transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
      >
        <div className="w-10 h-10 rounded-full bg-accent"></div>
      </motion.div>
      
      <motion.div 
        className="absolute"
        initial={{ top: "-50px", left: "40%" }}
        animate={{ top: "110%", left: "30%" }}
        transition={{ duration: 2.4, ease: "easeInOut", delay: 0.1 }}
      >
        <div className="w-8 h-8 rotate-45 bg-secondary/50"></div>
      </motion.div>
      
      {/* Logo animation */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10"
      >
        <img alt="Khelmanch" className="w-64 h-auto" src="/lovable-uploads/22ea2144-125f-46a5-87d6-79ed02f4a764.png" />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-8"
      >
        <div className="w-16 h-1 bg-accent rounded-full animate-pulse"></div>
      </motion.div>
    </div>
  );
}
