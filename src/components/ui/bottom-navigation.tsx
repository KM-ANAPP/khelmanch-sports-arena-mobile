
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
    { path: "/community", label: "Community", icon: Search },
    { path: "/profile", label: "Profile", icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-t border-border/30 flex items-center justify-around px-2 z-40">
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
      className={`flex flex-col items-center justify-center w-full h-full ${
        active ? "text-secondary" : "text-muted-foreground"
      } transition-colors duration-200`}
    >
      <div className={`relative ${active ? "bg-secondary/10 text-secondary" : ""} p-2 rounded-full`}>
        <Icon className="h-5 w-5" />
        {active && (
          <span className="absolute bottom-0 left-1/2 w-1 h-1 bg-secondary rounded-full transform -translate-x-1/2 translate-y-1"></span>
        )}
      </div>
      <span className="text-xs mt-1 font-medium">{label}</span>
    </Link>
  );
}
