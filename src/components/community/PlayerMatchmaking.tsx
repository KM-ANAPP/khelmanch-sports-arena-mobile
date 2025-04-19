
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { User, MapPin, Calendar, Clock, Star, Search } from "lucide-react";

// Mock player data
const mockPlayers = [
  {
    id: "player1",
    name: "Rahul Singh",
    avatar: null,
    location: "Andheri, Mumbai",
    sports: ["Cricket", "Football"],
    rating: 4.8,
    distance: 1.2,
    availability: ["Weekends", "Evenings"],
    skillLevel: "Intermediate"
  },
  {
    id: "player2",
    name: "Priya Sharma",
    avatar: null,
    location: "Bandra, Mumbai",
    sports: ["Tennis", "Badminton"],
    rating: 4.5,
    distance: 3.5,
    availability: ["Weekdays", "Mornings"],
    skillLevel: "Advanced"
  },
  {
    id: "player3",
    name: "Amit Patel",
    avatar: null,
    location: "Powai, Mumbai",
    sports: ["Cricket", "Table Tennis"],
    rating: 4.2,
    distance: 2.8,
    availability: ["Weekends", "Afternoons"],
    skillLevel: "Beginner"
  },
  {
    id: "player4",
    name: "Neha Gupta",
    avatar: null,
    location: "Juhu, Mumbai",
    sports: ["Badminton", "Basketball"],
    rating: 4.9,
    distance: 1.5,
    availability: ["Weekdays", "Evenings"],
    skillLevel: "Intermediate"
  },
];

// Mock looking for players posts
const mockLookingForPlayers = [
  {
    id: "lfp1",
    userId: "player1",
    userName: "Rahul Singh",
    userAvatar: null,
    sport: "Cricket",
    location: "Victory Cricket Ground, Andheri",
    date: "2025-04-26",
    time: "16:00 - 18:00",
    playersNeeded: 3,
    skillLevel: "All Levels",
    description: "Looking for players for a casual cricket match. Beginners welcome!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
  },
  {
    id: "lfp2",
    userId: "player2",
    userName: "Priya Sharma",
    userAvatar: null,
    sport: "Tennis",
    location: "Tennis Court Central, Bandra",
    date: "2025-04-27",
    time: "09:00 - 11:00",
    playersNeeded: 1,
    skillLevel: "Intermediate",
    description: "Need a tennis partner for a practice session. Intermediate level preferred.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8)
  },
  {
    id: "lfp3",
    userId: "player3",
    userName: "Amit Patel",
    userAvatar: null,
    sport: "Cricket",
    location: "Local Ground, Powai",
    date: "2025-04-28",
    time: "18:00 - 20:00",
    playersNeeded: 6,
    skillLevel: "Beginner",
    description: "Organizing a friendly cricket match for beginners. Come join us!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
  },
];

