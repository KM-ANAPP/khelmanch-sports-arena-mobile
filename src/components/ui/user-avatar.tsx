
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

interface UserAvatarProps {
  isLoggedIn: boolean;
  userImage?: string;
}

export function UserAvatar({ isLoggedIn, userImage }: UserAvatarProps) {
  return (
    <Link to="/profile" className="flex items-center">
      <Avatar className="h-8 w-8 border-2 border-accent">
        {isLoggedIn && userImage ? (
          <AvatarImage src={userImage} alt="User" />
        ) : (
          <AvatarFallback className="bg-secondary text-white">
            <User className="h-4 w-4" />
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
}
