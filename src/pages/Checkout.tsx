import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MobileLayout } from '@/components/layouts/mobile-layout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import notificationService from '@/utils/notifications';
import { useAuth } from '@/context/AuthContext';
import paymentService from '@/services/paymentService';
import { OrderDetails } from '@/types/checkout';
import { OrderSummary } from '@/components/checkout/order-summary';
import { CheckoutForm } from '@/components/checkout/checkout-form';
import { PaymentStatus } from '@/components/checkout/payment-status';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
        amount: 10000, // ₹100.00 (in paise)
        currency: 'INR',
        orderId: 'order_' + Date.now(),
        description: 'Test Transaction',
        type: 'tournament',
        itemId: 'tournament1',
        itemName: 'Khelmanch Test Payment'
      });
    }
  }, [location]);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    if (!orderDetails) {
      setError("Order details not available. Please try again.");
      setIsLoading(false);
      return;
    }

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (phone.length < 10) {
      setError("Please enter a valid phone number");
      setIsLoading(false);
      return;
    }

    if (!termsAccepted) {
      setError("Please accept the terms and conditions");
      setIsLoading(false);
      return;
    }

    try {
      const options = {
        amount: orderDetails.amount,
        currency: orderDetails.currency,
        name: 'Khelmanch Sports',
        description: orderDetails.description,
        image: 'https://lovableproject.com/assets/logos/khelmanch-logo.png',
        order_id: orderDetails.orderId,
        prefill: {
          name,
          email,
          contact: phone
        },
        notes: {
          itemId: orderDetails.itemId,
          itemType: orderDetails.type
        },
        theme: {
          color: '#2AA9DD'
        }
      };

      await paymentService.startPayment(options, {
        onSuccess: (response) => {
          console.log('Payment Success:', response);
          notificationService.sendNotification(
            "Payment Successful",
            `Your ${orderDetails.description} payment has been processed.`,
            "transactions",
            undefined,
            "/payment-success"
          );
          
          toast({
            title: "Payment Successful",
            description: "Your payment has been processed successfully."
          });
          
          navigate('/payment-success', { 
            state: { 
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              itemType: orderDetails.type,
              itemId: orderDetails.itemId,
              itemName: orderDetails.itemName,
              amount: orderDetails.amount / 100
            } 
          });
        },
        onFailure: (error) => {
          console.error('Payment Failed:', error);
          setError(error.description || error.message || "Transaction declined");
          setIsLoading(false);
          
          notificationService.sendNotification(
            "Payment Failed",
            "There was an issue processing your payment. Please try again.",
            "transactions"
          );
        }
      });
    } catch (err: any) {
      console.error('Error initiating payment:', err);
      setError('Failed to start payment. Please try again.');
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
          isRazorpayReady={true}
        />
        
        <OrderSummary orderDetails={orderDetails} />

        <CheckoutForm
          name={name}
          email={email}
          phone={phone}
          termsAccepted={termsAccepted}
          isLoading={isLoading}
          isRazorpayReady={true}
          onNameChange={setName}
          onEmailChange={setEmail}
          onPhoneChange={setPhone}
          onTermsChange={setTermsAccepted}
          onSubmit={handlePayment}
          amount={orderDetails.amount}
        />
      </div>
    </MobileLayout>
  );
}
