import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Trophy, Medal } from "lucide-react";

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
    sports: "bg-gradient-to-br from-[#0EA5E9] via-[#1EAEDB] to-[#33C3F0]",
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
      scale: [0.9, 1.1, 0.9],
      rotate: [0, 5, -5, 0],
      transition: { 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    glass: {
      scale: [0.9, 1],
      opacity: [0.8, 1],
      filter: ["blur(4px)", "blur(0px)"]
    }
  };

  return (
    <div>
      <AnimatePresence>
        {loading && (
          <motion.div 
            className={`fixed inset-0 flex flex-col items-center justify-center ${variants[variant]} z-50`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-full max-w-md flex flex-col items-center">
              {variant === 'sports' && (
                <>
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="absolute top-[-50px] left-[20%]"
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Trophy className="w-8 h-8 text-white/80" />
                    </motion.div>
                    <motion.div
                      className="absolute top-[50%] right-[20%]"
                      animate={{
                        y: [0, 20, 0],
                        rotate: [0, -360],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Medal className="w-8 h-8 text-white/80" />
                    </motion.div>
                    <motion.div
                      className="absolute bottom-[-30px] left-[30%]"
                      animate={{
                        x: [0, 20, 0],
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Trophy className="w-8 h-8 text-white/80 rotate-12" />
                    </motion.div>
                  </motion.div>
                </>
              )}

              <motion.div
                className="relative mb-8"
                animate={logoVariants[variant]}
              >
                <div className={`relative z-10 rounded-full ${
                  variant === 'sports' ? 'bg-white/20 backdrop-blur-lg' : 'bg-background/5'
                }`}>
                  <div className="w-24 h-24 p-2 rounded-full overflow-hidden">
                    <img
                      src="/lovable-uploads/b593a4c0-9212-4029-a1ca-5e39bd91c535.png"
                      alt="Khelmanch Logo"
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                </div>
              </motion.div>

              {variant === 'sports' && (
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.h1 
                    className="text-4xl font-bold mb-2 text-white"
                    animate={{
                      scale: [1, 1.02, 1],
                      transition: { duration: 2, repeat: Infinity }
                    }}
                  >
                    KHEL<span className="text-white/80">MANCH</span>
                  </motion.h1>
                  <motion.p 
                    className="text-sm text-white/80"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                      transition: { duration: 3, repeat: Infinity }
                    }}
                  >
                    Your ultimate sports destination
                  </motion.p>
                </motion.div>
              )}

              {variant === 'sports' ? (
                <>
                  <motion.div 
                    className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mb-4"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "16rem", opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <motion.div
                      className="h-full bg-white rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ 
                        width: `${progress}%`,
                        transition: { duration: 0.3 }
                      }}
                    />
                  </motion.div>

                  <motion.div 
                    className="flex items-center text-sm text-white/80"
                    animate={{ 
                      opacity: [1, 0.7, 1],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                      }
                    }}
                  >
                    <Loader2 className="animate-spin mr-2 h-4 w-4 text-white" />
                    <span>Loading your sports experience</span>
                  </motion.div>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
