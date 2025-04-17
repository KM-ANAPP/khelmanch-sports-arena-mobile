
import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNavigation() {
  const location = useLocation();
  const path = location.pathname;
  
  const navItems = [
    {
      icon: Home,
      label: "Home",
      path: "/",
    },
    {
      icon: Trophy,
      label: "Tournaments",
      path: "/tournaments",
    },
    {
      icon: Calendar,
      label: "Booking",
      path: "/booking",
    },
    {
      icon: User,
      label: "Profile",
      path: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center z-50 px-2">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full",
            path === item.path ? "text-accent" : "text-muted-foreground"
          )}
        >
          <item.icon
            className={cn("h-6 w-6", path === item.path ? "text-secondary" : "text-muted-foreground")}
          />
          <span className={cn("text-xs mt-1", 
            path === item.path ? "text-primary font-medium" : "text-muted-foreground"
          )}>
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
