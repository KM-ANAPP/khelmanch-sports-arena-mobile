
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Match } from "./TournamentBracket";

interface MatchScheduleProps {
  matches: Match[];
  onMatchClick?: (match: Match) => void;
}

export const MatchSchedule: React.FC<MatchScheduleProps> = ({ matches, onMatchClick }) => {
  // Group matches by date
  const matchesByDate = matches.reduce((acc, match) => {
    if (!acc[match.date]) {
      acc[match.date] = [];
    }
    acc[match.date].push(match);
    return acc;
  }, {} as Record<string, Match[]>);
  
  // Sort matches by time for each date
  Object.keys(matchesByDate).forEach(date => {
    matchesByDate[date].sort((a, b) => {
      return a.time.localeCompare(b.time);
    });
  });
  
  // Sort dates chronologically
  const sortedDates = Object.keys(matchesByDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  return (
    <div className="match-schedule-container">
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4 pt-4">
          {sortedDates.map(date => (
            <div key={date} className="date-group">
              <h3 className="text-sm font-semibold flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                {date}
              </h3>
              
              <div className="space-y-2">
                {matchesByDate[date].map(match => (
                  <Card 
                    key={match.id} 
                    className={`cursor-pointer transition-shadow hover:shadow-md ${
                      match.completed ? 'border-green-200' : ''
                    }`}
                    onClick={() => onMatchClick?.(match)}
                  >
                    <CardContent className="p-3">
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <div className="font-medium">
                            {match.team1?.name || 'TBD'} vs {match.team2?.name || 'TBD'}
                          </div>
                          {match.completed && (
                            <div className="text-green-600 text-sm font-medium">
                              Completed
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center text-xs text-muted-foreground mt-2">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{match.time}</span>
                        </div>
                        
                        {match.court && (
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>Court: {match.court}</span>
                          </div>
                        )}
                        
                        {match.officials && match.officials.length > 0 && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Officials: {match.officials.join(', ')}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="calendar" className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Match</TableHead>
                <TableHead>Court</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches.map(match => (
                <TableRow 
                  key={match.id}
                  className="cursor-pointer hover:bg-muted/80"
                  onClick={() => onMatchClick?.(match)}
                >
                  <TableCell>{match.date}</TableCell>
                  <TableCell>{match.time}</TableCell>
                  <TableCell>
                    {match.team1?.name || 'TBD'} vs {match.team2?.name || 'TBD'}
                  </TableCell>
                  <TableCell>{match.court || 'TBD'}</TableCell>
                  <TableCell>
                    {match.completed ? (
                      <span className="text-green-600">Completed</span>
                    ) : (
                      <span className="text-amber-600">Upcoming</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MatchSchedule;
