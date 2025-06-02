
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { Bell, Search, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MobileLayoutProps {
  children: React.ReactNode;
  isLoggedIn?: boolean;
}

export function MobileLayout({ children, isLoggedIn = false }: MobileLayoutProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState("Mumbai, India");
  
  const locations = [
    "Mumbai, India",
    "Delhi, India", 
    "Bangalore, India",
    "Chennai, India",
    "Kolkata, India",
    "Pune, India",
    "Hyderabad, India"
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4">
          <Link to="/home" className="flex items-center space-x-2">
            <span className="text-lg font-semibold">
              Hi {user?.name || "USER"}
            </span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-background/95 backdrop-blur">
                <div className="px-2 py-1 text-xs text-muted-foreground">Select Location</div>
                {locations.map((location) => (
                  <DropdownMenuItem
                    key={location}
                    onClick={() => setSelectedLocation(location)}
                    className={`cursor-pointer ${selectedLocation === location ? 'bg-primary/10' : ''}`}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    {location}
                    {selectedLocation === location && (
                      <Badge variant="secondary" className="ml-auto text-xs">Current</Badge>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                2
              </Badge>
            </Button>
          </div>
        </div>
        
        {/* Location indicator */}
        <div className="px-4 py-1 bg-muted/30 border-t">
          <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{selectedLocation}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-16">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
