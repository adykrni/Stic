"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Label } from "./label"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const radioGroupItemVariants = cva(
  "inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-border bg-background shadow-button focus-visible:border-ring focus-visible:shadow-focus focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40",
)

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      data-slot="radio-group"
      {...props}
      className={cn("grid gap-2", className)}
    />
  )
})
RadioGroup.displayName = "RadioGroup"

export interface RadioGroupItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, "children">,
    VariantProps<typeof radioGroupItemVariants> {
  label?: React.ReactNode
}

const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, label, id, disabled, ...props }, ref) => {
  const generatedId = React.useId()
  const controlId = id ?? (label != null ? generatedId : undefined)

  const control = (
    <RadioGroupPrimitive.Item
      ref={ref}
      data-slot="radio-group-item"
      {...props}
      id={controlId}
      disabled={disabled}
      className={cn(radioGroupItemVariants(), className)}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span className="size-2 rounded-full bg-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )

  if (label == null) return control

  return (
    <div className="inline-flex items-center gap-3 pt-px">
      {control}
      <Label htmlFor={controlId} disabled={disabled}>
        {label}
      </Label>
    </div>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem, radioGroupItemVariants }
