
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Calendar } from "lucide-react";
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
        <h2 className="text-xl font-semibold">Book a Venue</h2>
        <Link to="/booking" className="text-secondary text-sm">View All</Link>
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
              <Card className="overflow-hidden h-full">
                <div className="relative h-32">
                  <img 
                    src={ground.image} 
                    alt={ground.name} 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2 bg-accent/90 text-accent-foreground text-xs font-medium py-1 px-2 rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1 fill-accent-foreground" />
                    <span>{ground.rating.toFixed(1)}</span>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-primary">{ground.name}</h3>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{ground.location}</span>
                  </div>
                  <div className="flex flex-wrap mt-2">
                    {ground.sports.map((sport) => (
                      <span 
                        key={sport} 
                        className="text-xs bg-muted px-2 py-0.5 rounded mr-1 mb-1"
                      >
                        {sport}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-semibold">₹{(ground.price / 100).toLocaleString()}</span>
                    <Button 
                      size="sm"
                      onClick={() => handleBookGround(ground)}
                      className="flex items-center"
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Book
                    </Button>
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
