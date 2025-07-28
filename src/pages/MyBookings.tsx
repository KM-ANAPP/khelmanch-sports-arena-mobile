import { useState } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, MapPin, Filter, X, Ticket as TicketIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { useTickets } from "@/hooks/useTickets";
import { TicketDisplay } from "@/components/tickets/TicketDisplay";
import { TicketModal } from "@/components/tickets/TicketModal";
import { TicketData } from "@/services/ticketService";
import { LoadingShimmer } from "@/components/ui/loading-shimmer";
import { EmptyBookingState } from "@/components/booking/EmptyBookingState";

// Mock data for ground bookings
const groundBookings = [
  {
    id: "gb1",
    groundName: "Victory Cricket Ground",
    location: "Andheri, Mumbai",
    date: new Date(2025, 4, 25),
    startTime: "16:00",
    endTime: "18:00",
    status: "upcoming",
    price: 2400,
    sport: "Cricket",
  },
  {
    id: "gb2",
    groundName: "Champions Football Arena",
    location: "Powai, Mumbai",
    date: new Date(2025, 4, 30),
    startTime: "19:00",
    endTime: "20:00",
    status: "upcoming",
    price: 1500,
    sport: "Football",
  },
  {
    id: "gb3",
    groundName: "Tennis Court Central",
    location: "Bandra, Mumbai",
    date: new Date(2025, 4, 10),
    startTime: "08:00",
    endTime: "09:00",
    status: "completed",
    price: 800,
    sport: "Tennis",
  }
];

// Mock data for tournament bookings
const tournamentBookings = [
  {
    id: "tb1",
    tournamentName: "Mumbai Cricket League",
    location: "Multiple Venues, Mumbai",
    date: new Date(2025, 5, 15),
    time: "All day",
    status: "upcoming",
    price: 5000,
    teamName: "Thunder Strikers",
  },
  {
    id: "tb2",
    tournamentName: "Corporate Football Championship",
    location: "Powai Sports Complex",
    date: new Date(2025, 3, 20),
    time: "09:00 - 18:00",
    status: "completed",
    price: 3500,
    teamName: "Tech Titans",
  }
];

