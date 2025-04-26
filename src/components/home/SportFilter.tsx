
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Sport {
  name: string;
  icon: string;
}

const sports: Sport[] = [
  { name: "Football", icon: "⚽" },
  { name: "Cricket", icon: "🏏" },
  { name: "Hockey", icon: "🏑" },
  { name: "Badminton", icon: "🏸" },
  { name: "Basketball", icon: "🏀" },
];

export function SportFilter() {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 p-2">
        {sports.map((sport) => (
          <motion.button
            key={sport.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 min-w-[80px]"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl">
              {sport.icon}
            </div>
            <span className="text-sm">{sport.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
