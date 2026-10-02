"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const popoverVariants = cva(
  "z-popover w-80 rounded-lg border border-border bg-background p-4 font-geist text-sm leading-5 text-foreground shadow-popover outline-none",
  {
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
  },
)

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverAnchor = PopoverPrimitive.Anchor
const PopoverClose = PopoverPrimitive.Close

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> &
    VariantProps<typeof popoverVariants>
>(({ className, variant, size, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      data-slot="popover-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(popoverVariants({ variant, size }), className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

const PopoverArrow = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Arrow
    ref={ref}
    data-slot="popover-arrow"
    className={cn("fill-background", className)}
    {...props}
  />
))
PopoverArrow.displayName = PopoverPrimitive.Arrow.displayName

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
  PopoverClose,
  PopoverArrow,
  popoverVariants,
}
