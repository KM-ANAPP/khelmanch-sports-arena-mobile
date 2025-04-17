
import { AppDrawer } from "./app-drawer";
import { Link } from "react-router-dom";

interface AppHeaderProps {
  title: string;
  isLoggedIn: boolean;
}

export function AppHeader({ title, isLoggedIn }: AppHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-primary text-primary-foreground flex items-center px-4 z-50">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <AppDrawer isLoggedIn={isLoggedIn} />
          <Link to="/" className="ml-3">
            <img src="/src/assets/logos/khelmanch-logo.png" alt="Khelmanch Logo" className="h-8" />
          </Link>
        </div>
        <h1 className="text-xl font-semibold">{title}</h1>
        <div className="w-10"></div> {/* Spacer to center the title */}
      </div>
    </header>
  );
}
