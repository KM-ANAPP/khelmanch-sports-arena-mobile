
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { Bell, Search, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface MobileLayoutProps {
  children: React.ReactNode;
  isLoggedIn?: boolean;
}

export function MobileLayout({ children, isLoggedIn = false }: MobileLayoutProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4">
          <Link to="/profile" className="flex items-center space-x-2">
            <span className="text-lg font-semibold">
              Hi {user?.name || "USER"}
            </span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                2
              </Badge>
            </Button>
            <Link to="/profile">
              <Avatar className="h-8 w-8 border-2 border-primary/10">
                <AvatarImage src={user?.profileImage} />
                <AvatarFallback className="bg-primary/10">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Link>
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
