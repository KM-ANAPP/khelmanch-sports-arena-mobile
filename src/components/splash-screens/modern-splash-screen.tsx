
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ModernSplashScreenProps {
  variant: 'gradient' | 'particle' | 'morphing' | 'sports' | 'glass';
  onComplete?: () => void;
}

export function ModernSplashScreen({ variant, onComplete }: ModernSplashScreenProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + 1, 100));
      } else {
        setTimeout(() => {
          setLoading(false);
          if (onComplete) onComplete();
        }, 500);
      }
    }, 30);
    return () => clearTimeout(timer);
  }, [progress, onComplete]);

  const variants = {
    gradient: "bg-gradient-to-br from-primary via-secondary to-accent",
    particle: "bg-[#1a1a1c]",
    morphing: "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
    sports: "bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800",
    glass: "bg-white/10 backdrop-blur-xl"
  };

  const logoVariants = {
    gradient: { scale: [0.8, 1], opacity: [0, 1] },
    particle: { rotate: [0, 360], scale: [0.8, 1] },
    morphing: { 
      scale: [1, 1.1, 1], 
      opacity: [0.8, 1, 0.8],
      transition: { repeat: Infinity, duration: 2 }
    },
    sports: { 
      y: [0, -10, 0],
      transition: { repeat: Infinity, duration: 1.5 }
    },
    glass: {
      scale: [0.9, 1],
      opacity: [0.8, 1],
      filter: ["blur(4px)", "blur(0px)"]
    }
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          className={`fixed inset-0 flex flex-col items-center justify-center ${variants[variant]} z-50`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-full max-w-md flex flex-col items-center">
            {/* Logo Container */}
            <motion.div
              className="relative mb-8"
              animate={logoVariants[variant]}
            >
              {/* Particle Effects for particle variant */}
              {variant === 'particle' && (
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/30 rounded-full"
                      animate={{
                        x: Math.random() * 200 - 100,
                        y: Math.random() * 200 - 100,
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: Math.random() * 2 + 1,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                      style={{
                        left: `${50 + Math.random() * 20 - 10}%`,
                        top: `${50 + Math.random() * 20 - 10}%`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Glass effect for glass variant */}
              {variant === 'glass' && (
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-full blur-lg"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}

              {/* Logo */}
              <div className={`relative z-10 rounded-full ${
                variant === 'glass' ? 'bg-white/10 backdrop-blur-xl' : 'bg-background/5'
              }`}>
                <div className="w-20 h-20 p-1 rounded-full">
                  <img
                    src="/lovable-uploads/b593a4c0-9212-4029-a1ca-5e39bd91c535.png"
                    alt="Khelmanch Logo"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.h1 
                className={`text-3xl font-bold mb-2 ${
                  variant === 'glass' ? 'text-white' : 'text-accent'
                }`}
              >
                KHEL<span className="opacity-80">MANCH</span>
              </motion.h1>
              <motion.p 
                className={`text-sm ${
                  variant === 'glass' ? 'text-white/80' : 'text-accent/80'
                }`}
              >
                Your ultimate sports destination
              </motion.p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div 
              className="w-64 h-1.5 bg-white/20 rounded-full overflow-hidden mb-4"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "16rem", opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className={`h-full rounded-full ${
                  variant === 'glass' ? 'bg-white' : 'bg-accent'
                }`}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
              />
            </motion.div>

            {/* Loading Text */}
            <motion.div 
              className={`flex items-center text-sm ${
                variant === 'glass' ? 'text-white/80' : 'text-accent/80'
              }`}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [1, 0.5, 1],
                transition: {
                  opacity: {
                    duration: 1.5,
                    repeat: Infinity,
                  }
                }
              }}
            >
              <Loader2 className={`animate-spin mr-2 h-4 w-4 ${
                variant === 'glass' ? 'text-white' : 'text-accent'
              }`} />
              <span>Loading your experience</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
