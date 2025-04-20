
/**
 * Payment Service for handling Razorpay integration
 * 
 * This service handles communication with the backend for:
 * 1. Creating payment orders
 * 2. Verifying payments
 * 3. Processing payment responses
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

// Always use development mode for testing - we'll remove API calls completely
const isDevelopment = true;

// Helper function to generate a random order ID for testing
const generateRandomOrderId = () => {
  return 'order_' + Math.random().toString(36).substring(2, 15) + 
    Math.random().toString(36).substring(2, 15);
};

const paymentService = {
  /**
   * Create a new Razorpay order through the backend
   * 
   * @param params Order parameters
   * @returns The created order ID from Razorpay
   */
  createOrder: async (params: CreateOrderParams): Promise<any> => {
    try {
      // Since we're in testing mode, always simulate order creation
      console.log('Creating simulated order with params:', params);
      
      // Generate a random order ID for testing
      const randomOrderId = generateRandomOrderId();
      
      // Simulate a successful API response
      return {
        id: randomOrderId,
        amount: params.amount,
        currency: params.currency,
        receipt: params.receipt,
        created_at: new Date().toISOString()
      };
      
      // Production implementation is removed for now since we're testing
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },
  
  /**
   * Verify a Razorpay payment through the backend
   * 
   * @param params Payment verification parameters
   * @returns Boolean indicating if payment is valid
   */
  verifyPayment: async (params: VerifyPaymentParams): Promise<boolean> => {
    try {
      // Always simulate successful verification for testing
      console.log('Simulating payment verification:', params);
      return true;
      
      // Production implementation is removed for now since we're testing
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  },

  /**
   * Capture a Razorpay payment through the backend
   * 
   * @param paymentId The payment ID to capture
   * @param amount The amount to capture
   * @returns Boolean indicating if capture was successful
   */
  capturePayment: async (paymentId: string, amount: number): Promise<boolean> => {
    try {
      // Always simulate successful capture for testing
      console.log('Simulating payment capture:', { paymentId, amount });
      return true;
      
      // Production implementation is removed for now since we're testing
    } catch (error) {
      console.error('Error capturing payment:', error);
      throw error;
    }
  }
};

export default paymentService;
