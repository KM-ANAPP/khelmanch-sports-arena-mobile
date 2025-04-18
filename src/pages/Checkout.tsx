import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layouts/mobile-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';

interface OrderDetails {
  amount: number;
  currency: string;
  orderId: string;
}

// This would normally come from your backend
const mockOrderDetails: OrderDetails = {
  amount: 500000, // Amount in smallest currency unit (paise for INR)
  currency: 'INR',
  orderId: 'order_' + Date.now(),
};

export default function Checkout() {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = () => {
    setIsLoading(true);

    const options = {
      key: 'rzp_test_CK0TDf8SMau2cQ', // Your test mode API key
      amount: mockOrderDetails.amount,
      currency: mockOrderDetails.currency,
      name: 'Khelmanch Sports',
      description: 'Tournament Registration',
      order_id: mockOrderDetails.orderId,
      handler: function (response: any) {
        console.log('Payment Success:', response);
        navigate('/payment-success', { 
          state: { 
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id 
          } 
        });
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '+919999999999'
      },
      theme: {
        color: '#2AA9DD'
      }
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
    setIsLoading(false);
  };

  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold">Checkout</h1>
        
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
              <Input id="name" placeholder="Enter your full name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="Enter your phone number" />
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
          disabled={!termsAccepted || isLoading}
          onClick={handlePayment}
        >
          {isLoading ? "Processing..." : "Proceed to Payment"}
        </Button>
      </div>
    </MobileLayout>
  );
}
