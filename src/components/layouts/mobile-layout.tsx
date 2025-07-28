
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { Bell, Search, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TournamentSearch } from "@/components/search/tournament-search";
import { NotificationPopup } from "@/components/notifications/notification-popup";
import khelmanckLogoDark from "@/assets/logos/khelmanch-logo-dark.png";
import khelmanckLogoLight from "@/assets/logos/khelmanch-logo-light.png";

interface MobileLayoutProps {
  children: React.ReactNode;
  isLoggedIn?: boolean;
}

export function MobileLayout({ children, isLoggedIn = false }: MobileLayoutProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();
  const [selectedLocation, setSelectedLocation] = useState("Delhi, India");
  const [searchOpen, setSearchOpen] = useState(false);
  
  const locations = [
    "Delhi, India"
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-xl border-b border-border/50 safe-area-inset rounded-b-3xl shadow-lg px-safe">
        <div className="flex h-16 items-center justify-between px-4 max-w-full">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <img 
                src={theme === 'dark' ? khelmanckLogoDark : khelmanckLogoLight}
                alt="Khelmanch Logo" 
                className="h-8 object-contain" 
              />
              {user?.email && (
                <h1 className="text-lg font-semibold text-foreground">
                  Hi, {user.email.split('@')[0]}!
                </h1>
              )}
            </div>
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
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full android-ripple"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <NotificationPopup>
              <Button variant="ghost" size="icon" className="rounded-full android-ripple">
                <Bell className="h-5 w-5" />
              </Button>
            </NotificationPopup>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-24 bg-background">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
      
      {/* Search Dialog */}
      <TournamentSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
