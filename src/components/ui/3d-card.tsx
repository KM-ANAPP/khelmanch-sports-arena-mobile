
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThreeDCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  glassEffect?: boolean;
  gradientBorder?: boolean;
  className?: string;
}

export const ThreeDCard = ({
  children,
  hoverEffect = true,
  glassEffect = false,
  gradientBorder = false,
  className,
  ...props
}: ThreeDCardProps) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { scale: 1.02, y: -5 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "rounded-2xl overflow-hidden",
        glassEffect ? "bg-white/80 backdrop-blur-sm" : "bg-white",
        gradientBorder ? "p-[1px] bg-gradient-to-br from-[#2AA9DD] via-transparent to-[#DFE61C]/70" : "border border-gray-100",
        "shadow-xl hover:shadow-2xl transition-all duration-300",
        className
      )}
      {...props}
    >
      <div className={cn(
        "h-full w-full rounded-2xl overflow-hidden",
        glassEffect ? "bg-white/80 backdrop-blur-sm" : "bg-white",
      )}>
        {children}
      </div>
    </motion.div>
  );
};

export const ThreeDCardHeader = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("p-6 pb-0", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const ThreeDCardContent = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const ThreeDCardFooter = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("p-6 pt-0", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const ThreeDCardTitle = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3
      className={cn("text-2xl font-semibold text-[#1E2539]", className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export const ThreeDCardDescription = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p
      className={cn("text-gray-500 mt-1", className)}
      {...props}
    >
      {children}
    </p>
  );
};
