
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Bell, ArrowRight, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuickLinksProps {
  setActiveTab: (tab: string) => void;
}

export function QuickLinks({ setActiveTab }: QuickLinksProps) {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <Settings className="h-6 w-6 mb-2" />
          <h3 className="font-medium">Account Settings</h3>
          <p className="text-xs text-muted-foreground mt-1">Manage your account</p>
          <Button variant="link" className="mt-2 p-0 h-auto" onClick={() => navigate('/settings')}>
            Go to Settings
          </Button>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <Bell className="h-6 w-6 mb-2" />
          <h3 className="font-medium">Notifications</h3>
          <p className="text-xs text-muted-foreground mt-1">Manage preferences</p>
          <Button 
            variant="link" 
            className="mt-2 p-0 h-auto" 
            onClick={() => setActiveTab('notifications')}
          >
            Configure
          </Button>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <Button 
          variant="outline" 
          className="w-full justify-between" 
          onClick={() => navigate('/my-teams')}
        >
          <span>My Teams</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-between" 
          onClick={() => navigate('/my-bookings')}
        >
          <span>My Bookings</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-between" 
          onClick={() => window.location.href = 'mailto:support@khelmanch.com'}
        >
          <span className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Contact Khelmanch</span>
          </span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
