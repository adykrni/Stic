"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const buttonVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-transparent text-sm font-medium transition-colors focus-visible:border-ring focus-visible:outline-none disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-800 active:bg-primary-700 disabled:bg-neutral-200",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-danger-700 active:bg-danger-800",
        outline:
          "bg-transparent text-foreground border-border hover:bg-neutral-100",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-200",
        ghost: "bg-transparent text-foreground hover:bg-accent",
        link: "border-transparent bg-transparent text-primary hover:text-primary-700",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3",
        lg: "h-12 px-6",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Spinner() {
  return (
    <span
      className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
      aria-hidden="true"
    />
  )
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      children,
      onClick,
      type,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild && !loading ? Slot : "button"
    const isDisabled = Boolean(disabled)

    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-loading={loading ? "" : undefined}
        {...props}
        {...(asChild && !loading ? {} : { type: type ?? "button" })}
        className={cn(
          buttonVariants({ variant, size }),
          loading && "pointer-events-none",
          className,
        )}
        disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        onClick={(event) => {
          if (loading) {
            event.preventDefault()
            return
          }
          onClick?.(event)
        }}
      >
        {asChild && !loading ? (
          children
        ) : (
          <>
            <span
              className={cn(
                "inline-flex items-center justify-center gap-2",
                loading && "invisible",
              )}
            >
              {children}
            </span>
            {loading ? (
              <span className="absolute inset-0 flex items-center justify-center">
                <Spinner />
              </span>
            ) : null}
          </>
        )}
      </Comp>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
