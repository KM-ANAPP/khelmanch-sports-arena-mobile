
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Trophy, Calendar, Users, MessageSquare, Ticket, Clock, Info, HelpCircle, LogOut, LogIn, Star, Image, Zap, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

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
            <img alt="Khelmanch Logo" className="h-12" src="/lovable-uploads/a7e3e853-4d7c-473e-9a8c-b2c88e143176.png" loading="eager" decoding="async" />
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
            <NavItem href="/my-bookings" icon={Clock} label="My Bookings" />
          </motion.div>
          <motion.div variants={item}>
            <NavItem href="/activities" icon={Trophy} label="Activities" />
          </motion.div>
          
          <Separator className="my-4" />
          
          <motion.div variants={item}>
            <NavItem href="/testimonials" icon={Star} label="Testimonials" />
          </motion.div>
          <motion.div variants={item}>
            <NavItem href="/about-us" icon={Info} label="About Us" />
          </motion.div>
          <motion.div variants={item}>
            <NavItem href="/gallery" icon={Image} label="Gallery" />
          </motion.div>
          <motion.div variants={item}>
            <NavItem href="/faq" icon={HelpCircle} label="FAQ" />
          </motion.div>
          
          <div className="mt-auto pt-4 space-y-4">
            <Separator />
            
            {/* Social Media */}
            <motion.div variants={item}>
              <div className="px-4">
                <p className="text-sm font-medium text-foreground/80 mb-3">Follow Us</p>
                <div className="flex items-center space-x-4">
                  <a href="https://instagram.com/khelmanch" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="https://youtube.com/@khelmanch" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Legal Links */}
            <motion.div variants={item}>
              <div className="px-4 space-y-2 text-xs text-foreground/60">
                <Link to="/cookie-policy" className="block hover:text-primary transition-colors">Cookie Policy</Link>
                <Link to="/privacy-policy" className="block hover:text-primary transition-colors">Privacy Policy</Link>
                <Link to="/refund-policy" className="block hover:text-primary transition-colors">Refund Policy</Link>
                <Link to="/terms-conditions" className="block hover:text-primary transition-colors">Terms & Conditions</Link>
              </div>
            </motion.div>

            <Separator />
            
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
