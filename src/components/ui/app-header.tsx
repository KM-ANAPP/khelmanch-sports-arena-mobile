
import { AppDrawer } from "./app-drawer";
import { Link } from "react-router-dom";
import { UserAvatar } from "./user-avatar";

interface AppHeaderProps {
  isLoggedIn: boolean;
}

export function AppHeader({ isLoggedIn }: AppHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-primary text-primary-foreground flex items-center px-4 z-50">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <AppDrawer isLoggedIn={isLoggedIn} />
          <Link to="/" className="ml-3">
            <img alt="Khelmanch Logo" src="/lovable-uploads/cba4a2dc-5021-4756-98a0-b154222d7523.png" className="h-5" />
          </Link>
        </div>
        <UserAvatar isLoggedIn={isLoggedIn} />
      </div>
    </header>
  );
}
