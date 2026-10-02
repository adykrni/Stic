"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const collapsibleVariants = cva("font-geist", {
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

const collapsibleTriggerVariants = cva(
  "group flex w-full items-center justify-between gap-2 rounded-lg px-4 py-2 font-geist text-sm font-medium leading-5 text-foreground transition-colors hover:bg-neutral-100 focus-visible:border-ring focus-visible:shadow-focus focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
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

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger> &
    VariantProps<typeof collapsibleTriggerVariants> & {
      showChevron?: boolean
    }
>(({ className, variant, size, children, showChevron = true, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    ref={ref}
    data-slot="collapsible-trigger"
    className={cn(collapsibleTriggerVariants({ variant, size }), className)}
    {...props}
  >
    {children}
    {showChevron ? (
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
      >
        <path
          d="M4 6l4 4 4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.33"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : null}
  </CollapsiblePrimitive.Trigger>
))
CollapsibleTrigger.displayName = CollapsiblePrimitive.Trigger.displayName

const CollapsibleContent = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content> &
    VariantProps<typeof collapsibleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    data-slot="collapsible-content"
    className={cn(
      collapsibleVariants({ variant, size }),
      "overflow-hidden data-[state=closed]:animate-none data-[state=open]:animate-none",
      className,
    )}
    {...props}
  />
))
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  collapsibleVariants,
  collapsibleTriggerVariants,
}
