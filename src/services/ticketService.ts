
import { useToast } from '@/hooks/use-toast';

export interface TicketData {
  id: string;
  bookingId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  venue: string;
  sport: string;
  eventType: 'ground' | 'tournament';
  date: string;
  startTime?: string;
  endTime?: string;
  amount: number;
  currency: string;
  paymentId: string;
  qrCode: string;
  barcode: string;
  status: 'active' | 'used' | 'expired' | 'cancelled';
  createdAt: string;
  expiresAt: string;
  terms: string[];
}

class TicketService {
  private static instance: TicketService;

  private constructor() {}

  public static getInstance(): TicketService {
    if (!TicketService.instance) {
      TicketService.instance = new TicketService();
    }
    return TicketService.instance;
  }

  // Generate unique ticket ID
  private generateTicketId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `TKT-${timestamp}-${random}`.toUpperCase();
  }

  // Generate unique booking ID
  private generateBookingId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `BKG-${timestamp}-${random}`.toUpperCase();
  }

  // Generate QR code data
  private generateQRCode(ticketData: Partial<TicketData>): string {
    const qrData = {
      ticketId: ticketData.id,
      bookingId: ticketData.bookingId,
      venue: ticketData.venue,
      date: ticketData.date,
      time: ticketData.startTime,
      sport: ticketData.sport,
      userName: ticketData.userName
    };
    
    // In a real app, this would generate an actual QR code
    // For now, we'll create a base64 encoded string
    return `data:text/plain;base64,${btoa(JSON.stringify(qrData))}`;
  }

  // Generate barcode
  private generateBarcode(ticketId: string): string {
    // Convert ticket ID to a simple barcode format
    return ticketId.replace(/[^A-Z0-9]/g, '');
  }

  // Create ticket after successful payment
  public async createTicket(
    paymentData: {
      paymentId: string;
      orderId: string;
      amount: number;
      currency: string;
      orderDetails: any;
    },
    userData: {
      id: string;
      name: string;
      email: string;
      phone?: string;
    }
  ): Promise<TicketData> {
    try {
      const ticketId = this.generateTicketId();
      const bookingId = this.generateBookingId();
      
      // Calculate expiry (24 hours after event for ground, event date for tournaments)
      const eventDate = new Date(paymentData.orderDetails.date || Date.now());
      const expiryDate = new Date(eventDate.getTime() + (24 * 60 * 60 * 1000));

      const ticketData: TicketData = {
        id: ticketId,
        bookingId: bookingId,
        userId: userData.id,
        userName: userData.name,
        userEmail: userData.email,
        userPhone: userData.phone,
        venue: paymentData.orderDetails.itemName || 'Venue',
        sport: paymentData.orderDetails.sport || 'Sports',
        eventType: paymentData.orderDetails.type || 'ground',
        date: paymentData.orderDetails.date || new Date().toISOString().split('T')[0],
        startTime: paymentData.orderDetails.startTime,
        endTime: paymentData.orderDetails.endTime,
        amount: paymentData.amount,
        currency: paymentData.currency,
        paymentId: paymentData.paymentId,
        qrCode: '',
        barcode: '',
        status: 'active',
        createdAt: new Date().toISOString(),
        expiresAt: expiryDate.toISOString(),
        terms: [
          'This ticket is non-transferable and non-refundable',
          'Present this QR code at venue for entry',
          'Arrive 15 minutes before your slot time',
          'Follow venue rules and regulations',
          'Management reserves the right to refuse entry'
        ]
      };

      // Generate QR code and barcode
      ticketData.qrCode = this.generateQRCode(ticketData);
      ticketData.barcode = this.generateBarcode(ticketId);

      // Store ticket (in a real app, this would be an API call)
      this.storeTicket(ticketData);

      console.log('Ticket created successfully:', ticketData);
      return ticketData;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw new Error('Failed to create ticket');
    }
  }

  // Store ticket locally (in real app, this would be API call)
  private storeTicket(ticketData: TicketData): void {
    const existingTickets = this.getUserTickets(ticketData.userId);
    const updatedTickets = [...existingTickets, ticketData];
    localStorage.setItem(`tickets_${ticketData.userId}`, JSON.stringify(updatedTickets));
  }

  // Get user's tickets
  public getUserTickets(userId: string): TicketData[] {
    try {
      const stored = localStorage.getItem(`tickets_${userId}`);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error retrieving tickets:', error);
      return [];
    }
  }

  // Get specific ticket
  public getTicket(ticketId: string, userId: string): TicketData | null {
    const tickets = this.getUserTickets(userId);
    return tickets.find(ticket => ticket.id === ticketId) || null;
  }

  // Update ticket status
  public updateTicketStatus(ticketId: string, userId: string, status: TicketData['status']): boolean {
    try {
      const tickets = this.getUserTickets(userId);
      const ticketIndex = tickets.findIndex(ticket => ticket.id === ticketId);
      
      if (ticketIndex !== -1) {
        tickets[ticketIndex].status = status;
        localStorage.setItem(`tickets_${userId}`, JSON.stringify(tickets));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating ticket status:', error);
      return false;
    }
  }

  // Generate ticket PDF/image data for sharing
  public generateTicketForSharing(ticket: TicketData): string {
    // In a real app, this would generate actual PDF/image
    // For now, return a data URL representing the ticket
    const ticketInfo = {
      id: ticket.id,
      venue: ticket.venue,
      date: ticket.date,
      time: ticket.startTime,
      sport: ticket.sport,
      user: ticket.userName
    };
    
    return `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(ticketInfo, null, 2))}`;
  }
}

export const ticketService = TicketService.getInstance();
