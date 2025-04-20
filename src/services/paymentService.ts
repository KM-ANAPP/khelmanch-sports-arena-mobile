
/**
 * Payment Service for handling Razorpay integration
 * 
 * This service provides methods for working with the Razorpay payment gateway
 * in both web and Android environments.
 */

// Import required modules for native platform detection
import { Capacitor } from '@capacitor/core';

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

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color: string;
  };
}

// Always use development mode for testing
const isDevelopment = true;

// Key ID for Razorpay
const RAZORPAY_KEY_ID = 'rzp_live_w0y4ew5V0jkw9n'; // Replace with test key for development if needed

// Check if running on native platform (Android/iOS)
const isNativePlatform = Capacitor.isNativePlatform();

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
    console.log('Creating Razorpay order...', params);
    
    try {
      if (isDevelopment) {
        console.log('Creating simulated order with params:', params);
        
        // Generate a random order ID for testing
        const randomOrderId = generateRandomOrderId();
        
        // Return a simulated successful order response
        const orderResponse = {
          id: randomOrderId,
          amount: params.amount,
          currency: params.currency,
          receipt: params.receipt,
          created_at: new Date().toISOString()
        };
        
        console.log('Order created:', orderResponse);
        return orderResponse;
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
   * Start Razorpay checkout process
   * Handles both web and Android platforms
   */
  startPayment: async (options: RazorpayOptions, callbacks: {
    onSuccess: (paymentData: any) => void;
    onFailure: (error: any) => void;
  }): Promise<void> => {
    try {
      console.log('Starting Razorpay payment with options:', options);
      
      // For Android platform using Capacitor
      if (isNativePlatform) {
        console.log('Using native Razorpay implementation for Android');
        
        // Using Capacitor Plugins to communicate with native code
        // This would require a custom Capacitor plugin for Razorpay
        // For now, we'll just simulate a successful payment
        if (isDevelopment) {
          // Simulate successful payment after 2 seconds
          setTimeout(() => {
            const paymentResponse = {
              razorpay_payment_id: 'pay_' + Math.random().toString(36).substring(2, 15),
              razorpay_order_id: options.order_id,
              razorpay_signature: 'signature_' + Math.random().toString(36).substring(2, 15)
            };
            
            callbacks.onSuccess(paymentResponse);
          }, 2000);
        } else {
          // For a real implementation, you would use a Capacitor plugin here
          // that interfaces with the Razorpay Android SDK
          console.error('Native Razorpay implementation not available in production');
          throw new Error('Native Razorpay implementation not available');
        }
      } 
      // For web platform
      else {
        console.log('Using web Razorpay implementation');
        
        if (typeof window.Razorpay === 'undefined') {
          throw new Error('Razorpay SDK not found. Make sure it is properly loaded.');
        }
        
        // Setup Razorpay options for web
        const webOptions = {
          ...options,
          handler: function(response: any) {
            callbacks.onSuccess(response);
          },
          modal: {
            ondismiss: function() {
              console.log('Payment modal closed without completing payment');
              callbacks.onFailure({ error: 'Payment cancelled by user' });
            }
          }
        };
        
        // Create Razorpay instance and open checkout
        const razorpay = new window.Razorpay(webOptions);
        
        razorpay.on('payment.failed', function(response: any) {
          callbacks.onFailure(response.error);
        });
        
        razorpay.open();
      }
    } catch (error) {
      console.error('Error starting Razorpay payment:', error);
      callbacks.onFailure(error);
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
      console.log('Verifying payment:', params);
      
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
      console.log('Capturing payment:', { paymentId, amount });
      
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

// Define Razorpay globally
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default paymentService;
