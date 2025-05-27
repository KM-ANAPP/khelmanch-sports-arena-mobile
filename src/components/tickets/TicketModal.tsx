
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TicketDisplay } from './TicketDisplay';
import { TicketData, ticketService } from '@/services/ticketService';
import { useToast } from '@/hooks/use-toast';

interface TicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: TicketData | null;
}

export function TicketModal({ open, onOpenChange, ticket }: TicketModalProps) {
  const { toast } = useToast();

  const handleShare = async () => {
    if (!ticket) return;

    try {
      const shareData = ticketService.generateTicketForSharing(ticket);
      
      if (navigator.share) {
        await navigator.share({
          title: `Khelmanch Ticket - ${ticket.venue}`,
          text: `My booking for ${ticket.venue} on ${ticket.date}`,
          url: window.location.origin
        });
      } else {
        // Fallback for browsers without Web Share API
        await navigator.clipboard.writeText(`Ticket ID: ${ticket.id}\nVenue: ${ticket.venue}\nDate: ${ticket.date}`);
        toast({
          title: "Ticket Details Copied",
          description: "Ticket information has been copied to clipboard",
        });
      }
    } catch (error) {
      console.error('Error sharing ticket:', error);
      toast({
        title: "Share Failed",
        description: "Could not share ticket. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (!ticket) return;

    try {
      const ticketData = ticketService.generateTicketForSharing(ticket);
      const link = document.createElement('a');
      link.href = ticketData;
      link.download = `khelmanch-ticket-${ticket.id}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Ticket Downloaded",
        description: "Your ticket has been downloaded successfully",
      });
    } catch (error) {
      console.error('Error downloading ticket:', error);
      toast({
        title: "Download Failed",
        description: "Could not download ticket. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!ticket) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Your Ticket</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <TicketDisplay
            ticket={ticket}
            onShare={handleShare}
            onDownload={handleDownload}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
