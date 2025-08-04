import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card } from "@/components/ui/card";

export default function Gallery() {
  const galleryImages = [
    {
      id: 1,
      title: "Cricket Championship 2024",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=400",
      category: "Cricket"
    },
    {
      id: 2,
      title: "Football League Finals",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=400",
      category: "Football"
    },
    {
      id: 3,
      title: "Badminton Tournament",
      image: "https://images.unsplash.com/photo-1628779238951-be2c9f2a59f4?q=80&w=400",
      category: "Badminton"
    },
    {
      id: 4,
      title: "Tennis Open 2024",
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=400",
      category: "Tennis"
    },
    {
      id: 5,
      title: "Basketball Championship",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=400",
      category: "Basketball"
    },
    {
      id: 6,
      title: "Volleyball Beach Tournament",
      image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=400",
      category: "Volleyball"
    }
  ];

  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold">Gallery</h1>
        
        <div className="grid grid-cols-2 gap-4">
          {galleryImages.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-white text-sm font-semibold">{image.title}</h3>
                  <p className="text-white/80 text-xs">{image.category}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}