// Mock local events
const mockEvents = [
  {
    id: "event1",
    title: "Weekend Cricket Tournament",
    organizer: "Mumbai Sports Club",
    location: "Multiple venues, Mumbai",
    date: "2025-05-10",
    registrationDeadline: "2025-05-01",
    description: "A weekend cricket tournament for amateur teams. Cash prizes for winners!",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1095&q=80"
  },
  {
    id: "event2",
    title: "Badminton Coaching Camp",
    organizer: "Pro Badminton Academy",
    location: "Indoor Stadium, Andheri",
    date: "2025-05-15 to 2025-05-20",
    registrationDeadline: "2025-05-05",
    description: "Learn badminton from professional coaches. Open to all skill levels.",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac1ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
];

export default function PlayerMatchmaking() {
  const [activeTab, setActiveTab] = useState("matchmaking");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState<string>("all");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string>("all");
  
  const filteredPlayers = mockPlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        player.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = selectedSport === "all" || player.sports.includes(selectedSport);
    const matchesSkill = selectedSkillLevel === "all" || player.skillLevel.toLowerCase() === selectedSkillLevel.toLowerCase();
    
    return matchesSearch && matchesSport && matchesSkill;
  });
  
  const handleConnectPlayer = (playerId: string) => {
    const player = mockPlayers.find(p => p.id === playerId);
    if (player) {
      toast(`Connection request sent to ${player.name}`);
    }
  };
  
  const handleJoinMatch = (postId: string) => {
    const post = mockLookingForPlayers.find(p => p.id === postId);
    if (post) {
      toast(`You joined ${post.userName}'s ${post.sport} match`);
    }
  };
  
  const handleRegisterEvent = (eventId: string) => {
    const event = mockEvents.find(e => e.id === eventId);
    if (event) {
      toast(`Registration initiated for ${event.title}`);
    }
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="matchmaking">Find Players</TabsTrigger>
          <TabsTrigger value="looking">Looking for Players</TabsTrigger>
          <TabsTrigger value="events">Local Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="matchmaking" className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search players..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <Select value={selectedSport} onValueChange={setSelectedSport}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sports</SelectItem>
                  <SelectItem value="Cricket">Cricket</SelectItem>
                  <SelectItem value="Football">Football</SelectItem>
                  <SelectItem value="Tennis">Tennis</SelectItem>
                  <SelectItem value="Badminton">Badminton</SelectItem>
                  <SelectItem value="Basketball">Basketball</SelectItem>
                  <SelectItem value="Table Tennis">Table Tennis</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedSkillLevel} onValueChange={setSelectedSkillLevel}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Skill level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-3">
            {filteredPlayers.map((player) => (
              <Card key={player.id} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {player.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                        {player.avatar && (
                          <AvatarImage src={player.avatar} alt={player.name} />
                        )}
                      </Avatar>
                      
                      <div>
                        <h3 className="font-medium">{player.name}</h3>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{player.location} ({player.distance} km)</span>
                        </div>
                        
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs">{player.rating}/5.0</span>
                        </div>
                        
                        <div className="flex flex-wrap mt-2">
                          {player.sports.map((sport) => (
                            <Badge key={sport} variant="outline" className="mr-1 mb-1">
                              {sport}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleConnectPlayer(player.id)}
                    >
                      Connect
                    </Button>
                  </div>
                  
                  <div className="mt-3 pt-2 border-t flex justify-between text-xs text-muted-foreground">
                    <div>
                      <span className="font-medium">Skill: </span>
                      {player.skillLevel}
                    </div>
                    <div>
                      <span className="font-medium">Available: </span>
                      {player.availability.join(", ")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredPlayers.length === 0 && (
              <div className="text-center p-8">
                <User className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground mt-2">No players found matching your criteria</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSport("all");
                    setSelectedSkillLevel("all");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="looking" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Players Looking for Matches</h2>
            <Button size="sm">
              Create Post
            </Button>
          </div>
          
          <div className="space-y-3">
            {mockLookingForPlayers.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {post.userName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                        {post.userAvatar && (
                          <AvatarImage src={post.userAvatar} alt={post.userName} />
                        )}
                      </Avatar>
                      
                      <div>
                        <h3 className="font-medium">{post.userName}</h3>
                        <Badge className="mt-1">{post.sport}</Badge>
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-sm">{post.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{post.location}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>Need {post.playersNeeded} players</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{post.time}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <Badge variant="outline">{post.skillLevel}</Badge>
                      <Button 
                        onClick={() => handleJoinMatch(post.id)}
                      >
                        Join Match
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-4">
          <h2 className="text-lg font-semibold">Upcoming Local Events</h2>
          
          <div className="space-y-4">
            {mockEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="relative h-40">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-semibold text-white text-lg">{event.title}</h3>
                    <p className="text-white/80 text-sm">{event.organizer}</p>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-sm">{event.description}</p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      Registration Deadline: {event.registrationDeadline}
                    </div>
                    <Button 
                      onClick={() => handleRegisterEvent(event.id)}
                    >
                      Register
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
