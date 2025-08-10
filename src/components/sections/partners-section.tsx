import React from "react";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";

export const PartnersSection = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) return;
    const id = setInterval(() => api.scrollNext(), 2000);
    return () => clearInterval(id);
  }, [api]);

  const partners = [
    { id: "hudle", name: "HUDLE", role: "Community Partner", logo: "/lovable-uploads/12a483af-fa01-41fc-9600-0a0685b8e776.png" },
    { id: "sportvot", name: "SPORTVOT", role: "Media Partner", logo: "/lovable-uploads/3b9b1e94-d0fb-4674-856b-0fa74dc0ceb4.png" },
  ];

  // Duplicate to ensure smooth sliding when exactly 2 items are visible
  const itemsToRender = partners.length < 4 ? [...partners, ...partners, ...partners] : partners;

  if (partners.length === 0) return null;

  return (
    <section className="py-8" aria-labelledby="partners-heading">
      <h2 id="partners-heading" className="text-2xl font-bold mb-4">Our Valued Partners</h2>
      <Carousel opts={{ align: "start", loop: true }} setApi={setApi} className="w-full">
        <CarouselContent className="-ml-2">
          {itemsToRender.map((p, idx) => (
            <CarouselItem key={`${p.id}-${idx}`} className="pl-2 basis-1/2">
              <article className="rounded-xl border bg-card text-card-foreground shadow-sm h-32 md:h-40 flex flex-col items-center justify-center gap-2">
                <h3 className="text-sm font-semibold">{p.role}</h3>
                <img
                  src={p.logo}
                  alt={`${p.role} - ${p.name} logo`}
                  className="h-12 md:h-14 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </section>
  );
};
