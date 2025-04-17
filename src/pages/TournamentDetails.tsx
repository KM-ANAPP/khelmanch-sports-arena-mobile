
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

export default function TournamentDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // In a real app, you would fetch tournament details based on the ID
  // This is mock data for the demo
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

  return (
    <MobileLayout title="Tournament Details" isLoggedIn={true}>
      <div className="pb-4">
        {/* Header Image */}
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

        {/* Tournament Info */}
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

          {/* Description */}
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

          {/* Register/Get Tickets Button */}
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
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="ticket-type">Ticket Type</Label>
                    <Select>
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
                    <Input id="quantity" type="number" min="1" defaultValue="1" />
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
                  <Button type="submit">
                    Proceed to Payment
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tabs for Details */}
        <Tabs defaultValue="details" className="w-full px-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
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
                <h3 className="text-sm font-semibold mb-2">Match Schedule</h3>
                <Accordion type="single" collapsible className="w-full">
                  {tournament.schedule.map((day, index) => (
                    <AccordionItem key={index} value={`day-${index}`}>
                      <AccordionTrigger className="text-sm">{day.day}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="text-sm space-y-2 py-2">
                          {day.matches.map((match, matchIndex) => (
                            <li key={matchIndex} className="flex">
                              <span className="mr-2">•</span>
                              <span>{match}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}
