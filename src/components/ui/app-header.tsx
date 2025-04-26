
import { AppDrawer } from "./app-drawer";
import { Link } from "react-router-dom";
import { UserAvatar } from "./user-avatar";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { motion } from "framer-motion";

interface AppHeaderProps {
  isLoggedIn: boolean;
}

export function AppHeader({ isLoggedIn }: AppHeaderProps) {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border/30 text-foreground flex items-center px-4 z-50"
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <AppDrawer isLoggedIn={isLoggedIn} />
          <Link to="/" className="flex items-center">
            <img alt="Khelmanch Logo" src="/lovable-uploads/cba4a2dc-5021-4756-98a0-b154222d7523.png" className="h-6" />
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <UserAvatar isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </motion.header>
  );
}
