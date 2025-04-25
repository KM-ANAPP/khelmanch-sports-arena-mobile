
import { motion } from "framer-motion";

const sports = [
  { name: "Football", icon: "⚽" },
  { name: "Cricket", icon: "🏏" },
  { name: "Hockey", icon: "🏑" },
  { name: "Badminton", icon: "🏸" },
  { name: "Basketball", icon: "🏀" },
];

export function SportFilter() {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4">
        {sports.map((sport) => (
          <motion.button
            key={sport.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="w-[70px] h-[70px] rounded-full bg-[#1A1A1A] flex items-center justify-center text-2xl">
              {sport.icon}
            </div>
            <span className="text-white text-xs">{sport.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
