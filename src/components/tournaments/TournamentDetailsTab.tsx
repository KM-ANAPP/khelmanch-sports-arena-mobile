
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Award, Info } from "lucide-react";

interface TournamentDetailsTabProps {
  tournament: {
    address: string;
    mapUrl: string;
    prizes: string[];
    organizer: string;
    organizerContact: string;
  };
}

export const TournamentDetailsTab = ({ tournament }: TournamentDetailsTabProps) => {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="text-sm font-semibold flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-secondary" />
            Venue
          </h3>
          <p className="text-sm mt-1">{tournament.address}</p>
          <a 
            href={tournament.mapUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-secondary text-sm mt-1 block"
          >
            View on Map
          </a>
        </div>
        <div>
          <h3 className="text-sm font-semibold flex items-center">
            <Award className="h-4 w-4 mr-2 text-secondary" />
            Prizes
          </h3>
          <ul className="text-sm mt-1 space-y-1">
            {tournament.prizes.map((prize, index) => (
              <li key={index}>{prize}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold flex items-center">
            <Info className="h-4 w-4 mr-2 text-secondary" />
            Contact Information
          </h3>
          <p className="text-sm mt-1">Organizer: {tournament.organizer}</p>
          <p className="text-sm">Phone: {tournament.organizerContact}</p>
        </div>
      </CardContent>
    </Card>
  );
};
