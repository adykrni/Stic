"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const textareaVariants = cva(
  "flex min-h-76 w-full rounded-lg border border-border bg-background px-3 py-2 font-geist text-sm text-foreground shadow-button placeholder:text-neutral-500 focus-visible:border-ring focus-visible:shadow-focus focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
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

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, disabled, "aria-invalid": ariaInvalid, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        {...props}
        disabled={disabled || undefined}
        aria-invalid={variant === "error" ? true : ariaInvalid}
        className={cn(textareaVariants({ variant }), className)}
      />
    )
  },
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
