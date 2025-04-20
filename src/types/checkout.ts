
export interface OrderDetails {
  amount: number;
  currency: string;
  orderId: string;
  description: string;
  type: 'ground' | 'tournament';
  itemId: string;
  itemName: string;
}
