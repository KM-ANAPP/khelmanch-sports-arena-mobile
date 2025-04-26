
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
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-sm">4517 Ave. Manchester</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-primary/10"
          >
            <Bell className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search venues, sports, location..."
            className="pl-10"
          />
        </div>

        {/* Sports Filter */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Sports</h2>
          <SportFilter />
        </div>

        {/* Game Drops */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Games Drops</h2>
            <p className="text-sm text-muted-foreground">
              Discount games for you to join now
            </p>
          </div>
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="text-primary"
          >
            See all
          </motion.button>
        </div>

        {/* Nearby Venues */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Nearby turfs</h2>
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
