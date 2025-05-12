
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Ticket, TicketPercent, Percent } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { passService, PassTier } from "@/services/passService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface KhelmanchPassProps {
  isLoggedIn: boolean;
}

export const KhelmanchPass = ({ isLoggedIn }: KhelmanchPassProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hasPass, setHasPass] = useState(() => {
    // Check if user has an active pass from localStorage
    return passService.hasActivePass();
  });
  
  const handleBuyPass = (passTier: PassTier) => {
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
          amount: passTier.price, // In paise
          currency: "INR",
          orderId: `pass_${passTier.type}_${Date.now()}`,
          description: `${passTier.name} - ${passTier.discount}% off on next ${passTier.uses} tournaments`,
          type: "pass",
          itemId: `tournament-pass-${passTier.type}`,
          itemName: passTier.name
        }
      }
    });
  };

  const activePass = passService.getActivePass();
  
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
      
      {hasPass ? (
        <Card className="overflow-hidden border-2 border-secondary/50 bg-card/50">
          <CardHeader className="pb-2 bg-gradient-to-r from-accent/20 to-secondary/20">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center text-xl">
                <Ticket className="mr-2 h-5 w-5" />
                {activePass?.name || 'Tournament Pass'}
              </CardTitle>
              <Badge variant="secondary" className="ml-2">
                {activePass?.discount}% OFF
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pt-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Remaining uses</span>
                <span className="font-semibold">{activePass?.remainingUses || 0} Tournaments</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Discount</span>
                <span className="font-semibold text-secondary">{activePass?.discount || 0}% OFF</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Expires on</span>
                <span className="font-semibold">
                  {activePass?.expiryDate ? new Date(activePass.expiryDate).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-gradient-to-r from-accent/10 to-secondary/10">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TicketPercent className="h-5 w-5 text-green-500" />
                <span className="font-medium text-green-500">Pass Active</span>
              </div>
              <Badge variant="outline" className="bg-green-500/10">
                Auto-applied at checkout
              </Badge>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="standard">Standard</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
            <TabsTrigger value="ultimate">Ultimate</TabsTrigger>
          </TabsList>
          
          {passService.passTiers.map((tier) => (
            <TabsContent key={tier.id} value={tier.id}>
              <Card className="overflow-hidden border hover:border-accent/50 transition-all">
                <CardHeader className="pb-2 bg-gradient-to-r from-accent/10 to-secondary/10">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center text-lg">
                      <Ticket className="mr-2 h-4 w-4" />
                      {tier.name}
                    </CardTitle>
                    <Badge variant="secondary" className="ml-2">
                      {tier.discount}% OFF
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4 pb-2">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Valid for</span>
                      <span className="font-semibold">Next {tier.uses} Tournaments</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Discount</span>
                      <span className="font-semibold text-secondary flex items-center">
                        <Percent className="h-3 w-3 mr-1" />
                        {tier.discount}% OFF
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Validity</span>
                      <span className="font-semibold">{tier.validity} days</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-base font-bold">Price</span>
                        <div className="text-right">
                          <span className="text-base font-bold">₹{(tier.price / 100).toFixed(0)}</span>
                          <p className="text-xs text-muted-foreground">One-time payment</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="bg-gradient-to-r from-accent/5 to-secondary/5 pt-2">
                  <Button 
                    onClick={() => handleBuyPass(tier)}
                    className="w-full"
                    variant="default"
                    size="sm"
                  >
                    Buy {tier.name}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </motion.section>
  );
};
