import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { ReviewForm } from "@/components/testimonials/ReviewForm";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Eshaan",
      rating: 5,
      text: "💗We enjoyed ur tournament thank you:) We couldn't qualify to next round due to goal difference but it was 💗one of the best tournament ..",
      image: "https://khelmanch.com/wp-content/uploads/2024/07/Eshaan.jpg"
    },
    {
      id: 2,
      name: "Gaurav",
      rating: 5,
      text: "Great overall experience for our team. Plus, the organizers are always quick to respond to any questions or concerns I have",
      image: "https://khelmanch.com/wp-content/uploads/2024/07/Gaurav.jpg"
    },
    {
      id: 3,
      name: "Ritik",
      rating: 5,
      text: "Overall, Khel Manch has made it so much easier for me to stay active and engaged in the local sports community and would highly recommend it to any athlete looking to connect with others and participate in exciting events.",
      image: "https://khelmanch.com/wp-content/uploads/2024/07/Ritik-Rawat.jpg"
    },
    {
      id: 4,
      name: "Mustafa",
      rating: 5,
      text: "It was a wonderful experience in Enthusia tournament with KhelManch! Thank You",
      image: "https://khelmanch.com/wp-content/uploads/2024/07/Mustafa.jpg"
    }
  ];

  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 space-y-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Testimonials</h1>
          <h2 className="text-lg text-muted-foreground">Hear the roar of the champs 🦁</h2>
        </div>
        
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

        {/* Review Form Section */}
        <div className="mt-8">
          <ReviewForm />
        </div>
      </div>
    </MobileLayout>
  );
}