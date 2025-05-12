
import { MobileLayout } from "@/components/layouts/mobile-layout";
import PlayerMatchmaking from "@/components/community/PlayerMatchmaking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { connectionLimitService } from "@/services/connectionLimitService";
import { Badge } from "@/components/ui/badge";

export default function Community() {
  const remainingConnections = connectionLimitService.getRemainingConnections();
  
  return (
    <MobileLayout requireAuth={true} isLoggedIn={true}>
      <div className="p-4 space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Sports Community</CardTitle>
              <Badge variant="outline" className="ml-2">
                {remainingConnections === 0 
                  ? "0 connects left" 
                  : `${remainingConnections} connect${remainingConnections !== 1 ? 's' : ''} left`}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <PlayerMatchmaking />
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
}
