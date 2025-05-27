
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ModernSportsSplashProps {
  onComplete: () => void;
}

export default function ModernSportsSplash({ onComplete }: ModernSportsSplashProps) {
  const [progress, setProgress] = useState(0);

  // Array of sports icons
  const sportsIcons = [
    "🏏", "⚽", "🏀", "🎾", "🏸", "🏊", "🏐", "🏓",
    "🏑", "🏈", "⚾", "🎱", "🏆", "🥇", "🎯", "🏹",
    "🚴", "🏃", "🤾", "🏋️"
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated sports icons background */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-40 select-none"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
            }}
            initial={{ 
              scale: 0,
              rotate: 0,
              opacity: 0
            }}
            animate={{ 
              scale: [0, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0, 0.6, 0.3, 0.6, 0],
              y: [-20, -40, -60],
              x: [0, Math.random() * 40 - 20, 0],
            }}
            transition={{ 
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          >
            {sportsIcons[Math.floor(Math.random() * sportsIcons.length)]}
          </motion.div>
        ))}
      </div>

      {/* Floating icons with different animation */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`float-${i}`}
            className="absolute text-4xl opacity-25 select-none"
            style={{
              left: `${10 + (i * 10)}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          >
            {sportsIcons[i % sportsIcons.length]}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <img 
            src="/lovable-uploads/cba4a2dc-5021-4756-98a0-b154222d7523.png" 
            alt="Khelmanch" 
            className="h-16 w-auto mx-auto"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg text-gray-300"
        >
          Your Ultimate Sports Arena
        </motion.p>
      </motion.div>
    </div>
  );
}
