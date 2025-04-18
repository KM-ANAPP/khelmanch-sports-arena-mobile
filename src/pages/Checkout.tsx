
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layouts/mobile-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import notificationService from '@/utils/notifications';

interface OrderDetails {
  amount: number;
  currency: string;
  orderId: string;
}

// In a production app, these details would come from your backend
const mockOrderDetails: OrderDetails = {
  amount: 500000, // Amount in smallest currency unit (paise for INR)
  currency: 'INR',
  orderId: 'order_' + Date.now(),
};

export default function Checkout() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [phone, setPhone] = useState('+919999999999');
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  // Check if Razorpay is loaded
  useEffect(() => {
    const checkRazorpayLoaded = () => {
      if ((window as any).Razorpay) {
        setIsRazorpayLoaded(true);
        console.log("Razorpay script loaded successfully");
      } else {
        console.log("Attempting to load Razorpay...");
        // Try to load the script if it's not yet loaded
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          console.log("Razorpay loaded via dynamic script");
          setIsRazorpayLoaded(true);
        };
        script.onerror = () => {
          console.error("Failed to load Razorpay script");
          setError("Failed to load payment gateway. Please refresh the page and try again.");
        };
        document.body.appendChild(script);
      }
    };

    checkRazorpayLoaded();
  }, []);

  const handlePayment = () => {
    setIsLoading(true);
    setError(null);

    if (!isRazorpayLoaded) {
      setError("Payment gateway is still loading. Please wait a moment and try again.");
      setIsLoading(false);
      return;
    }

    // Basic validation
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Phone validation (basic)
    if (phone.length < 10) {
      setError("Please enter a valid phone number");
      setIsLoading(false);
      return;
    }

    // Clear any previous errors
    try {
      console.log("Initializing Razorpay payment...");
      const options = {
        key: 'rzp_live_fwYQqk5vvi3epz', // Your test mode API key
        amount: mockOrderDetails.amount,
        currency: mockOrderDetails.currency,
        name: 'Khelmanch Sports',
        description: 'Tournament Registration',
        image: 'https://lovableproject.com/assets/logos/khelmanch-logo.png',
        order_id: mockOrderDetails.orderId,
        handler: function (response: any) {
          console.log('Payment Success:', response);
          
          // Send a success notification
          notificationService.sendNotification(
            "Payment Successful",
            "Your tournament registration payment has been processed.",
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
              orderId: response.razorpay_order_id 
            } 
          });
        },
        prefill: {
          name: name,
          email: email,
          contact: phone
        },
        notes: {
          address: "Khelmanch Sports HQ"
        },
        theme: {
          color: '#2AA9DD'
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
            console.log('Payment modal closed without completing payment');
          }
        }
      };

      // In production, you should get the order_id from your server
      // For testing purposes, we're using a mock order_id
      const razorpay = new (window as any).Razorpay(options);
      
      razorpay.on('payment.failed', function (response: any) {
        console.error('Payment Failed:', response.error);
        setError(`Payment failed: ${response.error.description || "Transaction declined by payment gateway"}`);
        setIsLoading(false);
      });
      
      razorpay.open();
    } catch (err) {
      console.error('Razorpay Error:', err);
      setError('An error occurred while initializing the payment. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold">Checkout</h1>
        
        {!isRazorpayLoaded && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Loading payment gateway...
            </AlertDescription>
          </Alert>
        )}
        
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}
        
        <Card className="p-4">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tournament Registration</span>
              <span>₹5,000.00</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹5,000.00</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h2 className="font-semibold">Review Details</h2>
          <div className="space-y-2">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="Enter your full name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                placeholder="Enter your phone number" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I accept the terms and conditions
          </label>
        </div>

        <Button 
          className="w-full" 
          disabled={!termsAccepted || isLoading || !isRazorpayLoaded}
          onClick={handlePayment}
        >
          {isLoading ? "Processing..." : "Proceed to Payment"}
        </Button>
        
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            For testing: Use card number 4111 1111 1111 1111, any future expiry date, any CVV, and OTP 1111
          </AlertDescription>
        </Alert>
      </div>
    </MobileLayout>
  );
}
