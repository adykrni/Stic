"use client"

import { cva } from "class-variance-authority"

export const menuItemVariants = cva(
  "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 font-geist text-sm leading-5 text-foreground outline-none transition-colors focus:bg-accent focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-foreground",
  {
    variants: {
      variant: {
        default: "",
      },
      size: {
        default: "min-h-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export const menuLabelVariants = cva(
  "px-2 py-1.5 font-geist text-xs font-medium leading-4 text-neutral-500",
  {
    variants: {
      variant: { default: "" },
      size: { default: "" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)

export const menuSeparatorVariants = cva("-mx-1 my-1 h-px bg-border", {
  variants: {
    variant: { default: "" },
    size: { default: "" },
  },
  defaultVariants: { variant: "default", size: "default" },
})
