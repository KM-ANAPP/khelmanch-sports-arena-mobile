
import { Link, useLocation } from "react-router-dom";
import { Home, Trophy, Calendar, User, Search } from "lucide-react";

export function BottomNavigation() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navigationItems = [
    { path: "/home", label: "Home", icon: Home },
    { path: "/tournaments", label: "Events", icon: Trophy },
    { path: "/booking", label: "Book", icon: Calendar },
    { path: "/tournaments", label: "Tournaments", icon: Search },
    { path: "/profile", label: "Profile", icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-card/95 backdrop-blur-xl border-t border-border/50 flex items-center justify-around px-4 z-40 safe-area-inset rounded-t-3xl shadow-lg">
      {navigationItems.map((item) => (
        <NavItem 
          key={item.path} 
          path={item.path} 
          label={item.label} 
          icon={item.icon} 
          active={isActive(item.path)}
        />
      ))}
    </div>
  );
}

interface NavItemProps {
  path: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
}

function NavItem({ path, label, icon: Icon, active }: NavItemProps) {
  return (
    <Link 
      to={path} 
      className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 android-ripple ${
        active ? "bg-primary/10 text-primary scale-105" : "text-muted-foreground hover:bg-muted/50"
      }`}
    >
      <div className={`relative p-2 rounded-full transition-all duration-200 ${
        active ? "bg-primary text-primary-foreground shadow-md" : ""
      }`}>
        <Icon className="h-5 w-5" />
      </div>
      <span className={`text-xs mt-1 font-medium transition-all duration-200 ${
        active ? "text-primary" : "text-muted-foreground"
      }`}>
        {label}
      </span>
    </Link>
  );
}
