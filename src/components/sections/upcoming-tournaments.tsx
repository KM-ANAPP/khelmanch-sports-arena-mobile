
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface Tournament {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  price: string;
  registrationOpen: boolean;
  trending: boolean;
}

export const UpcomingTournaments = () => {
  const tournaments = [
    {
      id: 1,
      title: "Summer Cricket Championship",
      date: "May 15-20, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Khelmanch Stadium, Mumbai",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80",
      price: "₹999",
      registrationOpen: true,
      trending: true
    },
    {
      id: 2,
      title: "Football League",
      date: "June 5-10, 2025",
      time: "10:00 AM - 6:00 PM",
      location: "City Ground, Delhi",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      price: "₹1,299",
      registrationOpen: true,
      trending: false
    },
    {
      id: 3,
      title: "Tennis Tournament",
      date: "July 12-14, 2025",
      time: "8:00 AM - 7:00 PM",
      location: "Sports Complex, Bangalore",
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      price: "₹799",
      registrationOpen: false,
      trending: false
    }
  ];

  return (
    <section className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Upcoming Tournaments</h2>
        <Link to="/tournaments" className="text-secondary text-sm">View All</Link>
      </div>
      <div className="space-y-4">
        {tournaments.map((tournament) => (
          <Link to={`/tournaments/${tournament.id}`} key={tournament.id}>
            <Card className="overflow-hidden">
              <div className="relative h-36">
                <img 
                  src={tournament.image} 
                  alt={tournament.title} 
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-primary/70 to-transparent flex flex-col justify-end">
                  {tournament.registrationOpen ? (
                    <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-medium py-1 px-2 rounded-full">
                      Registrations Open
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3 bg-muted text-muted-foreground text-xs font-medium py-1 px-2 rounded-full">
                      Coming Soon
                    </div>
                  )}
                  
                  {tournament.trending && (
                    <div className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs font-medium py-1 px-2 rounded-full flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </div>
                  )}
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-primary flex-1">{tournament.title}</h3>
                  <span className="text-sm font-medium text-secondary">{tournament.price}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{tournament.date}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{tournament.time}</span>
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
