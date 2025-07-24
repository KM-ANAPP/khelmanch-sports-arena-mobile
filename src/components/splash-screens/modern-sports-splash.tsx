
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModernSportsSplashProps {
  onComplete: () => void;
}

export default function ModernSportsSplash({ onComplete }: ModernSportsSplashProps) {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);

  const phases = [
    "Initializing Experience...",
    "Loading Sports Venues...",
    "Preparing Tournaments...",
    "Setting Up Your Dashboard...",
    "Almost Ready..."
  ];

  useEffect(() => {
    // Logo animation sequence
    setTimeout(() => setShowLogo(true), 500);
    setTimeout(() => setShowText(true), 1200);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 0.8;
        
        // Update phase based on progress
        const phaseIndex = Math.floor((newProgress / 100) * phases.length);
        setCurrentPhase(Math.min(phaseIndex, phases.length - 1));
        
        if (newProgress >= 100) {
          setTimeout(() => onComplete(), 1000);
          return 100;
        }
        return newProgress;
      });
    }, 30);

    return () => {
      clearInterval(progressInterval);
    };
  }, [onComplete, phases.length]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ultra-modern gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            conic-gradient(from 0deg at 50% 50%, 
              #6366f1 0deg, 
              #8b5cf6 60deg, 
              #ec4899 120deg, 
              #f59e0b 180deg, 
              #10b981 240deg, 
              #3b82f6 300deg, 
              #6366f1 360deg
            )
          `
        }}
      />

      {/* Animated mesh overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(255,255,255,0.05) 0%, transparent 50%)
          `
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
             radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
             radial-gradient(circle at 40% 60%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
             radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
             radial-gradient(circle at 60% 40%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
            `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
             radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
             radial-gradient(circle at 40% 60%, rgba(255,255,255,0.05) 0%, transparent 50%)`
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating geometric elements */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          >
            <div 
              className="w-4 h-4 rounded-full bg-white/20 backdrop-blur-sm"
              style={{
                boxShadow: '0 0 20px rgba(255,255,255,0.3)'
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        
        {/* Logo section */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.175, 0.885, 0.32, 1.275],
                type: "spring",
                stiffness: 100
              }}
              className="mb-12"
            >
              <motion.div
                className="relative"
                animate={{
                  rotateY: [0, 15, -15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Logo glow effect */}
                <motion.div
                  className="absolute inset-0 -z-10"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.img 
                  src="/lovable-uploads/cba4a2dc-5021-4756-98a0-b154222d7523.png" 
                  alt="Khelmanch" 
                  className="h-24 w-auto"
                  animate={{
                    filter: [
                      "drop-shadow(0 0 30px rgba(255,255,255,0.8))",
                      "drop-shadow(0 0 50px rgba(255,255,255,1))",
                      "drop-shadow(0 0 30px rgba(255,255,255,0.8))"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Brand text */}
        <AnimatePresence>
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center mb-16"
            >
              <motion.h1 
                className="text-6xl font-black mb-4 text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(45deg, #ffffff, #f8fafc, #ffffff)',
                  backgroundSize: '200% 200%',
                  textShadow: '0 0 50px rgba(255,255,255,0.5)'
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                KHELMANCH
              </motion.h1>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                className="h-1 bg-gradient-to-r from-transparent via-white to-transparent mb-6 mx-auto"
                style={{ maxWidth: '300px' }}
              />
              
              <motion.p 
                className="text-2xl font-bold text-white/90 mb-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
              >
                BOOK. PLAY. WIN.
              </motion.p>
              
              <motion.p 
                className="text-lg text-white/70 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                Premium Sports Experience
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive feature preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex space-x-6 mb-16"
        >
          {[
            { icon: "🏟️", title: "Venues", color: "from-blue-500 to-cyan-500", delay: 0 },
            { icon: "🏆", title: "Tournaments", color: "from-purple-500 to-pink-500", delay: 0.2 },
            { icon: "💎", title: "Rewards", color: "from-green-500 to-emerald-500", delay: 0.4 }
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`relative group cursor-pointer`}
              animate={{
                y: [0, -10, 0],
                rotateY: [0, 15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.1, rotateY: 25 }}
            >
              <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${item.color} flex flex-col items-center justify-center shadow-2xl backdrop-blur-sm border border-white/20`}>
                <motion.span 
                  className="text-2xl mb-1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: item.delay }}
                >
                  {item.icon}
                </motion.span>
                <span className="text-xs text-white font-bold">{item.title}</span>
              </div>
              
              {/* Glow effect */}
              <motion.div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
                style={{ filter: 'blur(20px)', zIndex: -1 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Advanced progress section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="w-full max-w-md space-y-6"
        >
          {/* Phase indicator */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-white/90 text-lg font-semibold mb-2">
                {phases[currentPhase]}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar container */}
          <div className="relative">
            {/* Background track */}
            <div className="w-full h-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20" />
            
            {/* Progress fill */}
            <motion.div
              className="absolute top-0 left-0 h-2 rounded-full overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="w-full h-full bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-green-400" />
              
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: '50%' }}
              />
            </motion.div>
            
            {/* Progress glow */}
            <motion.div
              className="absolute -inset-1 rounded-full opacity-50"
              style={{
                background: `linear-gradient(90deg, 
                  rgba(59, 130, 246, 0.5) 0%, 
                  rgba(147, 51, 234, 0.5) 25%,
                  rgba(236, 72, 153, 0.5) 50%,
                  rgba(16, 185, 129, 0.5) 100%)`,
                filter: 'blur(8px)',
                width: `${progress}%`
              }}
            />
          </div>

          {/* Progress percentage */}
          <motion.div
            className="text-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <span className="text-3xl font-black text-white">
              {Math.round(progress)}%
            </span>
          </motion.div>
        </motion.div>

        {/* Bottom animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex space-x-3">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-white/60"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
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
        </motion.div>
      </div>
    </div>
  );
}
