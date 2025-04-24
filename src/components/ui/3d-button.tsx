
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";
import { Slot } from "@radix-ui/react-slot";

interface ThreeDButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  fullWidth?: boolean;
}

export const ThreeDButton = React.forwardRef<HTMLButtonElement, ThreeDButtonProps>(
  ({ 
    children, 
    className, 
    variant = "default", 
    size = "default", 
    asChild = false,
    fullWidth = false,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    const getButtonStyles = () => {
      switch (variant) {
        case "primary":
          return "bg-[#1E2539] text-white shadow-md hover:shadow-lg hover:shadow-[#1E2539]/20";
        case "secondary":
          return "bg-[#2AA9DD] text-white shadow-md hover:shadow-lg hover:shadow-[#2AA9DD]/20";
        case "accent":
          return "bg-[#DFE61C] text-[#1E2539] shadow-md hover:shadow-lg hover:shadow-[#DFE61C]/20";
        case "outline":
          return "bg-transparent border border-gray-200 text-[#1E2539] hover:bg-gray-50";
        case "ghost":
          return "bg-transparent text-[#1E2539] hover:bg-gray-50";
        default:
          return "bg-white border border-gray-200 text-[#1E2539] shadow-sm hover:bg-gray-50";
      }
    };

    return (
      <motion.div
        whileTap={{ scale: 0.98 }}
        className={cn(
          "rounded-lg overflow-hidden",
          fullWidth && "w-full"
        )}
      >
        <Comp
          className={cn(
            buttonVariants({ size }),
            getButtonStyles(),
            "transition-all duration-300 transform",
            fullWidth && "w-full",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      </motion.div>
    );
  }
);

ThreeDButton.displayName = "ThreeDButton";
