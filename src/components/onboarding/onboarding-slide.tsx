
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OnboardingSlideProps {
  title: string;
  description: string;
  imageUrls: string[];
  currentIndex: number;
  totalSlides: number;
  onNext: () => void;
  onSkip: () => void;
}

export function OnboardingSlide({
  title,
  description,
  imageUrls,
  currentIndex,
  totalSlides,
  onNext,
  onSkip,
}: OnboardingSlideProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen bg-background text-foreground"
    >
      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={onSkip}
        className="absolute top-14 right-6 text-primary font-semibold z-10"
      >
        Skip
      </motion.button>

      {/* Images Section with Overlap Effect */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <motion.div 
          className="absolute inset-0 flex justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {imageUrls.map((url, index) => (
            <motion.div
              key={url}
              className={cn(
                "absolute w-1/2 h-full",
                index === 0 && "left-0",
                index === 1 && "left-1/4",
                index === 2 && "right-0"
              )}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
            >
              <img
                src={url}
                alt={`Onboarding image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="px-8 pt-8 text-center"
      >
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </motion.div>

      {/* Navigation Dots */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <motion.div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full",
              currentIndex === index ? "bg-primary" : "bg
-muted"
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          />
        ))}
      </div>

      {/* Next Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-16 left-0 right-0 px-8"
      >
        <Button 
          className="w-full" 
          onClick={onNext}
        >
          {currentIndex === totalSlides - 1 ? "Get Started" : "Next"}
        </Button>
      </motion.div>
    </motion.div>
  );
}
