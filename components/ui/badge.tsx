"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-lg border border-transparent px-2 py-0.5 font-geist text-xs font-semibold leading-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:overlay-white-20",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-white",
        outline: "border-border bg-background text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="badge"
        {...props}
        className={cn(badgeVariants({ variant }), className)}
      />
    )
  },
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
