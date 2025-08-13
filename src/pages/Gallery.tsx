import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

export default function Gallery() {
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);
  const [canScrollLeft1, setCanScrollLeft1] = useState(false);
  const [canScrollRight1, setCanScrollRight1] = useState(true);
  const [canScrollLeft2, setCanScrollLeft2] = useState(false);
  const [canScrollRight2, setCanScrollRight2] = useState(true);

  const tournamentImages = [
    {
      id: 1,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/2-1.jpg",
      title: "Bayside Sports School Dad's Football Championship",
      sport: "Football",
      date: "Jul 29, 2025"
    },
    {
      id: 2,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/3-1.jpg",
      title: "BODOLAND CEM CUP 2025",
      sport: "Football",
      date: "Jul 10, 2025"
    },
    {
      id: 3,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/4.jpg",
      title: "Francis Event",
      sport: "Football",
      date: "Jul 6, 2025"
    },
    {
      id: 4,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/5.jpg",
      title: "Suburban Premier Football League",
      sport: "Football",
      date: "Jun 21, 2025"
    },
    {
      id: 5,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/6.jpg",
      title: "Assam Youth League U13 2024-25",
      sport: "Football",
      date: "Jun 12, 2025"
    },
    {
      id: 6,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/7.jpg",
      title: "Maestro Youth League | 2025",
      sport: "Football",
      date: "May 25, 2025"
    }
  ];

  const eventImages = [
    {
      id: 7,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/8.jpg",
      title: "AIFF Sub Junior League 2024-25",
      sport: "Football",
      date: "May 20, 2025"
    },
    {
      id: 8,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/10.jpg",
      title: "AIFF Youth League",
      sport: "Football",
      date: "May 8, 2025"
    },
    {
      id: 9,
      image: "https://d25s2jqw4qdf1e.cloudfront.net/feb265fd-5152-4226-9f86-812502318987.webp",
      title: "Mumbai Premier League",
      sport: "Football",
      date: "Nov 11, 2024"
    },
    {
      id: 10,
      image: "https://d25s2jqw4qdf1e.cloudfront.net/78d701c4-83ff-4b0c-affb-ae157d3268cb.webp",
      title: "Delhi Premier League",
      sport: "Football",
      date: "Sep 26, 2024"
    },
    {
      id: 11,
      image: "https://d25s2jqw4qdf1e.cloudfront.net/60feb380-6daa-418d-aa62-f05b624ce174.webp",
      title: "AFL Asia Cup Vietnam 2024",
      sport: "AFL",
      date: "Dec 6, 2024"
    },
    {
      id: 12,
      image: "https://d25s2jqw4qdf1e.cloudfront.net/e2599015-6681-4677-9346-b8770a36a11f.webp",
      title: "Bhaichung Bhutia Champions Cup",
      sport: "Football",
      date: "Dec 26, 2024"
    }
  ];

  const scrollLeft1 = () => {
    if (scrollRef1.current) {
      scrollRef1.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight1 = () => {
    if (scrollRef1.current) {
      scrollRef1.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollLeft2 = () => {
    if (scrollRef2.current) {
      scrollRef2.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight2 = () => {
    if (scrollRef2.current) {
      scrollRef2.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleScroll1 = () => {
    if (scrollRef1.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef1.current;
      setCanScrollLeft1(scrollLeft > 0);
      setCanScrollRight1(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const handleScroll2 = () => {
    if (scrollRef2.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef2.current;
      setCanScrollLeft2(scrollLeft > 0);
      setCanScrollRight2(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const renderGallerySection = (
    title: string,
    images: typeof tournamentImages,
    scrollRef: React.RefObject<HTMLDivElement>,
    canScrollLeft: boolean,
    canScrollRight: boolean,
    scrollLeft: () => void,
    scrollRight: () => void,
    handleScroll: () => void
  ) => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((image) => (
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
  );

  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 space-y-8">
        <h1 className="text-2xl font-bold text-center">Gallery</h1>
        
        {/* Tournaments Section */}
        {renderGallerySection(
          "Tournaments",
          tournamentImages,
          scrollRef1,
          canScrollLeft1,
          canScrollRight1,
          scrollLeft1,
          scrollRight1,
          handleScroll1
        )}

        {/* Events Section */}
        {renderGallerySection(
          "Events",
          eventImages,
          scrollRef2,
          canScrollLeft2,
          canScrollRight2,
          scrollLeft2,
          scrollRight2,
          handleScroll2
        )}
      </div>
    </MobileLayout>
  );
}