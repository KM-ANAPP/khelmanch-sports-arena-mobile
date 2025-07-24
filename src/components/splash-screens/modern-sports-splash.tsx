
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ModernSportsSplashProps {
  onComplete: () => void;
}

export default function ModernSportsSplash({ onComplete }: ModernSportsSplashProps) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const loadingTexts = [
    "Setting up your sports journey...",
    "Finding the best grounds...",
    "Loading tournaments...",
    "Almost ready..."
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setTimeout(() => onComplete(), 800);
          return 100;
        }
        return prev + 1.2;
      });
    }, 35);

    const textInterval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % loadingTexts.length);
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete, loadingTexts.length]);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
      {/* Blinkit-inspired gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, #FF6B35 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, #4ECDC4 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, #45B7D1 0%, transparent 50%),
            linear-gradient(135deg, #667eea 0%, #764ba2 100%)
          `
        }}
      />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating shapes inspired by Blinkit */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 120 + 40,
              height: Math.random() * 120 + 40,
              background: [
                'linear-gradient(45deg, #FF6B35, #FF8E35)',
                'linear-gradient(45deg, #4ECDC4, #44A08D)',
                'linear-gradient(45deg, #45B7D1, #96C93D)',
                'linear-gradient(45deg, #667eea, #764ba2)'
              ][Math.floor(Math.random() * 4)],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.1, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}

        {/* Dynamic overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(45deg, rgba(255,107,53,0.1), rgba(78,205,196,0.1))'
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main content container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center w-full max-w-sm mx-auto px-6"
      >
        {/* Logo with Blinkit-style animation */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.div
            className="relative inline-block"
            animate={{
              filter: [
                "drop-shadow(0 0 20px rgba(255,107,53,0.4))",
                "drop-shadow(0 0 30px rgba(78,205,196,0.6))",
                "drop-shadow(0 0 20px rgba(255,107,53,0.4))"
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
              className="h-20 w-auto mx-auto"
            />
            
            {/* Logo background glow */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-2xl"
              style={{
                background: 'linear-gradient(45deg, rgba(255,107,53,0.2), rgba(78,205,196,0.2))',
                filter: 'blur(20px)'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>

        {/* Brand name with typewriter effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-6"
        >
          <motion.h1 
            className="text-4xl font-black text-white mb-2"
            style={{
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              background: 'linear-gradient(45deg, #FFFFFF, #F0F0F0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            KHELMANCH
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="h-1 mx-auto rounded-full"
            style={{
              background: 'linear-gradient(90deg, #FF6B35, #4ECDC4, #45B7D1)',
              maxWidth: '200px'
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-lg font-semibold text-white/90 mb-12"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
        >
          Book. Play. Win.
        </motion.p>

        {/* Feature cards - Blinkit style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex justify-center space-x-4 mb-12"
        >
          {[
            { icon: "🏟️", label: "Grounds", color: "from-orange-400 to-red-500" },
            { icon: "🏆", label: "Tournaments", color: "from-teal-400 to-blue-500" },
            { icon: "💰", label: "Rewards", color: "from-green-400 to-teal-500" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex flex-col items-center justify-center shadow-lg`}
              animate={{
                y: [0, -8, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs text-white font-medium mt-1">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="space-y-4"
        >
          {/* Dynamic loading text */}
          <motion.p
            key={textIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-white/80 text-sm font-medium h-5"
          >
            {loadingTexts[textIndex]}
          </motion.p>

          {/* Progress bar */}
          <div className="relative w-64 h-2 mx-auto">
            {/* Background */}
            <div className="absolute inset-0 bg-white/20 rounded-full backdrop-blur-sm" />
            
            {/* Progress fill */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #FF6B35, #4ECDC4, #45B7D1)',
                width: `${progress}%`
              }}
              transition={{ duration: 0.1 }}
            />
            
            {/* Progress glow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #FF6B35, #4ECDC4, #45B7D1)',
                filter: 'blur(8px)',
                opacity: 0.6,
                width: `${progress}%`
              }}
            />
            
            {/* Moving highlight */}
            <motion.div
              className="absolute inset-y-0 w-8 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                left: `${Math.max(0, progress - 8)}%`,
              }}
              animate={{
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Progress percentage */}
          <motion.div
            className="text-white font-bold text-lg"
            animate={{
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {Math.round(progress)}%
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom decoration */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-0 right-0"
      >
        <div className="flex justify-center">
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  background: 'linear-gradient(45deg, #FF6B35, #4ECDC4)'
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
