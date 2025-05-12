
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface TicketDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTicketType: string;
  ticketQuantity: string;
  onTicketTypeChange: (value: string) => void;
  onQuantityChange: (value: string) => void;
  onCheckout: () => void;
  ticketTypes: Array<{
    id: number;
    name: string;
    price: number;
    description: string;
  }>;
}

export const TicketDialog = ({
  isOpen,
  onOpenChange,
  selectedTicketType,
  ticketQuantity,
  onTicketTypeChange,
  onQuantityChange,
  onCheckout,
  ticketTypes
}: TicketDialogProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Populate user data if available
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  const handleCheckout = () => {
    // Find selected ticket type
    const selectedTicket = ticketTypes.find(t => t.id === parseInt(selectedTicketType));
    if (!selectedTicket) {
      toast({ 
        title: "Error", 
        description: "Please select a ticket type" 
      });
      return;
    }

    const quantity = parseInt(ticketQuantity) || 1;
    if (quantity < 1) {
      toast({ 
        title: "Error", 
        description: "Please select a valid quantity" 
      });
      return;
    }

    // Close dialog
    onOpenChange(false);
    
    // Navigate to checkout
    navigate("/checkout", {
      state: {
        orderDetails: {
          amount: selectedTicket.price * quantity,
          currency: "INR",
          orderId: `ticket_${selectedTicket.id}_${Date.now()}`,
          description: `${quantity} x ${selectedTicket.name} - ${selectedTicket.description}`,
          type: "tournament",
          itemId: `ticket-${selectedTicket.id}`,
          itemName: selectedTicket.name
        }
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buy Tickets</DialogTitle>
          <DialogDescription>
            Select your ticket type and quantity to proceed.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="ticket-type">Ticket Type</Label>
            <Select value={selectedTicketType} onValueChange={onTicketTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select ticket type" />
              </SelectTrigger>
              <SelectContent>
                {ticketTypes.map((type) => (
                  <SelectItem key={type.id} value={String(type.id)}>
                    {type.name} - ₹{type.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input 
              id="quantity" 
              type="number" 
              min="1" 
              value={ticketQuantity}
              onChange={(e) => onQuantityChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              placeholder="Enter your full name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              placeholder="Enter your phone number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCheckout}>
            Proceed to Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
