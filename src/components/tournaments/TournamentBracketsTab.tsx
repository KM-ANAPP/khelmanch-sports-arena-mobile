
import { Card, CardContent } from "@/components/ui/card";
import TournamentBracket, { Match } from "./TournamentBracket";

interface TournamentBracketsTabProps {
  data: any;
  onMatchClick: (match: Match) => void;
}

export const TournamentBracketsTab = ({ data, onMatchClick }: TournamentBracketsTabProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-semibold mb-3">Tournament Brackets</h3>
        <TournamentBracket 
          data={data} 
          onMatchClick={onMatchClick}
        />
      </CardContent>
    </Card>
  );
};
