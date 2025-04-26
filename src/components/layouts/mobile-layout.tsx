
import { AppHeader } from "@/components/ui/app-header";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
// Correctly reference the SCSS file from component's location
import '@/styles/main.scss';

interface MobileLayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  title?: string;  // Optional title property
  requireAuth?: boolean; // Optional requireAuth property
}

export function MobileLayout({ children, isLoggedIn, title, requireAuth }: MobileLayoutProps) {
  return (
    <div className="mobile-layout">
      <header className="header">
        <AppHeader isLoggedIn={isLoggedIn} />
      </header>

      <main className="content">
        {children}
      </main>

      <nav className="bottom-nav">
        <BottomNavigation />
      </nav>
    </div>
  );
}
