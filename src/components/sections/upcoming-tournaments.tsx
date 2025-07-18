
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
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Upcoming Tournaments</h2>
          <p className="text-muted-foreground text-sm">Join exciting competitions near you</p>
        </div>
        <Link to="/tournaments" className="text-primary text-sm font-medium hover:text-primary/80 transition-colors">View All</Link>
      </div>
      
      <div className="space-y-4">
        {tournaments.map((tournament, index) => (
          <motion.div
            key={tournament.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <Card className="overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex">
                {/* Tournament Image */}
                <div className="relative w-24 h-24 flex-shrink-0">
                  <img 
                    src={tournament.image} 
                    alt={tournament.title} 
                    className="object-cover w-full h-full"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-1 left-1">
                    {tournament.registrationOpen ? (
                      <Badge className="bg-green-500 text-white text-xs px-1 py-0">
                        Open
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-500 text-white text-xs px-1 py-0">
                        Soon
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardContent className="flex-1 p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm leading-tight">{tournament.title}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="outline" className="text-xs px-1 py-0">{tournament.sport}</Badge>
                        {tournament.trending && (
                          <Badge className="bg-orange-500 text-white text-xs px-1 py-0 flex items-center gap-1">
                            <TrendingUp className="h-2 w-2" />
                            Hot
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right ml-2">
                      <div className="text-xs text-muted-foreground">Prize</div>
                      <div className="text-sm font-bold text-yellow-600">{tournament.prize}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{tournament.date}</span>
                    </div>
                    
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate">{tournament.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground">Entry Fee</div>
                      <div className="text-sm font-bold text-primary">₹{(tournament.price / 100).toLocaleString()}</div>
                    </div>
                    
                    <Button
                      size="sm"
                      className={`text-xs px-3 py-1 ${
                        tournament.registrationOpen 
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }`}
                      disabled={!tournament.registrationOpen}
                      onClick={() => handleTournamentRegistration(tournament)}
                    >
                      {tournament.registrationOpen ? "Register" : "Soon"}
                    </Button>
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
