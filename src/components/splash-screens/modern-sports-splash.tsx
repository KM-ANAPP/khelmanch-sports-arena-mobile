
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
      {/* Floating sports icons background - gentle movement */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-30 select-none"
            style={{
              left: `${10 + (i * 7)}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2],
              scale: [0.8, 1, 0.8],
            }}
            transition={{ 
              duration: 8 + (i * 0.5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8
            }}
          >
            {sportsIcons[i % sportsIcons.length]}
          </motion.div>
        ))}
      </div>

      {/* Secondary layer with slower animation */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`slow-${i}`}
            className="absolute text-3xl opacity-20 select-none"
            style={{
              left: `${20 + (i * 12)}%`,
              top: `${30 + Math.random() * 40}%`,
            }}
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 15 + (i * 2),
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {sportsIcons[(i + 10) % sportsIcons.length]}
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
