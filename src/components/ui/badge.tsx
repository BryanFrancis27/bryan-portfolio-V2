import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2.5 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-white/20 bg-white/[0.065] text-white",
        secondary: "border-white/[0.08] bg-white/[0.025] text-muted-foreground",
        success: "border-white/24 bg-white/[0.075] text-white",
        warning: "border-white/16 bg-white/[0.045] text-zinc-300",
        danger: "border-white/12 bg-white/[0.025] text-zinc-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
