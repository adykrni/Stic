"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { menuLabelVariants, menuSeparatorVariants } from "./menu-item"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const commandVariants = cva(
  "flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-10)] border border-border bg-background font-geist text-foreground shadow-popover",
  {
    variants: {
      variant: {
        default: "",
      },
      size: {
        default: "max-w-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const commandInputVariants = cva(
  "flex h-12 items-center gap-2 border-b border-border px-3",
  {
    variants: {
      variant: { default: "" },
      size: { default: "" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)

const commandItemVariants = cva(
  "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-3 font-geist text-sm leading-5 text-foreground outline-none transition-colors data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-foreground",
  {
    variants: {
      variant: {
        default: "",
      },
      size: {
        default: "min-h-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface CommandProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive>,
    VariantProps<typeof commandVariants> {}

const Command = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive>,
  CommandProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <CommandPrimitive
      ref={ref}
      data-slot="command"
      className={cn(commandVariants({ variant, size }), className)}
      {...props}
    />
  )
})
Command.displayName = "Command"

const CommandInput = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => {
  return (
    <div
      data-slot="command-input-wrapper"
      className={cn(commandInputVariants())}
      cmdk-input-wrapper=""
    >
      <svg
        viewBox="0 0 16 16"
        className="size-4 shrink-0 opacity-50"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="7" cy="7" r="4.5" />
        <path d="M10.5 10.5 14 14" />
      </svg>
      <CommandPrimitive.Input
        ref={ref}
        data-slot="command-input"
        className={cn(
          "flex h-10 w-full bg-transparent text-sm leading-5 text-foreground outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  )
})
CommandInput.displayName = "CommandInput"

const CommandList = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => {
  return (
    <CommandPrimitive.List
      ref={ref}
      data-slot="command-list"
      className={cn("max-h-80 overflow-y-auto overflow-x-hidden", className)}
      {...props}
    />
  )
})
CommandList.displayName = "CommandList"

const CommandEmpty = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => {
  return (
    <CommandPrimitive.Empty
      ref={ref}
      data-slot="command-empty"
      className={cn("py-6 text-center text-sm leading-5 text-foreground", className)}
      {...props}
    />
  )
})
CommandEmpty.displayName = "CommandEmpty"

const CommandGroup = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => {
  return (
    <CommandPrimitive.Group
      ref={ref}
      data-slot="command-group"
      className={cn(
        "overflow-hidden px-2 py-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-geist [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:leading-4 [&_[cmdk-group-heading]]:text-neutral-500",
        className,
      )}
      {...props}
    />
  )
})
CommandGroup.displayName = "CommandGroup"

const CommandSeparator = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => {
  return (
    <CommandPrimitive.Separator
      ref={ref}
      data-slot="command-separator"
      className={cn(menuSeparatorVariants(), className)}
      {...props}
    />
  )
})
CommandSeparator.displayName = "CommandSeparator"

export interface CommandItemProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>,
    VariantProps<typeof commandItemVariants> {}

const CommandItem = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <CommandPrimitive.Item
      ref={ref}
      data-slot="command-item"
      className={cn(commandItemVariants({ variant, size }), className)}
      {...props}
    />
  )
})
CommandItem.displayName = "CommandItem"

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto text-xs leading-4 tracking-widest text-neutral-500",
        className,
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

const CommandHeading = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="command-heading"
      className={cn(menuLabelVariants(), className)}
      {...props}
    />
  )
}
CommandHeading.displayName = "CommandHeading"

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandHeading,
  commandVariants,
  commandItemVariants,
}
