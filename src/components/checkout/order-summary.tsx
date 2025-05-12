
import { Card } from "@/components/ui/card";
import { OrderDetails } from "@/types/checkout";

interface OrderSummaryProps {
  orderDetails: OrderDetails;
  discountAmount?: number;
}

export function OrderSummary({ orderDetails, discountAmount = 0 }: OrderSummaryProps) {
  if (!orderDetails) return null;
  
  const finalAmount = orderDetails.amount - discountAmount;

  return (
    <Card className="p-4">
      <h2 className="font-semibold mb-4">Order Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>{orderDetails.description}</span>
          <span>₹{(orderDetails.amount / 100).toLocaleString()}</span>
        </div>
        
        {discountAmount > 0 && (
          <div className="flex justify-between text-secondary">
            <span>Discount (KhelManch Pass)</span>
            <span>-₹{(discountAmount / 100).toLocaleString()}</span>
          </div>
        )}
        
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{(finalAmount / 100).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
