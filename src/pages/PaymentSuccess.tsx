
import { useLocation, useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layouts/mobile-layout';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check, Share2, Download, Home } from 'lucide-react';

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentId, orderId } = location.state || {};

  return (
    <MobileLayout isLoggedIn={true}>
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6"
        >
          <Check className="w-8 h-8 text-white" />
        </motion.div>

        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-muted-foreground mb-4">Your order has been confirmed</p>
        
        <div className="bg-muted/30 p-4 rounded-lg mb-6 w-full max-w-sm">
          <p className="text-sm mb-2">Order ID: {orderId || 'N/A'}</p>
          <p className="text-sm">Payment ID: {paymentId || 'N/A'}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-6">
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>

        <Button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Return to Home
        </Button>
      </div>
    </MobileLayout>
  );
}

