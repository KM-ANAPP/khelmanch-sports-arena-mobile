
import { ReactNode } from "react";
import { AppHeader } from "../ui/app-header";
import { BottomNavigation } from "../ui/bottom-navigation";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  isLoggedIn?: boolean;
  hideBottom?: boolean;
  requireAuth?: boolean;
}

export function MobileLayout({ 
  children, 
  isLoggedIn, 
  hideBottom = false,
  requireAuth = false
}: MobileLayoutProps) {
  const { isAuthenticated } = useAuth();
  
  // If the page requires authentication and user is not authenticated, redirect to login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader isLoggedIn={isLoggedIn || isAuthenticated} />
      <main className="flex-1 pt-14 pb-16 overflow-auto">
        {children}
      </main>
      {!hideBottom && <BottomNavigation />}
    </div>
  );
}
