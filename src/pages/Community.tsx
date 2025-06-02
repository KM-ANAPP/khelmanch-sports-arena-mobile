
import { MobileLayout } from "@/components/layouts/mobile-layout";
import PlayerMatchmaking from "@/components/community/PlayerMatchmaking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { connectionLimitService } from "@/services/connectionLimitService";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Calendar, MapPin } from "lucide-react";

export default function Community() {
  const remainingConnections = connectionLimitService.getRemainingConnections();
  
  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-screen">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-primary/20">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">Sports Community</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Connect with fellow sports enthusiasts</p>
                </div>
              </div>
              <Badge 
                variant="outline" 
                className="ml-2 bg-white/80 backdrop-blur-sm border-primary/30 text-primary font-medium px-3 py-1"
              >
                {remainingConnections === 0 
                  ? "0 connects left" 
                  : `${remainingConnections} connect${remainingConnections !== 1 ? 's' : ''} left`}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 rounded-lg bg-white/50 backdrop-blur-sm">
                <Users className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-lg font-bold">1,247</p>
                <p className="text-xs text-muted-foreground">Active Players</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/50 backdrop-blur-sm">
                <Trophy className="h-5 w-5 mx-auto mb-2 text-secondary" />
                <p className="text-lg font-bold">89</p>
                <p className="text-xs text-muted-foreground">Tournaments</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/50 backdrop-blur-sm">
                <Calendar className="h-5 w-5 mx-auto mb-2 text-accent" />
                <p className="text-lg font-bold">23</p>
                <p className="text-xs text-muted-foreground">This Week</p>
              </div>
            </div>
            <PlayerMatchmaking />
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
}
