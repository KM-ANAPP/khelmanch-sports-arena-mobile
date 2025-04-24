
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoaderCircle } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [animationStep, setAnimationStep] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    // Animation sequence
    const timer1 = setTimeout(() => setAnimationStep(1), 1000); // Logo appears
    const timer2 = setTimeout(() => setAnimationStep(2), 2000); // Logo animation
    const timer3 = setTimeout(() => setAnimationStep(3), 3000); // Text appears
    const timer4 = setTimeout(() => {
      setAnimationStep(4); // Final state
      onComplete(); // Transition to login page
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-primary overflow-hidden">
      <AnimatePresence>
        {/* Initial loading spinner */}
        {animationStep === 0 && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <LoaderCircle className="h-12 w-12 text-secondary animate-spin mb-4" />
            <motion.div className="w-64 h-2 bg-primary/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-secondary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ type: "spring", stiffness: 50 }}
              />
            </motion.div>
            <motion.p
              className="text-secondary/70 mt-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Loading resources...
            </motion.p>
          </motion.div>
        )}

        {/* Logo appears */}
        {animationStep >= 1 && (
          <motion.div
            key="logo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: animationStep === 2 ? 1.1 : 1,
              opacity: 1,
              y: animationStep === 3 ? -40 : 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              scale: { type: "spring", stiffness: 200, damping: 15 },
            }}
            className="absolute flex items-center justify-center"
          >
            <AppLogo />
          </motion.div>
        )}

        {/* Text appears */}
        {animationStep >= 3 && (
          <motion.div
            key="text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute mt-32 text-center"
          >
            <h1 className="text-3xl font-bold text-white mb-2">Khelmanch</h1>
            <p className="text-secondary/70">Your Sports Community</p>
          </motion.div>
        )}

        {/* Background elements */}
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <BackgroundElements />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AppLogo() {
  return (
    <motion.div
      className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-lg"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        delay: 1.5,
        duration: 1.5,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="absolute inset-2 rounded-xl bg-primary flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.8, duration: 0.5, type: "spring" }}
      >
        <motion.img
          src="/lovable-uploads/22ea2144-125f-46a5-87d6-79ed02f4a764.png"
          alt="Khelmanch Logo"
          className="w-24 h-24 object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        />
      </motion.div>
    </motion.div>
  );
}

function BackgroundElements() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />

      {/* Animated circles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-secondary/10 backdrop-blur-sm"
          style={{
            width: `${Math.random() * 200 + 50}px`,
            height: `${Math.random() * 200 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{
            scale: 0,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
          }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 0.2, 0],
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
}
