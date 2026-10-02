"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const hoverCardVariants = cva(
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

export interface HoverCardProps
  extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root> {}

const HoverCard = ({
  openDelay = 700,
  closeDelay = 300,
  ...props
}: HoverCardProps) => (
  <HoverCardPrimitive.Root openDelay={openDelay} closeDelay={closeDelay} {...props} />
)
HoverCard.displayName = "HoverCard"

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ComponentRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> &
    VariantProps<typeof hoverCardVariants>
>(({ className, variant, size, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      data-slot="hover-card-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(hoverCardVariants({ variant, size }), className)}
      {...props}
    />
  </HoverCardPrimitive.Portal>
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

const HoverCardArrow = React.forwardRef<
  React.ComponentRef<typeof HoverCardPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <HoverCardPrimitive.Arrow
    ref={ref}
    data-slot="hover-card-arrow"
    className={cn("fill-background", className)}
    {...props}
  />
))
HoverCardArrow.displayName = HoverCardPrimitive.Arrow.displayName

export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  HoverCardArrow,
  hoverCardVariants,
}
