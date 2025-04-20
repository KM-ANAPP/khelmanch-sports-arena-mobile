
export interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface PaymentDetails {
  name: string;
  email: string;
  phone: string;
  amount: number;
  orderId: string;
  description: string;
}
