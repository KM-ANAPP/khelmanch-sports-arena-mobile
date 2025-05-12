
import { PaymentOptions } from '@/types/payment';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    Razorpay: any;
  }
}

class PaymentService {
  private static instance: PaymentService;
  private razorpayKey = "rzp_test_0BiPBu2Mtchr85"; // Razorpay test key
  private apiBaseUrl = "http://localhost:5000/api"; // Local development URL
  
  // In production, uncomment and use your actual backend URL
  // private apiBaseUrl = "https://your-backend-url.com/api"; 

  private constructor() {}

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  public async loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      // Check if script is already loaded
      if (window.Razorpay) {
        console.log("Razorpay script already loaded");
        resolve(true);
        return;
      }
      
      console.log("Loading Razorpay script...");
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        console.log("Razorpay script loaded successfully");
        resolve(true);
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  // Create order on backend
  public async createOrder(
    amount: number,
    currency: string,
    receipt: string,
    notes?: any
  ): Promise<any> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          receipt,
          notes
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success || !data.order || !data.order.id) {
        throw new Error('Invalid order response from server');
      }
      
      console.log("Order created successfully:", data.order);
      return data.order;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  // Verify payment on backend
  public async verifyPayment(
    paymentId: string,
    orderId: string,
    signature: string
  ): Promise<any> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/payments/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_payment_id: paymentId,
          razorpay_order_id: orderId,
          razorpay_signature: signature
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to verify payment: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error verifying payment:", error);
      throw error;
    }
  }

  public async initiatePayment(
    name: string,
    email: string,
    phone: string,
    amount: number,
    description: string,
    orderId?: string,
    onSuccess?: (response: any) => void,
    onFailure?: (error: any) => void
  ): Promise<void> {
    try {
      console.log("Initiating payment...", { name, email, phone, amount, orderId });
      
      const scriptLoaded = await this.loadRazorpayScript();
      
      if (!scriptLoaded) {
        const error = new Error("Failed to load Razorpay script");
        console.error(error);
        if (onFailure) onFailure(error);
        return;
      }

      if (!window.Razorpay) {
        const error = new Error("Razorpay not available");
        console.error(error);
        if (onFailure) onFailure(error);
        return;
      }

      // Create order if orderId is not provided
      let orderData: any;
      if (!orderId) {
        try {
          orderData = await this.createOrder(
            amount,
            'INR',
            `receipt_${Date.now()}`,
            { description }
          );
          orderId = orderData.id;
        } catch (err) {
          console.error("Error creating order:", err);
          if (onFailure) onFailure(new Error("Failed to create payment order"));
          return;
        }
      }

      const options: PaymentOptions = {
        key: this.razorpayKey,
        amount: amount,
        currency: "INR",
        name: "Khelmanch",
        description: description || "Payment for Khelmanch",
        order_id: orderId,
        handler: (response) => {
          console.log("Payment successful:", response);
          
          // Verify payment with backend
          this.verifyPayment(
            response.razorpay_payment_id,
            response.razorpay_order_id,
            response.razorpay_signature
          ).then(verificationResult => {
            console.log("Payment verification result:", verificationResult);
            if (verificationResult.success && verificationResult.valid) {
              if (onSuccess) onSuccess(response);
            } else {
              if (onFailure) onFailure(new Error("Payment verification failed"));
            }
          }).catch(err => {
            console.error("Payment verification error:", err);
            // Still consider the payment successful if verification fails due to backend issues
            if (onSuccess) onSuccess(response);
          });
        },
        prefill: {
          name: name || "",
          email: email || "",
          contact: phone || "",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function() {
            console.log("Payment modal dismissed");
            if (onFailure) onFailure(new Error("Payment cancelled by user"));
          }
        }
      };

      console.log("Creating Razorpay instance with options:", options);
      
      try {
        const rzp = new window.Razorpay(options);
        
        rzp.on('payment.failed', function (response: any) {
          console.error("Payment failed:", response.error);
          if (onFailure) onFailure(new Error(response.error.description || "Payment failed"));
        });
        
        console.log("Opening Razorpay payment form");
        rzp.open();
      } catch (error) {
        console.error("Error while creating Razorpay instance:", error);
        if (onFailure) onFailure(error);
      }
    } catch (error) {
      console.error("Error in initiatePayment:", error);
      if (onFailure) onFailure(error);
    }
  }
}

export default PaymentService.getInstance();
