
import { Button } from "@/components/ui/button";
import { Calendar, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

export const PrimaryActions = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <Button 
        asChild 
        size="lg" 
        variant="default"
        className="h-20 flex flex-col items-center justify-center space-y-2 bg-accent text-accent-foreground hover:bg-accent/90"
      >
        <Link to="/booking">
          <Calendar className="h-6 w-6" />
          <span className="text-base font-semibold">Book Now</span>
        </Link>
      </Button>
      <Button 
        asChild 
        size="lg" 
        variant="secondary"
        className="h-20 flex flex-col items-center justify-center space-y-2"
      >
        <Link to="/tournaments">
          <Trophy className="h-6 w-6" />
          <span className="text-base font-semibold">Tournament</span>
        </Link>
      </Button>
    </div>
  );
};
