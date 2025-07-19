
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
            <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border bg-card">
              <div className="relative h-48">
                <img 
                  src={tournament.image} 
                  alt={tournament.title} 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Top badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                  <div className="flex space-x-2">
                    <div className="bg-black/50 text-white text-xs font-medium py-1.5 px-3 rounded-full backdrop-blur-sm">
                      {tournament.sport}
                    </div>
                    <div className="bg-orange-500/90 text-white text-xs font-medium py-1.5 px-3 rounded-full">
                      2.5 km away
                    </div>
                  </div>
                  {tournament.registrationOpen && (
                    <div className="bg-emerald-500 text-white text-xs font-medium py-1.5 px-3 rounded-full shadow-lg">
                      Registration Open
                    </div>
                  )}
                </div>

                {/* Bottom content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-bold text-white text-lg mb-2 leading-tight">{tournament.title}</h3>
                  <div className="flex items-center text-white/90 text-sm mb-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{tournament.date}</span>
                  </div>
                  <div className="flex items-center text-white/90 text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{tournament.location}</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                {/* Venue facilities */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-foreground mb-2">Venue Facilities</h4>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-primary/10 text-primary text-xs py-1 px-2 rounded-full">Parking</div>
                    <div className="bg-primary/10 text-primary text-xs py-1 px-2 rounded-full">Food Court</div>
                    <div className="bg-primary/10 text-primary text-xs py-1 px-2 rounded-full">Changing Room</div>
                  </div>
                </div>

                {/* Price and booking */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-foreground">₹{(tournament.price / 100).toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground ml-1">/person</span>
                    <div className="text-xs text-emerald-600 font-medium">Registration Open</div>
                  </div>
                  <Button
                    size="lg"
                    className={`rounded-2xl px-6 font-semibold shadow-lg ${
                      tournament.registrationOpen 
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                    disabled={!tournament.registrationOpen}
                    onClick={() => handleTournamentRegistration(tournament)}
                  >
                    {tournament.registrationOpen ? "Book Now" : "Soon"}
                  </Button>
                </div>
              </CardContent>
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
