
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, User } from "lucide-react";

interface ProfileHeaderProps {
  profileImage: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileHeader({ profileImage, handleImageChange }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <Avatar className="h-24 w-24 border-2 border-primary">
          {profileImage ? (
            <AvatarImage src={profileImage} alt="Profile" />
          ) : (
            <AvatarFallback className="bg-secondary text-white">
              <User className="h-10 w-10" />
            </AvatarFallback>
          )}
        </Avatar>
        
        <label htmlFor="profile-image" className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground p-2 rounded-full cursor-pointer">
          <Camera className="h-4 w-4" />
          <input 
            id="profile-image" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleImageChange}
          />
        </label>
      </div>
      <p className="text-sm text-muted-foreground mt-2">Tap the camera icon to update your profile picture</p>
    </div>
  );
}
