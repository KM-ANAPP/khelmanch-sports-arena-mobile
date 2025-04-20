
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface CheckoutFormProps {
  name: string;
  email: string;
  phone: string;
  termsAccepted: boolean;
  isLoading: boolean;
  isRazorpayReady: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onTermsChange: (checked: boolean) => void;
  onSubmit: () => void;
  amount: number;
}

export function CheckoutForm({
  name,
  email,
  phone,
  termsAccepted,
  isLoading,
  isRazorpayReady,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onTermsChange,
  onSubmit,
  amount,
}: CheckoutFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold">Review Details</h2>
      <div className="space-y-2">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(checked) => onTermsChange(checked as boolean)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I accept the terms and conditions
        </label>
      </div>

      <Button
        className="w-full"
        disabled={!termsAccepted || isLoading || !isRazorpayReady}
        onClick={onSubmit}
      >
        {isLoading ? "Processing..." : `Pay ₹${(amount / 100).toLocaleString()}`}
      </Button>
    </div>
  );
}
