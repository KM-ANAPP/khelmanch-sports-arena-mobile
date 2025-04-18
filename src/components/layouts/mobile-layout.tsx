
import { ReactNode } from "react";
import { AppHeader } from "../ui/app-header";
import { BottomNavigation } from "../ui/bottom-navigation";

interface MobileLayoutProps {
  children: ReactNode;
  title: string;
  isLoggedIn: boolean;
  hideBottom?: boolean;
}

export function MobileLayout({ 
  children, 
  title, 
  isLoggedIn, 
  hideBottom = false 
}: MobileLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader title={title} isLoggedIn={isLoggedIn} />
      <main className="flex-1 pt-14 pb-16 overflow-auto">
        {children}
      </main>
      {!hideBottom && <BottomNavigation />}
    </div>
  );
}
