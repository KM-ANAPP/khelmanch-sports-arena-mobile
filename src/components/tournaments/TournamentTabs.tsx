
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { TournamentDetailsTab } from "./TournamentDetailsTab";
import { TournamentRulesTab } from "./TournamentRulesTab";
import { TournamentScheduleTab } from "./TournamentScheduleTab";
import { TournamentBracketsTab } from "./TournamentBracketsTab";
import { Match } from "./TournamentBracket";
import { TournamentResultsTab } from "./TournamentResultsTab";

interface TournamentTabsProps {
  tournament: {
    address: string;
    mapUrl: string;
    prizes: string[];
    organizer: string;
    organizerContact: string;
    rules: string[];
  };
  status: string;
  results?: { position: string; name: string; imageUrl: string }[];
  matchesData: Match[];
  bracketData: any;
  onMatchClick: (match: Match) => void;
}

export const TournamentTabs = ({
  tournament,
  status,
  results,
  matchesData,
  bracketData,
  onMatchClick
}: TournamentTabsProps) => {
  return (
    <Tabs defaultValue="details" className="w-full px-4">
      <TabsList className={`grid w-full ${status === 'past' && results && results.length > 0 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="rules">Rules</TabsTrigger>
        {status === 'past' && results && results.length > 0 && (
          <TabsTrigger value="results">Winners</TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="details" className="space-y-4 mt-4">
        <TournamentDetailsTab tournament={tournament} />
      </TabsContent>

      <TabsContent value="rules" className="space-y-4 mt-4">
        <TournamentRulesTab rules={tournament.rules} />
      </TabsContent>

      {status === 'past' && results && results.length > 0 && (
        <TabsContent value="results" className="space-y-4 mt-4">
          <TournamentResultsTab results={results} />
        </TabsContent>
      )}
    </Tabs>
  );
};
