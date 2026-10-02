"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const labelVariants = cva(
  "inline-flex items-center gap-1 font-geist text-sm font-medium leading-none text-foreground",
  {
    variants: {
      variant: {
        default: "",
        required: "",
        disabled: "opacity-40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  disabled?: boolean
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, disabled, children, ...props }, ref) => {
    const isDisabled = variant === "disabled" || Boolean(disabled)

    return (
      <label
        ref={ref}
        data-slot="label"
        {...props}
        className={cn(labelVariants({ variant }), isDisabled && "opacity-40", className)}
        aria-disabled={isDisabled || undefined}
      >
        {children}
        {variant === "required" ? (
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
    )
  },
)
Label.displayName = "Label"

export { Label, labelVariants }
