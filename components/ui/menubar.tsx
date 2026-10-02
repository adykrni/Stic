"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { menuItemVariants, menuLabelVariants, menuSeparatorVariants } from "./menu-item"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const menubarVariants = cva(
  "flex h-9 items-center gap-1 rounded-lg border border-border bg-background p-1 font-geist shadow-button",
  {
    variants: { variant: { default: "" }, size: { default: "" } },
    defaultVariants: { variant: "default", size: "default" },
  },
)

const menubarTriggerVariants = cva(
  "flex cursor-default select-none items-center rounded-md px-3 py-1.5 text-sm font-medium leading-5 outline-none focus:bg-accent focus:text-foreground data-[state=open]:bg-accent data-[highlighted]:bg-accent",
  {
    variants: { variant: { default: "" }, size: { default: "" } },
    defaultVariants: { variant: "default", size: "default" },
  },
)

const menubarContentVariants = cva(
  "z-popover min-w-32 overflow-hidden rounded-lg border border-border bg-background p-1 text-foreground shadow-popover outline-none",
  {
    variants: { variant: { default: "" }, size: { default: "" } },
    defaultVariants: { variant: "default", size: "default" },
  },
)

const Menubar = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root> & VariantProps<typeof menubarVariants>
>(({ className, variant, size, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    data-slot="menubar"
    className={cn(menubarVariants({ variant, size }), className)}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarMenu = MenubarPrimitive.Menu

const MenubarTrigger = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger> &
    VariantProps<typeof menubarTriggerVariants>
>(({ className, variant, size, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    data-slot="menubar-trigger"
    className={cn(menubarTriggerVariants({ variant, size }), className)}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarContent = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content> &
    VariantProps<typeof menubarContentVariants>
>(({ className, variant, size, align = "start", sideOffset = 4, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      data-slot="menubar-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(menubarContentVariants({ variant, size }), className)}
      {...props}
    />
  </MenubarPrimitive.Portal>
))
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & VariantProps<typeof menuItemVariants>
>(({ className, variant, size, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    data-slot="menubar-item"
    className={cn(menuItemVariants({ variant, size }), className)}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarSeparator = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator> & VariantProps<typeof menuSeparatorVariants>
>(({ className, variant, size, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    data-slot="menubar-separator"
    className={cn(menuSeparatorVariants({ variant, size }), className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarLabel = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & VariantProps<typeof menuLabelVariants>
>(({ className, variant, size, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    data-slot="menubar-label"
    className={cn(menuLabelVariants({ variant, size }), className)}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  menubarVariants,
}
