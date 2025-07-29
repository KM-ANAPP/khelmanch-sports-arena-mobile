import { Calendar, MapPin, Clock, ChevronUp, ChevronDown, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TournamentHeaderProps {
  tournament: {
    image: string;
    sport: string;
    registrationOpen: boolean;
    title: string;
    organizer: string;
    date: string;
    location: string;
    registrationDeadline: string;
    description: string;
  };
  isExpanded: boolean;
  onExpandClick: () => void;
  onRegisterClick: () => void;
}

export const TournamentHeader = ({
  tournament,
  isExpanded,
  onExpandClick,
  onRegisterClick
}: TournamentHeaderProps) => {
  return (
    <div>
      <div className="relative h-48">
        <img 
          src={tournament.image} 
          alt={tournament.title} 
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 left-2 bg-primary/70 text-primary-foreground text-xs font-medium py-1 px-2 rounded">
          {tournament.sport}
        </div>
        {tournament.registrationOpen && (
          <div className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs font-medium py-1 px-2 rounded">
            Registration Open
          </div>
        )}
      </div>

      <div className="p-4 pb-2">
        <h1 className="text-xl font-bold text-primary">{tournament.title}</h1>
        <p className="text-sm text-muted-foreground mb-2">Organized by {tournament.organizer}</p>
        
        <div className="space-y-2 mt-3">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-secondary" />
            <span>{tournament.date}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-secondary" />
            <span>{tournament.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-secondary" />
            <span>Registration Deadline: {tournament.registrationDeadline}</span>
          </div>
        </div>

        <div className="mt-4">
          <p className={`text-sm ${!isExpanded && 'line-clamp-3'}`}>
            {tournament.description}
          </p>
          <button 
            className="text-secondary text-sm flex items-center mt-1"
            onClick={onExpandClick}
          >
            {isExpanded ? (
              <>Show Less <ChevronUp className="h-4 w-4 ml-1" /></>
            ) : (
              <>Read More <ChevronDown className="h-4 w-4 ml-1" /></>
            )}
          </button>
        </div>

        <div className="mt-4">
          <Button onClick={onRegisterClick} disabled={!tournament.registrationOpen} className="w-full">
            Register Team
          </Button>
        </div>
      </div>
    </div>
  );
};
