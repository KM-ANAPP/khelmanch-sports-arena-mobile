import { useState } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Search, Filter, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
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

export default function Booking() {
  const [searchQuery, setSearchQuery] = useState("");
  
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

  const sportOptions = ["Cricket", "Football", "Tennis", "Basketball", "Badminton", "Volleyball"];
  const facilityOptions = ["Floodlights", "Changing Rooms", "Parking", "Washrooms", "Cafeteria", "Coaching", "Air Conditioned", "Pro Shop"];
  const locationOptions = ["Andheri", "Powai", "Bandra", "Juhu", "Dadar", "Malad"];

  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 space-y-4">
        {/* Search and Filter */}
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search grounds"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Grounds</SheetTitle>
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

        {/* Ground Listings */}
        <div className="space-y-4">
          {filteredGrounds.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No grounds found matching your criteria
            </div>
          ) : (
            filteredGrounds.map((ground) => (
              <GroundCard key={ground.id} ground={ground} />
            ))
          )}
        </div>
      </div>
    </MobileLayout>
  );
}

interface GroundCardProps {
  ground: {
    id: number;
    name: string;
    location: string;
    sports: string[];
    rating: number;
    pricePerHour: number;
    image: string;
    facilities: string[];
  };
}

function GroundCard({ ground }: GroundCardProps) {
  return (
    <Link to={`/booking/${ground.id}`}>
      <Card className="overflow-hidden">
        <div className="relative h-32">
          <img 
            src={ground.image} 
            alt={ground.name} 
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 right-2 bg-primary/70 text-primary-foreground text-xs font-medium py-1 px-2 rounded flex items-center">
            <Star className="h-3 w-3 mr-1 fill-accent stroke-accent" />
            {ground.rating}
          </div>
        </div>
        <CardContent className="p-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-primary">{ground.name}</h3>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{ground.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">₹{ground.pricePerHour}</div>
              <div className="text-xs text-muted-foreground">per hour</div>
            </div>
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
          
          <div className="flex items-center text-xs text-muted-foreground mt-2 flex-wrap">
            <span className="mr-2">Facilities:</span>
            {ground.facilities.slice(0, 3).map((facility, index) => (
              <span key={facility}>
                {facility}{index < Math.min(ground.facilities.length, 3) - 1 ? ", " : ""}
              </span>
            ))}
            {ground.facilities.length > 3 && (
              <span> +{ground.facilities.length - 3} more</span>
            )}
          </div>
          
          <Button size="sm" className="w-full mt-3">
            Book Now
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
