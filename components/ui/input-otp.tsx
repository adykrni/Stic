"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const inputOtpVariants = cva(
  "flex items-center gap-2 has-[:disabled]:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        error: "",
      },
      size: {
        default: "",
        sm: "gap-1.5",
        lg: "gap-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const inputOtpSlotVariants = cva(
  "relative flex size-9 items-center justify-center rounded-lg border border-border bg-background font-geist text-sm text-foreground shadow-button transition-colors focus-visible:outline-none data-[active=true]:border-ring data-[active=true]:shadow-focus disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "",
        error:
          "border-destructive data-[active=true]:border-destructive data-[active=true]:shadow-focus-destructive",
      },
      size: {
        default: "size-9 text-sm",
        sm: "size-8 text-xs",
        lg: "size-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

type InputOtpVariantProps = VariantProps<typeof inputOtpVariants>

const InputOtpVariantContext = React.createContext<InputOtpVariantProps>({
  variant: "default",
  size: "default",
})

export interface InputOTPProps
  extends Omit<React.ComponentPropsWithoutRef<typeof OTPInput>, "containerClassName">,
    InputOtpVariantProps {
  containerClassName?: string
}

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, InputOTPProps>(
  ({ className, containerClassName, variant, size, disabled, ...props }, ref) => {
    return (
      <InputOtpVariantContext.Provider value={{ variant, size }}>
        <OTPInput
          ref={ref}
          data-slot="input-otp"
          disabled={disabled || undefined}
          aria-invalid={variant === "error" ? true : undefined}
          containerClassName={cn(
            inputOtpVariants({ variant, size }),
            containerClassName,
            className,
          )}
          {...props}
        />
      </InputOtpVariantContext.Provider>
    )
  },
)
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="input-otp-group"
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
))
InputOTPGroup.displayName = "InputOTPGroup"

export interface InputOTPSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number
}

const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext)
    const { variant, size } = React.useContext(InputOtpVariantContext)
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

    return (
      <div
        ref={ref}
        data-slot="input-otp-slot"
        data-active={isActive ? true : undefined}
        className={cn(inputOtpSlotVariants({ variant, size }), className)}
        {...props}
      >
        {char}
        {hasFakeCaret ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-pulse bg-foreground" />
          </div>
        ) : null}
      </div>
    )
  },
)
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} data-slot="input-otp-separator" role="separator" {...props}>
    <span
      className={cn("text-neutral-500", className)}
      aria-hidden="true"
    >
      -
    </span>
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  inputOtpVariants,
  inputOtpSlotVariants,
}
