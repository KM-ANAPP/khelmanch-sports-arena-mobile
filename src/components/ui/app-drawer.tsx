import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

interface AppDrawerProps {
  isLoggedIn: boolean;
}

export function AppDrawer({ isLoggedIn }: AppDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-background">
        <SheetHeader>
          <SheetTitle className="flex justify-center py-4">
            <img src="/src/assets/logos/khelmanch-logo.png" alt="Khelmanch Logo" className="h-10" />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          <NavItem href="/" label="Home" />
          <NavItem href="/tournaments" label="Tournaments" />
          <NavItem href="/booking" label="Ground Booking" />
          <NavItem href="/my-bookings" label="My Bookings" />
          <NavItem href="/my-tickets" label="My Tickets" />
          <NavItem href="/about" label="About Us" />
          <NavItem href="/contact" label="Contact Us" />
          <NavItem href="/faq" label="FAQ" />
          
          {isLoggedIn ? (
            <NavItem href="/logout" label="Logout" className="mt-auto text-destructive" />
          ) : (
            <NavItem href="/login" label="Login / Register" className="mt-auto text-secondary" />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface NavItemProps {
  href: string;
  label: string;
  className?: string;
}

function NavItem({ href, label, className }: NavItemProps) {
  return (
    <Link
      to={href}
      className={`px-4 py-2 text-primary hover:bg-muted rounded-md transition-colors ${className || ""}`}
    >
      {label}
    </Link>
  );
}
