
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
        setIsRazorpayReady(scriptLoaded);
      } catch (err) {
        setError('Failed to load payment gateway');
      }
    };
    
    loadRazorpay();
  }, []);

  const handlePaymentSubmit = async () => {
    if (!orderDetails) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      await paymentService.initiatePayment(
        name,
        email,
        phone,
        orderDetails.amount,
        orderDetails.orderId,
        orderDetails.description,
        (response) => {
          // Payment successful
          toast({
            title: "Payment Successful",
            description: `Payment ID: ${response.razorpay_payment_id}`,
          });
          navigate('/payment-success', { 
            state: { paymentResponse: response, orderDetails } 
          });
        },
        (err) => {
          // Payment failed
          setError(err.message || 'Payment failed. Please try again.');
          toast({
            variant: "destructive",
            title: "Payment Failed",
            description: err.message || 'Payment failed. Please try again.',
          });
        }
      );
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
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
