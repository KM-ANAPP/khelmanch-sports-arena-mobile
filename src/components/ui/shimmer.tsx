
import { cn } from "@/lib/utils"

interface ShimmerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  width?: string;
  height?: string;
}

export function Shimmer({ className, width = "100%", height = "20px", ...props }: ShimmerProps) {
  return (
    <div
      className={cn(
        "animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent",
        "relative overflow-hidden bg-muted/5 before:absolute before:inset-0",
        "before:-translate-x-full before:animate-[shimmer_2s_infinite]",
        "before:border-t before:border-muted/10",
        "before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        className
      )}
      style={{ width, height }}
      {...props}
    />
  );
}
