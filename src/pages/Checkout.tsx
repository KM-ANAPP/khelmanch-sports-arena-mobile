
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MobileLayout } from '@/components/layouts/mobile-layout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { OrderDetails } from '@/types/checkout';
import { OrderSummary } from '@/components/checkout/order-summary';
import { PaymentStatus } from '@/components/checkout/payment-status';
import { Button } from '@/components/ui/button';
import { CheckoutForm } from '@/components/checkout/checkout-form';
import paymentService from '@/services/paymentService';

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
        variant: "destructive",
        title: "Checkout Error",
        description: "No order details found. Please try again.",
      });
      return;
    }
    
    if (!name || !email || !phone) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields.",
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Starting payment process for order:", orderDetails);
      
      await paymentService.initiatePayment(
        name,
        email,
        phone,
        orderDetails.amount,
        orderDetails.orderId,
        orderDetails.description,
        (response) => {
          // Payment successful
          console.log("Payment successful:", response);
          toast({
            title: "Payment Successful",
            description: `Payment ID: ${response.razorpay_payment_id}`,
          });
          navigate('/payment-success', { 
            state: { 
              paymentId: response.razorpay_payment_id, 
              orderId: response.razorpay_order_id,
              orderDetails 
            } 
          });
        },
        (err) => {
          // Payment failed
          console.error("Payment failed:", err);
          const errorMessage = err.message || 'Payment failed. Please try again.';
          setError(errorMessage);
          toast({
            variant: "destructive",
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
        variant: "destructive",
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
        
        <OrderSummary orderDetails={orderDetails} />

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
          amount={orderDetails.amount}
        />
      </div>
    </MobileLayout>
  );
}
