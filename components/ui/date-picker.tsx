"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Calendar } from "./calendar"
import { Input } from "./input"
import { Popover, PopoverAnchor, PopoverContent } from "./popover"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const datePickerVariants = cva("relative w-full", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4 text-neutral-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5.5 2.667V4M10.5 2.667V4M2.667 6.667h10.666M3.333 4h9.334c.368 0 .666.298.666.667v8.666c0 .369-.298.667-.666.667H3.333a.667.667 0 0 1-.666-.667V4.667c0-.369.298-.667.666-.667Z" />
    </svg>
  )
}

export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue">,
    VariantProps<typeof datePickerVariants> {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  locale?: string
  dateStyle?: Intl.DateTimeFormatOptions["dateStyle"]
}

function DatePicker({
  value: valueProp,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date",
  disabled = false,
  locale,
  dateStyle = "medium",
  className,
  variant,
  size,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [uncontrolledValue, setUncontrolledValue] = React.useState<Date | undefined>(
    defaultValue,
  )
  const value = valueProp ?? uncontrolledValue

  const setValue = React.useCallback(
    (next: Date | undefined) => {
      if (valueProp === undefined) {
        setUncontrolledValue(next)
      }
      onValueChange?.(next)
    },
    [onValueChange, valueProp],
  )

  const displayValue = value
    ? value.toLocaleDateString(locale, { dateStyle })
    : ""

  return (
    <div
      data-slot="date-picker"
      className={cn(datePickerVariants({ variant, size }), className)}
      {...props}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <button
            type="button"
            disabled={disabled || undefined}
            aria-expanded={open}
            aria-haspopup="dialog"
            className={cn(
              "relative w-full text-left disabled:pointer-events-none disabled:opacity-50",
              open && "[&_input]:border-ring [&_input]:shadow-focus",
            )}
            onClick={() => {
              if (!disabled) {
                setOpen(true)
              }
            }}
          >
            <Input
              readOnly
              tabIndex={-1}
              aria-hidden
              value={displayValue}
              placeholder={placeholder}
              className="pointer-events-none cursor-default pr-10"
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <CalendarIcon />
            </span>
          </button>
        </PopoverAnchor>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              setValue(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

DatePicker.displayName = "DatePicker"

export { DatePicker, datePickerVariants }
