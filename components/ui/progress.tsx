"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const progressVariants = cva("relative overflow-hidden rounded-full", {
  variants: {
    variant: {
      default: "bg-primary",
    },
    size: {
      default: "h-2 w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {}

const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant, size, ...props }, ref) => {
  const filled = Math.min(100, Math.max(0, value ?? 0))

  return (
    <ProgressPrimitive.Root
      ref={ref}
      data-slot="progress"
      {...props}
      value={value}
      className={cn(progressVariants({ variant, size }), className)}
    >
      <div className="absolute inset-0 bg-white/80" aria-hidden="true" />
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="relative h-full w-full bg-primary transition-transform"
        style={{ transform: `translateX(-${100 - filled}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = "Progress"

export { Progress, progressVariants }
