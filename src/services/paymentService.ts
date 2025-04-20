
interface PaymentOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  handler: (response: any) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

class PaymentService {
  private static instance: PaymentService;
  private razorpayKey = "rzp_test_6TX9G35h8LidEn";

  private constructor() {}

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  public async loadRazorpayScript(): Promise<boolean> {
    // Check if script is already loaded
    if (window.Razorpay) {
      return true;
    }
    
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
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
      const scriptLoaded = await this.loadRazorpayScript();
      
      if (!scriptLoaded) {
        if (onFailure) onFailure(new Error("Failed to load Razorpay script"));
        return;
      }

      const options: PaymentOptions = {
        key: this.razorpayKey,
        amount,
        currency: "INR",
        name: "Khelmanch",
        description,
        order_id: orderId,
        handler: function (response) {
          if (onSuccess) onSuccess(response);
        },
        prefill: {
          name,
          email,
          contact: phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      if (onFailure) onFailure(error);
    }
  }
}

export default PaymentService.getInstance();
