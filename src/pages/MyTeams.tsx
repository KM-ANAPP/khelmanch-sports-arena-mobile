
import { useState } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Users, Plus, CreditCard, Edit, X, ArrowRight, Trophy } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { toast } from "@/hooks/use-toast";

// Mock teams data
const mockTeams = [
  {
    id: "team1",
    name: "Thunder Strikers",
    sport: "Cricket",
    members: 11,
    logo: null,
    tournaments: 2,
    wins: 1
  },
  {
    id: "team2",
    name: "Tech Titans",
    sport: "Football",
    members: 8,
    logo: null,
    tournaments: 3,
    wins: 0
  },
  {
    id: "team3",
    name: "Badminton Blazers",
    sport: "Badminton",
    members: 4,
    logo: null,
    tournaments: 1,
    wins: 1
  }
];

export default function MyTeams() {
  const { isAuthenticated } = useAuth();
  const [teams, setTeams] = useState(mockTeams);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamSport, setNewTeamSport] = useState("Cricket");
  const [teamLogo, setTeamLogo] = useState<string | null>(null);

  const handleCreateTeam = () => {
    if (!newTeamName.trim()) {
      toast({
        title: "Team Name Required",
        description: "Please enter a name for your team",
        variant: "destructive",
      });
      return;
    }

    const newTeam = {
      id: `team${teams.length + 1}`,
      name: newTeamName,
      sport: newTeamSport,
      members: 1, // Starting with just the creator
      logo: teamLogo,
      tournaments: 0,
      wins: 0
    };

    setTeams([...teams, newTeam]);
    setShowCreateDialog(false);
    setNewTeamName("");
    setNewTeamSport("Cricket");
    setTeamLogo(null);

    toast({
      title: "Team Created",
      description: `Your team "${newTeamName}" has been created successfully.`,
    });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTeamLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const availableSports = ["Cricket", "Football", "Basketball", "Tennis", "Badminton", "Table Tennis", "Volleyball"];

  return (
    <MobileLayout isLoggedIn={isAuthenticated}>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Teams</h1>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Create Team
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Team</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex justify-center">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-2 border-primary">
                      {teamLogo ? (
                        <AvatarImage src={teamLogo} alt="Team Logo" />
                      ) : (
                        <AvatarFallback className="bg-secondary text-white">
                          <Users className="h-12 w-12" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <label htmlFor="team-logo" className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground p-2 rounded-full cursor-pointer">
                      <Edit className="h-4 w-4" />
                      <input 
                        id="team-logo" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleLogoChange}
                      />
                    </label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="team-name">Team Name</Label>
                  <Input
                    id="team-name"
                    placeholder="Enter team name"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="team-sport">Sport</Label>
                  <select
                    id="team-sport"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                    value={newTeamSport}
                    onChange={(e) => setNewTeamSport(e.target.value)}
                  >
                    {availableSports.map(sport => (
                      <option key={sport} value={sport}>{sport}</option>
                    ))}
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTeam}>
                  Create Team
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {teams.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent className="pt-4">
              <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No Teams Yet</h3>
              <p className="text-muted-foreground mb-4">Create a team to participate in tournaments and manage your players.</p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Team
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {teams.map(team => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  );
}

interface TeamCardProps {
  team: {
    id: string;
    name: string;
    sport: string;
    members: number;
    logo: string | null;
    tournaments: number;
    wins: number;
  };
}

function TeamCard({ team }: TeamCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center">
        <Avatar className="h-12 w-12 mr-4">
          {team.logo ? (
            <AvatarImage src={team.logo} alt={team.name} />
          ) : (
            <AvatarFallback className="bg-secondary text-white">
              {team.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <CardTitle className="text-lg">{team.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{team.sport}</p>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-muted p-2 rounded">
            <p className="text-xs text-muted-foreground">Members</p>
            <p className="font-semibold">{team.members}</p>
          </div>
          <div className="bg-muted p-2 rounded">
            <p className="text-xs text-muted-foreground">Tournaments</p>
            <p className="font-semibold">{team.tournaments}</p>
          </div>
          <div className="bg-muted p-2 rounded">
            <p className="text-xs text-muted-foreground">Wins</p>
            <p className="font-semibold">{team.wins}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button variant="outline" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Manage
          </Button>
          <Button size="sm">
            <Trophy className="h-4 w-4 mr-2" />
            Join Tournament
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
