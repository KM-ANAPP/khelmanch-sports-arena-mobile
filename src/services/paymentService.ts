import { RazorpayOptions, PaymentCallbacks } from '@/types/checkout';

const RAZORPAY_KEY = 'rzp_live_w0y4ew5V0jkw9n';

const paymentService = {
  startPayment: async (options: RazorpayOptions, callbacks: PaymentCallbacks): Promise<void> => {
    try {
      console.log('Starting Razorpay payment with options:', options);
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const rzp = new window.Razorpay({
          ...options,
          key: RAZORPAY_KEY,
          handler: function(response: any) {
            callbacks.onSuccess(response);
          },
        });

        rzp.on('payment.failed', function(response: any) {
          callbacks.onFailure(response.error);
        });

        rzp.open();
      };

    } catch (error) {
      console.error('Error starting Razorpay payment:', error);
      callbacks.onFailure(error);
    }
  },
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default paymentService;
