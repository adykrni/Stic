"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const skeletonVariants = cva("animate-pulse bg-accent", {
  variants: {
    variant: {
      text: "h-4 w-full rounded-lg",
      circular: "size-10 rounded-full",
      rectangular: "h-24 w-full rounded-lg",
    },
  },
  defaultVariants: {
    variant: "text",
  },
})

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="skeleton"
        {...props}
        aria-hidden="true"
        className={cn(skeletonVariants({ variant }), className)}
      />
    )
  },
)
Skeleton.displayName = "Skeleton"

export { Skeleton, skeletonVariants }
