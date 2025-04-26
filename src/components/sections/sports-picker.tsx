
import { Activity, Bike, Footprints } from "lucide-react";
import { Link } from "react-router-dom";

const sports = [
  {
    name: "Running",
    icon: Activity,
    path: "/running",
    active: true,
  },
  {
    name: "Cycling",
    icon: Bike,
    path: "/cycling",
    active: false,
  },
  {
    name: "Yoga",
    icon: Footprints,
    path: "/yoga",
    active: false,
  },
];

export function SportsPicker() {
  return (
    <section className="py-6">
      <h2 className="text-lg font-semibold mb-4">Pick a Sport</h2>
      <div className="flex gap-4">
        {sports.map((sport) => (
          <Link
            key={sport.name}
            to={sport.path}
            className={`relative flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
              sport.active
                ? "bg-accent text-accent-foreground"
                : "bg-card hover:bg-secondary/10"
            }`}
          >
            <sport.icon className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">{sport.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
