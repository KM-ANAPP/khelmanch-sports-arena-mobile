
import { AppHeader } from "@/components/ui/app-header";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import '@/styles/main.scss';
import { motion } from "framer-motion";

interface MobileLayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  title?: string;
  requireAuth?: boolean;
}

export function MobileLayout({ children, isLoggedIn, title, requireAuth }: MobileLayoutProps) {
  return (
    <div className="mobile-layout">
      <AppHeader isLoggedIn={isLoggedIn} />

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="content pt-20 pb-20 px-4 md:px-6"
      >
        {title && (
          <div className="py-6">
            <h1 className="text-3xl font-bold tracking-tight text-balance bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">{title}</h1>
          </div>
        )}
        {children}
      </motion.main>

      <nav className="bottom-nav glass-morphism">
        <BottomNavigation />
      </nav>
    </div>
  );
}
