
import { PaymentOptions } from '@/types/payment';

declare global {
  interface Window {
    Razorpay: any;
  }
}

class PaymentService {
  private static instance: PaymentService;
  private razorpayKey = "rzp_test_6TX9G35h8LidEn"; // Test key, replace with your actual key

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

  public async initiatePayment(
    name: string,
    email: string,
    phone: string,
    amount: number,
    orderId: string,
    description: string,
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

      const options: PaymentOptions = {
        key: this.razorpayKey,
        amount: amount,
        currency: "INR",
        name: "Khelmanch",
        description: description || "Payment for Khelmanch",
        order_id: orderId,
        handler: function (response) {
          console.log("Payment successful:", response);
          if (onSuccess) onSuccess(response);
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
