
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, TrendingUp, Clock, Trophy, Zap, Sparkles, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface Tournament {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  price: number;
  registrationOpen: boolean;
  trending: boolean;
  sport: string;
  prize: string;
}

export const UpcomingTournaments = () => {
  const navigate = useNavigate();
  
  const tournaments: Tournament[] = [
    {
      id: 1,
      title: "Delhi Cricket Premier League",
      date: "May 15-20, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Khelmanch Stadium, Delhi",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80",
      price: 99900,
      registrationOpen: true,
      trending: true,
      sport: "Cricket",
      prize: "₹50,000"
    },
    {
      id: 2,
      title: "City Football Championship",
      date: "June 5-10, 2025",
      time: "10:00 AM - 6:00 PM",
      location: "City Ground, Delhi",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      price: 129900,
      registrationOpen: true,
      trending: false,
      sport: "Football",
      prize: "₹75,000"
    },
    {
      id: 3,
      title: "Delhi Tennis Open",
      date: "July 12-14, 2025",
      time: "8:00 AM - 7:00 PM",
      location: "Sports Complex, Delhi",
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      price: 79900,
      registrationOpen: false,
      trending: false,
      sport: "Tennis",
      prize: "₹25,000"
    }
  ];

  const handleTournamentRegistration = (tournament: Tournament) => {
    if (!tournament.registrationOpen) {
      return;
    }
    
    navigate(`/tournaments/${tournament.id}`);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8"
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Upcoming Tournaments</h2>
          <p className="text-muted-foreground text-sm">Join exciting competitions near you</p>
        </div>
        <Link to="/tournaments" className="text-primary text-sm font-medium hover:text-primary/80 transition-colors">View All</Link>
      </div>
      
      {/* Horizontal scrollable tournament cards */}
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {tournaments.map((tournament, index) => (
          <motion.div
            key={tournament.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex-shrink-0 w-72"
          >
            <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border bg-card">
              <div className="relative h-40">
                <img 
                  src={tournament.image} 
                  alt={tournament.title} 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Top badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                  <div className="flex space-x-2">
                    {tournament.registrationOpen && (
                      <div className="bg-blue-500 text-white text-xs font-medium py-1 px-2 rounded">
                        Featured
                      </div>
                    )}
                    <div className="bg-black/50 text-white text-xs font-medium py-1 px-2 rounded backdrop-blur-sm">
                      {tournament.sport}
                    </div>
                  </div>
                </div>

              </div>
              
              <CardContent className="p-4">
                {/* Tournament name and rating */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-foreground text-lg">{tournament.title}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium ml-1">4.8</span>
                  </div>
                </div>

                {/* Location */}
                <p className="text-sm text-muted-foreground mb-3">{tournament.location}</p>

                {/* Facilities */}
                <div className="flex items-center space-x-4 mb-4 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 mr-1" />
                    <span>Prize Pool</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Tournament</span>
                  </div>
                </div>

                {/* Price and availability */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-lg font-bold text-foreground">
                      Cash Prize: {tournament.prize}
                    </div>
                  </div>
                </div>

                {/* Book Now Button */}
                <Button
                  className={`w-full rounded-2xl font-semibold py-2 ${
                    tournament.registrationOpen 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                  disabled={!tournament.registrationOpen}
                  onClick={() => handleTournamentRegistration(tournament)}
                >
                  {tournament.registrationOpen ? "Book Now" : "Book Now"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
