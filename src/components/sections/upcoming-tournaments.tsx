
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface Tournament {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
}

export const UpcomingTournaments = () => {
  const tournaments = [
    {
      id: 1,
      title: "Summer Cricket Championship",
      date: "May 15-20, 2025",
      location: "Khelmanch Stadium, Mumbai",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80"
    },
    {
      id: 2,
      title: "Football League",
      date: "June 5-10, 2025",
      location: "City Ground, Delhi",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
    }
  ];

  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Upcoming Tournaments</h2>
        <Link to="/tournaments" className="text-secondary text-sm">View All</Link>
      </div>
      <div className="space-y-4">
        {tournaments.map((tournament) => (
          <Link to={`/tournaments/${tournament.id}`} key={tournament.id}>
            <Card className="overflow-hidden">
              <div className="relative h-32">
                <img 
                  src={tournament.image} 
                  alt={tournament.title} 
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs font-medium py-1 px-2 rounded">
                  Registrations Open
                </div>
              </div>
              <CardContent className="p-3">
                <h3 className="font-semibold text-primary">{tournament.title}</h3>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{tournament.date}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{tournament.location}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

