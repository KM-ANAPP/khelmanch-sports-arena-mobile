import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Calendar, Trophy, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Tournament {
  id: string;
  title: string;
  location: string;
  date: string;
  sport: string;
  price: number;
  status: 'open' | 'closed';
}

const mockTournaments: Tournament[] = [
  {
    id: "1",
    title: "Delhi Cricket Championship",
    location: "Delhi Sports Complex",
    date: "2024-02-15",
    sport: "Cricket",
    price: 500,
    status: "open"
  },
  {
    id: "2", 
    title: "Badminton Masters Cup",
    location: "Siri Fort Sports Complex",
    date: "2024-02-20",
    sport: "Badminton",
    price: 300,
    status: "open"
  },
  {
    id: "3",
    title: "Football League 2024",
    location: "Jawaharlal Nehru Stadium",
    date: "2024-02-25",
    sport: "Football",
    price: 750,
    status: "closed"
  }
];

interface TournamentSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TournamentSearch({ open, onOpenChange }: TournamentSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTournaments, setFilteredTournaments] = useState(mockTournaments);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockTournaments.filter(tournament =>
      tournament.title.toLowerCase().includes(query.toLowerCase()) ||
      tournament.sport.toLowerCase().includes(query.toLowerCase()) ||
      tournament.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTournaments(filtered);
  };

  const handleTournamentClick = (tournamentId: string) => {
    navigate(`/tournament-details/${tournamentId}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md h-[80vh] p-0">
        <DialogHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">Search Tournaments</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="px-4 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tournaments, sports, venues..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto px-4 pb-4">
          {filteredTournaments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-center">
              <Trophy className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No tournaments found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTournaments.map((tournament) => (
                <Card 
                  key={tournament.id} 
                  className="cursor-pointer hover:shadow-md transition-all"
                  onClick={() => handleTournamentClick(tournament.id)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-sm">{tournament.title}</h3>
                        <Badge variant={tournament.status === 'open' ? 'default' : 'secondary'}>
                          {tournament.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {tournament.location}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(tournament.date).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {tournament.sport}
                        </Badge>
                        <span className="font-semibold text-sm">₹{tournament.price}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}