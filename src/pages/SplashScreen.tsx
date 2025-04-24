
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shimmer } from "@/components/ui/shimmer";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary overflow-hidden relative">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-secondary/20 backdrop-blur-xl"
            initial={{ scale: 0, x: Math.random() * 100 - 50 }}
            animate={{
              scale: [1, 1.2, 1],
              x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
              y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              width: `${100 + i * 30}px`,
              height: `${100 + i * 30}px`,
              left: `${20 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Main logo with enhanced animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1,
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.8,
        }}
        className="relative z-10 mb-12"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotateZ: [0, 2, -2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <img 
            alt="Khelmanch" 
            className="w-72 h-auto drop-shadow-[0_0_15px_rgba(30,174,219,0.5)]" 
            src="/lovable-uploads/22ea2144-125f-46a5-87d6-79ed02f4a764.png"
          />
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle, rgba(30,174,219,0.2) 0%, rgba(30,174,219,0) 70%)",
                "radial-gradient(circle, rgba(30,174,219,0.3) 0%, rgba(30,174,219,0) 70%)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Loading animation with enhanced dots */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 space-y-4 flex flex-col items-center"
      >
        <div className="flex space-x-3">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 rounded-full bg-secondary"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        <Shimmer className="w-40 h-2 rounded-full bg-secondary/20" />
      </motion.div>
    </div>
  );
}
