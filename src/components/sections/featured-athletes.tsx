
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Trophy, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Athlete {
  id: number;
  name: string;
  sport: string;
  location: string;
  rating: number;
  achievements: string;
  image: string;
  isVerified: boolean;
}

export const FeaturedAthletes = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const athletes: Athlete[] = [
    {
      id: 1,
      name: "Rahul Sharma",
      sport: "Cricket",
      location: "Mumbai, India",
      rating: 4.9,
      achievements: "State Level Champion",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1167&q=80",
      isVerified: true
    },
    {
      id: 2,
      name: "Priya Patel",
      sport: "Tennis",
      location: "Bangalore, India",
      rating: 4.8,
      achievements: "National Tournament Winner",
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
      isVerified: true
    },
    {
      id: 3,
      name: "Arjun Singh",
      sport: "Football",
      location: "Delhi, India",
      rating: 4.7,
      achievements: "District Level Captain",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
      isVerified: true
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % athletes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, athletes.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    
    // Resume auto-play after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <section className="py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Featured Athletes</h2>
        <Badge variant="secondary" className="text-xs bg-accent/20 text-accent border-accent/30">
          Live Now
        </Badge>
      </div>
      
      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative h-64 w-full"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{ backgroundImage: `url(${athletes[currentSlide].image})` }}
            />
            
            {/* Modern Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            
            {/* Animated Background Elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-8 right-8 w-16 h-16 bg-secondary/10 rounded-full blur-lg animate-pulse delay-1000" />
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6">
              <div className="space-y-3">
                {/* Sport Badge */}
                <Badge className="bg-accent/90 text-black font-semibold w-fit">
                  {athletes[currentSlide].sport}
                </Badge>
                
                {/* Name and Verification */}
                <div className="flex items-center space-x-2">
                  <h3 className="text-2xl font-bold text-white">
                    {athletes[currentSlide].name}
                  </h3>
                  {athletes[currentSlide].isVerified && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Details */}
                <div className="flex items-center space-x-4 text-sm text-gray-200">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{athletes[currentSlide].location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{athletes[currentSlide].rating}</span>
                  </div>
                </div>
                
                {/* Achievement */}
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-accent" />
                  <span className="text-accent font-medium text-sm">
                    {athletes[currentSlide].achievements}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Play Button Overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Button
                size="icon"
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110"
              >
                <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {athletes.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-accent w-6'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4, ease: "linear" }}
            key={currentSlide}
          />
        </div>
      </div>
    </section>
  );
};
