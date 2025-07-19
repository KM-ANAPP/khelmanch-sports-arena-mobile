
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ModernSportsSplashProps {
  onComplete: () => void;
}

export default function ModernSportsSplash({ onComplete }: ModernSportsSplashProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          onComplete();
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Corporate geometric background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
      
      {/* Floating elements for commercial feel */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24 border border-emerald-400/20 rounded-2xl"
            style={{
              left: `${20 + (i % 3) * 30}%`,
              top: `${15 + Math.floor(i / 3) * 25}%`,
            }}
            initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
            animate={{ 
              rotate: 360,
              scale: [0.8, 1.1, 0.8],
              opacity: [0, 0.3, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10 w-full max-w-md mx-auto px-6"
      >
        {/* Logo */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full scale-150"></div>
            <img 
              src="/lovable-uploads/cba4a2dc-5021-4756-98a0-b154222d7523.png" 
              alt="Khelmanch" 
              className="h-16 sm:h-20 w-auto mx-auto relative z-10 drop-shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Commercial tagline */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-3"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Professional Sports Platform
          </h1>
          <p className="text-emerald-100/80 text-base leading-relaxed">
            Book tournaments, find venues & connect with players
          </p>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 space-y-3"
        >
          <div className="w-32 h-1 bg-emerald-900/50 rounded-full mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-emerald-200/60 text-sm font-medium">Loading Platform</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
