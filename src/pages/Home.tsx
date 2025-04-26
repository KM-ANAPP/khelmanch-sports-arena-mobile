
import { Search, MapPin, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Input } from "@/components/ui/input";
import { SportCard } from "@/components/cards/SportCard";
import { SportFilter } from "@/components/home/SportFilter";

const venues = [
  {
    image: "https://image-resource.creatie.ai/138019645226637/138019646275221/e4229b2ce5996226a31678129911cb09.jpg",
    title: "One center basketball turf",
    distance: "7.4 km",
    location: "2464 Royal Ln. Mesa",
    sport: "Basketball",
    rating: 4.2,
    price: "133"
  },
  {
    image: "https://image-resource.creatie.ai/138019645226637/138019646275221/2c51861d361e19880f2658b74b660c63.jpg",
    title: "United king football turf",
    distance: "4.2 km",
    location: "8080 Railroad St",
    sport: "Football",
    rating: 4.3,
    price: "250"
  },
  {
    image: "https://image-resource.creatie.ai/138019645226637/138019646275221/ce914ba8c72be3137d701124198c0633.jpg",
    title: "Koottam cricket turf",
    distance: "6.4 km",
    location: "3605 Parker Rd",
    sport: "Cricket",
    rating: 4.4,
    price: "250"
  }
];

export default function Home() {
  return (
    <MobileLayout>
      <div className="min-h-screen bg-[#101010] p-4 space-y-6 max-w-[428px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#37DF90]" />
            <span className="text-sm text-white font-medium">4517 Ave. Manchester</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-[#1A1A1A]"
          >
            <Bell className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#AAAAAA]" />
          <Input
            placeholder="Search venues, sports, location..."
            className="pl-10 bg-[#1A1A1A] text-white border-none rounded-3xl h-[54px]"
          />
        </div>

        {/* Sports Filter */}
        <div className="space-y-4">
          <h2 className="text-white text-lg font-semibold">Sports</h2>
          <SportFilter />
        </div>

        {/* Game Drops */}
        <div className="relative h-[170px] rounded-2xl overflow-hidden bg-gradient-to-r from-[#007D44] to-transparent">
          <img 
            src="https://image-resource.creatie.ai/138019645226637/138019646275221/fc3dae0d5703514b2573062a69a8b122.jpg"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
            alt="Games backdrop"
          />
          <div className="relative p-5 flex flex-col justify-end h-full">
            <h3 className="text-white text-lg font-bold">Games Drops</h3>
            <p className="text-white/80 text-sm">Discount games for you to join now</p>
          </div>
        </div>

        {/* Toggle Buttons */}
        <div className="flex rounded-full bg-[#1A1A1A] p-1">
          <button className="flex-1 py-2 px-4 rounded-full bg-[#007D44] text-white text-sm font-semibold">
            Slots
          </button>
          <button className="flex-1 py-2 px-4 text-[#AAAAAA] text-sm font-semibold">
            Courts
          </button>
        </div>

        {/* Nearby Venues */}
        <div className="space-y-4">
          <h2 className="text-white text-lg font-semibold">Nearby turfs</h2>
          <div className="grid gap-4">
            {venues.map((venue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SportCard {...venue} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
