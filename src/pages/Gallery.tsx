import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card } from "@/components/ui/card";

export default function Gallery() {
  const galleryImages = [
    {
      id: 1,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/2-1.jpg",
      title: "Tournament Action 1"
    },
    {
      id: 2,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/3-1.jpg",
      title: "Tournament Action 2"
    },
    {
      id: 3,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/4.jpg",
      title: "Tournament Action 3"
    },
    {
      id: 4,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/5.jpg",
      title: "Tournament Action 4"
    },
    {
      id: 5,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/6.jpg",
      title: "Tournament Action 5"
    },
    {
      id: 6,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/7.jpg",
      title: "Tournament Action 6"
    },
    {
      id: 7,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/8.jpg",
      title: "Tournament Action 7"
    },
    {
      id: 8,
      image: "https://khelmanch.com/wp-content/uploads/2024/05/10.jpg",
      title: "Tournament Action 8"
    }
  ];

  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold text-center">Gallery</h1>
        
        <div className="grid grid-cols-2 gap-4">
          {galleryImages.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-32 object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-white text-sm font-semibold">{image.title}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}