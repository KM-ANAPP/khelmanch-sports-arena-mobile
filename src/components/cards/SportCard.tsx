
import { Star } from "lucide-react";

interface SportCardProps {
  image: string;
  title: string;
  distance: string;
  location: string;
  sport: string;
  rating: number;
  price: string;
  className?: string;
}

export function SportCard({
  image,
  title,
  distance,
  location,
  sport,
  rating,
  price,
}: SportCardProps) {
  return (
    <div className="flex bg-[#1A1A1A] rounded-2xl p-2.5 gap-5">
      <img 
        src={image} 
        alt={title} 
        className="w-[77px] h-[94px] rounded-lg object-cover"
      />
      <div className="flex-1 flex flex-col gap-2.5 min-w-0">
        <div>
          <h3 className="text-white text-lg font-semibold truncate">{title}</h3>
          <p className="text-white/60 text-xs mt-1">{distance} | {location}</p>
        </div>
        
        <div className="h-px bg-[#2F2F2F]" />
        
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-[#101010] text-white rounded-full text-xs">
            {sport}
          </span>
          <div className="flex items-center gap-1 px-2 py-1 bg-[#101010] rounded-full">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-white text-xs">{rating}</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 bg-[#101010] rounded-full">
            <span className="text-white text-xs">₹{price}/hr</span>
          </div>
        </div>
      </div>
    </div>
  );
}
