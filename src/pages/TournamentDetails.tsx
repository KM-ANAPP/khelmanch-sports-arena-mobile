import { useParams, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Ticket } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useTournament } from "@/hooks/use-tournament";
import { TournamentHeader } from "@/components/tournaments/TournamentHeader";
import { TicketDialog } from "@/components/tournaments/TicketDialog";
import TournamentBracket from "@/components/tournaments/TournamentBracket";
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
                  matches={tournament.schedule} 
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
                  data={tournament.brackets} 
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
