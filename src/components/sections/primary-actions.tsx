
import { Button } from "@/components/ui/button";
import { Calendar, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

export const PrimaryActions = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button 
        asChild 
        size="lg" 
        variant="default"
        className="h-24 flex flex-col items-center justify-center space-y-2"
      >
        <Link to="/booking">
          <Calendar className="h-8 w-8" />
          <span className="text-lg font-semibold">Book Ground</span>
        </Link>
      </Button>
      <Button 
        asChild 
        size="lg" 
        variant="secondary"
        className="h-24 flex flex-col items-center justify-center space-y-2"
      >
        <Link to="/tournaments">
          <Trophy className="h-8 w-8" />
          <span className="text-lg font-semibold">Tournaments</span>
        </Link>
      </Button>
    </div>
  );
};

