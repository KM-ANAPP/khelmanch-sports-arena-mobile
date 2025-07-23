
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MapPin, ArrowLeft } from "lucide-react";

export default function SportDetail() {
  const { sportId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { sportData, options } = location.state || {};

  if (!sportData) {
    return (
      <MobileLayout isLoggedIn={false}>
        <div className="p-4">
          <p>Sport not found</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </MobileLayout>
    );
  }

  const handleOptionClick = (optionType: string) => {
    switch (optionType) {
      case 'events':
        navigate('/tournaments', { state: { sport: sportData.name } });
        break;
      case 'activities':
        navigate('/activities', { state: { sport: sportData.name } });
        break;
      case 'venues':
        navigate('/booking', { state: { sport: sportData.name } });
        break;
    }
  };

  return (
    <MobileLayout isLoggedIn={false}>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{sportData.name}</h1>
            <p className="text-muted-foreground">Choose your activity</p>
          </div>
        </div>

        {/* Sport Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl bg-gradient-to-br ${sportData.color} text-white`}
        >
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-6xl">{sportData.icon}</span>
            <div>
              <h2 className="text-2xl font-bold">{sportData.name}</h2>
              <p className="opacity-90">Popular in your area</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold">{sportData.players.toLocaleString()}</div>
              <div className="text-sm opacity-80">Players</div>
            </div>
            <div>
              <div className="text-xl font-bold">{sportData.venues}</div>
              <div className="text-sm opacity-80">Venues</div>
            </div>
            <div>
              <div className="text-xl font-bold">{sportData.events}</div>
              <div className="text-sm opacity-80">Events</div>
            </div>
          </div>
        </motion.div>

        {/* Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">What would you like to do?</h3>
          
          {options?.map((option: any, index: number) => (
            <motion.div
              key={option.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-md transition-all duration-300"
                onClick={() => handleOptionClick(option.type)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {option.type === 'events' && <Calendar className="h-5 w-5 text-primary" />}
                      {option.type === 'activities' && <Users className="h-5 w-5 text-secondary" />}
                      {option.type === 'venues' && <MapPin className="h-5 w-5 text-accent" />}
                      
                      <div>
                        <h4 className="font-semibold">{option.label}</h4>
                        <p className="text-sm text-muted-foreground">
                          {option.type === 'events' && 'Join tournaments and competitions'}
                          {option.type === 'activities' && 'Earn coins and stay active'}
                          {option.type === 'venues' && 'Book courts and grounds'}
                        </p>
                      </div>
                    </div>
                    
                    <Badge variant="outline">
                      {option.count}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
