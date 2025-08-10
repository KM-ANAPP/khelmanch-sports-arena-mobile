import { Match, BracketData } from "@/components/tournaments/TournamentBracket";

export const useTournamentData = (id: string) => {
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
        team1: null,
        team2: null,
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
        team1: null,
        team2: null,
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
        team1: null,
        team2: null,
        date: "May 20, 2025",
        time: "5:00 PM",
        court: "Center Court",
        officials: ["John Doe", "Jane Smith", "Alex Johnson", "Sam Wilson"],
        completed: false
      }
    ]
  };

  const isPast = id === "5" || id === "6";

  const tournament = {
    id: Number(id),
    tokenAmount: 500,
    fullAmount: 2000,
    title: isPast ? (id === "5" ? "Basketball Tournament" : "Volleyball Championship") : "Summer Cricket Championship",
    sport: isPast ? (id === "5" ? "Basketball" : "Volleyball") : "Cricket",
    date: isPast ? (id === "5" ? "March 10-15, 2025" : "February 20-25, 2025") : "May 15-20, 2025",
    registrationDeadline: isPast ? "—" : "May 10, 2025",
    location: isPast ? (id === "5" ? "Indoor Arena, Bangalore" : "Beach Arena, Goa") : "Khelmanch Stadium, Mumbai",
    address: "123 Sports Complex, Andheri East, Mumbai, Maharashtra 400069",
    mapUrl: "https://maps.google.com",
    status: isPast ? "past" : "upcoming",
    registrationOpen: !isPast,
    image: isPast
      ? (id === "5"
          ? "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=60"
          : "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=60")
      : "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1167&q=60",
    description:
      "Join us for the annual Summer Cricket Championship! This prestigious event brings together the best teams for an exciting week of competition.",
    organizer: "Khelmanch Sports",
    organizerContact: "+91 9876543210",
    rules: [
      "Teams must have between 12-15 players",
      "All players must bring valid ID proof",
      "Teams must arrive 30 minutes before their scheduled match",
      "ICC rules will be followed for all matches",
      "The decision of the umpires and tournament officials is final",
    ],
    prizes: [
      "Winner: ₹50,000 + Trophy",
      "Runner-up: ₹25,000 + Trophy",
      "Player of the Tournament: ₹10,000 + Medal",
      "Best Batsman: ₹5,000 + Medal",
      "Best Bowler: ₹5,000 + Medal",
    ],
    ticketTypes: [
      { id: 1, name: "General Admission", price: 200, description: "Basic entry to all matches", available: !isPast },
      { id: 2, name: "Premium Seating", price: 500, description: "Covered seating with better views", available: !isPast },
      { id: 3, name: "VIP Package", price: 1000, description: "Best seats, access to player areas, refreshments included", available: !isPast },
    ],
    results: isPast
      ? [
          {
            position: "Winner",
            name: id === "5" ? "Raptors" : "Wave Riders",
            imageUrl:
              id === "5"
                ? "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=60"
                : "https://images.unsplash.com/photo-1503342452485-86ff0a5f0e99?auto=format&fit=crop&w=1200&q=60",
          },
          {
            position: "Runner Up",
            name: id === "5" ? "Falcons" : "Sand Kings",
            imageUrl:
              id === "5"
                ? "https://images.unsplash.com/photo-1604639688593-20f65b0e39cd?auto=format&fit=crop&w=1200&q=60"
                : "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=60",
          },
        ]
      : [],
  } as any;

  return {
    tournament,
    matchesData,
    bracketData
  };
};
