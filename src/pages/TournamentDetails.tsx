
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { useTournament } from "@/hooks/use-tournament";
import { useTournamentData } from "@/hooks/use-tournament-data";
import { TournamentHeader } from "@/components/tournaments/TournamentHeader";
import { TournamentTabs } from "@/components/tournaments/TournamentTabs";
import { RegisterTeamDialog } from "@/components/tournaments/RegisterTeamDialog";

export default function TournamentDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tournament, matchesData, bracketData } = useTournamentData(id!);
  const {
    isExpanded,
    setIsExpanded,
  } = useTournament();
  
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);

  const registrationHandler = () => {
    setIsRegisterDialogOpen(true);
  };


  return (
    <MobileLayout isLoggedIn={true}>
      <div className="pb-4">
        <TournamentHeader 
          tournament={tournament}
          isExpanded={isExpanded}
          onExpandClick={() => setIsExpanded(!isExpanded)}
          onRegisterClick={registrationHandler}
        />

        <TournamentTabs 
          tournament={tournament}
          matchesData={matchesData}
          bracketData={bracketData}
          onMatchClick={() => {}}
        />

        <RegisterTeamDialog
          isOpen={isRegisterDialogOpen}
          onOpenChange={setIsRegisterDialogOpen}
          tournament={{
            id: id!,
            title: tournament.title,
            tokenAmount: tournament.tokenAmount || 500,
            fullAmount: tournament.fullAmount || 2000
          }}
        />
      </div>
    </MobileLayout>
  );
}
