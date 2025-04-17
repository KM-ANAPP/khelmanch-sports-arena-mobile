
import { useState } from "react";
import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Phone, Mail, Edit, LogOut, Ticket, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  // Mock user data - would come from auth state in a real app
  const user = {
    name: "Rajesh Kumar",
    phone: "+91 9876543210",
    email: "rajesh@example.com",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
  };

  const handleLogout = () => {
    // In a real app, this would clear auth state
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <MobileLayout title="My Profile" isLoggedIn={isLoggedIn}>
      <div className="p-4 space-y-4">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img 
                  src={user.image} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Phone className="h-3 w-3 mr-1" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Mail className="h-3 w-3 mr-1" />
                  <span>{user.email}</span>
                </div>
              </div>
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-auto py-3 flex flex-col space-y-1" asChild>
            <div onClick={() => navigate("/my-bookings")}>
              <Calendar className="h-5 w-5 mb-1 text-secondary" />
              <span>My Bookings</span>
            </div>
          </Button>
          <Button variant="outline" className="h-auto py-3 flex flex-col space-y-1" asChild>
            <div onClick={() => navigate("/my-tickets")}>
              <Ticket className="h-5 w-5 mb-1 text-secondary" />
              <span>My Tickets</span>
            </div>
          </Button>
        </div>

        {/* Tabs for My Activity */}
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
            <TabsTrigger value="tickets">Recent Tickets</TabsTrigger>
          </TabsList>
          <TabsContent value="bookings" className="mt-4 space-y-3">
            <Card>
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Victory Cricket Ground</h3>
                    <div className="text-xs text-muted-foreground mt-1">
                      May 10, 2025 • 18:00 - 19:00
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Cricket • 10 players
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Confirmed
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Tennis Paradise</h3>
                    <div className="text-xs text-muted-foreground mt-1">
                      April 25, 2025 • 10:00 - 11:00
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Tennis • 2 players
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Completed
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button variant="outline" size="sm" className="w-full">
              View All Bookings
            </Button>
          </TabsContent>
          <TabsContent value="tickets" className="mt-4 space-y-3">
            <Card>
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Summer Cricket Championship</h3>
                    <div className="text-xs text-muted-foreground mt-1">
                      May 15-20, 2025
                    </div>
                    <div className="text-xs text-muted-foreground">
                      2x Premium Tickets
                    </div>
                  </div>
                  <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    Upcoming
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button variant="outline" size="sm" className="w-full">
              View All Tickets
            </Button>
          </TabsContent>
        </Tabs>

        {/* Account Settings */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <h3 className="font-semibold mb-2">Account Settings</h3>
            <Button variant="outline" className="w-full justify-start text-left">
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full justify-start text-left">
              <Mail className="h-4 w-4 mr-2" />
              Change Email
            </Button>
            <Button variant="outline" className="w-full justify-start text-left">
              <Phone className="h-4 w-4 mr-2" />
              Change Phone Number
            </Button>
            <Button 
              variant="destructive" 
              className="w-full justify-start text-left mt-4"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
}
