
import { Users, Award, Video, Users2 } from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: "3000+",
      label: "Active Participants",
      description: "Bringing together a diverse group of players to join the action."
    },
    {
      icon: Award,
      value: "1000+",
      label: "Positive Testimonials",
      description: "Showcasing the satisfaction and enjoyment of our community."
    },
    {
      icon: Video,
      value: "100000+",
      label: "Video Views",
      description: "Engaging a large audience with our exciting videos and highlights."
    },
    {
      icon: Users2,
      value: "8000+",
      label: "Strong Player Community",
      description: "Building a vibrant and growing network of gaming enthusiasts."
    }
  ];

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Celebrating Our Journey</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-4 bg-card rounded-lg shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="font-medium text-foreground">{stat.label}</div>
                <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
