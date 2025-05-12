
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { connectionLimitService } from "@/services/connectionLimitService";
import { toast } from "@/hooks/use-toast";

interface SubscriptionModalProps {
  open: boolean;
  onClose: () => void;
}

export function SubscriptionModal({ open, onClose }: SubscriptionModalProps) {
  const handleSubscribe = () => {
    // This would ideally integrate with a payment system
    toast({
      title: "Coming Soon!",
      description: "Subscription functionality is coming soon. For now, you'll need to wait until your free connections reset.",
    });
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Upgrade to Khelmanch Premium</DialogTitle>
          <DialogDescription>
            You've used all your free connections today. Upgrade to connect with more players!
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Your free connections will reset in {connectionLimitService.getTimeUntilReset()}
          </p>
          
          <div className="grid gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Basic Plan</h3>
                <Badge>Current</Badge>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>3 connections per day</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Basic player profiles</span>
                </li>
                <li className="flex items-center">
                  <X className="h-4 w-4 mr-2 text-red-500" />
                  <span className="text-muted-foreground">Unlimited connections</span>
                </li>
              </ul>
            </div>
            
            <div className="border border-primary rounded-lg p-4 bg-primary/5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Premium Plan</h3>
                <Badge variant="secondary">₹199/month</Badge>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Unlimited connections</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Advanced player filtering</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Priority in listings</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>Access to premium events</span>
                </li>
              </ul>
              
              <Button
                className="w-full mt-4"
                onClick={handleSubscribe}
              >
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
