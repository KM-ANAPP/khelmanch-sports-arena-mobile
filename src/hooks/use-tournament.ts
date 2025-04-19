
import { useState } from "react";
import { Match } from "@/components/tournaments/TournamentBracket";
import { toast } from "@/hooks/use-toast";

interface TournamentState {
  selectedTicketType: string;
  ticketQuantity: string;
  isMatchDetailsOpen: boolean;
  selectedMatch: Match | null;
  isExpanded: boolean;
}

export const useTournament = () => {
  const [state, setState] = useState<TournamentState>({
    selectedTicketType: "",
    ticketQuantity: "1",
    isMatchDetailsOpen: false,
    selectedMatch: null,
    isExpanded: false
  });

  const setSelectedTicketType = (value: string) => {
    setState(prev => ({ ...prev, selectedTicketType: value }));
  };

  const setTicketQuantity = (value: string) => {
    setState(prev => ({ ...prev, ticketQuantity: value }));
  };

  const setIsMatchDetailsOpen = (value: boolean) => {
    setState(prev => ({ ...prev, isMatchDetailsOpen: value }));
  };

  const setSelectedMatch = (match: Match | null) => {
    setState(prev => ({ ...prev, selectedMatch: match }));
  };

  const setIsExpanded = (value: boolean) => {
    setState(prev => ({ ...prev, isExpanded: value }));
  };

  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match);
    setIsMatchDetailsOpen(true);
  };

  const handleSubscribeToUpdates = () => {
    toast({
      title: "Subscribed to Updates",
      description: "You will receive notifications about this match.",
    });
    setIsMatchDetailsOpen(false);
  };

  return {
    ...state,
    setSelectedTicketType,
    setTicketQuantity,
    setIsMatchDetailsOpen,
    setSelectedMatch,
    setIsExpanded,
    handleMatchClick,
    handleSubscribeToUpdates
  };
};
