"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toggleVariants, type ToggleProps } from "./toggle"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const toggleGroupVariants = cva("inline-flex items-center", {
  variants: {
    variant: {
      default: "gap-1",
      outline: "gap-1",
    },
    size: {
      default: "",
      sm: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

type ToggleGroupContextValue = {
  variant: NonNullable<ToggleProps["variant"]>
  size: NonNullable<ToggleProps["size"]>
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  variant: "default",
  size: "default",
})

type ToggleGroupSingleProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Root
> &
  VariantProps<typeof toggleGroupVariants> & { type: "single" }

type ToggleGroupMultipleProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Root
> &
  VariantProps<typeof toggleGroupVariants> & { type: "multiple" }

export type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps

const ToggleGroup = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(({ className, variant, size, children, ...props }, ref) => {
  const resolvedVariant = variant ?? "default"
  const resolvedSize = size ?? "default"

  return (
    <ToggleGroupContext.Provider
      value={{ variant: resolvedVariant, size: resolvedSize }}
    >
      <ToggleGroupPrimitive.Root
        ref={ref}
        data-slot="toggle-group"
        {...props}
        className={cn(
          toggleGroupVariants({ variant: resolvedVariant, size: resolvedSize }),
          className,
        )}
      >
        {children}
      </ToggleGroupPrimitive.Root>
    </ToggleGroupContext.Provider>
  )
})
ToggleGroup.displayName = "ToggleGroup"

export interface ToggleGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
    VariantProps<typeof toggleVariants> {}

const ToggleGroupItem = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      data-slot="toggle-group-item"
      {...props}
      className={cn(
        toggleVariants({
          variant: variant ?? context.variant,
          size: size ?? context.size,
        }),
        className,
      )}
    />
  )
})
ToggleGroupItem.displayName = "ToggleGroupItem"

export { ToggleGroup, ToggleGroupItem, toggleGroupVariants }
