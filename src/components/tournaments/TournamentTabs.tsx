
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { TournamentDetailsTab } from "./TournamentDetailsTab";
import { TournamentRulesTab } from "./TournamentRulesTab";
import { TournamentScheduleTab } from "./TournamentScheduleTab";
import { TournamentBracketsTab } from "./TournamentBracketsTab";
import { Match } from "./TournamentBracket";

interface TournamentTabsProps {
  tournament: {
    address: string;
    mapUrl: string;
    prizes: string[];
    organizer: string;
    organizerContact: string;
    rules: string[];
  };
  matchesData: Match[];
  bracketData: any;
  onMatchClick: (match: Match) => void;
}

export const TournamentTabs = ({
  tournament,
  matchesData,
  bracketData,
  onMatchClick
}: TournamentTabsProps) => {
  return (
    <Tabs defaultValue="details" className="w-full px-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="rules">Rules</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
        <TabsTrigger value="brackets">Brackets</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="space-y-4 mt-4">
        <TournamentDetailsTab tournament={tournament} />
      </TabsContent>

      <TabsContent value="rules" className="space-y-4 mt-4">
        <TournamentRulesTab rules={tournament.rules} />
      </TabsContent>

      <TabsContent value="schedule" className="mt-4">
        <TournamentScheduleTab 
          matches={matchesData} 
          onMatchClick={onMatchClick}
        />
      </TabsContent>

      <TabsContent value="brackets" className="mt-4">
        <TournamentBracketsTab 
          data={bracketData} 
          onMatchClick={onMatchClick}
        />
      </TabsContent>
    </Tabs>
  );
};