export default function MyBookings() {
  const { isAuthenticated } = useAuth();
  const { tickets, isLoading: ticketsLoading } = useTickets();
  const [activeTab, setActiveTab] = useState("tournaments");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);
  const [sportFilter, setSportFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);

  const filteredGroundBookings = groundBookings.filter(booking => {
    if (date && booking.date.toDateString() !== date.toDateString()) return false;
    if (sportFilter && booking.sport !== sportFilter) return false;
    if (statusFilter && booking.status !== statusFilter) return false;
    return true;
  });

  const filteredTournamentBookings = tournamentBookings.filter(booking => {
    if (date && booking.date.toDateString() !== date.toDateString()) return false;
    if (statusFilter && booking.status !== statusFilter) return false;
    return true;
  });

  const handleViewTicket = (ticket: TicketData) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const clearFilters = () => {
    setDate(undefined);
    setSportFilter(null);
    setStatusFilter(null);
  };

  const sports = ["Cricket", "Football", "Tennis", "Basketball", "Badminton"];
  const statuses = ["upcoming", "completed", "cancelled"];

  return (
    <MobileLayout isLoggedIn={isAuthenticated}>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        
        {/* Filters */}
        <div className="flex justify-between items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  date && "text-primary"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Filter by date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className={cn(showFilters && "bg-muted")}
          >
            <Filter className="h-4 w-4" />
            <span className="ml-2">Filters</span>
          </Button>
        </div>
        
        {/* Filter Options */}
        {showFilters && (
          <Card className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Filter Options</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            </div>
            
            <div className="space-y-2">
              {activeTab === "grounds" && (
                <div>
                  <p className="text-sm font-medium mb-1">Sport</p>
                  <div className="flex flex-wrap gap-2">
                    {sports.map(sport => (
                      <Button
                        key={sport}
                        variant={sportFilter === sport ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSportFilter(sportFilter === sport ? null : sport)}
                      >
                        {sport}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium mb-1">Status</p>
                <div className="flex flex-wrap gap-2">
                  {statuses.map(status => (
                    <Button
                      key={status}
                      variant={statusFilter === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStatusFilter(statusFilter === status ? null : status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}
        
        {/* Tabs for different booking types */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tournaments" className="mt-4 space-y-4">
            {tournamentBookings.length === 0 ? (
              <EmptyBookingState type="no-bookings" />
            ) : (
              tournamentBookings.map(booking => (
                <TournamentBookingCard key={booking.id} booking={booking} />
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Ticket Modal */}
        <TicketModal
          open={showTicketModal}
          onOpenChange={setShowTicketModal}
          ticket={selectedTicket}
        />
      </div>
    </MobileLayout>
  );
}

interface GroundBookingProps {
  booking: {
    id: string;
    groundName: string;
    location: string;
    date: Date;
    startTime: string;
    endTime: string;
    status: string;
    price: number;
    sport: string;
  };
}

function GroundBookingCard({ booking }: GroundBookingProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-primary">{booking.groundName}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{booking.location}</span>
            </div>
          </div>
          <div className={`px-2 py-1 rounded text-xs ${
            booking.status === 'upcoming' ? 'bg-green-100 text-green-700' : 
            booking.status === 'completed' ? 'bg-gray-100 text-gray-700' : 
            'bg-red-100 text-red-700'
          }`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
        </div>
        
        <div className="mt-3 flex items-center text-sm">
          <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
          <span>{format(booking.date, "PPP")}</span>
          <Clock className="h-4 w-4 mx-1 ml-3 text-muted-foreground" />
          <span>{booking.startTime} - {booking.endTime}</span>
        </div>
        
        <div className="mt-2 flex items-center">
          <span className="text-xs bg-muted px-2 py-0.5 rounded">
            {booking.sport}
          </span>
          <span className="ml-auto font-medium">
            ₹{booking.price.toLocaleString()}
          </span>
        </div>
        
        <div className="mt-4 flex space-x-2">
          {booking.status === 'upcoming' && (
            <>
              <Button variant="outline" size="sm" className="flex-1">
                Modify
              </Button>
              <Button variant="destructive" size="sm" className="flex-1">
                Cancel
              </Button>
            </>
          )}
          {booking.status === 'completed' && (
            <Button variant="outline" size="sm" className="w-full">
              Book Again
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface TournamentBookingProps {
  booking: {
    id: string;
    tournamentName: string;
    location: string;
    date: Date;
    time: string;
    status: string;
    price: number;
    teamName: string;
  };
}

function TournamentBookingCard({ booking }: TournamentBookingProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-primary">{booking.tournamentName}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{booking.location}</span>
            </div>
          </div>
          <div className={`px-2 py-1 rounded text-xs ${
            booking.status === 'upcoming' ? 'bg-green-100 text-green-700' : 
            booking.status === 'completed' ? 'bg-gray-100 text-gray-700' : 
            'bg-red-100 text-red-700'
          }`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
        </div>
        
        <div className="mt-3 flex items-center text-sm">
          <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
          <span>{format(booking.date, "PPP")}</span>
          <Clock className="h-4 w-4 mx-1 ml-3 text-muted-foreground" />
          <span>{booking.time}</span>
        </div>
        
        <div className="mt-2 flex items-center">
          <span className="text-xs bg-muted px-2 py-0.5 rounded">
            Team: {booking.teamName}
          </span>
          <span className="ml-auto font-medium">
            ₹{booking.price.toLocaleString()}
          </span>
        </div>
        
        <div className="mt-4 flex space-x-2">
          {booking.status === 'upcoming' && (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => {
                  // Download fixture image
                  const link = document.createElement('a');
                  link.href = 'https://khelmanch.com/wp-content/uploads/2025/02/11.png';
                  link.download = 'tournament-fixtures.png';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                View Fixtures
              </Button>
              <Link to={`/tournaments/${booking.id}`} className="flex-1">
                <Button variant="default" size="sm" className="w-full">
                  View Tournament
                </Button>
              </Link>
            </>
          )}
          {booking.status === 'completed' && (
            <Link to={`/tournaments/${booking.id}`} className="w-full">
              <Button variant="outline" size="sm" className="w-full">
                View Results
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
