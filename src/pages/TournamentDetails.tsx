
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Award, Clock, Info, Ticket, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TournamentBracket, { Match, BracketData } from "@/components/tournaments/TournamentBracket";
import MatchSchedule from "@/components/tournaments/MatchSchedule";
import { toast } from "@/hooks/use-toast";

export default function TournamentDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState<string>("");
  const [ticketQuantity, setTicketQuantity] = useState<string>("1");
  const [isMatchDetailsOpen, setIsMatchDetailsOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  
  const tournament = {
    id: Number(id),
    title: "Summer Cricket Championship",
    sport: "Cricket",
    date: "May 15-20, 2025",
    registrationDeadline: "May 10, 2025",
    location: "Khelmanch Stadium, Mumbai",
    address: "123 Sports Complex, Andheri East, Mumbai, Maharashtra 400069",
    mapUrl: "https://maps.google.com",
    status: "upcoming",
    registrationOpen: true,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80",
    description: "Join us for the annual Summer Cricket Championship! This prestigious event brings together the best cricket teams from across the region for an exciting week of competition. The tournament features both T20 and ODI formats, with separate categories for men's, women's, and junior teams. Substantial cash prizes await the winners!",
    organizer: "Khelmanch Sports",
    organizerContact: "+91 9876543210",
    rules: [
      "Teams must have between 12-15 players",
      "All players must bring valid ID proof",
      "Teams must arrive 30 minutes before their scheduled match",
      "ICC rules will be followed for all matches",
      "The decision of the umpires and tournament officials is final"
    ],
    prizes: [
      "Winner: ₹50,000 + Trophy",
      "Runner-up: ₹25,000 + Trophy",
      "Player of the Tournament: ₹10,000 + Medal",
      "Best Batsman: ₹5,000 + Medal",
      "Best Bowler: ₹5,000 + Medal"
    ],
    schedule: [
      {
        day: "Day 1 - May 15, 2025",
        matches: [
          "Team A vs Team B - 9:00 AM",
          "Team C vs Team D - 1:00 PM",
          "Team E vs Team F - 5:00 PM"
        ]
      },
      {
        day: "Day 2 - May 16, 2025",
        matches: [
          "Team G vs Team H - 9:00 AM",
          "Team I vs Team J - 1:00 PM",
          "Team K vs Team L - 5:00 PM"
        ]
      }
    ],
    ticketTypes: [
      {
        id: 1,
        name: "General Admission",
        price: 200,
        description: "Basic entry to all matches",
        available: true
      },
      {
        id: 2,
        name: "Premium Seating",
        price: 500,
        description: "Covered seating with better views",
        available: true
      },
      {
        id: 3,
        name: "VIP Package",
        price: 1000,
        description: "Best seats, access to player areas, refreshments included",
        available: true
      }
    ]
  };

  // Mock tournament bracket data
  const bracketData: BracketData = {
    rounds: 3,
    matches: [
      // Quarter finals
      {
        id: "m1",
        round: 1,
        position: 1,
        team1: { id: "t1", name: "Team A", score: 180 },
        team2: { id: "t2", name: "Team B", score: 165 },
        winner: "team1",
        date: "May 15, 2025",
        time: "09:00 AM",
        court: "Court 1",
        officials: ["Umpire: J. Smith"],
        completed: true
      },
      {
        id: "m2",
        round: 1,
        position: 2,
        team1: { id: "t3", name: "Team C", score: 210 },
        team2: { id: "t4", name: "Team D", score: 175 },
        winner: "team1",
        date: "May 15, 2025",
        time: "01:00 PM",
        court: "Court 1",
        officials: ["Umpire: A. Johnson"],
        completed: true
      },
      {
        id: "m3",
        round: 1,
        position: 3,
        team1: { id: "t5", name: "Team E", score: 190 },
        team2: { id: "t6", name: "Team F", score: 195 },
        winner: "team2",
        date: "May 15, 2025",
        time: "05:00 PM",
        court: "Court 1",
        officials: ["Umpire: R. Patel"],
        completed: true
      },
      {
        id: "m4",
        round: 1,
        position: 4,
        team1: { id: "t7", name: "Team G", score: 160 },
        team2: { id: "t8", name: "Team H", score: 185 },
        winner: "team2",
        date: "May 16, 2025",
        time: "09:00 AM",
        court: "Court 1",
        officials: ["Umpire: S. Kumar"],
        completed: true
      },
      // Semi finals
      {
        id: "m5",
        round: 2,
        position: 1,
        team1: { id: "t1", name: "Team A", score: 205 },
        team2: { id: "t3", name: "Team C", score: 180 },
        winner: "team1",
        date: "May 18, 2025",
        time: "01:00 PM",
        court: "Court 1",
        officials: ["Umpire: J. Smith", "Umpire: A. Johnson"],
        completed: true
      },
      {
        id: "m6",
        round: 2,
        position: 2,
        team1: { id: "t6", name: "Team F", score: 175 },
        team2: { id: "t8", name: "Team H", score: 170 },
        winner: "team1",
        date: "May 18, 2025",
        time: "05:00 PM",
        court: "Court 1",
        officials: ["Umpire: R. Patel", "Umpire: S. Kumar"],
        completed: true
      },
      // Final
      {
        id: "m7",
        round: 3,
        position: 1,
        team1: { id: "t1", name: "Team A" },
        team2: { id: "t6", name: "Team F" },
        date: "May 20, 2025",
        time: "05:00 PM",
        court: "Main Court",
        officials: ["Umpire: J. Smith", "Umpire: R. Patel", "Third Umpire: D. Chopra"],
        completed: false
      }
    ]
  };

  // All matches for the schedule view
  const allMatches = bracketData.matches;

  const registrationHandler = () => {
    navigate(`/tournaments/${id}/register`);
  };

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match);
    setIsMatchDetailsOpen(true);
  };

  const handleSubscribeToUpdates = () => {
    toast({
      title: "Subscribed to Updates",
      description: "You will receive notifications about this match.",
    });
    setIsMatchDetailsOpen(false);
  };

  return (
    <MobileLayout title="Tournament Details" isLoggedIn={true}>
      <div className="pb-4">
        <div className="relative h-48">
          <img 
            src={tournament.image} 
            alt={tournament.title} 
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 left-2 bg-primary/70 text-primary-foreground text-xs font-medium py-1 px-2 rounded">
            {tournament.sport}
          </div>
          {tournament.registrationOpen && (
            <div className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs font-medium py-1 px-2 rounded">
              Registration Open
            </div>
          )}
        </div>

        <div className="p-4 pb-2">
          <h1 className="text-xl font-bold text-primary">{tournament.title}</h1>
          <p className="text-sm text-muted-foreground mb-2">Organized by {tournament.organizer}</p>
          
          <div className="space-y-2 mt-3">
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-secondary" />
              <span>{tournament.date}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-secondary" />
              <span>{tournament.location}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-secondary" />
              <span>Registration Deadline: {tournament.registrationDeadline}</span>
            </div>
          </div>

          <div className="mt-4">
            <p className={`text-sm ${!isExpanded && 'line-clamp-3'}`}>
              {tournament.description}
            </p>
            <button 
              className="text-secondary text-sm flex items-center mt-1"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>Show Less <ChevronUp className="h-4 w-4 ml-1" /></>
              ) : (
                <>Read More <ChevronDown className="h-4 w-4 ml-1" /></>
              )}
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button 
              onClick={registrationHandler}
              disabled={!tournament.registrationOpen}
            >
              Register Team
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Ticket className="h-4 w-4 mr-2" />
                  Get Tickets
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Buy Tickets</DialogTitle>
                  <DialogDescription>
                    Select your ticket type and quantity to proceed.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="ticket-type">Ticket Type</Label>
                    <Select value={selectedTicketType} onValueChange={setSelectedTicketType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ticket type" />
                      </SelectTrigger>
                      <SelectContent>
                        {tournament.ticketTypes.map((type) => (
                          <SelectItem key={type.id} value={String(type.id)}>
                            {type.name} - ₹{type.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input 
                      id="quantity" 
                      type="number" 
                      min="1" 
                      value={ticketQuantity}
                      onChange={(e) => setTicketQuantity(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={proceedToCheckout}>
                    Proceed to Payment
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full px-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="brackets">Brackets</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4 mt-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-secondary" />
                    Venue
                  </h3>
                  <p className="text-sm mt-1">{tournament.address}</p>
                  <a 
                    href={tournament.mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-secondary text-sm mt-1 block"
                  >
                    View on Map
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-semibold flex items-center">
                    <Award className="h-4 w-4 mr-2 text-secondary" />
                    Prizes
                  </h3>
                  <ul className="text-sm mt-1 space-y-1">
                    {tournament.prizes.map((prize, index) => (
                      <li key={index}>{prize}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold flex items-center">
                    <Info className="h-4 w-4 mr-2 text-secondary" />
                    Contact Information
                  </h3>
                  <p className="text-sm mt-1">Organizer: {tournament.organizer}</p>
                  <p className="text-sm">Phone: {tournament.organizerContact}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="rules" className="space-y-4 mt-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-2">Tournament Rules</h3>
                <ul className="text-sm space-y-2">
                  {tournament.rules.map((rule, index) => (
                    <li key={index} className="flex">
                      <span className="mr-2">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="schedule" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-3">Match Schedule</h3>
                <MatchSchedule 
                  matches={allMatches} 
                  onMatchClick={handleMatchClick}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="brackets" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-3">Tournament Brackets</h3>
                <TournamentBracket 
                  data={bracketData} 
                  onMatchClick={handleMatchClick}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Match Details Dialog */}
      <Dialog open={isMatchDetailsOpen} onOpenChange={setIsMatchDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Match Details</DialogTitle>
          </DialogHeader>
          
          {selectedMatch && (
            <div className="space-y-4 py-2">
              <div className="flex justify-between items-center">
                <div className="font-semibold">
                  {selectedMatch.team1?.name || 'TBD'} vs {selectedMatch.team2?.name || 'TBD'}
                </div>
                <div className="text-sm">
                  {selectedMatch.completed ? (
                    <span className="text-green-600 font-medium">Completed</span>
                  ) : (
                    <span className="text-amber-600 font-medium">Upcoming</span>
                  )}
                </div>
              </div>
              
              {selectedMatch.completed && selectedMatch.team1?.score !== undefined && 
                selectedMatch.team2?.score !== undefined && (
                <div className="text-center py-2 bg-muted/30 rounded-md">
                  <div className="grid grid-cols-3 items-center">
                    <div className="text-center">
                      <div className="font-bold text-lg">{selectedMatch.team1.score}</div>
                      <div className="text-sm">{selectedMatch.team1.name}</div>
                    </div>
                    
                    <div className="text-sm font-medium">vs</div>
                    
                    <div className="text-center">
                      <div className="font-bold text-lg">{selectedMatch.team2.score}</div>
                      <div className="text-sm">{selectedMatch.team2.name}</div>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm font-medium">
                    Winner: {selectedMatch.winner === 'team1' 
                      ? selectedMatch.team1?.name 
                      : selectedMatch.team2?.name}
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{selectedMatch.date}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{selectedMatch.time}</span>
                </div>
                
                {selectedMatch.court && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Court: {selectedMatch.court}</span>
                  </div>
                )}
                
                {selectedMatch.officials && selectedMatch.officials.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Match Officials:</h4>
                    <ul className="text-sm space-y-1">
                      {selectedMatch.officials.map((official, index) => (
                        <li key={index}>{official}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {!selectedMatch.completed && (
                <Button className="w-full" onClick={handleSubscribeToUpdates}>
                  Subscribe to Match Updates
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
}
