
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Athlete {
  id: number;
  name: string;
  image: string;
  sport: string;
}

export const FeaturedAthletes = () => {
  const athletes = [
    {
      id: 1,
      name: "Cricket Star",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80",
      sport: "Cricket"
    },
    {
      id: 2,
      name: "Football Legend",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      sport: "Football"
    },
    {
      id: 3,
      name: "Tennis Champion",
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      sport: "Tennis"
    }
  ];

  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {athletes.map((athlete) => (
            <CarouselItem key={athlete.id}>
              <div className="relative h-64 overflow-hidden rounded-xl">
                <img 
                  src={athlete.image} 
                  alt={athlete.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white text-xl font-bold">{athlete.name}</h3>
                  <p className="text-white/90">{athlete.sport}</p>
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

