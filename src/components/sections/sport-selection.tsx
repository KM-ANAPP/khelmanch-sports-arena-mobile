
import { Activity, Smartphone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function SportSelection() {
  const sports = [
    {
      name: "Running",
      icon: Activity,
      link: "/sports/running",
      active: true
    },
    {
      name: "Cycling",
      icon: Mail,
      link: "/sports/cycling",
    },
    {
      name: "Yoga",
      icon: Smartphone,
      link: "/sports/yoga",
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Pick a Sport</h3>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {sports.map((sport) => (
          <Link
            key={sport.name}
            to={sport.link}
            className={`flex flex-col items-center justify-center w-24 h-24 rounded-2xl transition-all ${
              sport.active
                ? "bg-[#DFE61C]"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <sport.icon className={`w-6 h-6 ${
              sport.active ? "text-[#1E2539]" : "text-gray-600"
            }`} />
            <span className={`mt-2 text-sm ${
              sport.active ? "text-[#1E2539] font-medium" : "text-gray-600"
            }`}>
              {sport.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
