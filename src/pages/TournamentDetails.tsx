
import { useParams, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useTournament } from "@/hooks/use-tournament";
import { useTournamentData } from "@/hooks/use-tournament-data";
import { TournamentHeader } from "@/components/tournaments/TournamentHeader";
import { TournamentDetailsTab } from "@/components/tournaments/TournamentDetailsTab";
import { TournamentRulesTab } from "@/components/tournaments/TournamentRulesTab";
import { TicketDialog } from "@/components/tournaments/TicketDialog";
import { MatchDetailsDialog } from "@/components/tournaments/MatchDetailsDialog";
import TournamentBracket from "@/components/tournaments/TournamentBracket";
import MatchSchedule from "@/components/tournaments/MatchSchedule";

export default function TournamentDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tournament, matchesData, bracketData } = useTournamentData(id!);
  const {
    selectedTicketType,
    ticketQuantity,
    isMatchDetailsOpen,
    selectedMatch,
    isExpanded,
    setSelectedTicketType,
    setTicketQuantity,
    setIsMatchDetailsOpen,
    setIsExpanded,
    handleMatchClick,
    handleSubscribeToUpdates
  } = useTournament();

  const registrationHandler = () => {
    navigate(`/tournaments/${id}/register`);
  };

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <MobileLayout title="Tournament Details" isLoggedIn={true}>
      <div className="pb-4">
        <TournamentHeader 
          tournament={tournament}
          isExpanded={isExpanded}
          onExpandClick={() => setIsExpanded(!isExpanded)}
          onRegisterClick={registrationHandler}
          onTicketsClick={() => setIsMatchDetailsOpen(true)}
        />

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
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-3">Match Schedule</h3>
                <MatchSchedule 
                  matches={matchesData} 
                  onMatchClick={handleMatchClick}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="brackets" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-3">Tournament Brackets</h3>
                <TournamentBracket 
                  data={bracketData} 
                  onMatchClick={handleMatchClick}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <TicketDialog 
          isOpen={isMatchDetailsOpen}
          onOpenChange={setIsMatchDetailsOpen}
          selectedTicketType={selectedTicketType}
          ticketQuantity={ticketQuantity}
          onTicketTypeChange={setSelectedTicketType}
          onQuantityChange={setTicketQuantity}
          onCheckout={proceedToCheckout}
          ticketTypes={tournament.ticketTypes}
        />

        <MatchDetailsDialog
          isOpen={isMatchDetailsOpen}
          onOpenChange={setIsMatchDetailsOpen}
          selectedMatch={selectedMatch}
          onSubscribeToUpdates={handleSubscribeToUpdates}
        />
      </div>
    </MobileLayout>
  );
}
