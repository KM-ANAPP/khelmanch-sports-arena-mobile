
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { User } from "lucide-react";

interface UserAvatarProps {
  isLoggedIn: boolean;
  src?: string;
  fallback?: string;
}

const avatarVariants = cva(
  "border-2 transition-all duration-200",
  {
    variants: {
      status: {
        loggedIn: "border-secondary",
        loggedOut: "border-muted"
      }
    },
    defaultVariants: {
      status: "loggedOut"
    }
  }
);

export function UserAvatar({ isLoggedIn, src, fallback = "U" }: UserAvatarProps) {
  return (
    <Link to={isLoggedIn ? "/profile" : "/login"}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Avatar className={avatarVariants({ status: isLoggedIn ? "loggedIn" : "loggedOut" })}>
          <AvatarImage src={src} />
          <AvatarFallback className="bg-muted">
            {isLoggedIn ? fallback : <User className="h-5 w-5 text-muted-foreground" />}
          </AvatarFallback>
        </Avatar>
      </motion.div>
    </Link>
  );
}
