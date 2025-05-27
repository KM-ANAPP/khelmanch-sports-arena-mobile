
import { useLocation, useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layouts/mobile-layout';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTickets } from '@/hooks/useTickets';
import { TicketData } from '@/services/ticketService';
import { TicketDisplay } from '@/components/tickets/TicketDisplay';
import { LoadingShimmer } from '@/components/ui/loading-shimmer';

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { createTicket } = useTickets();
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [isGeneratingTicket, setIsGeneratingTicket] = useState(true);
  const { paymentId, orderId, orderDetails } = location.state || {};

  useEffect(() => {
    const generateTicket = async () => {
      if (!paymentId || !orderId) {
        setIsGeneratingTicket(false);
        return;
      }

      try {
        const newTicket = await createTicket({
          paymentId,
          orderId,
          amount: orderDetails?.amount || 0,
          currency: orderDetails?.currency || 'INR',
          orderDetails: orderDetails || {}
        });
        
        setTicket(newTicket);
      } catch (error) {
        console.error('Failed to generate ticket:', error);
      } finally {
        setIsGeneratingTicket(false);
      }
    };

    generateTicket();
  }, [paymentId, orderId, orderDetails, createTicket]);

  return (
    <MobileLayout isLoggedIn={true}>
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6"
        >
          <Check className="w-8 h-8 text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground mb-4">Your booking has been confirmed</p>
        </motion.div>

        {isGeneratingTicket ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full max-w-md space-y-4"
          >
            <p className="text-sm text-muted-foreground">Generating your ticket...</p>
            <LoadingShimmer height="300px" className="rounded-xl" />
          </motion.div>
        ) : ticket ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full"
          >
            <TicketDisplay ticket={ticket} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-muted/30 p-4 rounded-lg w-full max-w-sm"
          >
            <p className="text-sm mb-2">Order ID: {orderId || 'N/A'}</p>
            <p className="text-sm">Payment ID: {paymentId || 'N/A'}</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Return to Home
          </Button>
        </motion.div>
      </div>
    </MobileLayout>
  );
}
