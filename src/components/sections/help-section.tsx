
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export const HelpSection = () => {
  const handleCallSupport = () => {
    window.location.href = "tel:9870190331";
  };

  return (
    <div className="mt-10 p-4 bg-muted rounded-lg">
      <div className="text-center space-y-3">
        <h3 className="text-lg font-semibold">Still Need Help?</h3>
        <p className="text-sm text-muted-foreground">
          Our support team is available to assist you with any questions
        </p>
        <Button 
          onClick={handleCallSupport}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Phone className="h-4 w-4 mr-2" />
          Call Us
        </Button>
        <p className="text-xs text-muted-foreground">
          Available 10:00 AM - 7:00 PM
        </p>
      </div>
    </div>
  );
};
