
export interface OrderDetails {
  amount: number;
  currency: string;
  orderId: string;
  description: string;
  type: 'ground' | 'tournament' | 'pass';
  itemId: string;
  itemName: string;
}

export interface PaymentSuccessState {
  paymentId: string;
  orderId: string;
  orderDetails: OrderDetails;
  discountApplied?: number;
}
