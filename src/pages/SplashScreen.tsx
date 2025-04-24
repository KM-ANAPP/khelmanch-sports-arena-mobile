
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden relative">
      {/* Background animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-white/10 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ left: "20%", top: "30%" }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full bg-accent/20 blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ right: "25%", bottom: "20%" }}
        />
      </div>

      {/* Main logo animation */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: 1,
          rotate: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.8,
        }}
        className="relative z-10 mb-8"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img 
            alt="Khelmanch" 
            className="w-64 h-auto" 
            src="/lovable-uploads/22ea2144-125f-46a5-87d6-79ed02f4a764.png"
          />
        </motion.div>
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10"
      >
        <motion.div
          className="flex space-x-2"
          animate={{
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-white"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
