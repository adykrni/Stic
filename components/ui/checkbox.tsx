"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Label } from "./label"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const checkboxVariants = cva(
  "group inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-border bg-transparent text-primary-foreground focus-visible:border-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary",
)

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-3 group-data-[state=indeterminate]:hidden"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 8.25 6.5 11.25 12.5 4.75" />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="hidden size-3 group-data-[state=indeterminate]:block"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 8h8" />
    </svg>
  )
}

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "children">,
    VariantProps<typeof checkboxVariants> {
  label?: React.ReactNode
}

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, id, disabled, ...props }, ref) => {
  const generatedId = React.useId()
  const controlId = id ?? (label != null ? generatedId : undefined)

  const control = (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      {...props}
      id={controlId}
      disabled={disabled}
      className={cn(checkboxVariants(), className)}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        <CheckIcon />
        <MinusIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )

  if (label == null) return control

  return (
    <div className="inline-flex items-center gap-2">
      {control}
      <Label htmlFor={controlId} disabled={disabled}>
        {label}
      </Label>
    </div>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox, checkboxVariants }
