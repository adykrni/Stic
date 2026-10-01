"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const switchVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-white bg-neutral-200 focus-visible:border-ring focus-visible:shadow-focus data-[state=checked]:bg-primary",
      },
      size: {
        default: "h-5 w-9 border-2 px-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, variant, size, disabled, ...props }, ref) => {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      {...props}
      disabled={disabled}
      className={cn(switchVariants({ variant, size }), className)}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-4 rounded-full bg-background shadow-lg transition-transform data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0"
      />
    </SwitchPrimitive.Root>
  )
})
Switch.displayName = "Switch"

export { Switch, switchVariants }
