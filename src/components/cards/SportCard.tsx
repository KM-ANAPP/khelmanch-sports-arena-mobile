
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
  className
}: SportCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="relative h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {distance} | {location}
          </p>
          <div className="h-px bg-border" />
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              {sport}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">₹{price}/hr</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
