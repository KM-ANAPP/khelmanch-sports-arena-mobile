
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, TrendingUp, Clock, Trophy, Users } from "lucide-react";
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
  participants: number;
  maxParticipants: number;
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
      participants: 24,
      maxParticipants: 32,
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
      participants: 16,
      maxParticipants: 24,
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
      participants: 8,
      maxParticipants: 16,
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
          <h2 className="text-2xl font-bold">Upcoming Tournaments</h2>
          <p className="text-muted-foreground text-sm">Join exciting competitions near you</p>
        </div>
        <Link to="/tournaments" className="text-primary text-sm font-medium">View All</Link>
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
            <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <div className="relative">
                {/* Tournament Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={tournament.image} 
                    alt={tournament.title} 
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {tournament.registrationOpen ? (
                      <Badge className="bg-green-500/90 text-white border-0">
                        Registration Open
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-gray-500/90 text-white border-0">
                        Coming Soon
                      </Badge>
                    )}
                    
                    {tournament.trending && (
                      <Badge className="bg-orange-500/90 text-white border-0 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  
                  {/* Prize Pool */}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-yellow-500/90 text-black border-0 flex items-center gap-1">
                      <Trophy className="h-3 w-3" />
                      {tournament.prize}
                    </Badge>
                  </div>
                  
                  {/* Tournament Title on Image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl mb-1">{tournament.title}</h3>
                    <Badge variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-sm">
                      {tournament.sport}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  {/* Tournament Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      <span>{tournament.date}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <span>{tournament.time}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      <span>{tournament.location}</span>
                    </div>
                    
                    {/* Participants */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-2 text-primary" />
                        <span>{tournament.participants}/{tournament.maxParticipants} participants</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="flex-1 ml-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Section */}
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Entry Fee</div>
                      <div className="text-lg font-bold">₹{(tournament.price / 100).toLocaleString()}</div>
                    </div>
                    
                    <Button
                      className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                        tournament.registrationOpen 
                          ? 'bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!tournament.registrationOpen}
                      onClick={() => handleTournamentRegistration(tournament)}
                    >
                      {tournament.registrationOpen ? "Register Now" : "Coming Soon"}
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
          <Button variant="outline" className="px-8 py-2 rounded-full">
            View All Tournaments
          </Button>
        </Link>
      </motion.div>
    </motion.section>
  );
};
