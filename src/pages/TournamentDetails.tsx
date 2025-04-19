
import { useParams, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Ticket } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useTournament } from "@/hooks/use-tournament";
import { TournamentHeader } from "@/components/tournaments/TournamentHeader";
import { TicketDialog } from "@/components/tournaments/TicketDialog";
import TournamentBracket, { Match, BracketData } from "@/components/tournaments/TournamentBracket";
import MatchSchedule from "@/components/tournaments/MatchSchedule";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Calendar, Clock, Info, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TournamentDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    selectedTicketType,
    ticketQuantity,
    isMatchDetailsOpen,
    selectedMatch,
    isExpanded,
    setSelectedTicketType,
    setTicketQuantity,
    setIsMatchDetailsOpen,
    setIsExpanded,
    handleMatchClick,
    handleSubscribeToUpdates
  } = useTournament();

  // Create proper match data that conforms to the Match interface
  const matchesData: Match[] = [
    {
      id: "m1",
      round: 1,
      position: 1,
      team1: { id: "t1", name: "Team A" },
      team2: { id: "t2", name: "Team B" },
      date: "May 15, 2025",
      time: "9:00 AM",
      court: "Court 1",
      officials: ["John Doe"],
      completed: false
    },
    {
      id: "m2",
      round: 1,
      position: 2,
      team1: { id: "t3", name: "Team C" },
      team2: { id: "t4", name: "Team D" },
      date: "May 15, 2025",
      time: "1:00 PM",
      court: "Court 2",
      officials: ["Jane Smith"],
      completed: false
    },
    {
      id: "m3",
      round: 1,
      position: 3,
      team1: { id: "t5", name: "Team E" },
      team2: { id: "t6", name: "Team F" },
      date: "May 15, 2025",
      time: "5:00 PM",
      court: "Court 1",
      officials: ["Alex Johnson"],
      completed: false
    },
    {
      id: "m4",
      round: 1,
      position: 4,
      team1: { id: "t7", name: "Team G" },
      team2: { id: "t8", name: "Team H" },
      date: "May 16, 2025",
      time: "9:00 AM",
      court: "Court 1",
      officials: ["Sam Wilson"],
      completed: false
    },
    {
      id: "m5",
      round: 1,
      position: 5,
      team1: { id: "t9", name: "Team I" },
      team2: { id: "t10", name: "Team J" },
      date: "May 16, 2025",
      time: "1:00 PM",
      court: "Court 2",
      officials: ["Maria Garcia"],
      completed: false
    },
    {
      id: "m6",
      round: 1,
      position: 6,
      team1: { id: "t11", name: "Team K" },
      team2: { id: "t12", name: "Team L" },
      date: "May 16, 2025",
      time: "5:00 PM",
      court: "Court 1",
      officials: ["Robert Lee"],
      completed: false
    }
  ];

  // Create proper tournament bracket data
  const bracketData: BracketData = {
    rounds: 3,
    matches: [
      ...matchesData,
      {
        id: "sf1",
        round: 2,
        position: 1,
        team1: null, // Will be determined
        team2: null, // Will be determined
        date: "May 18, 2025",
        time: "1:00 PM",
        court: "Court 1",
        officials: ["John Doe", "Jane Smith"],
        completed: false
      },
      {
        id: "sf2",
        round: 2,
        position: 2,
        team1: null, // Will be determined
        team2: null, // Will be determined
        date: "May 18, 2025",
        time: "5:00 PM",
        court: "Court 1",
        officials: ["Alex Johnson", "Sam Wilson"],
        completed: false
      },
      {
        id: "final",
        round: 3,
        position: 1,
        team1: null, // Will be determined
        team2: null, // Will be determined
        date: "May 20, 2025",
        time: "5:00 PM",
        court: "Center Court",
        officials: ["John Doe", "Jane Smith", "Alex Johnson", "Sam Wilson"],
        completed: false
      }
    ]
  };

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

  const registrationHandler = () => {
    navigate(`/tournaments/${id}/register`);
  };

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <MobileLayout title="Tournament Details" isLoggedIn={true}>
      <div className="pb-4">
        <TournamentHeader 
          tournament={tournament}
          isExpanded={isExpanded}
          onExpandClick={() => setIsExpanded(!isExpanded)}
          onRegisterClick={registrationHandler}
          onTicketsClick={() => setIsMatchDetailsOpen(true)}
        />

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
                  matches={matchesData} 
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

        <TicketDialog 
          isOpen={isMatchDetailsOpen}
          onOpenChange={setIsMatchDetailsOpen}
          selectedTicketType={selectedTicketType}
          ticketQuantity={ticketQuantity}
          onTicketTypeChange={setSelectedTicketType}
          onQuantityChange={setTicketQuantity}
          onCheckout={proceedToCheckout}
          ticketTypes={tournament.ticketTypes}
        />

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
      </div>
    </MobileLayout>
  );
}
