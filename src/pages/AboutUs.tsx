import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, MapPin, Star } from "lucide-react";

export default function AboutUs() {
  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold text-center">About Us</h1>
        
        <Card className="p-6">
          <CardContent className="p-0 space-y-4">
            <div className="text-center">
              <img 
                src="/lovable-uploads/a7e3e853-4d7c-473e-9a8c-b2c88e143176.png" 
                alt="Khelmanch Logo" 
                className="h-16 mx-auto mb-4"
                loading="eager"
                decoding="async"
              />
              <h2 className="text-xl font-bold mb-2">Welcome to Khelmanch</h2>
              <p className="text-muted-foreground">Your Ultimate Sports Platform</p>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm leading-relaxed">
                Where our passion for Sports meets a commitment to sportsmanship and community. We organize top-notch Sport's tournaments for players of all ages and skill levels, fostering teamwork, healthy competition, and unforgettable experiences.
              </p>
              
              <p className="text-sm leading-relaxed">
                Driven by a commitment to excellence, KhelManch prioritizes professionalism, fair play, and inclusive in all aspects of our operations. From meticulously planned event's to expertly maintained playing fields, we strive to create an environment where participants can unleash their passion for the beautiful game in a safe and supportive atmosphere.
              </p>

              <p className="text-sm leading-relaxed">
                With our dedicated team of organizers, referees, and volunteers, KhelManch ensures that every tournament is executed flawlessly, leaving participants with nothing but admiration for the sport and a desire to return for more.
              </p>

              <p className="text-sm leading-relaxed">
                Join us as we celebrate the beautiful game and create lasting memories on the field.
              </p>

              <p className="text-sm font-semibold text-center">
                Let's kick off something incredible together!
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardContent className="p-0 space-y-4">
            <h2 className="text-lg font-bold">Who We Are?</h2>
            <p className="text-sm leading-relaxed">
              <strong>"Khel"</strong> is a Hindi word that translates to <strong>"Sport"</strong> in English. It is commonly used to refer to various types of games, sports, or recreational activities. In the context of our name <strong>"Khelmanch," "Khel"</strong> likely signifies the essence of sports, competition, and the spirit of play that we aim to promote and celebrate.
            </p>
            <p className="text-sm leading-relaxed">
              <strong>"Manch"</strong> is a Hindi word that translates to <strong>"Stage"</strong> or <strong>"Platform"</strong> in English. It is often used metaphorically to represent a space or platform where various activities, discussions, performances, or events take place. In the context of our name <strong>"Khelmanch,"</strong> <strong>"Manch"</strong> could symbolize the platform or arena where sports tournaments, competitions, and related activities occur. It signifies a space where athletes come together to showcase their skills, compete, and engage in the spirit of sportsmanship.
            </p>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardContent className="p-0 space-y-4">
            <h2 className="text-lg font-bold">Join the Journey</h2>
            <p className="text-sm leading-relaxed">
              At Khelmanch, we're on a remarkable journey driven by our passion for sports, community, and excellence. We invite you to be a part of this exciting adventure as we strive to create unforgettable experiences and foster a love for sportsmanship.
            </p>
            <p className="text-sm leading-relaxed">
              Our journey is not just about organizing tournaments, it's about building a vibrant community where athletes of all ages and skill levels can come together to celebrate the joy of sports. Whether you're a seasoned player or new to the game, there's a place for you in our growing family.
            </p>
            <p className="text-sm leading-relaxed">
              By joining Khelmanch, you become part of a dynamic movement dedicated to promoting teamwork, healthy competition, and personal growth.
            </p>
            <p className="text-sm font-semibold text-center">
              Join our journey at Khelmanch and let's write the next chapter of sports excellence together!
            </p>
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