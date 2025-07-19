import { useState } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Search, Filter } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function Tournaments() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data - in a real app, this would come from an API
  const tournaments = [
    {
      id: 1,
      title: "Summer Cricket Championship",
      sport: "Cricket",
      date: "May 15-20, 2025",
      location: "Khelmanch Stadium, Mumbai",
      status: "upcoming",
      registrationOpen: true,
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80"
    },
    {
      id: 2,
      title: "Football League",
      sport: "Football",
      date: "June 5-10, 2025",
      location: "City Ground, Delhi",
      status: "upcoming",
      registrationOpen: true,
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
    },
    {
      id: 3,
      title: "Badminton Masters",
      sport: "Badminton",
      date: "April 25-30, 2025",
      location: "Sports Complex, Pune",
      status: "upcoming",
      registrationOpen: true,
      image: "https://images.unsplash.com/photo-1628779238951-be2c9f2a59f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    },
    {
      id: 4,
      title: "Tennis Open",
      sport: "Tennis",
      date: "July 1-5, 2025",
      location: "Tennis Club, Mumbai",
      status: "upcoming",
      registrationOpen: false,
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
    },
    {
      id: 5,
      title: "Basketball Tournament",
      sport: "Basketball",
      date: "March 10-15, 2025",
      location: "Indoor Arena, Bangalore",
      status: "past",
      registrationOpen: false,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1090&q=80"
    },
    {
      id: 6,
      title: "Volleyball Championship",
      sport: "Volleyball",
      date: "February 20-25, 2025",
      location: "Beach Arena, Goa",
      status: "past",
      registrationOpen: false,
      image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1007&q=80"
    }
  ];

  const filteredTournaments = (status: string) => {
    return tournaments
      .filter(t => t.status === status)
      .filter(t => 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
  };

  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 space-y-4">
        {/* Search and Filter */}
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tournaments"
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
                <SheetTitle>Filter Tournaments</SheetTitle>
              </SheetHeader>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label>Sport Type</Label>
                  <div className="space-y-2">
                    {["Cricket", "Football", "Badminton", "Tennis", "Basketball", "Volleyball"].map((sport) => (
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
                  <Label>Time Period</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="thisMonth">This Month</SelectItem>
                      <SelectItem value="nextMonth">Next Month</SelectItem>
                      <SelectItem value="next3Months">Next 3 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="goa">Goa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Registration Status</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="registration-open" />
                    <label
                      htmlFor="registration-open"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Registration Open
                    </label>
                  </div>
                </div>
              </div>
              <SheetFooter>
                <Button>Apply Filters</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Tabs for Upcoming/Past */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-4 space-y-4">
            {filteredTournaments('upcoming').length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No upcoming tournaments found
              </div>
            ) : (
              filteredTournaments('upcoming').map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))
            )}
          </TabsContent>
          <TabsContent value="past" className="mt-4 space-y-4">
            {filteredTournaments('past').length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No past tournaments found
              </div>
            ) : (
              filteredTournaments('past').map((tournament) => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}

interface TournamentCardProps {
  tournament: {
    id: number;
    title: string;
    sport: string;
    date: string;
    location: string;
    status: string;
    registrationOpen: boolean;
    image: string;
  };
}

function TournamentCard({ tournament }: TournamentCardProps) {
  return (
    <Link to={`/tournaments/${tournament.id}`}>
      <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border bg-card">
        <div className="relative h-48">
          <img 
            src={tournament.image} 
            alt={tournament.title} 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Top tags */}
          <div className="absolute top-3 left-3 right-3 flex justify-between">
            <div className="flex space-x-2">
              <div className="bg-black/50 text-white text-xs font-medium py-1.5 px-3 rounded-full backdrop-blur-sm">
                {tournament.sport}
              </div>
              <div className="bg-orange-500/90 text-white text-xs font-medium py-1.5 px-3 rounded-full">
                2.5 km away
              </div>
            </div>
            {tournament.registrationOpen && tournament.status === 'upcoming' && (
              <div className="bg-emerald-500 text-white text-xs font-medium py-1.5 px-3 rounded-full shadow-lg">
                Registration Open
              </div>
            )}
          </div>

          {/* Bottom content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-bold text-white text-lg mb-2 leading-tight">{tournament.title}</h3>
            <div className="flex items-center text-white/90 text-sm mb-1">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{tournament.date}</span>
            </div>
            <div className="flex items-center text-white/90 text-sm">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{tournament.location}</span>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4">
          {/* Venue details */}
          <div className="mb-4">
            <h4 className="font-semibold text-sm text-foreground mb-2">Venue Facilities</h4>
            <div className="flex flex-wrap gap-2">
              <div className="bg-primary/10 text-primary text-xs py-1 px-2 rounded-full">Parking</div>
              <div className="bg-primary/10 text-primary text-xs py-1 px-2 rounded-full">Food Court</div>
              <div className="bg-primary/10 text-primary text-xs py-1 px-2 rounded-full">Changing Room</div>
            </div>
          </div>

          {/* Price and booking */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-foreground">₹199</span>
              <span className="text-sm text-muted-foreground ml-1">/person</span>
              <div className="text-xs text-emerald-600 font-medium">Available Now</div>
            </div>
            {tournament.status === 'upcoming' ? (
              <Button size="lg" className="rounded-2xl px-6 font-semibold shadow-lg">
                {tournament.registrationOpen ? "Book Now" : "View Details"}
              </Button>
            ) : (
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>Event Completed</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
