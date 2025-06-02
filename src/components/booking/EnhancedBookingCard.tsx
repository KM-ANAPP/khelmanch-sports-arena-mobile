
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock, Users, Wifi, Car, Dumbbell, Coffee, Calendar, IndianRupee } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface EnhancedBookingCardProps {
  ground: {
    id: number;
    name: string;
    location: string;
    sports: string[];
    rating: number;
    reviews: number;
    pricePerHour: number;
    image: string;
    facilities: string[];
    availability: string;
    distance: string;
  };
}

const facilityIcons: Record<string, React.ReactNode> = {
  'Floodlights': <Clock className="h-3 w-3" />,
  'Changing Rooms': <Users className="h-3 w-3" />,
  'Parking': <Car className="h-3 w-3" />,
  'Washrooms': <Users className="h-3 w-3" />,
  'Cafeteria': <Coffee className="h-3 w-3" />,
  'Coaching': <Users className="h-3 w-3" />,
  'Air Conditioned': <Wifi className="h-3 w-3" />,
  'Gym': <Dumbbell className="h-3 w-3" />,
  'Pro Shop': <Coffee className="h-3 w-3" />
};

export function EnhancedBookingCard({ ground }: EnhancedBookingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`/booking/${ground.id}`}>
        <Card className="overflow-hidden group cursor-pointer bg-gradient-to-br from-card via-card/95 to-muted/50 border border-border/50 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl">
          <div className="relative h-48 overflow-hidden">
            <motion.img 
              src={ground.image} 
              alt={ground.name} 
              className="object-cover w-full h-full transition-transform duration-500"
              animate={{ scale: isHovered ? 1.05 : 1 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            
            {/* Rating & Reviews */}
            <motion.div 
              className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium py-1.5 px-3 rounded-full flex items-center gap-1"
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: isHovered ? 1.05 : 1, opacity: 1 }}
            >
              <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />
              {ground.rating} ({ground.reviews})
            </motion.div>

            {/* Availability Status */}
            <div className="absolute top-3 left-3">
              <Badge 
                variant={ground.availability === 'Available Now' ? 'default' : 'secondary'} 
                className="bg-green-500/90 text-white text-xs backdrop-blur-sm"
              >
                {ground.availability}
              </Badge>
            </div>
            
            {/* Sports & Distance */}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex flex-wrap gap-1 mb-2">
                {ground.sports.slice(0, 3).map((sport) => (
                  <Badge 
                    key={sport} 
                    variant="secondary" 
                    className="bg-white/20 backdrop-blur-sm text-white border-0 text-xs"
                  >
                    {sport}
                  </Badge>
                ))}
                {ground.sports.length > 3 && (
                  <Badge 
                    variant="secondary" 
                    className="bg-white/20 backdrop-blur-sm text-white border-0 text-xs"
                  >
                    +{ground.sports.length - 3}
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-white text-xs">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="truncate">{ground.distance}</span>
              </div>
            </div>
          </div>
          
          <CardContent className="p-4 space-y-4">
            {/* Title & Location */}
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {ground.name}
              </h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{ground.location}</span>
              </div>
            </div>
            
            {/* Price & Booking */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <IndianRupee className="h-4 w-4 text-primary" />
                <span className="text-2xl font-bold text-primary">{ground.pricePerHour}</span>
                <span className="text-sm text-muted-foreground">/hour</span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Available Today</span>
              </div>
            </div>
            
            {/* Facilities */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Facilities</p>
              <div className="flex items-center gap-2 flex-wrap">
                {ground.facilities.slice(0, 4).map((facility) => (
                  <div 
                    key={facility}
                    className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 rounded-md px-2 py-1"
                  >
                    {facilityIcons[facility] || <Wifi className="h-3 w-3" />}
                    <span>{facility}</span>
                  </div>
                ))}
                {ground.facilities.length > 4 && (
                  <div className="text-xs text-primary font-medium">
                    +{ground.facilities.length - 4} more
                  </div>
                )}
              </div>
            </div>
            
            {/* Book Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
              >
                Book Now
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
