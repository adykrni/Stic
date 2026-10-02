"use client"

import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const navigationMenuVariants = cva(
  "relative z-popover flex max-w-max flex-1 items-center justify-center font-geist",
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

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center gap-1 rounded-lg bg-background px-4 py-2 text-sm font-medium leading-5 text-foreground outline-none transition-colors hover:bg-accent hover:text-neutral-900 focus-visible:border-ring focus-visible:shadow-focus data-[state=open]:bg-accent data-[state=open]:text-neutral-900 data-[active]:bg-accent data-[active]:text-neutral-900 disabled:pointer-events-none disabled:opacity-50",
)

const navigationMenuLinkStyle = cva(
  "inline-flex h-9 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium leading-5 text-foreground outline-none transition-colors hover:bg-accent hover:text-neutral-900 focus-visible:border-ring focus-visible:shadow-focus data-[active]:bg-accent data-[active]:font-medium data-[active]:text-neutral-900 disabled:pointer-events-none disabled:opacity-50",
)

const NavigationMenu = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> &
    VariantProps<typeof navigationMenuVariants>
>(({ className, variant, size, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    data-slot="navigation-menu"
    className={cn(navigationMenuVariants({ variant, size }), className)}
    {...props}
  />
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    data-slot="navigation-menu-list"
    className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const NavigationMenuTrigger = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    data-slot="navigation-menu-trigger"
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}
    <svg
      viewBox="0 0 16 16"
      className="relative top-px size-3 transition duration-200 group-data-[state=open]:rotate-180"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.33"
      aria-hidden="true"
    >
      <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    data-slot="navigation-menu-content"
    className={cn(
      "absolute top-0 left-0 w-auto rounded-lg border border-border bg-background p-4 font-geist text-sm leading-5 text-foreground shadow-popover outline-none md:w-[var(--radix-navigation-menu-viewport-width)]",
      className,
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

export interface NavigationMenuLinkItemProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> {
  active?: boolean
}

const NavigationMenuLinkItem = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Link>,
  NavigationMenuLinkItemProps
>(({ className, active, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    data-slot="navigation-menu-link"
    active={active}
    className={cn(navigationMenuLinkStyle(), className)}
    {...props}
  />
))
NavigationMenuLinkItem.displayName = "NavigationMenuLinkItem"

const NavigationMenuViewport = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute top-full left-0 flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      data-slot="navigation-menu-viewport"
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-lg border border-border bg-background shadow-popover outline-none md:w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    data-slot="navigation-menu-indicator"
    className={cn(
      "top-full z-popover flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:hidden",
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] size-2 rotate-45 rounded-t-sm bg-border" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuLinkItem,
  NavigationMenuViewport,
  NavigationMenuIndicator,
  navigationMenuVariants,
  navigationMenuTriggerStyle,
  navigationMenuLinkStyle,
}
