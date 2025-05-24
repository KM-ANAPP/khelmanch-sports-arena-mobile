
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Sport {
  id: string;
  name: string;
  icon: string;
  color: string;
  players: number;
  venues: number;
  events: number;
}

export function SportsPicker() {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const sports: Sport[] = [
    {
      id: "cricket",
      name: "Cricket",
      icon: "🏏",
      color: "from-green-400 to-emerald-600",
      players: 1247,
      venues: 89,
      events: 23
    },
    {
      id: "football",
      name: "Football",
      icon: "⚽",
      color: "from-orange-400 to-red-500",
      players: 2156,
      venues: 67,
      events: 31
    },
    {
      id: "basketball",
      name: "Basketball",
      icon: "🏀",
      color: "from-purple-400 to-pink-500",
      players: 893,
      venues: 45,
      events: 18
    },
    {
      id: "tennis",
      name: "Tennis",
      icon: "🎾",
      color: "from-yellow-400 to-orange-500",
      players: 654,
      venues: 34,
      events: 12
    },
    {
      id: "badminton",
      name: "Badminton",
      icon: "🏸",
      color: "from-blue-400 to-cyan-500",
      players: 567,
      venues: 28,
      events: 15
    },
    {
      id: "swimming",
      name: "Swimming",
      icon: "🏊",
      color: "from-teal-400 to-blue-500",
      players: 432,
      venues: 19,
      events: 8
    },
    {
      id: "volleyball",
      name: "Volleyball",
      icon: "🏐",
      color: "from-indigo-400 to-purple-500",
      players: 398,
      venues: 22,
      events: 11
    },
    {
      id: "table-tennis",
      name: "Table Tennis",
      icon: "🏓",
      color: "from-pink-400 to-rose-500",
      players: 321,
      venues: 31,
      events: 9
    }
  ];

  const handleSportClick = (sport: Sport) => {
    setSelectedSport(sport.id);
    
    // Navigate to sport-specific page with options
    navigate(`/sport/${sport.id}`, {
      state: {
        sportData: sport,
        options: [
          { type: 'events', label: 'Events', count: sport.events },
          { type: 'community', label: 'Community Players', count: sport.players },
          { type: 'venues', label: 'Book Venue', count: sport.venues }
        ]
      }
    });
  };

  return (
    <section className="py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Pick a Sport</h2>
        <Badge variant="secondary" className="text-xs bg-accent/20 text-accent border-accent/30">
          {sports.length} Sports Available
        </Badge>
      </div>
      
      {/* Hidden scrollbar container */}
      <div className="relative">
        <div 
          className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          <div className="flex gap-4" style={{ minWidth: "max-content" }}>
            {sports.map((sport, index) => (
              <motion.div
                key={sport.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0"
              >
                <Card 
                  className={`w-40 cursor-pointer transition-all duration-300 hover:shadow-lg border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm ${
                    selectedSport === sport.id ? 'ring-2 ring-accent' : ''
                  }`}
                  onClick={() => handleSportClick(sport)}
                >
                  <CardContent className="p-4 text-center">
                    {/* Sport Icon with animated background */}
                    <motion.div
                      className={`relative w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br ${sport.color} flex items-center justify-center`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-2xl filter drop-shadow-lg">
                        {sport.icon}
                      </span>
                      
                      {/* Pulse effect */}
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${sport.color} opacity-20`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                    
                    {/* Sport Name */}
                    <h3 className="font-semibold text-sm mb-2 text-white">{sport.name}</h3>
                    
                    {/* Stats */}
                    <div className="space-y-1 text-xs text-gray-300">
                      <div className="flex justify-between">
                        <span>Players:</span>
                        <span className="font-medium">{sport.players.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Venues:</span>
                        <span className="font-medium">{sport.venues}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Events:</span>
                        <span className="font-medium text-accent">{sport.events}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Colored scroll indicator dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === 0 ? 'bg-accent' : 
                i === 1 ? 'bg-secondary' : 'bg-primary'
              }`}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5] 
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
