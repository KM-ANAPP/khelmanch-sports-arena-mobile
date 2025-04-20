
/**
 * Backend routes implementation for Razorpay
 */

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route to create a new payment order
router.post('/create-order', paymentController.createOrder);

// Route to verify payment signature
router.post('/verify', paymentController.verifyPayment);

// Route to get payment details
router.get('/:paymentId', paymentController.getPaymentDetails);

module.exports = router;
