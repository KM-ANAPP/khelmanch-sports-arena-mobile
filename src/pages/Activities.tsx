import { useState } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Trophy, Zap, Clock, Coins, CheckCircle2, Star } from "lucide-react";
import { toast } from "sonner";

interface Activity {
  id: string;
  title: string;
  description: string;
  coins: number;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
  icon: any;
}

export default function Activities() {
  const { isAuthenticated } = useAuth();
  const [userCoins, setUserCoins] = useState(250);
  
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      title: 'Join 1 Tournament',
      description: 'Participate in any sports tournament to earn coins',
      coins: 100,
      duration: '2-3 hours',
      difficulty: 'Medium',
      completed: false,
      icon: Trophy
    },
    {
      id: '2',
      title: 'Join 3 Tournaments',
      description: 'Participate in 3 tournaments to earn bonus coins',
      coins: 300,
      duration: 'Multiple sessions',
      difficulty: 'Hard',
      completed: false,
      icon: Star
    },
    {
      id: '3',
      title: 'Join 5 Tournaments',
      description: 'Participate in 5 tournaments to earn maximum coins + bonus',
      coins: 800,
      duration: 'Multiple sessions',
      difficulty: 'Hard',
      completed: false,
      icon: Zap
    },
    {
      id: '4',
      title: 'Refer a Friend',
      description: 'Refer a sports enthusiast to join Khelmanch',
      coins: 100,
      duration: 'One-time',
      difficulty: 'Easy',
      completed: false,
      icon: Target
    }
  ]);

  const handleCompleteActivity = (activityId: string) => {
    // Note: This should be handled automatically when user pays for tournaments
    // Users cannot manually mark activities as complete
    toast.info("Coins are earned automatically when you join tournaments or refer friends!");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <MobileLayout isLoggedIn={isAuthenticated}>
      <div className="p-4 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Earn KHELMANCH COINS</h1>
          <p className="text-muted-foreground">Complete activities to earn coins and unlock discounts</p>
        </div>

        {/* Coins Balance */}
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 border border-orange-200 dark:border-orange-800">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Coins className="h-8 w-8 text-orange-500" />
              <span className="text-3xl font-bold text-orange-900 dark:text-orange-100">{userCoins}</span>
            </div>
            <p className="text-sm text-orange-700 dark:text-orange-300">Your KHELMANCH COINS</p>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Use for discounts on bookings & tournaments</p>
          </CardContent>
        </Card>

        {/* How it Works */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How it Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <p className="text-sm">Join tournaments by paying the entry fee</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
              <p className="text-sm">Refer friends to join Khelmanch</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
              <p className="text-sm">Earn KHELMANCH COINS automatically</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
              <p className="text-sm">Use coins for discounts on future tournaments</p>
            </div>
          </CardContent>
        </Card>

        {/* Activities */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Available Activities</h2>
          
          {activities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <Card key={activity.id} className={`${activity.completed ? 'opacity-75 bg-muted/50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${activity.completed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-primary/10'}`}>
                      {activity.completed ? (
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      ) : (
                        <IconComponent className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{activity.title}</h3>
                        <div className="flex items-center space-x-1">
                          <Coins className="h-4 w-4 text-orange-500" />
                          <span className="font-bold text-orange-600">{activity.coins}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={getDifficultyColor(activity.difficulty)}>
                            {activity.difficulty}
                          </Badge>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{activity.duration}</span>
                          </div>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={true}
                          onClick={() => handleCompleteActivity(activity.id)}
                        >
                          Auto-earned
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Rewards Info */}
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <h3 className="font-bold text-purple-900 dark:text-purple-100 mb-2">Coin Rewards</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-700 dark:text-purple-300">50 Coins =</span>
                <span className="font-semibold text-purple-900 dark:text-purple-100">₹25 discount</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700 dark:text-purple-300">100 Coins =</span>
                <span className="font-semibold text-purple-900 dark:text-purple-100">₹50 discount</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700 dark:text-purple-300">200 Coins =</span>
                <span className="font-semibold text-purple-900 dark:text-purple-100">₹100 discount</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700 dark:text-purple-300">500 Coins =</span>
                <span className="font-semibold text-purple-900 dark:text-purple-100">₹250 discount</span>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </MobileLayout>
  );
}