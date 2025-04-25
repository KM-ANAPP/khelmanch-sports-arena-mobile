
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
      <div className="w-[428px] min-h-[1367px] overflow-hidden bg-[#101010] mx-auto">
        {/* Status Bar */}
        <div className="flex justify-between items-center px-8 py-6 bg-[#101010]">
          <span className="text-white text-base font-semibold">12:48</span>
          <div className="flex items-center gap-1.5">
            {/* Network icons would go here */}
            <div className="w-[26px] h-3.5 relative bg-white rounded-sm" />
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-8 mt-5">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-6 h-6 text-[#37DF90]" />
            <span className="text-white text-sm font-medium">4517 Ave. Manchester</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-[#1A1A1A]"
          >
            <Bell className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {/* Search */}
        <div className="relative mx-8 mt-4">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#AAAAAA]" />
          <Input
            placeholder="Search venues, sports, location..."
            className="h-[54px] pl-14 bg-[#1A1A1A] text-white border-none rounded-3xl"
          />
        </div>

        {/* Sports Section */}
        <div className="px-8 mt-6">
          <h2 className="text-white text-lg font-semibold mb-4">Sports</h2>
          <SportFilter />
        </div>

        {/* Game Drops Section */}
        <div className="mx-8 mt-6">
          <div className="h-[170px] relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#007D44] to-transparent">
            <img 
              src="https://image-resource.creatie.ai/138019645226637/138019646275221/fc3dae0d5703514b2573062a69a8b122.jpg"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
              alt="Games backdrop"
            />
            <div className="absolute bottom-5 left-5">
              <h3 className="text-white text-lg font-bold mb-1">Games Drops</h3>
              <p className="text-white/80 text-sm">Discount games for you to join now</p>
            </div>
          </div>
        </div>

        {/* Toggle Buttons */}
        <div className="mx-8 mt-6">
          <div className="flex rounded-full bg-[#1A1A1A] p-1">
            <button className="flex-1 py-2 px-4 rounded-full bg-[#007D44] text-white text-sm font-semibold">
              Slots
            </button>
            <button className="flex-1 py-2 px-4 text-[#AAAAAA] text-sm font-semibold">
              Courts
            </button>
          </div>
        </div>

        {/* Nearby Venues */}
        <div className="px-8 mt-6">
          <h2 className="text-white text-lg font-semibold mb-4">Nearby turfs</h2>
          <div className="space-y-4">
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
