
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ticketService, TicketData } from '@/services/ticketService';
import { useToast } from '@/hooks/use-toast';

export function useTickets() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async () => {
    if (!isAuthenticated || !user) {
      setError("User not authenticated");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const userTickets = ticketService.getUserTickets(user.id);
      setTickets(userTickets);
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setError("Failed to fetch tickets. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const createTicket = async (
    paymentData: {
      paymentId: string;
      orderId: string;
      amount: number;
      currency: string;
      orderDetails: any;
    }
  ): Promise<TicketData | null> => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to create a ticket",
        variant: "destructive",
      });
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newTicket = await ticketService.createTicket(paymentData, {
        id: user.id,
        name: user.name || 'User',
        email: user.email || '',
        phone: user.phone
      });

      setTickets(prev => [newTicket, ...prev]);
      
      toast({
        title: "Ticket Created",
        description: "Your booking ticket has been generated successfully",
      });
      
      return newTicket;
    } catch (err) {
      console.error("Error creating ticket:", err);
      setError("Failed to create ticket. Please try again.");
      
      toast({
        title: "Ticket Creation Failed",
        description: "Failed to create your ticket. Please contact support.",
        variant: "destructive",
      });
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getTicket = (ticketId: string): TicketData | null => {
    if (!user) return null;
    return ticketService.getTicket(ticketId, user.id);
  };

  const updateTicketStatus = (ticketId: string, status: TicketData['status']): boolean => {
    if (!user) return false;
    
    const success = ticketService.updateTicketStatus(ticketId, user.id, status);
    if (success) {
      setTickets(prev => 
        prev.map(ticket => 
          ticket.id === ticketId ? { ...ticket, status } : ticket
        )
      );
    }
    return success;
  };

  // Load tickets when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchTickets();
    }
  }, [isAuthenticated, user]);

  return {
    tickets,
    isLoading,
    error,
    fetchTickets,
    createTicket,
    getTicket,
    updateTicketStatus
  };
}
