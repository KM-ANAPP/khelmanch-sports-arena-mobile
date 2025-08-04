import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Arjun Sharma",
      location: "Mumbai",
      rating: 5,
      text: "Amazing platform for organizing tournaments. The booking process is seamless and the ground quality is excellent!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150"
    },
    {
      id: 2,
      name: "Priya Patel",
      location: "Delhi",
      rating: 5,
      text: "Khelmanch has revolutionized how we book sports venues. Highly recommended for all sports enthusiasts!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b977?q=80&w=150"
    },
    {
      id: 3,
      name: "Raj Kumar",
      location: "Bangalore",
      rating: 4,
      text: "Great variety of sports and venues. The tournament organization is top-notch.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150"
    }
  ];

  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-4">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                      <div className="flex items-center">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">{testimonial.text}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}