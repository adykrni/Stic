"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const scrollAreaVariants = cva("relative overflow-hidden font-geist", {
  variants: {
    variant: { default: "" },
    size: { default: "" },
  },
  defaultVariants: { variant: "default", size: "default" },
})

const scrollBarVariants = cva("flex touch-none select-none transition-colors", {
  variants: {
    variant: { default: "" },
    size: {
      default: "",
      vertical: "h-full w-2.5 border-l border-l-transparent p-px",
      horizontal: "h-2.5 flex-col border-t border-t-transparent p-px",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
})

const ScrollBar = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Scrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar> &
    VariantProps<typeof scrollBarVariants>
>(({ className, variant, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.Scrollbar
    ref={ref}
    data-slot="scroll-area-scrollbar"
    orientation={orientation}
    className={cn(
      scrollBarVariants({ variant, size: orientation === "vertical" ? "vertical" : "horizontal" }),
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.Thumb
      data-slot="scroll-area-thumb"
      className="relative flex-1 rounded-full bg-border"
    />
  </ScrollAreaPrimitive.Scrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.Scrollbar.displayName

const ScrollArea = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & VariantProps<typeof scrollAreaVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    data-slot="scroll-area"
    className={cn(scrollAreaVariants({ variant, size }), className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      data-slot="scroll-area-viewport"
      className="size-full rounded-[inherit]"
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner data-slot="scroll-area-corner" />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

export { ScrollArea, ScrollBar, scrollAreaVariants }
