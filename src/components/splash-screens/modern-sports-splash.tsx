
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModernSportsSplashProps {
  onComplete?: () => void;
}

export default function ModernSportsSplash({ onComplete }: ModernSportsSplashProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, 3000); // Show for 3 seconds
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          className="fixed inset-0 flex flex-col items-center justify-center z-50"
          style={{ backgroundColor: '#1E2539' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-full max-w-md flex flex-col items-center">
            {/* Logo Container */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative z-10 rounded-full">
                <div className="w-24 h-24 p-1 rounded-full">
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
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.h1 
                className="text-3xl font-bold mb-4 text-white"
              >
                KHEL<span className="opacity-80">MANCH</span>
              </motion.h1>
              <motion.p 
                className="text-lg text-white/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                Your ultimate sports arena
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
