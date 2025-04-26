
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
        className="content pt-16 pb-16"
      >
        {title && (
          <div className="px-4 py-4">
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
        )}
        {children}
      </motion.main>

      <nav className="bottom-nav">
        <BottomNavigation />
      </nav>
    </div>
  );
}
