
import { Card } from "@/components/ui/card";
import { OrderDetails } from "@/types/checkout";

interface OrderSummaryProps {
  orderDetails: OrderDetails;
}

export function OrderSummary({ orderDetails }: OrderSummaryProps) {
  if (!orderDetails) return null;

  return (
    <Card className="p-4">
      <h2 className="font-semibold mb-4">Order Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>{orderDetails.description}</span>
          <span>₹{(orderDetails.amount / 100).toLocaleString()}</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{(orderDetails.amount / 100).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
