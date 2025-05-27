
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, Star, Clock, Users, Wifi, Car } from "lucide-react";

interface Ground {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  price: number;
  sport: string;
  amenities: string[];
  availability: string;
  distance: string;
  featured: boolean;
}

export function PopularGrounds() {
  const navigate = useNavigate();
  const [selectedGround, setSelectedGround] = useState<string | null>(null);

  const grounds: Ground[] = [
    {
      id: "ground-1",
      name: "Elite Sports Complex",
      location: "Andheri West, Mumbai",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      price: 999,
      sport: "Cricket",
      amenities: ["Floodlights", "Parking", "WiFi"],
      availability: "Available Today",
      distance: "2.3 km",
      featured: true
    },
    {
      id: "ground-2",
      name: "Champions Football Ground",
      location: "Bandra East, Mumbai",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.6,
      price: 1299,
      sport: "Football",
      amenities: ["Artificial Turf", "Changing Rooms", "Parking"],
      availability: "Available Tomorrow",
      distance: "3.1 km",
      featured: false
    },
    {
      id: "ground-3",
      name: "Royal Tennis Academy",
      location: "Juhu, Mumbai",
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      price: 799,
      sport: "Tennis",
      amenities: ["Clay Courts", "Equipment Rental", "Coaching"],
      availability: "Available Now",
      distance: "1.8 km",
      featured: true
    },
    {
      id: "ground-4",
      name: "Slam Dunk Basketball Court",
      location: "Powai, Mumbai",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.5,
      price: 699,
      sport: "Basketball",
      amenities: ["Indoor Court", "AC", "Sound System"],
      availability: "Available Today",
      distance: "4.2 km",
      featured: false
    },
    {
      id: "ground-5",
      name: "Aqua Swimming Complex",
      location: "Goregaon West, Mumbai",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
      price: 599,
      sport: "Swimming",
      amenities: ["Olympic Pool", "Lockers", "Shower"],
      availability: "Available Today",
      distance: "5.1 km",
      featured: false
    },
    {
      id: "ground-6",
      name: "Ace Badminton Center",
      location: "Malad West, Mumbai",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.4,
      price: 499,
      sport: "Badminton",
      amenities: ["Wooden Flooring", "Shuttles", "Parking"],
      availability: "Available Tomorrow",
      distance: "6.3 km",
      featured: true
    }
  ];

  const handleGroundClick = (ground: Ground) => {
    setSelectedGround(ground.id);
    navigate("/checkout", {
      state: {
        orderDetails: {
          amount: ground.price * 100, // Convert to paise
          currency: "INR",
          orderId: `ground_booking_${ground.id}_${Date.now()}`,
          description: `${ground.name} - ${ground.sport} Ground Booking`,
          type: "ground",
          itemId: ground.id,
          itemName: ground.name
        }
      }
    });
  };

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes('wifi')) return Wifi;
    if (amenity.toLowerCase().includes('parking') || amenity.toLowerCase().includes('car')) return Car;
    if (amenity.toLowerCase().includes('user') || amenity.toLowerCase().includes('changing')) return Users;
    return Clock;
  };

  return (
    <section className="py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Book a Venue</h2>
        <Badge variant="secondary" className="text-xs bg-accent/20 text-accent border-accent/30">
          {grounds.length} Venues Available
        </Badge>
      </div>
      
      {/* Horizontal scrollable container with visible scrollbar */}
      <div className="relative">
        <div 
          className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-thin scrollbar-thumb-accent/50 scrollbar-track-transparent"
          style={{ 
            scrollbarWidth: 'thin',
          }}
        >
          <style>
            {`
              .venues-container::-webkit-scrollbar {
                height: 6px;
              }
              .venues-container::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 3px;
              }
              .venues-container::-webkit-scrollbar-thumb {
                background: rgba(255, 206, 84, 0.5);
                border-radius: 3px;
              }
              .venues-container::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 206, 84, 0.7);
              }
            `}
          </style>
          
          <div className="flex gap-4 venues-container" style={{ minWidth: "max-content" }}>
            {grounds.map((ground, index) => (
              <motion.div
                key={ground.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0"
              >
                <Card 
                  className={`w-64 cursor-pointer transition-all duration-300 hover:shadow-lg border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm ${
                    selectedGround === ground.id ? 'ring-2 ring-accent' : ''
                  }`}
                  onClick={() => handleGroundClick(ground)}
                >
                  <CardContent className="p-0">
                    {/* Image Header */}
                    <div className="relative h-36 overflow-hidden rounded-t-xl">
                      <img 
                        src={ground.image} 
                        alt={ground.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Featured Badge */}
                      {ground.featured && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-accent text-black font-semibold text-xs border-0">
                            Featured
                          </Badge>
                        </div>
                      )}
                      
                      {/* Sport Type */}
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-black/60 text-white text-xs border-0 backdrop-blur-sm">
                          {ground.sport}
                        </Badge>
                      </div>
                      
                      {/* Distance */}
                      <div className="absolute bottom-3 left-3">
                        <div className="flex items-center space-x-1 text-white text-xs">
                          <MapPin className="h-3 w-3" />
                          <span>{ground.distance}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-white text-sm line-clamp-1 flex-1">
                          {ground.name}
                        </h3>
                        <div className="flex items-center space-x-1 ml-2">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-300">{ground.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 text-xs mb-3 line-clamp-1">
                        {ground.location}
                      </p>
                      
                      {/* Amenities */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {ground.amenities.slice(0, 3).map((amenity, idx) => {
                          const AmenityIcon = getAmenityIcon(amenity);
                          return (
                            <div key={idx} className="flex items-center space-x-1 bg-white/10 rounded-full px-2 py-1">
                              <AmenityIcon className="h-2.5 w-2.5 text-gray-300" />
                              <span className="text-xs text-gray-300">{amenity}</span>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Price and Availability */}
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <div className="text-sm font-bold text-accent">₹{ground.price}</div>
                          <div className="text-xs text-gray-400">per hour</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-green-400">{ground.availability}</div>
                        </div>
                      </div>
                      
                      {/* Book Button */}
                      <Button 
                        className="w-full bg-accent hover:bg-accent/90 text-black font-semibold text-xs h-8"
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
