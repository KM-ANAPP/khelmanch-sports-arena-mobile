
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Ticket, TicketPercent } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface KhelmanchPassProps {
  isLoggedIn: boolean;
}

export const KhelmanchPass = ({ isLoggedIn }: KhelmanchPassProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hasPass, setHasPass] = useState(() => {
    // Check if user has an active pass from localStorage
    const passData = localStorage.getItem("khelmanchPass");
    if (passData) {
      const data = JSON.parse(passData);
      return new Date(data.expiryDate) > new Date();
    }
    return false;
  });
  
  const handleBuyPass = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login to purchase KhelManch Pass",
      });
      return;
    }
    
    // Navigate to checkout with pass details
    navigate("/checkout", {
      state: {
        orderDetails: {
          amount: 29900, // ₹299 in paise
          currency: "INR",
          orderId: `pass_${Date.now()}`,
          description: "KhelManch Tournament Pass - 15% off on next 3 tournaments",
          type: "pass",
          itemId: "tournament-pass",
          itemName: "KhelManch Tournament Pass"
        }
      }
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">KhelManch Pass</h2>
      </div>
      
      <Card className="overflow-hidden border-2 border-accent/50 bg-card/50">
        <CardHeader className="pb-2 bg-gradient-to-r from-accent/20 to-secondary/20">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center text-xl">
              <Ticket className="mr-2 h-5 w-5" />
              Tournament Pass
            </CardTitle>
            <Badge variant="secondary" className="ml-2">
              15% OFF
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Valid for</span>
              <span className="font-semibold">Next 3 Tournaments</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Discount</span>
              <span className="font-semibold text-secondary">15% OFF</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Validity</span>
              <span className="font-semibold">90 days</span>
            </div>
            <div className="mt-4 pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Price</span>
                <div className="text-right">
                  <span className="text-lg font-bold">₹299</span>
                  <p className="text-xs text-muted-foreground">One-time payment</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-gradient-to-r from-accent/10 to-secondary/10">
          {hasPass ? (
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TicketPercent className="h-5 w-5 text-green-500" />
                <span className="font-medium text-green-500">Pass Active</span>
              </div>
              <Badge variant="outline" className="bg-green-500/10">
                Auto-applied at checkout
              </Badge>
            </div>
          ) : (
            <Button 
              onClick={handleBuyPass}
              className="w-full"
              variant="default"
            >
              Buy KhelManch Pass
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.section>
  );
};
