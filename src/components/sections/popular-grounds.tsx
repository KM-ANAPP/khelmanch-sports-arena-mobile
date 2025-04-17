
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface Ground {
  id: number;
  name: string;
  location: string;
  sports: string[];
  image: string;
}

export const PopularGrounds = () => {
  const grounds = [
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
    <section>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Popular Grounds</h2>
        <Link to="/booking" className="text-secondary text-sm">View All</Link>
      </div>
      <div className="space-y-4">
        {grounds.map((ground) => (
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
  );
};

