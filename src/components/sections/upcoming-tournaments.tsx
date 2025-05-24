
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, TrendingUp, Clock, Trophy, Zap, Sparkles } from "lucide-react";
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
      title: "Mumbai Cricket Premier League",
      date: "May 15-20, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Khelmanch Stadium, Mumbai",
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
      title: "Bangalore Tennis Open",
      date: "July 12-14, 2025",
      time: "8:00 AM - 7:00 PM",
      location: "Sports Complex, Bangalore",
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
    
    navigate("/checkout", {
      state: {
        orderDetails: {
          amount: tournament.price,
          currency: "INR",
          orderId: `tournament_${tournament.id}_${Date.now()}`,
          description: `Registration for ${tournament.title}`,
          type: "tournament",
          itemId: `tournament-${tournament.id}`,
          itemName: tournament.title
        }
      }
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Upcoming Tournaments</h2>
          <p className="text-gray-300 text-sm">Join exciting competitions near you</p>
        </div>
        <Link to="/tournaments" className="text-accent text-sm font-medium hover:text-accent/80 transition-colors">View All</Link>
      </div>
      
      <div className="space-y-6">
        {tournaments.map((tournament, index) => (
          <motion.div
            key={tournament.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:from-white/15 hover:to-white/10 transition-all duration-300">
              <div className="relative">
                {/* Tournament Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={tournament.image} 
                    alt={tournament.title} 
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Modern Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {tournament.registrationOpen ? (
                      <Badge className="bg-green-500/90 text-white border-0 backdrop-blur-sm">
                        Registration Open
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-500/90 text-white border-0 backdrop-blur-sm">
                        Coming Soon
                      </Badge>
                    )}
                    
                    {tournament.trending && (
                      <Badge className="bg-accent/90 text-black border-0 flex items-center gap-1 font-bold">
                        <TrendingUp className="h-3 w-3" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  
                  {/* Prize Pool */}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-yellow-500/90 text-black border-0 flex items-center gap-1 font-bold backdrop-blur-sm">
                      <Trophy className="h-3 w-3" />
                      {tournament.prize}
                    </Badge>
                  </div>
                  
                  {/* Tournament Title on Image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl mb-2">{tournament.title}</h3>
                    <Badge className="border-accent/50 text-accent bg-accent/20 backdrop-blur-sm font-semibold">
                      {tournament.sport}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  {/* Tournament Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-300">
                      <Calendar className="h-4 w-4 mr-2 text-accent" />
                      <span>{tournament.date}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-300">
                      <Clock className="h-4 w-4 mr-2 text-accent" />
                      <span>{tournament.time}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-300">
                      <MapPin className="h-4 w-4 mr-2 text-accent" />
                      <span>{tournament.location}</span>
                    </div>
                  </div>
                  
                  {/* Bottom Section */}
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="text-xs text-gray-400">Entry Fee</div>
                      <div className="text-lg font-bold text-accent">₹{(tournament.price / 100).toLocaleString()}</div>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group ${
                          tournament.registrationOpen 
                            ? 'bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-black shadow-lg hover:shadow-xl' 
                            : 'bg-gray-600/50 text-gray-400 cursor-not-allowed border border-gray-500/30'
                        }`}
                        disabled={!tournament.registrationOpen}
                        onClick={() => handleTournamentRegistration(tournament)}
                      >
                        {tournament.registrationOpen && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                        )}
                        <div className="flex items-center space-x-1 relative z-10">
                          <span>{tournament.registrationOpen ? "Register Now" : "Coming Soon"}</span>
                          {tournament.registrationOpen && <Zap className="h-4 w-4" />}
                        </div>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-6"
      >
        <Link to="/tournaments">
          <Button className="px-8 py-2 rounded-xl border border-accent/30 bg-accent/10 text-accent hover:bg-accent/20 transition-all duration-300">
            View All Tournaments
          </Button>
        </Link>
      </motion.div>
    </motion.section>
  );
};
