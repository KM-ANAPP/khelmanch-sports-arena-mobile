
import { useState } from 'react';
import { ModernSplashScreen } from '@/components/splash-screens/modern-splash-screen';
import AnimatedSplashScreen from '@/components/animated-splash-screen';
import SportsAnimatedSplashScreen from '@/components/sports-animated-splash-screen';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function SplashScreenShowcase() {
  const [activeVariant, setActiveVariant] = useState<'animated' | 'sports' | 'gradient' | 'particle' | 'morphing' | 'glass'>('sports');
  const [isPlaying, setIsPlaying] = useState(true);

  const variants = [
    { id: 'animated', name: 'Circular Animation' },
    { id: 'sports', name: 'Sports Animation' },
    { id: 'gradient', name: 'Minimalist Gradient' },
    { id: 'particle', name: 'Particle Animation' },
    { id: 'morphing', name: 'Morphing Shapes' },
    { id: 'glass', name: 'Glass-morphism' },
  ] as const;

  const handleComplete = () => {
    setIsPlaying(false);
  };

  const handleReplay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Controls */}
      <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2">
        {variants.map((variant) => (
          <Button
            key={variant.id}
            onClick={() => {
              setActiveVariant(variant.id);
              setIsPlaying(true);
            }}
            variant={activeVariant === variant.id ? "secondary" : "outline"}
            className="whitespace-nowrap"
          >
            {variant.name}
          </Button>
        ))}
      </div>

      {/* Replay Button */}
      {!isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <Button 
            onClick={handleReplay}
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Replay Animation
          </Button>
        </motion.div>
      )}

      {/* Active Splash Screen */}
      {isPlaying && activeVariant === 'animated' ? (
        <AnimatedSplashScreen onComplete={handleComplete} />
      ) : isPlaying && activeVariant === 'sports' ? (
        <SportsAnimatedSplashScreen onComplete={handleComplete} />
      ) : isPlaying && (
        <ModernSplashScreen
          variant={activeVariant as 'gradient' | 'particle' | 'morphing' | 'glass'}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
}
