"use client"

import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const aspectRatioVariants = cva("block w-full", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface AspectRatioProps
  extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>,
    VariantProps<typeof aspectRatioVariants> {}

const AspectRatio = React.forwardRef<
  React.ComponentRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(({ className, variant, size, ratio = 1, ...props }, ref) => {
  return (
    <AspectRatioPrimitive.Root
      ref={ref}
      data-slot="aspect-ratio"
      {...props}
      ratio={ratio}
      className={cn(aspectRatioVariants({ variant, size }), className)}
    />
  )
})
AspectRatio.displayName = "AspectRatio"

export { AspectRatio, aspectRatioVariants }
