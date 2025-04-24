
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shimmer } from "@/components/ui/shimmer";
import { LoaderCircle } from "lucide-react";

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
      {/* Subtle gradient background animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-secondary/10 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
            style={{
              width: `${20 + i * 10}px`,
              height: `${20 + i * 10}px`,
              left: `${10 + i * 12}%`,
              top: `${20 + i * 8}%`,
            }}
          />
        ))}
      </div>

      {/* Main logo with subtle animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="relative z-10 mb-12"
      >
        <motion.div
          animate={{
            scale: [0.98, 1.02, 0.98],
            rotate: [-1, 1, -1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <img 
            alt="Khelmanch" 
            className="w-72 h-auto drop-shadow-[0_0_20px_rgba(30,174,219,0.3)]" 
            src="/lovable-uploads/22ea2144-125f-46a5-87d6-79ed02f4a764.png"
          />
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle, rgba(30,174,219,0.1) 0%, rgba(30,174,219,0) 70%)",
                "radial-gradient(circle, rgba(30,174,219,0.2) 0%, rgba(30,174,219,0) 70%)",
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

      {/* Loading indicator with shimmer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 space-y-4 flex flex-col items-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="text-secondary mb-4"
        >
          <LoaderCircle size={32} />
        </motion.div>
        
        <div className="w-40">
          <Shimmer className="h-1.5 rounded-full bg-secondary/20" />
        </div>
      </motion.div>
    </div>
  );
}
