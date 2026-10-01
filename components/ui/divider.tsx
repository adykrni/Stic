"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const dividerVariants = cva("shrink-0 bg-border", {
  variants: {
    variant: {
      horizontal: "h-px w-full",
      vertical: "h-full min-h-4 w-px",
    },
  },
  defaultVariants: {
    variant: "horizontal",
  },
})

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="divider"
        {...props}
        role="separator"
        aria-orientation={variant === "vertical" ? "vertical" : "horizontal"}
        className={cn(dividerVariants({ variant }), className)}
      />
    )
  },
)
Divider.displayName = "Divider"

export { Divider, dividerVariants }
