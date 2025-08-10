import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export type TournamentResult = {
  position: string; // "Winner" | "Runner Up"
  name: string;
  imageUrl: string;
};

interface PastResultsSliderProps {
  results: TournamentResult[];
}

export const PastResultsSlider: React.FC<PastResultsSliderProps> = ({ results }) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="absolute inset-0">
      <Carousel opts={{ loop: true }} className="w-full h-full">
        <CarouselContent className="h-48">
          {results.map((r, idx) => (
            <CarouselItem key={`${r.position}-${idx}`} className="basis-full h-48">
              <div className="relative w-full h-full">
                <img
                  src={r.imageUrl}
                  alt={`${r.position}: ${r.name}`}
                  className="object-cover w-full h-full"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-2 left-2 rounded-full bg-black/60 backdrop-blur px-3 py-1 text-xs font-medium text-white">
                  {r.position}: {r.name}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};
