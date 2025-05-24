
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ModernSportsSplashProps {
  onComplete: () => void;
}

export default function ModernSportsSplash({ onComplete }: ModernSportsSplashProps) {
  const [progress, setProgress] = useState(0);
  const [currentSport, setCurrentSport] = useState(0);

  const sports = [
    { name: "Cricket", icon: "🏏", color: "from-green-400 to-blue-500" },
    { name: "Football", icon: "⚽", color: "from-orange-400 to-red-500" },
    { name: "Basketball", icon: "🏀", color: "from-purple-400 to-pink-500" },
    { name: "Tennis", icon: "🎾", color: "from-yellow-400 to-orange-500" }
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

    const sportInterval = setInterval(() => {
      setCurrentSport(prev => (prev + 1) % sports.length);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(sportInterval);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              y: -100,
              transition: { 
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          />
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

        {/* Animated sport icons */}
        <motion.div
          key={currentSport}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ duration: 0.5 }}
          className={`text-8xl mb-6 bg-gradient-to-r ${sports[currentSport].color} bg-clip-text text-transparent`}
        >
          {sports[currentSport].icon}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl font-bold text-white mb-2"
        >
          Welcome to Khelmanch
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg text-gray-300 mb-8"
        >
          Your Ultimate Sports Arena
        </motion.p>

        {/* Current sport name */}
        <motion.div
          key={`sport-${currentSport}`}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xl text-white font-semibold mb-8"
        >
          {sports[currentSport].name}
        </motion.div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="absolute bottom-20 bg-gray-700 h-1 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Progress text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="absolute bottom-12 text-gray-400 text-sm"
      >
        Loading {progress}%
      </motion.div>
    </div>
  );
}
