
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Athlete {
  id: number;
  name: string;
  image: string;
  sport: string;
  tournamentId: number;
}

export const FeaturedAthletes = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const athletes = [
    {
      id: 1,
      name: "Cricket Star",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80",
      sport: "Cricket",
      tournamentId: 1
    },
    {
      id: 2,
      name: "Football Legend",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      sport: "Football",
      tournamentId: 2
    },
    {
      id: 3,
      name: "Tennis Champion",
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      sport: "Tennis",
      tournamentId: 3
    }
  ];
  
  const navigateToTournament = (tournamentId: number) => {
    navigate(`/tournaments/${tournamentId}`);
  };

  return (
    <div className="relative">
      <Carousel 
        className="w-full"
        onSelect={(index) => setActiveIndex(index)}
      >
        <CarouselContent>
          {athletes.map((athlete, index) => (
            <CarouselItem key={athlete.id}>
              <motion.div 
                className="relative h-64 overflow-hidden rounded-xl cursor-pointer"
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateToTournament(athlete.tournamentId)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={athlete.image} 
                  alt={athlete.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white text-xl font-bold">{athlete.name}</h3>
                  <p className="text-white/90">{athlete.sport}</p>
                  
                  {/* Interactive indicator */}
                  <div className="absolute top-3 right-3 bg-accent/70 text-accent-foreground text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                    Tap to view
                  </div>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      
      {/* Indicator dots */}
      <div className="flex justify-center mt-2 space-x-1">
        {athletes.map((_, index) => (
          <div 
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-4 bg-accent" : "w-1.5 bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
