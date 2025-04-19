
import { Card, CardContent } from "@/components/ui/card";
import { Match } from "./TournamentBracket";
import MatchSchedule from "./MatchSchedule";

interface TournamentScheduleTabProps {
  matches: Match[];
  onMatchClick: (match: Match) => void;
}

export const TournamentScheduleTab = ({ matches, onMatchClick }: TournamentScheduleTabProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-semibold mb-3">Match Schedule</h3>
        <MatchSchedule 
          matches={matches} 
          onMatchClick={onMatchClick}
        />
      </CardContent>
    </Card>
  );
};
