
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface ModernSportsSplashProps {
  onComplete: () => void;
}

export default function ModernSportsSplash({ onComplete }: ModernSportsSplashProps) {
  const { theme } = useTheme();

  useEffect(() => {
    // Auto redirect to login after 1.5 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Logo with bouncy animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 1.2, 1],
        }}
        transition={{ 
          duration: 0.8,
          times: [0, 0.6, 1],
          ease: "easeOut"
        }}
        className="flex items-center justify-center"
      >
        <motion.img
          src="/lovable-uploads/cba4a2dc-5021-4756-98a0-b154222d7523.png"
          alt="KHELMANCH"
          className="w-[400px] max-w-[90vw] h-auto object-contain"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
        />
      </motion.div>
    </div>
  );
}
