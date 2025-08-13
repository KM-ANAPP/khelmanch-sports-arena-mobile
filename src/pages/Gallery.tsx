import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const galleryImages = [
    {
      id: 1,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/2-1.jpg",
      title: "Tournament Action 1",
      sport: "Football",
      date: "Jul 29, 2025"
    },
    {
      id: 2,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/3-1.jpg",
      title: "Tournament Action 2",
      sport: "Football",
      date: "Jul 10, 2025"
    },
    {
      id: 3,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/4.jpg",
      title: "Tournament Action 3",
      sport: "Football",
      date: "Jul 6, 2025"
    },
    {
      id: 4,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/5.jpg",
      title: "Tournament Action 4",
      sport: "Football",
      date: "Jun 21, 2025"
    },
    {
      id: 5,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/6.jpg",
      title: "Tournament Action 5",
      sport: "Football",
      date: "Jun 12, 2025"
    },
    {
      id: 6,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/7.jpg",
      title: "Tournament Action 6",
      sport: "Football",
      date: "May 25, 2025"
    },
    {
      id: 7,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/8.jpg",
      title: "Tournament Action 7",
      sport: "Football",
      date: "May 20, 2025"
    },
    {
      id: 8,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/10.jpg",
      title: "Tournament Action 8",
      sport: "Football",
      date: "May 8, 2025"
    }
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold text-center">Gallery</h1>
        
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            onScroll={handleScroll}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {galleryImages.map((image) => (
              <div key={image.id} className="flex-shrink-0 w-64">
                <Card className="overflow-hidden h-96 relative group hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-full">
                    <div className="relative h-3/4 overflow-hidden">
                      <img
                        src={image.image}
                        alt={image.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        style={{ borderRadius: '4px' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                           style={{ 
                             boxShadow: '0 0 40px hsl(var(--primary) / 0.4)',
                             filter: 'blur(1px)'
                           }} />
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h6 className="text-xs font-medium text-primary mb-1 uppercase tracking-wide">
                        {image.sport}
                      </h6>
                      <h6 className="text-lg font-semibold mb-2 line-clamp-2 leading-tight">
                        {image.title}
                      </h6>
                      <p className="text-sm text-white/80">
                        {image.date}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm border rounded-full flex items-center justify-center hover:bg-background transition-all duration-200 shadow-lg z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm border rounded-full flex items-center justify-center hover:bg-background transition-all duration-200 shadow-lg z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}