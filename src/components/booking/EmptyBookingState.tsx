
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyBookingStateProps {
  type: 'no-results' | 'no-bookings' | 'error';
  onReset?: () => void;
}

export function EmptyBookingState({ type, onReset }: EmptyBookingStateProps) {
  const getContent = () => {
    switch (type) {
      case 'no-results':
        return {
          icon: <Search className="h-12 w-12 text-muted-foreground" />,
          title: "No venues found",
          description: "Try adjusting your filters or search in a different area",
          action: "Clear Filters"
        };
      case 'no-bookings':
        return {
          icon: <Calendar className="h-12 w-12 text-muted-foreground" />,
          title: "No bookings yet",
          description: "Your booked venues and tournaments will appear here",
          action: "Browse Venues"
        };
      case 'error':
        return {
          icon: <MapPin className="h-12 w-12 text-red-400" />,
          title: "Something went wrong",
          description: "We couldn't load the venues. Please try again.",
          action: "Retry"
        };
    }
  };

  const content = getContent();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center min-h-[400px] p-4"
    >
      <Card className="max-w-sm w-full">
        <CardContent className="p-8 text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            {content.icon}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h3 className="text-lg font-semibold">{content.title}</h3>
            <p className="text-sm text-muted-foreground">{content.description}</p>
          </motion.div>
          {onReset && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button onClick={onReset} variant="outline" className="mt-4">
                {content.action}
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
