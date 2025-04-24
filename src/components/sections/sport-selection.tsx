
import { Activity, Smartphone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
      icon: Mail, // Using Mail as placeholder since we need to use icons from the allowed list
      link: "/sports/cycling",
    },
    {
      name: "Yoga",
      icon: Smartphone, // Using Smartphone as placeholder since we need to use icons from the allowed list
      link: "/sports/yoga",
    }
  ];

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-lg font-semibold text-[#1E2539]">Pick a Sport</h3>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {sports.map((sport, index) => (
          <motion.div
            key={sport.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <Link
              to={sport.link}
              className={`
                flex flex-col items-center justify-center w-24 h-24 rounded-2xl
                transition-all duration-300 transform hover:scale-105
                ${sport.active
                  ? "bg-gradient-to-br from-[#DFE61C] to-[#DFE61C]/80 shadow-lg shadow-[#DFE61C]/20"
                  : "bg-white hover:bg-gray-50 shadow-md border border-gray-100"
                }
              `}
            >
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-xl mb-1
                ${sport.active
                  ? "bg-white/30 backdrop-blur-sm"
                  : "bg-[#1E2539]/5"
                }
              `}>
                <sport.icon className={`w-5 h-5 ${
                  sport.active ? "text-[#1E2539]" : "text-gray-600"
                }`} />
              </div>
              <span className={`text-sm ${
                sport.active ? "text-[#1E2539] font-medium" : "text-gray-600"
              }`}>
                {sport.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
