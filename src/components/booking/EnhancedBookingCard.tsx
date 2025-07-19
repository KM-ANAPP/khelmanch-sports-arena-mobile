
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
        <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border bg-card">
          <div className="relative h-48">
            <motion.img 
              src={ground.image} 
              alt={ground.name} 
              className="object-cover w-full h-full transition-transform duration-500"
              animate={{ scale: isHovered ? 1.05 : 1 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Top badges */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
              <div className="flex space-x-2">
                <div className="bg-black/50 text-white text-xs font-medium py-1.5 px-3 rounded-full backdrop-blur-sm">
                  {ground.sports[0]}
                </div>
                <div className="bg-orange-500/90 text-white text-xs font-medium py-1.5 px-3 rounded-full">
                  {ground.distance}
                </div>
              </div>
              <div className="bg-emerald-500 text-white text-xs font-medium py-1.5 px-3 rounded-full shadow-lg">
                {ground.availability}
              </div>
            </div>

            {/* Bottom content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-bold text-white text-lg mb-2 leading-tight">{ground.name}</h3>
              <div className="flex items-center text-white/90 text-sm mb-1">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Available Today</span>
              </div>
              <div className="flex items-center text-white/90 text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{ground.location}</span>
              </div>
            </div>
          </div>
          
          <CardContent className="p-4">
            {/* Venue facilities */}
            <div className="mb-4">
              <h4 className="font-semibold text-sm text-foreground mb-2">Venue Facilities</h4>
              <div className="flex flex-wrap gap-2">
                {ground.facilities.slice(0, 3).map((facility) => (
                  <div key={facility} className="bg-primary/10 text-primary text-xs py-1 px-2 rounded-full">
                    {facility}
                  </div>
                ))}
              </div>
            </div>

            {/* Price and booking */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-foreground">₹{ground.pricePerHour}</span>
                <span className="text-sm text-muted-foreground ml-1">/hour</span>
                <div className="text-xs text-emerald-600 font-medium">Available Now</div>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button size="lg" className="rounded-2xl px-6 font-semibold shadow-lg">
                  Book Now
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
