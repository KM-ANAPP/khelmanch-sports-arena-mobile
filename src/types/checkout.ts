
export interface OrderDetails {
  amount: number;
  currency: string;
  orderId: string;
  description: string;
  type: 'ground' | 'tournament';
  itemId: string;
  itemName: string;
}

export interface RazorpayOptions {
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

export interface PaymentCallbacks {
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
}
