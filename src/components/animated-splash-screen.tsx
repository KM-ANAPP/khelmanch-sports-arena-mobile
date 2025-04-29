
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface AnimatedSplashScreenProps {
  onComplete?: () => void;
}

export default function AnimatedSplashScreen({ onComplete }: AnimatedSplashScreenProps) {
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

  return (
    <AnimatePresence>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full h-full bg-black absolute">
            <div className="w-full h-full flex flex-col items-center justify-center">
              {/* SVG Animation Container */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-40 h-40 mb-8"
              >
                {/* Animation inspired by https://codepen.io/dok/pen/BgjpMK */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#0EA5E9" />
                    </filter>
                  </defs>
                  
                  {/* Background Circle */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="#111" 
                    stroke="#333" 
                    strokeWidth="2" 
                  />
                  
                  {/* Animated Circles */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    stroke="#0EA5E9"
                    strokeWidth="4"
                    strokeDasharray="126"
                    strokeDashoffset="126"
                    filter="url(#shadow)"
                    animate={{ 
                      strokeDashoffset: [126, 0],
                      rotate: [0, 720],
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                    style={{ transformOrigin: "center" }}
                  />

                  <motion.circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke="#0EA5E9"
                    strokeWidth="3"
                    strokeDasharray="220"
                    strokeDashoffset="220"
                    filter="url(#shadow)"
                    animate={{ 
                      strokeDashoffset: [220, 0],
                      rotate: [0, -360],
                    }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: 0.2,
                    }}
                    style={{ transformOrigin: "center" }}
                  />

                  {/* Logo in center */}
                  <foreignObject x="25" y="25" width="50" height="50">
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src="/lovable-uploads/b593a4c0-9212-4029-a1ca-5e39bd91c535.png"
                        alt="Khelmanch Logo"
                        className="w-10 h-10 object-contain rounded-full"
                      />
                    </div>
                  </foreignObject>
                </svg>
              </motion.div>

              {/* Brand Name */}
              <motion.h1 
                className="text-4xl font-bold mb-2 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                KHEL<span className="text-blue-500">MANCH</span>
              </motion.h1>

              {/* Loading Bar */}
              <motion.div 
                className="w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden mt-4"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "16rem", opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.div
                  className="h-full bg-blue-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                />
              </motion.div>

              {/* Loading Text */}
              <motion.div
                className="flex items-center text-sm text-gray-400 mt-4"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                  }
                }}
              >
                <Loader2 className="animate-spin mr-2 h-4 w-4 text-blue-500" />
                <span>Loading your sports experience</span>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
