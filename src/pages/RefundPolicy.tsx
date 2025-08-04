import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card, CardContent } from "@/components/ui/card";

export default function RefundPolicy() {
  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold text-center">Refund Policy</h1>
        
        <Card className="p-6">
          <CardContent className="p-0 space-y-4">
            <div>
              <p className="text-sm leading-relaxed">
                At Khel Manch Tournament, we value our customer's satisfaction and aim to provide a seamless experience. We understand that circumstances may change, and therefore, we have formulated the following refund policy:
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">Refund Eligibility</h2>
              <p className="text-sm leading-relaxed mb-2">Customers are eligible for a refund under the following conditions:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>The cancellation request is made at least 48 hours before the scheduled start time of the tournament.</li>
                <li>The cancellation request is submitted through the official Khelmanch Tournament platform or communicated directly to our customer support team.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">Refund Processing Time</h2>
              <p className="text-sm leading-relaxed">
                Refunds will be processed within 5 working days from the receipt of the cancellation request. The refund will be issued to the original payment method used during the registration process.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">Cancellation Procedure</h2>
              <p className="text-sm leading-relaxed mb-2">To initiate a cancellation and request a refund, customers must follow these steps:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Log in to their Khel Manch Tournament account</li>
                <li>Navigate to the "My Tournaments" section</li>
                <li>Locate the tournament booking that needs to be canceled and follow the prompts</li>
                <li>Alternatively, contact our customer support team via email or phone</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">Refund Amount</h2>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Customers will receive a full refund of the tournament registration fee if the cancellation is made within the specified time frame</li>
                <li>No refunds will be issued for cancellations made less than 48 hours before the tournament begins</li>
                <li>Please note that any token amount paid for the tournament is non-refundable</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">Exceptional Circumstances</h2>
              <p className="text-sm leading-relaxed">
                In the event of unforeseen circumstances or force majeure events that result in the cancellation of the tournament by Khel Manch Tournament management, customers will be entitled to a full refund of their registration fee regardless of the cancellation timing.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">Contact Information</h2>
              <p className="text-sm leading-relaxed mb-2">For any inquiries, assistance with cancellations, or refund-related concerns, customers can reach out to our dedicated customer support team via:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li><strong>Email:</strong> support@khelmanch.com</li>
                <li><strong>Phone:</strong> +91 9870190331</li>
              </ul>
            </div>

            <div>
              <p className="text-sm leading-relaxed italic">
                <strong>Note:</strong> This refund policy is subject to change at the discretion of Khel Manch Tournament management. Any revisions or updates will be communicated to customers in a timely manner.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
}