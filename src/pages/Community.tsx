
import { MobileLayout } from "@/components/layouts/mobile-layout";
import PlayerMatchmaking from "@/components/community/PlayerMatchmaking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Community() {
  return (
    <MobileLayout requireAuth={true} isLoggedIn={true}>
      <div className="p-4 space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Sports Community</CardTitle>
          </CardHeader>
          <CardContent>
            <PlayerMatchmaking />
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
}
