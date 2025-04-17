
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Trophy, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  // Mock data - in a real app, this would come from an API
  const upcomingTournaments = [
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

  const popularGrounds = [
    {
      id: 1,
      name: "Victory Cricket Ground",
      location: "Andheri, Mumbai",
      sports: ["Cricket", "Football"],
      image: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
    },
    {
      id: 2,
      name: "Champions Football Arena",
      location: "Powai, Mumbai",
      sports: ["Football", "Tennis"],
      image: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80"
    }
  ];

  return (
    <MobileLayout title="Home" isLoggedIn={true}>
      <div className="p-4 space-y-6">
        {/* Hero Banner */}
        <div className="relative h-48 rounded-xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
            alt="Khelmanch Sports" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-4">
            <h2 className="text-white text-xl font-bold">Play. Compete. Win.</h2>
            <p className="text-white/90 text-sm">Book grounds or join tournaments</p>
            <div className="flex space-x-2 mt-2">
              <Button asChild size="sm" variant="secondary">
                <Link to="/booking">Book Ground</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="text-white border-white">
                <Link to="/tournaments">View Tournaments</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Upcoming Tournaments */}
        <section>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Upcoming Tournaments</h2>
            <Link to="/tournaments" className="text-secondary text-sm">View All</Link>
          </div>
          <div className="space-y-4">
            {upcomingTournaments.map((tournament) => (
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

        {/* Quick Actions */}
        <section className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-auto py-3 flex flex-col space-y-1" asChild>
            <Link to="/booking">
              <Calendar className="h-5 w-5 mb-1 text-secondary" />
              <span>Book Ground</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-3 flex flex-col space-y-1" asChild>
            <Link to="/tournaments">
              <Trophy className="h-5 w-5 mb-1 text-secondary" />
              <span>Tournaments</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-3 flex flex-col space-y-1" asChild>
            <Link to="/my-bookings">
              <Clock className="h-5 w-5 mb-1 text-secondary" />
              <span>My Bookings</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-3 flex flex-col space-y-1" asChild>
            <Link to="/my-tickets">
              <Users className="h-5 w-5 mb-1 text-secondary" />
              <span>My Tickets</span>
            </Link>
          </Button>
        </section>

        {/* Popular Grounds */}
        <section>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Popular Grounds</h2>
            <Link to="/booking" className="text-secondary text-sm">View All</Link>
          </div>
          <div className="space-y-4">
            {popularGrounds.map((ground) => (
              <Link to={`/booking/${ground.id}`} key={ground.id}>
                <Card className="overflow-hidden">
                  <div className="relative h-28">
                    <img 
                      src={ground.image} 
                      alt={ground.name} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-semibold text-primary">{ground.name}</h3>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{ground.location}</span>
                    </div>
                    <div className="flex flex-wrap mt-2">
                      {ground.sports.map((sport) => (
                        <span 
                          key={sport} 
                          className="text-xs bg-muted px-2 py-0.5 rounded mr-1 mb-1"
                        >
                          {sport}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </MobileLayout>
  );
}
