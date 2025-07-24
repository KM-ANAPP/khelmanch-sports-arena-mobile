
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
        return prev + 1.5;
      });
    }, 40);

    return () => {
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: '#1E2539' }}
    >
      {/* Dynamic background with floating particles */}
      <div className="absolute inset-0">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-emerald-600/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-40"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              backgroundColor: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'][Math.floor(Math.random() * 4)],
            }}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
              y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
              scale: 0
            }}
            animate={{ 
              y: -50,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
              scale: [0, 1, 0],
              transition: { 
                duration: Math.random() * 6 + 4,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 3
              }
            }}
          />
        ))}

        {/* Geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full"
          style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full"
          style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.05, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10 w-full max-w-md mx-auto px-6"
      >
        {/* Logo with glow effect */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <motion.div
            className="relative"
            animate={{
              filter: [
                "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))",
                "drop-shadow(0 0 30px rgba(59, 130, 246, 0.5))",
                "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src="/lovable-uploads/cba4a2dc-5021-4756-98a0-b154222d7523.png" 
              alt="Khelmanch" 
              className="h-24 w-auto mx-auto"
            />
          </motion.div>
        </motion.div>

        {/* Brand messaging */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-6 mb-16"
        >
          <motion.h1 
            className="text-3xl font-bold text-white"
            animate={{
              textShadow: [
                "0 0 10px rgba(255, 255, 255, 0.5)",
                "0 0 20px rgba(255, 255, 255, 0.3)",
                "0 0 10px rgba(255, 255, 255, 0.5)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Welcome to Khelmanch
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-200 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Book. Play. Win.
          </motion.p>
          <motion.p 
            className="text-sm text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Your premium sports booking platform
          </motion.p>
        </motion.div>

        {/* Modern progress indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="space-y-6"
        >
          <div className="relative">
            <div className="w-56 h-1 bg-white/20 rounded-full mx-auto overflow-hidden backdrop-blur-sm">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #10B981)'
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            {/* Progress glow */}
            <motion.div
              className="absolute inset-0 w-56 h-1 mx-auto rounded-full"
              style={{
                background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #10B981)',
                filter: 'blur(8px)',
                opacity: progress / 100 * 0.6
              }}
            />
          </div>
          
          <motion.div
            className="text-white/80 text-sm font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading Experience...
          </motion.div>
        </motion.div>

        {/* Floating action indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-0 right-0"
        >
          <div className="flex justify-center space-x-8 text-white/60">
            <motion.div
              className="flex flex-col items-center space-y-2"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center backdrop-blur-sm">
                <span className="text-xs">🏟️</span>
              </div>
              <span className="text-xs">Grounds</span>
            </motion.div>
            
            <motion.div
              className="flex flex-col items-center space-y-2"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center backdrop-blur-sm">
                <span className="text-xs">🏆</span>
              </div>
              <span className="text-xs">Tournaments</span>
            </motion.div>
            
            <motion.div
              className="flex flex-col items-center space-y-2"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center backdrop-blur-sm">
                <span className="text-xs">💰</span>
              </div>
              <span className="text-xs">Rewards</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
