import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, MapPin, Star } from "lucide-react";

export default function AboutUs() {
  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold">About Us</h1>
        
        <Card className="p-6">
          <CardContent className="p-0 space-y-4">
            <div className="text-center">
              <img 
                src="/lovable-uploads/a7e3e853-4d7c-473e-9a8c-b2c88e143176.png" 
                alt="Khelmanch Logo" 
                className="h-16 mx-auto mb-4"
              />
              <h2 className="text-xl font-bold mb-2">Khelmanch</h2>
              <p className="text-muted-foreground">Your Ultimate Sports Platform</p>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm leading-relaxed">
                Khelmanch is India's leading sports platform that connects athletes, organizes tournaments, 
                and provides world-class sports facilities. We believe in promoting sports culture and 
                making quality sports infrastructure accessible to everyone.
              </p>
              
              <p className="text-sm leading-relaxed">
                Our mission is to create a vibrant sports ecosystem where athletes can showcase their 
                talent, compete at the highest level, and achieve their sporting dreams.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold text-lg">1000+</h3>
            <p className="text-xs text-muted-foreground">Tournaments Organized</p>
          </Card>
          
          <Card className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold text-lg">50K+</h3>
            <p className="text-xs text-muted-foreground">Active Users</p>
          </Card>
          
          <Card className="p-4 text-center">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold text-lg">100+</h3>
            <p className="text-xs text-muted-foreground">Venues Partner</p>
          </Card>
          
          <Card className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold text-lg">4.8</h3>
            <p className="text-xs text-muted-foreground">User Rating</p>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
}