
import { useParams, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { useTournament } from "@/hooks/use-tournament";
import { useTournamentData } from "@/hooks/use-tournament-data";
import { TournamentHeader } from "@/components/tournaments/TournamentHeader";
import { TournamentTabs } from "@/components/tournaments/TournamentTabs";
import { TicketDialog } from "@/components/tournaments/TicketDialog";
import { MatchDetailsDialog } from "@/components/tournaments/MatchDetailsDialog";

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
    if (!selectedTicketType) return;
    
    // Find selected ticket type
    const ticketType = tournament.ticketTypes.find(
      ticket => ticket.id === parseInt(selectedTicketType)
    );
    
    if (!ticketType) return;
    
    const quantity = parseInt(ticketQuantity || "1");
    const amount = ticketType.price * quantity;
    
    // Navigate to checkout with tournament details
    navigate('/checkout', {
      state: {
        orderDetails: {
          amount: amount * 100, // Convert to paise
          currency: "INR",
          orderId: `tournament_${id}_${Date.now()}`,
          description: `${ticketType.name} for ${tournament.title} (${quantity} ticket${quantity > 1 ? 's' : ''})`,
          type: "tournament",
          itemId: `tournament_${id}`,
          itemName: tournament.title
        }
      }
    });
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

        <TournamentTabs 
          tournament={tournament}
          matchesData={matchesData}
          bracketData={bracketData}
          onMatchClick={handleMatchClick}
        />

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
