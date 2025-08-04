
import { AppDrawer } from "./app-drawer";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppHeaderProps {
  isLoggedIn: boolean;
}

export function AppHeader({ isLoggedIn }: AppHeaderProps) {
  const [selectedLocation, setSelectedLocation] = useState("Delhi, India");
  
  const locations = [
    "Delhi, India",
    "Mumbai, India",
    "Bangalore, India",
    "Chennai, India",
    "Pune, India"
  ];

  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border/30 text-foreground flex items-center px-4 z-50 safe-area-top"
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <AppDrawer isLoggedIn={isLoggedIn} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-sm text-muted-foreground p-2 h-auto rounded-full">
                <MapPin className="h-4 w-4 mr-1" />
                {selectedLocation.split(',')[0]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 rounded-2xl">
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground">Select Location</div>
              {locations.map((location) => (
                <DropdownMenuItem
                  key={location}
                  onClick={() => setSelectedLocation(location)}
                  className={`cursor-pointer rounded-xl ${selectedLocation === location ? 'bg-primary/10 text-primary' : ''}`}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {location}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-3">
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
