
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Trophy, Users, MapPin, Star, Clock, Ticket, Gift, Zap } from "lucide-react";

interface FeaturedItem {
  id: string;
  type: 'tournament' | 'venue' | 'community' | 'event' | 'pass' | 'coupon';
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
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredItems: FeaturedItem[] = [
    {
      id: "tournament-1",
      type: "tournament",
      title: "Mumbai Cricket Premier League",
      subtitle: "Elite cricket championship with top teams competing for glory",
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
      subtitle: "Premium sports facility with world-class amenities and equipment",
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
      title: "Khelmanch Sports Community",
      subtitle: "Connect with passionate athletes and build lasting friendships",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badge: "1.2K Members",
      stats: [
        { label: "Active", value: "890" },
        { label: "Events", value: "45" }
      ],
      action: "Join Community"
    },
    {
      id: "pass-1",
      type: "pass",
      title: "Khelmanch Premium Pass",
      subtitle: "Unlock exclusive benefits and discounts across all tournaments",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badge: "30% OFF",
      stats: [
        { label: "Validity", value: "90 Days" },
        { label: "Benefits", value: "10+" }
      ],
      action: "Buy Pass"
    },
    {
      id: "coupon-1",
      type: "coupon",
      title: "First Time User Special",
      subtitle: "Special welcome discount for new Khelmanch members",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badge: "40% OFF",
      stats: [
        { label: "Valid Till", value: "7 Days" },
        { label: "Min Order", value: "₹500" }
      ],
      action: "Use Coupon"
    },
    {
      id: "tournament-2",
      type: "tournament",
      title: "Delhi Basketball Championship",
      subtitle: "Professional basketball league featuring skilled players nationwide",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badge: "₹25K Prize",
      stats: [
        { label: "Teams", value: "16" },
        { label: "Days Left", value: "12" }
      ],
      action: "Register Now"
    },
    {
      id: "venue-2",
      type: "venue",
      title: "Metro Football Ground",
      subtitle: "Professional football turf with modern facilities and lighting",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badge: "Available Today",
      stats: [
        { label: "Rating", value: "4.6⭐" },
        { label: "Price", value: "₹1200/hr" }
      ],
      action: "Book Now"
    },
    {
      id: "coupon-2",
      type: "coupon",
      title: "Weekend Warrior Deal",
      subtitle: "Exclusive weekend booking discounts for all sports venues",
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badge: "25% OFF",
      stats: [
        { label: "Valid On", value: "Weekends" },
        { label: "Max Save", value: "₹300" }
      ],
      action: "Apply Coupon"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [featuredItems.length]);

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
      case 'pass':
        navigate('/checkout', {
          state: {
            orderDetails: {
              amount: 29900,
              currency: "INR",
              orderId: `pass_basic_${Date.now()}`,
              description: "KhelManch Pass - 30% off on tournaments",
              type: "pass",
              itemId: "tournament-pass-basic",
              itemName: "KhelManch Pass"
            }
          }
        });
        break;
      case 'coupon':
        // Show coupon details or apply coupon logic
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
      case 'pass': return Ticket;
      case 'coupon': return Gift;
      default: return Star;
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Discover Khelmanch</h2>
        <Badge variant="secondary" className="text-xs bg-accent/20 text-accent border-accent/30">
          Featured
        </Badge>
      </div>
      
      {/* Auto-sliding Carousel */}
      <div className="relative overflow-hidden rounded-xl">
        <motion.div
          className="flex"
          animate={{ x: `-${currentSlide * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ width: `${featuredItems.length * 100}%` }}
        >
          {featuredItems.map((item, index) => {
            const IconComponent = getIcon(item.type);
            
            return (
              <div
                key={item.id}
                className="w-full flex-shrink-0 px-2"
                style={{ width: `${100 / featuredItems.length}%` }}
              >
                <Card 
                  className={`h-80 cursor-pointer transition-all duration-300 hover:shadow-lg border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm ${
                    selectedItem === item.id ? 'ring-2 ring-accent' : ''
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <CardContent className="p-0 h-full flex flex-col">
                    {/* Image Header */}
                    <div className="relative h-40 overflow-hidden rounded-t-xl">
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
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold text-white text-sm mb-1 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-xs mb-3 line-clamp-2 flex-1">
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
              </div>
            );
          })}
        </motion.div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-accent scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
