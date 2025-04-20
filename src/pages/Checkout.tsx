import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MobileLayout } from '@/components/layouts/mobile-layout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import notificationService from '@/utils/notifications';
import { useAuth } from '@/context/AuthContext';
import paymentService from '@/services/paymentService';
import { Capacitor } from '@capacitor/core';
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
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const isNativePlatform = Capacitor.isNativePlatform();

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

  useEffect(() => {
    const initializeRazorpay = async () => {
      if (isNativePlatform) {
        console.log("Native platform detected, assuming Razorpay SDK is available");
        setIsRazorpayReady(true);
        return;
      }
      
      if (window.Razorpay) {
        console.log("Razorpay script already loaded");
        setIsRazorpayReady(true);
        return;
      }
      
      try {
        console.log("Loading Razorpay script...");
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          console.log("Razorpay script loaded successfully");
          setIsRazorpayReady(true);
        };
        script.onerror = () => {
          console.error("Failed to load Razorpay script");
          setError("Failed to load payment gateway. Please refresh the page and try again.");
        };
        document.body.appendChild(script);
      } catch (error) {
        console.error("Error loading Razorpay:", error);
        setError("Failed to initialize payment gateway");
      }
    };

    initializeRazorpay();
  }, [isNativePlatform]);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    if (!isRazorpayReady) {
      setError("Payment gateway is still loading. Please wait a moment and try again.");
      setIsLoading(false);
      return;
    }

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
      const orderResponse = await paymentService.createOrder({
        amount: orderDetails.amount,
        currency: orderDetails.currency,
        receipt: orderDetails.orderId,
        notes: {
          itemId: orderDetails.itemId,
          itemType: orderDetails.type,
          description: orderDetails.description
        }
      });
      
      if (!orderResponse || !orderResponse.id) {
        throw new Error("Failed to create order ID");
      }
      
      const options = {
        key: 'rzp_live_w0y4ew5V0jkw9n',
        amount: orderDetails.amount.toString(),
        currency: orderDetails.currency,
        name: 'Khelmanch Sports',
        description: orderDetails.description,
        image: 'https://lovableproject.com/assets/logos/khelmanch-logo.png',
        order_id: orderResponse.id,
        prefill: {
          name: name,
          email: email,
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
        onSuccess: function(response) {
          handlePaymentSuccess(response);
        },
        onFailure: function(error) {
          handlePaymentFailure(error);
        }
      });
      
    } catch (err: any) {
      console.error('Error initiating payment:', err);
      setError('Failed to create payment order. Please try again.');
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = async (response: any) => {
    console.log('Payment Success:', response);
    
    try {
      const isVerified = await paymentService.verifyPayment({
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature
      });
      
      if (!isVerified) {
        throw new Error('Payment verification failed');
      }
      
      notificationService.sendNotification(
        "Payment Successful",
        `Your ${orderDetails?.description} payment has been processed.`,
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
          itemType: orderDetails?.type,
          itemId: orderDetails?.itemId,
          itemName: orderDetails?.itemName,
          amount: orderDetails ? orderDetails.amount / 100 : 0
        } 
      });
    } catch (err) {
      console.error('Payment Verification Error:', err);
      setError('Payment was processed but verification failed. Please contact support.');
      setIsLoading(false);
    }
  };

  const handlePaymentFailure = (error: any) => {
    console.error('Payment Failed:', error);
    setError(`Payment failed: ${error.description || error.message || "Transaction declined by payment gateway"}`);
    setIsLoading(false);
    
    notificationService.sendNotification(
      "Payment Failed",
      "There was an issue processing your payment. Please try again.",
      "transactions"
    );
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
          onSubmit={handlePayment}
          amount={orderDetails.amount}
        />
      </div>
    </MobileLayout>
  );
}
