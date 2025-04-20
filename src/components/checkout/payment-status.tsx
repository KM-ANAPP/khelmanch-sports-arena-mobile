
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, AlertCircle } from "lucide-react";

interface PaymentStatusProps {
  error: string | null;
  isRazorpayReady: boolean;
}

export function PaymentStatus({ error, isRazorpayReady }: PaymentStatusProps) {
  return (
    <>
      {!isRazorpayReady && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>Loading payment gateway...</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription className="text-xs">
          For testing: Use card number 4111 1111 1111 1111, any future expiry date,
          any CVV, and OTP 1111
        </AlertDescription>
      </Alert>
    </>
  );
}
