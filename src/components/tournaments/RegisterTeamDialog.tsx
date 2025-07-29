import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import PaymentService from "@/services/paymentService";
import { toast } from "@/hooks/use-toast";

interface RegisterTeamDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  tournament: {
    id: string;
    title: string;
    tokenAmount: number;
    fullAmount: number;
  };
}

export const RegisterTeamDialog = ({ isOpen, onOpenChange, tournament }: RegisterTeamDialogProps) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    paymentType: "",
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone?.replace("+91", "") || "",
    teamName: "",
    notes: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProceedToCheckout = async () => {
    if (!formData.paymentType || !formData.fullName || !formData.email || !formData.phone || !formData.teamName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const amount = formData.paymentType === "token" ? tournament.tokenAmount : tournament.fullAmount;
      const description = `${formData.paymentType === "token" ? "Token" : "Full"} Payment for ${tournament.title} - Team: ${formData.teamName}`;
      
      const paymentService = PaymentService;
      await paymentService.initiatePayment(
        formData.fullName,
        formData.email,
        `+91${formData.phone}`,
        amount,
        description,
        undefined,
        (response) => {
          toast({
            title: "Payment Successful!",
            description: `Team ${formData.teamName} registered successfully for ${tournament.title}`,
          });
          onOpenChange(false);
        },
        (error) => {
          toast({
            title: "Payment Failed",
            description: "Registration payment could not be processed. Please try again.",
            variant: "destructive"
          });
        }
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedAmount = formData.paymentType === "token" ? tournament.tokenAmount : 
                         formData.paymentType === "full" ? tournament.fullAmount : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register Team - {tournament.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="paymentType">Payment Type *</Label>
            <Select value={formData.paymentType} onValueChange={(value) => handleInputChange("paymentType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="token">Token Amount - ₹{tournament.tokenAmount}</SelectItem>
                <SelectItem value="full">Full Payment - ₹{tournament.fullAmount}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <div className="flex">
              <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground">
                +91
              </div>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter phone number"
                className="rounded-l-none"
                maxLength={10}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="teamName">Team Name *</Label>
            <Input
              id="teamName"
              value={formData.teamName}
              onChange={(e) => handleInputChange("teamName", e.target.value)}
              placeholder="Enter your team name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Any additional information..."
              rows={3}
            />
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total Amount:</span>
              <span className="font-bold text-lg">₹{selectedAmount}</span>
            </div>
            <Button 
              onClick={handleProceedToCheckout}
              className="w-full"
              disabled={isLoading || !formData.paymentType || !formData.fullName || !formData.email || !formData.phone || !formData.teamName}
            >
              {isLoading ? "Processing..." : "Proceed to Checkout"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};