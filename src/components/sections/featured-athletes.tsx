
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Trophy, Users, MapPin, Star, Clock } from "lucide-react";

interface FeaturedItem {
  id: string;
  type: 'tournament' | 'venue' | 'community' | 'event';
  title: string;
  subtitle: string;
  image: string;
  badge: string;
  stats: { label: string; value: string }[];
  action: string;
}

export function FeaturedAthletes() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const featuredItems: FeaturedItem[] = [
    {
      id: "tournament-1",
      type: "tournament",
      title: "Mumbai Cricket Premier League",
      subtitle: "Join the biggest cricket tournament",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badge: "₹50K Prize Pool",
      stats: [
        { label: "Teams", value: "32" },
        { label: "Days Left", value: "5" }
      ],
      action: "Register Now"
    },
    {
      id: "venue-1",
      type: "venue",
      title: "Elite Sports Complex",
      subtitle: "Premium cricket ground with facilities",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badge: "Top Rated",
      stats: [
        { label: "Rating", value: "4.8⭐" },
        { label: "Price", value: "₹999/hr" }
      ],
      action: "Book Now"
    },
    {
      id: "community-1",
      type: "community",
      title: "Football Community",
      subtitle: "Connect with local football players",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badge: "1.2K Members",
      stats: [
        { label: "Active", value: "890" },
        { label: "Events", value: "45" }
      ],
      action: "Join Community"
    }
  ];

  const handleItemClick = (item: FeaturedItem) => {
    setSelectedItem(item.id);
    
    switch (item.type) {
      case 'tournament':
        navigate('/tournaments');
        break;
      case 'venue':
        navigate('/checkout', {
          state: {
            orderDetails: {
              amount: 99900,
              currency: "INR",
              orderId: `ground_booking_${Date.now()}`,
              description: "Ground Booking",
              type: "ground",
              itemId: "ground-booking-default",
              itemName: "Ground Booking"
            }
          }
        });
        break;
      case 'community':
        navigate('/community');
        break;
      default:
        break;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'tournament': return Trophy;
      case 'venue': return MapPin;
      case 'community': return Users;
      default: return Star;
    }
  };

  return (
    <section className="py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Discover Khelmanch</h2>
        <Badge variant="secondary" className="text-xs bg-accent/20 text-accent border-accent/30">
          Featured
        </Badge>
      </div>
      
      <div className="overflow-x-auto pb-4 -mx-4 px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>
          {`
            .featured-container::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        
        <div className="flex gap-4 featured-container" style={{ minWidth: "max-content" }}>
          {featuredItems.map((item, index) => {
            const IconComponent = getIcon(item.type);
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0"
              >
                <Card 
                  className={`w-72 cursor-pointer transition-all duration-300 hover:shadow-lg border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm ${
                    selectedItem === item.id ? 'ring-2 ring-accent' : ''
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <CardContent className="p-0">
                    {/* Image Header */}
                    <div className="relative h-32 overflow-hidden rounded-t-xl">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-accent text-black font-semibold text-xs border-0">
                          {item.badge}
                        </Badge>
                      </div>
                      
                      {/* Type Icon */}
                      <div className="absolute top-3 right-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <IconComponent className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-white text-sm mb-1 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-xs mb-3 line-clamp-2">
                        {item.subtitle}
                      </p>
                      
                      {/* Stats */}
                      <div className="flex justify-between items-center mb-3">
                        {item.stats.map((stat, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-xs text-gray-400">{stat.label}</div>
                            <div className="text-sm font-semibold text-white">{stat.value}</div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Action Button */}
                      <Button 
                        className="w-full bg-accent hover:bg-accent/90 text-black font-semibold text-xs h-8"
                      >
                        {item.action}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
