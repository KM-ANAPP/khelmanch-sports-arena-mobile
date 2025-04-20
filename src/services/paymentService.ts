
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

// Use window.location to determine the API base URL
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://api.khelmanch.com'; // Replace with your actual API URL

// Determine if we're in development mode for simulating payments
const isDevelopment = window.location.hostname === 'localhost' || 
                     window.location.hostname.includes('lovableproject.com');

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
      // Always simulate order creation in development environment
      if (isDevelopment) {
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
      }
      
      // Production implementation - call the actual backend API
      const response = await fetch(`${API_BASE_URL}/api/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
        },
        body: JSON.stringify(params)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
      }
      
      const data = await response.json();
      return data.order;
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
      // Simulating successful verification for testing environments
      if (isDevelopment) {
        console.log('Simulating payment verification:', params);
        return true;
      }
      
      // Production implementation - call the actual backend API
      const response = await fetch(`${API_BASE_URL}/api/payments/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
        },
        body: JSON.stringify(params)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Payment verification failed');
      }
      
      const data = await response.json();
      return data.valid;
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
      // Simulating successful capture for testing environments
      if (isDevelopment) {
        console.log('Simulating payment capture:', { paymentId, amount });
        return true;
      }
      
      // Production implementation - call the actual backend API
      const response = await fetch(`${API_BASE_URL}/api/payments/${paymentId}/capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
        },
        body: JSON.stringify({ amount })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Payment capture failed');
      }
      
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error capturing payment:', error);
      throw error;
    }
  }
};

export default paymentService;
