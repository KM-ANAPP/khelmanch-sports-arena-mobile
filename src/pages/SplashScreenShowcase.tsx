
import { useState } from 'react';
import { ModernSplashScreen } from '@/components/splash-screens/modern-splash-screen';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function SplashScreenShowcase() {
  const [activeVariant, setActiveVariant] = useState<'gradient' | 'particle' | 'morphing' | 'sports' | 'glass'>('gradient');
  const [isPlaying, setIsPlaying] = useState(true);

  const variants = [
    { id: 'gradient', name: 'Minimalist Gradient' },
    { id: 'particle', name: 'Particle Animation' },
    { id: 'morphing', name: 'Morphing Shapes' },
    { id: 'sports', name: 'Sports Dynamic' },
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
      {isPlaying && (
        <ModernSplashScreen
          variant={activeVariant}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
}
