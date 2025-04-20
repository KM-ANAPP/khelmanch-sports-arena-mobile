
/**
 * Payment Service for handling Razorpay integration
 * 
 * This service provides methods for working with the Razorpay payment gateway
 * in both development and production environments.
 */

interface CreateOrderParams {
  amount: number;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

interface VerifyPaymentParams {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Always use development mode for testing
const isDevelopment = true;

// Helper function to generate a random order ID for testing
const generateRandomOrderId = () => {
  return 'order_' + Math.random().toString(36).substring(2, 15) + 
    Math.random().toString(36).substring(2, 15);
};

const paymentService = {
  /**
   * Create a new Razorpay order
   * 
   * In development mode, this returns a simulated order response
   * In production, this would call your backend API
   */
  createOrder: async (params: CreateOrderParams): Promise<any> => {
    try {
      if (isDevelopment) {
        console.log('Creating simulated order with params:', params);
        
        // Generate a random order ID for testing
        const randomOrderId = generateRandomOrderId();
        
        // Return a simulated successful order response
        return {
          id: randomOrderId,
          amount: params.amount,
          currency: params.currency,
          receipt: params.receipt,
          created_at: new Date().toISOString()
        };
      } else {
        // Production code would go here
        const response = await fetch('https://your-backend-url/api/payments/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params)
        });
        
        if (!response.ok) {
          throw new Error('Failed to create order');
        }
        
        return await response.json();
      }
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },
  
  /**
   * Verify a Razorpay payment
   * 
   * In development mode, this always returns true
   * In production, this would verify the payment with your backend
   */
  verifyPayment: async (params: VerifyPaymentParams): Promise<boolean> => {
    try {
      if (isDevelopment) {
        console.log('Simulating payment verification:', params);
        return true;
      } else {
        // Production code would go here
        const response = await fetch('https://your-backend-url/api/payments/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params)
        });
        
        if (!response.ok) {
          throw new Error('Payment verification failed');
        }
        
        const data = await response.json();
        return data.valid;
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  },

  /**
   * Capture a payment
   * 
   * In development mode, this always returns true
   * In production, this would capture the payment with your backend
   */
  capturePayment: async (paymentId: string, amount: number): Promise<boolean> => {
    try {
      if (isDevelopment) {
        console.log('Simulating payment capture:', { paymentId, amount });
        return true;
      } else {
        // Production code would go here
        const response = await fetch(`https://your-backend-url/api/payments/${paymentId}/capture`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount })
        });
        
        if (!response.ok) {
          throw new Error('Payment capture failed');
        }
        
        const data = await response.json();
        return data.success;
      }
    } catch (error) {
      console.error('Error capturing payment:', error);
      throw error;
    }
  }
};

export default paymentService;
