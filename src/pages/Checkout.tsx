
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MobileLayout } from '@/components/layouts/mobile-layout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Ticket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { OrderDetails } from '@/types/checkout';
import { OrderSummary } from '@/components/checkout/order-summary';
import { PaymentStatus } from '@/components/checkout/payment-status';
import { Button } from '@/components/ui/button';
import { CheckoutForm } from '@/components/checkout/checkout-form';
import paymentService from '@/services/paymentService';
import { passService } from '@/services/passService';
import { Badge } from '@/components/ui/badge';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [hasAppliedPass, setHasAppliedPass] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const locationState = location.state as { orderDetails?: OrderDetails } | null;
    
    if (locationState?.orderDetails) {
      setOrderDetails(locationState.orderDetails);
      
      // If this is a tournament purchase, check for an active pass
      if (locationState.orderDetails.type === 'tournament' && passService.hasActivePass()) {
        const discount = passService.getDiscountAmount(locationState.orderDetails.amount);
        setDiscountAmount(discount);
        setHasAppliedPass(true);
      }
    } else {
      setOrderDetails({
        amount: 10000,
        currency: 'INR',
        orderId: 'order_' + Date.now(),
        description: 'Test Transaction',
        type: 'tournament',
        itemId: 'tournament1',
        itemName: 'Khelmanch Test Payment'
      });
    }
  }, [location]);

  useEffect(() => {
    // Load Razorpay script
    const loadRazorpay = async () => {
      try {
        const scriptLoaded = await paymentService.loadRazorpayScript();
        console.log("Razorpay script loaded status:", scriptLoaded);
        setIsRazorpayReady(scriptLoaded);
        
        if (!scriptLoaded) {
          setError('Failed to load payment gateway. Please try again later.');
          toast({
            variant: "destructive",
            title: "Payment Gateway Error",
            description: "Failed to load payment gateway. Please try again later.",
          });
        }
      } catch (err) {
        console.error("Error loading Razorpay:", err);
        setError('Failed to load payment gateway. Please try refreshing the page.');
      }
    };
    
    loadRazorpay();
  }, [toast]);

  const handlePaymentSubmit = async () => {
    if (!orderDetails) {
      toast({
        title: "Checkout Error",
        description: "No order details found. Please try again.",
      });
      return;
    }
    
    if (!name || !email || !phone) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Starting payment process for order:", orderDetails);
      
      // Calculate final amount after any discounts
      let finalAmount = orderDetails.amount;
      if (hasAppliedPass && discountAmount > 0) {
        finalAmount = finalAmount - discountAmount;
      }
      
      await paymentService.initiatePayment(
        name,
        email,
        phone,
        finalAmount,
        orderDetails.orderId,
        orderDetails.description,
        (response) => {
          // Payment successful
          console.log("Payment successful:", response);
          
          // If this is a pass purchase, create the pass
          if (orderDetails?.type === 'pass') {
            // Extract the pass type from the itemId
            const passType = orderDetails.itemId.includes('-') 
              ? orderDetails.itemId.split('-')[2] as 'basic' | 'standard' | 'premium' | 'ultimate'
              : 'basic';
              
            passService.purchasePass(response.razorpay_payment_id, passType);
          } else if (hasAppliedPass && orderDetails?.type === 'tournament') {
            // Consume one use of the pass for tournament purchases
            passService.consumePass();
          }
          
          toast({
            title: "Payment Successful",
            description: `Payment ID: ${response.razorpay_payment_id}`,
          });
          
          navigate('/payment-success', { 
            state: { 
              paymentId: response.razorpay_payment_id, 
              orderId: response.razorpay_order_id,
              orderDetails,
              discountApplied: hasAppliedPass ? discountAmount : 0
            } 
          });
        },
        (err) => {
          // Payment failed
          console.error("Payment failed:", err);
          const errorMessage = err.message || 'Payment failed. Please try again.';
          setError(errorMessage);
          toast({
            title: "Payment Failed",
            description: errorMessage,
          });
        }
      );
    } catch (err: any) {
      console.error("Error during payment process:", err);
      const errorMessage = err.message || 'Payment failed. Please try again.';
      setError(errorMessage);
      toast({
        title: "Payment Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!orderDetails) {
    return (
      <MobileLayout isLoggedIn={isAuthenticated}>
        <div className="p-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No order details found. Please try again.
            </AlertDescription>
          </Alert>
          <Button className="w-full mt-4" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout isLoggedIn={isAuthenticated}>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold">Checkout</h1>
        
        <PaymentStatus 
          error={error}
          isRazorpayReady={isRazorpayReady}
        />
        
        {hasAppliedPass && discountAmount > 0 && orderDetails.type === 'tournament' && (
          <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center">
              <Ticket className="h-5 w-5 mr-2 text-secondary" />
              <div>
                <p className="font-medium">KhelManch Pass Applied</p>
                <p className="text-sm text-muted-foreground">15% discount on this tournament</p>
              </div>
            </div>
            <Badge variant="secondary" className="ml-2">
              -₹{(discountAmount / 100).toLocaleString()}
            </Badge>
          </div>
        )}
        
        <OrderSummary 
          orderDetails={orderDetails}
          discountAmount={discountAmount}
        />

        <CheckoutForm 
          name={name}
          email={email}
          phone={phone}
          termsAccepted={termsAccepted}
          isLoading={isLoading}
          isRazorpayReady={isRazorpayReady}
          onNameChange={setName}
          onEmailChange={setEmail}
          onPhoneChange={setPhone}
          onTermsChange={setTermsAccepted}
          onSubmit={handlePaymentSubmit}
          amount={orderDetails.amount - discountAmount}
        />
      </div>
    </MobileLayout>
  );
}
