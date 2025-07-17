
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
      <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-xl border-b border-border/50 safe-area-inset rounded-b-3xl shadow-lg">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">
              {user?.email ? `Hi, ${user.email.split('@')[0]}!` : 'Khelmanch'}
            </h1>
            <div className="flex items-center mt-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-sm text-muted-foreground p-0 h-auto rounded-full">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedLocation.split(',')[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 rounded-2xl material-surface-elevated">
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground">Select Location</div>
                  {locations.map((location) => (
                    <DropdownMenuItem
                      key={location}
                      onClick={() => setSelectedLocation(location)}
                      className={`cursor-pointer rounded-xl android-ripple ${selectedLocation === location ? 'bg-primary/10 text-primary' : ''}`}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      {location}
                      {selectedLocation === location && (
                        <Badge variant="secondary" className="ml-auto text-xs rounded-full">Current</Badge>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full android-ripple">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative rounded-full android-ripple">
              <Bell className="h-5 w-5" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">
                2
              </Badge>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-24 bg-background">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
