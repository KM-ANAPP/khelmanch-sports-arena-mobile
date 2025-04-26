
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Trophy, Calendar, Users, MessageSquare, MessageCircle, Ticket, Clock, Info, HelpCircle, LogOut, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface AppDrawerProps {
  isLoggedIn: boolean;
}

export function AppDrawer({
  isLoggedIn
}: AppDrawerProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 bg-background border-r border-border/50">
        <SheetHeader className="text-left p-6 border-b border-border/10">
          <SheetTitle className="flex justify-center py-2">
            <img alt="Khelmanch Logo" className="h-10" src="/lovable-uploads/a7e3e853-4d7c-473e-9a8c-b2c88e143176.png" />
          </SheetTitle>
        </SheetHeader>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-1 p-2 overflow-y-auto max-h-[calc(100vh-116px)]"
        >
          <motion.div variants={item}>
            <NavItem href="/home" icon={Home} label="Home" />
          </motion.div>
          <motion.div variants={item}>
            <NavItem href="/tournaments" icon={Trophy} label="Tournaments" />
          </motion.div>
          <motion.div variants={item}>
            <NavItem href="/booking" icon={Calendar} label="Ground Booking" />
          </motion.div>
          <motion.div variants={item}>
            <NavItem href="/my-bookings" icon={Clock} label="My Bookings" />
          </motion.div>
          <motion.div variants={item}>
            <NavItem href="/my-tickets" icon={Ticket} label="My Tickets" />
          </motion.div>
          <motion.div variants={item}>
            <NavItem href="/community" icon={Users} label="Community" />
          </motion.div>
          <motion.div variants={item}>
            <NavItem href="/messages" icon={MessageCircle} label="Messages" />
          </motion.div>
          
          <div className="mt-4 pt-4 border-t border-border/10">
            <motion.div variants={item}>
              <NavItem href="/about" icon={Info} label="About Us" />
            </motion.div>
            <motion.div variants={item}>
              <NavItem href="/contact" icon={MessageSquare} label="Contact Us" />
            </motion.div>
            <motion.div variants={item}>
              <NavItem href="/faq" icon={HelpCircle} label="FAQ" />
            </motion.div>
          </div>
          
          <div className="mt-auto pt-4 border-t border-border/10">
            {isLoggedIn ? (
              <motion.div variants={item}>
                <NavItem href="/logout" icon={LogOut} label="Logout" className="text-destructive" />
              </motion.div>
            ) : (
              <motion.div variants={item}>
                <NavItem href="/login" icon={LogIn} label="Login / Register" className="text-secondary" />
              </motion.div>
            )}
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  className?: string;
}

function NavItem({
  href,
  icon: Icon,
  label,
  className
}: NavItemProps) {
  return (
    <Link 
      to={href} 
      className={`flex items-center gap-3 px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg transition-colors ${className || ""}`}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </Link>
  );
}
