import { useState } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingCard } from "@/components/booking/BookingCard";
import { EmptyBookingState } from "@/components/booking/EmptyBookingState";
import { CardShimmer } from "@/components/ui/loading-shimmer";

export default function Booking() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Mock data - in a real app, this would come from an API
  const grounds = [
    {
      id: 1,
      name: "Victory Cricket Ground",
      location: "Andheri, Mumbai",
      sports: ["Cricket", "Football"],
      rating: 4.5,
      pricePerHour: 1200,
      image: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      facilities: ["Floodlights", "Changing Rooms", "Parking", "Washrooms"]
    },
    {
      id: 2,
      name: "Champions Football Arena",
      location: "Powai, Mumbai",
      sports: ["Football", "Tennis"],
      rating: 4.2,
      pricePerHour: 1500,
      image: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
      facilities: ["Floodlights", "Changing Rooms", "Cafeteria", "Parking", "Coaching"]
    },
    {
      id: 3,
      name: "Grand Sports Complex",
      location: "Bandra, Mumbai",
      sports: ["Cricket", "Football", "Basketball", "Badminton"],
      rating: 4.8,
      pricePerHour: 2000,
      image: "https://images.unsplash.com/photo-1626248801379-51a0748e001a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      facilities: ["Floodlights", "Indoor Courts", "Swimming Pool", "Gym", "Restaurant", "Parking"]
    },
    {
      id: 4,
      name: "Tennis Paradise",
      location: "Juhu, Mumbai",
      sports: ["Tennis"],
      rating: 4.0,
      pricePerHour: 800,
      image: "https://images.unsplash.com/photo-1595475207225-428b62bda831?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
      facilities: ["Changing Rooms", "Coaching", "Pro Shop", "Parking"]
    },
    {
      id: 5,
      name: "Basketball Court",
      location: "Dadar, Mumbai",
      sports: ["Basketball"],
      rating: 3.9,
      pricePerHour: 600,
      image: "https://images.unsplash.com/photo-1505666287802-931dc83a0fe4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
      facilities: ["Floodlights", "Washrooms", "Parking"]
    },
    {
      id: 6,
      name: "Badminton Hall",
      location: "Malad, Mumbai",
      sports: ["Badminton"],
      rating: 4.3,
      pricePerHour: 400,
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      facilities: ["Air Conditioned", "Changing Rooms", "Coaching", "Parking"]
    }
  ];

  const filteredGrounds = grounds.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.sports.some(sport => sport.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setHasError(false);
  };

  const sportOptions = ["Cricket", "Football", "Tennis", "Basketball", "Badminton", "Volleyball"];
  const facilityOptions = ["Floodlights", "Changing Rooms", "Parking", "Washrooms", "Cafeteria", "Coaching", "Air Conditioned", "Pro Shop"];
  const locationOptions = ["Andheri", "Powai", "Bandra", "Juhu", "Dadar", "Malad"];

  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 space-y-6">
        {/* Enhanced Search and Filter */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search venues, sports, or locations..."
                className="pl-10 h-12 rounded-xl bg-muted/50 border-muted focus:border-primary/50"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Venues</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Sport Type</Label>
                    <div className="space-y-2">
                      {sportOptions.map((sport) => (
                        <div className="flex items-center space-x-2" key={sport}>
                          <Checkbox id={`sport-${sport}`} />
                          <label
                            htmlFor={`sport-${sport}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {sport}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Facilities</Label>
                    <div className="space-y-2">
                      {facilityOptions.map((facility) => (
                        <div className="flex items-center space-x-2" key={facility}>
                          <Checkbox id={`facility-${facility}`} />
                          <label
                            htmlFor={`facility-${facility}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {facility}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {locationOptions.map(location => (
                          <SelectItem key={location} value={location.toLowerCase()}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Price Range (per hour)</Label>
                    <div className="flex items-center space-x-2">
                      <Input placeholder="Min" type="number" />
                      <span>to</span>
                      <Input placeholder="Max" type="number" />
                    </div>
                  </div>
                </div>
                <SheetFooter>
                  <Button>Apply Filters</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CardShimmer />
            </motion.div>
          ) : hasError ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptyBookingState type="error" onReset={handleClearFilters} />
            </motion.div>
          ) : filteredGrounds.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptyBookingState type="no-results" onReset={handleClearFilters} />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {filteredGrounds.length} venue{filteredGrounds.length !== 1 ? 's' : ''} found
                </p>
              </div>
              
              <div className="space-y-4">
                {filteredGrounds.map((ground, index) => (
                  <motion.div
                    key={ground.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <BookingCard ground={ground} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MobileLayout>
  );
}
