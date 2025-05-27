
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Share2, 
  Download, 
  QrCode,
  Trophy,
  CreditCard
} from 'lucide-react';
import { motion } from 'framer-motion';
import { TicketData } from '@/services/ticketService';
import { format } from 'date-fns';

interface TicketDisplayProps {
  ticket: TicketData;
  onShare?: () => void;
  onDownload?: () => void;
  compact?: boolean;
}

export function TicketDisplay({ ticket, onShare, onDownload, compact = false }: TicketDisplayProps) {
  const getStatusColor = (status: TicketData['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'used': return 'bg-gray-100 text-gray-700';
      case 'expired': return 'bg-red-100 text-red-700';
      case 'cancelled': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP');
    } catch {
      return dateString;
    }
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {ticket.id}
                  </Badge>
                  <Badge className={getStatusColor(ticket.status)}>
                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </Badge>
                </div>
                <h3 className="font-semibold text-sm">{ticket.venue}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(ticket.date)}
                  </span>
                  {ticket.startTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {ticket.startTime}
                    </span>
                  )}
                </div>
              </div>
              <QrCode className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-md mx-auto"
    >
      <Card className="overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-primary/20">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">KHELMANCH</h2>
                <p className="text-xs opacity-90">Sports Booking Ticket</p>
              </div>
              <Badge className={`${getStatusColor(ticket.status)} border-0`}>
                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Ticket Info */}
          <div className="p-6 space-y-4">
            {/* Ticket ID */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Ticket ID</p>
              <p className="font-mono font-bold text-lg tracking-wider">{ticket.id}</p>
            </div>

            <Separator />

            {/* Event Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">{ticket.venue}</p>
                  <p className="text-sm text-muted-foreground">{ticket.sport}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{formatDate(ticket.date)}</p>
                  {ticket.startTime && (
                    <p className="text-sm text-muted-foreground">
                      {ticket.startTime} {ticket.endTime && `- ${ticket.endTime}`}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{ticket.userName}</p>
                  <p className="text-sm text-muted-foreground">{ticket.userEmail}</p>
                </div>
              </div>

              {ticket.eventType === 'tournament' && (
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Tournament Entry</p>
                    <p className="text-sm text-muted-foreground">Entry Fee: ₹{(ticket.amount / 100).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* QR Code Section */}
            <div className="text-center space-y-3">
              <p className="text-sm font-medium">Scan to Check-in</p>
              <div className="bg-white p-4 rounded-lg border inline-block">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-gray-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-mono">{ticket.barcode}</p>
            </div>

            <Separator />

            {/* Payment Info */}
            <div className="flex items-center gap-3 text-sm">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span>Payment ID: {ticket.paymentId}</span>
            </div>

            {/* Terms */}
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="font-medium">Terms & Conditions:</p>
              <ul className="space-y-1">
                {ticket.terms.map((term, index) => (
                  <li key={index}>• {term}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 bg-muted/30 flex gap-2">
            {onShare && (
              <Button variant="outline" size="sm" onClick={onShare} className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            )}
            {onDownload && (
              <Button variant="outline" size="sm" onClick={onDownload} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
