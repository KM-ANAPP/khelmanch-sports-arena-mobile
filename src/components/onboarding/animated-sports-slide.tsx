
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedSportsSlideProps {
  title: string;
  description: string;
  sportName: string;
  sportIcon: string;
  sportColor: string;
  currentIndex: number;
  totalSlides: number;
  onNext: () => void;
  onSkip: () => void;
}

export function AnimatedSportsSlide({
  title,
  description,
  sportName,
  sportIcon,
  sportColor,
  currentIndex,
  totalSlides,
  onNext,
  onSkip,
}: AnimatedSportsSlideProps) {
  console.log("AnimatedSportsSlide rendered with index:", currentIndex);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full opacity-20`}
            style={{ backgroundColor: sportColor }}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400), 
              y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50 
            }}
            animate={{ 
              y: -50,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
              transition: { 
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }
            }}
          />
        ))}
      </div>

      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={(e) => {
          e.preventDefault();
          console.log("Skip button clicked");
          onSkip();
        }}
        className="absolute top-14 right-6 text-white font-semibold z-20 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors"
      >
        Skip
      </motion.button>

      {/* Main Sport Animation */}
      <div className="flex flex-col items-center justify-center min-h-screen px-8">
        {/* Large animated sport icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-9xl filter drop-shadow-2xl"
            style={{ color: sportColor }}
          >
            {sportIcon}
          </motion.div>
        </motion.div>

        {/* Sport name with animated background */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative mb-6"
        >
          <motion.div
            animate={{ 
              background: [
                `linear-gradient(45deg, ${sportColor}40, transparent)`,
                `linear-gradient(45deg, transparent, ${sportColor}40)`,
                `linear-gradient(45deg, ${sportColor}40, transparent)`
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl blur-xl"
          />
          <h2 className="relative text-3xl font-bold px-6 py-3 rounded-2xl backdrop-blur-sm border border-white/20">
            {sportName}
          </h2>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-2xl font-bold mb-4 text-center"
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-gray-300 text-sm leading-relaxed text-center max-w-sm mb-12"
        >
          {description}
        </motion.p>

        {/* Navigation Dots */}
        <div className="flex space-x-2 mb-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <motion.div
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                currentIndex === index ? "bg-white scale-125" : "bg-white/30"
              )}
              initial={{ scale: 0 }}
              animate={{ scale: currentIndex === index ? 1.25 : 1 }}
              transition={{ delay: 1.1 + index * 0.1 }}
            />
          ))}
        </div>

        {/* Next Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="w-full max-w-sm"
        >
          <Button 
            className="w-full bg-white text-black hover:bg-gray-100 font-semibold py-3 text-lg rounded-xl" 
            onClick={(e) => {
              e.preventDefault();
              console.log("Next button clicked from slide:", currentIndex);
              onNext();
            }}
            type="button"
          >
            {currentIndex === totalSlides - 1 ? "Get Started" : "Next"}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
