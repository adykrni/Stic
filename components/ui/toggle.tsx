"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const toggleVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-geist text-sm font-medium leading-5 focus-visible:shadow-focus focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-foreground hover:data-[state=off]:bg-neutral-100 hover:data-[state=off]:text-neutral-500 data-[state=on]:bg-neutral-100 data-[state=on]:text-foreground",
        outline:
          "border border-border bg-background text-foreground shadow-button hover:data-[state=off]:bg-neutral-100 hover:data-[state=off]:text-neutral-900 focus-visible:border-ring data-[state=on]:bg-neutral-100 data-[state=on]:text-foreground disabled:bg-transparent",
      },
      size: {
        default: "h-9 px-2",
        sm: "h-8 px-1.5",
        lg: "h-10 px-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {}

const Toggle = React.forwardRef<
  React.ComponentRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, variant, size, disabled, ...props }, ref) => {
  return (
    <TogglePrimitive.Root
      ref={ref}
      data-slot="toggle"
      {...props}
      disabled={disabled}
      className={cn(toggleVariants({ variant, size }), className)}
    />
  )
})
Toggle.displayName = "Toggle"

export { Toggle, toggleVariants }
