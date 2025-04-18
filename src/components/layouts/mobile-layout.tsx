
import { ReactNode } from "react";
import { AppHeader } from "../ui/app-header";
import { BottomNavigation } from "../ui/bottom-navigation";

interface MobileLayoutProps {
  children: ReactNode;
  title?: string; // Make title optional since we're removing it from header
  isLoggedIn: boolean;
  hideBottom?: boolean;
}

export function MobileLayout({ 
  children, 
  isLoggedIn, 
  hideBottom = false 
}: MobileLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader isLoggedIn={isLoggedIn} />
      <main className="flex-1 pt-14 pb-16 overflow-auto">
        {children}
      </main>
      {!hideBottom && <BottomNavigation />}
    </div>
  );
}
