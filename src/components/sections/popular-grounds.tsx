
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Calendar, Zap, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface Ground {
  id: number;
  name: string;
  location: string;
  sports: string[];
  image: string;
  rating: number;
  price: number;
}

export const PopularGrounds = () => {
  const navigate = useNavigate();
  
  const grounds: Ground[] = [
    {
      id: 1,
      name: "Victory Cricket Ground",
      location: "Andheri, Mumbai",
      sports: ["Cricket", "Football"],
      image: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      rating: 4.5,
      price: 199900 // ₹1,999 in paise
    },
    {
      id: 2,
      name: "Champions Football Arena",
      location: "Powai, Mumbai",
      sports: ["Football", "Tennis"],
      image: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
      rating: 4.2,
      price: 149900 // ₹1,499 in paise
    },
    {
      id: 3,
      name: "Tennis Court Central",
      location: "Bandra, Mumbai",
      sports: ["Tennis"],
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      rating: 4.7,
      price: 129900 // ₹1,299 in paise
    }
  ];

  const handleBookGround = (ground: Ground) => {
    navigate("/checkout", {
      state: {
        orderDetails: {
          amount: ground.price,
          currency: "INR",
          orderId: `ground_${ground.id}_${Date.now()}`,
          description: `Booking for ${ground.name}`,
          type: "ground",
          itemId: `ground-${ground.id}`,
          itemName: ground.name
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
        <h2 className="text-xl font-semibold text-white">Book a Venue</h2>
        <Link to="/booking" className="text-accent text-sm font-medium hover:text-accent/80 transition-colors">View All</Link>
      </div>
      
      <div className="overflow-x-auto pb-4 -mx-4 px-4">
        <div className="flex space-x-4" style={{ minWidth: "max-content" }}>
          {grounds.map((ground, index) => (
            <motion.div
              key={ground.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="w-60 flex-shrink-0"
            >
              <Card className="overflow-hidden h-full border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:from-white/15 hover:to-white/10 transition-all duration-300">
                <div className="relative h-32">
                  <img 
                    src={ground.image} 
                    alt={ground.name} 
                    className="object-cover w-full h-full"
                  />
                  {/* Modern Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs font-medium py-1 px-2 rounded-full flex items-center border border-white/20">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    <span>{ground.rating.toFixed(1)}</span>
                  </div>
                  
                  {/* Trending Badge */}
                  <div className="absolute top-2 left-2">
                    <div className="bg-accent/90 text-black text-xs font-bold py-1 px-2 rounded-full flex items-center">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Hot
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-white mb-1">{ground.name}</h3>
                  <div className="flex items-center text-xs text-gray-300 mb-2">
                    <MapPin className="h-3 w-3 mr-1 text-accent" />
                    <span>{ground.location}</span>
                  </div>
                  
                  {/* Sports Tags */}
                  <div className="flex flex-wrap mb-3">
                    {ground.sports.map((sport) => (
                      <span 
                        key={sport} 
                        className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded-full mr-1 mb-1 border border-secondary/30"
                      >
                        {sport}
                      </span>
                    ))}
                  </div>
                  
                  {/* Price and Book Button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400">Starting from</div>
                      <div className="text-lg font-bold text-accent">₹{(ground.price / 100).toLocaleString()}</div>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        onClick={() => handleBookGround(ground)}
                        className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-black font-semibold border-0 rounded-xl px-4 py-2 h-10 transition-all duration-300 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                        <div className="flex items-center space-x-1 relative z-10">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">Book</span>
                          <Zap className="h-3 w-3" />
                        </div>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
