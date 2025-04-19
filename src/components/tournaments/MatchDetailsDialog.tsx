
import { Match } from "./TournamentBracket";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MatchDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMatch: Match | null;
  onSubscribeToUpdates: () => void;
}

export const MatchDetailsDialog = ({
  isOpen,
  onOpenChange,
  selectedMatch,
  onSubscribeToUpdates
}: MatchDetailsDialogProps) => {
  if (!selectedMatch) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Match Details</DialogTitle>
        </DialogHeader>
        
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
            <Button className="w-full" onClick={onSubscribeToUpdates}>
              Subscribe to Match Updates
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
