
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Calendar, Search, MessageSquare, User } from "lucide-react";

export function BottomNavigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/" || currentPath === "/home";
    return currentPath.startsWith(path);
  };

  const navItems = [
    {
      name: "Home",
      path: "/home",
      icon: <Home className="h-6 w-6" />,
    },
    {
      name: "Explore",
      path: "/booking",
      icon: <Search className="h-6 w-6" />,
    },
    {
      name: "Bookings",
      path: "/my-bookings",
      icon: <Calendar className="h-6 w-6" />,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: <MessageSquare className="h-6 w-6" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User className="h-6 w-6" />,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <nav className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex flex-col items-center py-2 px-3",
              isActive(item.path)
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
