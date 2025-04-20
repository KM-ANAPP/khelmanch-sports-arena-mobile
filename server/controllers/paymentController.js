
/**
 * This is a sample backend implementation for Razorpay integration
 * In a real application, this would be implemented on your server
 */

const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay with your key_id and key_secret
// The key_secret should ONLY be used on the server side
const razorpay = new Razorpay({
  key_id: 'rzp_test_fwYQqk5vvi3epz',     // Your Razorpay API Key
  key_secret: 'YOUR_RAZORPAY_SECRET_KEY'  // Your Razorpay Secret Key
});

/**
 * Create a new Razorpay order
 */
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;
    
    // Validate the request
    if (!amount || !currency || !receipt) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters'
      });
    }
    
    // Create order using Razorpay API
    const options = {
      amount,      // Amount in smallest currency unit (paise for INR)
      currency,    // Currency code
      receipt,     // Your internal order ID
      notes        // Optional notes for your reference
    };
    
    const order = await razorpay.orders.create(options);
    
    // Send the order details to client
    return res.status(200).json({
      success: true,
      id: order.id,
      order
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
};

/**
 * Verify Razorpay payment signature
 */
exports.verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature 
    } = req.body;
    
    // Validate request
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment verification parameters'
      });
    }
    
    // Create a signature using your secret key
    const shasum = crypto.createHmac('sha256', 'YOUR_RAZORPAY_SECRET_KEY');
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');
    
    // Compare the signatures
    if (digest !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid signature',
        valid: false
      });
    }
    
    // If signature is valid, the payment is authentic
    // You can save payment details to your database here
    
    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      valid: true
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify payment',
      error: error.message
    });
  }
};

/**
 * Get payment details
 */
exports.getPaymentDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    // Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(paymentId);
    
    return res.status(200).json({
      success: true,
      payment
    });
  } catch (error) {
    console.error('Error fetching payment details:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch payment details',
      error: error.message
    });
  }
};
