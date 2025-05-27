
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingShimmerProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
}

export function LoadingShimmer({ 
  className, 
  width = "100%", 
  height = "20px", 
  rounded = true 
}: LoadingShimmerProps) {
  return (
    <motion.div
      className={cn(
        "bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]",
        "animate-shimmer overflow-hidden",
        rounded && "rounded-md",
        className
      )}
      style={{ width, height }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
}

// Shimmer animation for cards
export function CardShimmer() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="border rounded-xl p-4 space-y-3"
        >
          <LoadingShimmer height="160px" className="rounded-lg" />
          <div className="space-y-2">
            <LoadingShimmer height="20px" width="70%" />
            <LoadingShimmer height="16px" width="50%" />
            <div className="flex space-x-2">
              <LoadingShimmer height="24px" width="60px" className="rounded-full" />
              <LoadingShimmer height="24px" width="60px" className="rounded-full" />
            </div>
          </div>
          <LoadingShimmer height="36px" className="rounded-lg" />
        </motion.div>
      ))}
    </div>
  );
}
