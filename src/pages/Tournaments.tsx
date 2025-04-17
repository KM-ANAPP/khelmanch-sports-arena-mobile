
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
    <MobileLayout title="Tournaments" isLoggedIn={true}>
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
      <Card className="overflow-hidden">
        <div className="relative h-32">
          <img 
            src={tournament.image} 
            alt={tournament.title} 
            className="object-cover w-full h-full"
          />
          {tournament.registrationOpen && tournament.status === 'upcoming' && (
            <div className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs font-medium py-1 px-2 rounded">
              Registration Open
            </div>
          )}
          <div className="absolute top-2 left-2 bg-primary/70 text-primary-foreground text-xs font-medium py-1 px-2 rounded">
            {tournament.sport}
          </div>
        </div>
        <CardContent className="p-3">
          <h3 className="font-semibold text-primary">{tournament.title}</h3>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{tournament.date}</span>
          </div>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{tournament.location}</span>
          </div>
          <div className="mt-2 flex justify-between items-center">
            {tournament.status === 'upcoming' ? (
              <Button size="sm" className="w-full">
                {tournament.registrationOpen ? "Register Now" : "View Details"}
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
