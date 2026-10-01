"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const inputVariants = cva(
  "flex h-9 w-full rounded-lg border border-border bg-background px-3 py-1 font-geist text-sm text-foreground shadow-button placeholder:text-neutral-500 focus-visible:border-ring focus-visible:shadow-focus focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        error:
          "border-destructive focus-visible:border-destructive focus-visible:shadow-focus-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      type = "text",
      disabled,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        data-slot="input"
        {...props}
        type={type}
        disabled={disabled || undefined}
        aria-invalid={variant === "error" ? true : ariaInvalid}
        className={cn(inputVariants({ variant }), className)}
      />
    )
  },
)
Input.displayName = "Input"

export { Input, inputVariants }
