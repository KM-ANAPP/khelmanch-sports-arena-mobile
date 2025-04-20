
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface PaymentProps {
  name: string;
  email: string;
  phone: string;
  amount: number;
  orderId: string;
  description: string;
  termsAccepted: boolean;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Payment: React.FC<PaymentProps> = ({
  name,
  email,
  phone,
  amount,
  orderId,
  description,
  termsAccepted
}) => {
  const [isFormValid, setIsFormValid] = useState(false);
  
  useEffect(() => {
    // Validate form when dependencies change
    const validateForm = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      const isValid = 
        name.trim() !== '' && 
        emailRegex.test(email) && 
        phone.length >= 10 && 
        termsAccepted;
      
      setIsFormValid(isValid);
    };
    
    validateForm();
  }, [name, email, phone, termsAccepted]);

  const handlePayment = () => {
    const options = {
      key: "rzp_test_6TX9G35h8LidEn",
      amount: amount,
      currency: "INR",
      name: "Khelmanch",
      description: description,
      order_id: orderId,
      handler: function (response: any) {
        alert("Payment ID: " + response.razorpay_payment_id);
        alert("Order ID: " + response.razorpay_order_id);
        alert("Signature: " + response.razorpay_signature);
      },
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const rzp = new window.Razorpay(options);
      rzp.open();
    };
  };

  return (
    <div className="text-center space-y-4">
      <Button
        onClick={handlePayment}
        disabled={!isFormValid}
        className="w-full"
      >
        Pay ₹{(amount / 100).toLocaleString()}
      </Button>
    </div>
  );
};

export default Payment;
