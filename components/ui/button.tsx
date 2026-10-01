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
  "relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-transparent font-geist text-sm font-medium leading-5 transition-colors focus-visible:outline-none active:opacity-60 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-button hover:overlay-white-10 focus-visible:shadow-focus",
        destructive:
          "bg-destructive text-destructive-foreground shadow-button focus-visible:shadow-focus-destructive",
        outline:
          "border-border bg-background text-foreground shadow-button hover:bg-neutral-100 hover:text-neutral-900 focus-visible:border-ring focus-visible:shadow-focus",
        secondary:
          "bg-secondary text-secondary-foreground shadow-button hover:overlay-white-20 focus-visible:shadow-focus",
        ghost:
          "bg-transparent text-foreground hover:bg-neutral-100 hover:text-neutral-900 focus-visible:shadow-focus",
        link: "bg-transparent text-primary hover:underline focus-visible:shadow-focus",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 py-2 text-xs leading-4",
        lg: "h-10 px-8 py-2",
        icon: "size-9 p-0",
      },
    },
    compoundVariants: [
      {
        variant: "link",
        size: "sm",
        class: "hover:text-sm hover:leading-5",
      },
    ],
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
          loading && "pointer-events-none opacity-50",
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
