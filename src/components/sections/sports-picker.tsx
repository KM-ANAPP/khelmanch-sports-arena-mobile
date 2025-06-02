
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Sport {
  id: string;
  name: string;
  icon: string;
  modernIcon: string;
  color: string;
  players: number;
  venues: number;
  events: number;
}

export function SportsPicker() {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const sports: Sport[] = [
    {
      id: "cricket",
      name: "Cricket",
      icon: "🏏",
      modernIcon: "⚡",
      color: "from-emerald-400 via-green-500 to-teal-600",
      players: 1247,
      venues: 89,
      events: 23
    },
    {
      id: "football",
      name: "Football",
      icon: "⚽",
      modernIcon: "🔥",
      color: "from-orange-400 via-red-500 to-pink-600",
      players: 2156,
      venues: 67,
      events: 31
    },
    {
      id: "basketball",
      name: "Basketball",
      icon: "🏀",
      modernIcon: "💫",
      color: "from-purple-400 via-violet-500 to-indigo-600",
      players: 893,
      venues: 45,
      events: 18
    },
    {
      id: "tennis",
      name: "Tennis",
      icon: "🎾",
      modernIcon: "✨",
      color: "from-yellow-400 via-amber-500 to-orange-600",
      players: 654,
      venues: 34,
      events: 12
    },
    {
      id: "badminton",
      name: "Badminton",
      icon: "🏸",
      modernIcon: "💎",
      color: "from-cyan-400 via-blue-500 to-indigo-600",
      players: 567,
      venues: 28,
      events: 15
    },
    {
      id: "swimming",
      name: "Swimming",
      icon: "🏊",
      modernIcon: "🌊",
      color: "from-teal-400 via-cyan-500 to-blue-600",
      players: 432,
      venues: 19,
      events: 8
    },
    {
      id: "volleyball",
      name: "Volleyball",
      icon: "🏐",
      modernIcon: "⭐",
      color: "from-indigo-400 via-purple-500 to-violet-600",
      players: 398,
      venues: 22,
      events: 11
    },
    {
      id: "table-tennis",
      name: "Table Tennis",
      icon: "🏓",
      modernIcon: "🎯",
      color: "from-pink-400 via-rose-500 to-red-600",
      players: 321,
      venues: 31,
      events: 9
    }
  ];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(sports.length / itemsPerPage);

  const handleSportClick = (sport: Sport) => {
    setSelectedSport(sport.id);
    
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

  const scrollToPage = (pageIndex: number) => {
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollPosition = (scrollWidth / totalPages) * pageIndex;
      
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentPage(pageIndex);
    }
  };

  return (
    <section className="py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Pick a Sport</h2>
        <Badge variant="secondary" className="text-xs bg-accent/20 text-accent border-accent/30">
          {sports.length} Sports Available
        </Badge>
      </div>
      
      <div className="relative">
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <style>
            {`
              .sports-picker-container::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          
          <div className="flex gap-4 sports-picker-container" style={{ minWidth: "max-content" }}>
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
                    <motion.div
                      className={`relative w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br ${sport.color} flex items-center justify-center shadow-xl`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="relative z-10 flex items-center justify-center">
                        <span className="text-2xl filter drop-shadow-lg">
                          {sport.icon}
                        </span>
                        <span className="absolute -top-1 -right-1 text-lg animate-pulse">
                          {sport.modernIcon}
                        </span>
                      </div>
                      
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${sport.color} opacity-20`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                    
                    <h3 className="font-semibold text-sm mb-2 text-white">{sport.name}</h3>
                    
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
        
        <div className="flex justify-center mt-4 space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <motion.button
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentPage 
                  ? 'bg-accent scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              onClick={() => scrollToPage(i)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
