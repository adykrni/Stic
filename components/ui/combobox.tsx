"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Button } from "./button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const comboboxVariants = cva("w-full", {
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

const comboboxTriggerVariants = cva(
  "w-full justify-between font-normal data-[state=open]:border-ring data-[state=open]:shadow-focus",
  {
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
  },
)

function ChevronsUpDownIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4 shrink-0 opacity-50"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 6.5 8 3.5 11 6.5" />
      <path d="M5 9.5 8 12.5 11 9.5" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="ml-auto size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
    </svg>
  )
}

export type ComboboxOption = {
  value: string
  label: string
}

export interface ComboboxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue">,
    VariantProps<typeof comboboxVariants> {
  options: ComboboxOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
}

function Combobox({
  options,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  placeholder = "Select an option…",
  searchPlaceholder = "Search…",
  emptyMessage = "No results found.",
  disabled = false,
  className,
  variant,
  size,
  ...props
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const value = valueProp ?? uncontrolledValue

  const setValue = React.useCallback(
    (next: string) => {
      if (valueProp === undefined) {
        setUncontrolledValue(next)
      }
      onValueChange?.(next)
    },
    [onValueChange, valueProp],
  )

  const selected = options.find((option) => option.value === value)

  return (
    <div
      data-slot="combobox"
      className={cn(comboboxVariants({ variant, size }), className)}
      {...props}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled || undefined}
            className={cn(
              comboboxTriggerVariants({ variant, size }),
              !selected && "text-neutral-500",
            )}
          >
            <span className="truncate">{selected?.label ?? placeholder}</span>
            <ChevronsUpDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-[var(--radix-popover-trigger-width)] p-0 shadow-popover"
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => {
                      setValue(option.value === value ? "" : option.value)
                      setOpen(false)
                    }}
                  >
                    {option.label}
                    {value === option.value ? <CheckIcon /> : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

Combobox.displayName = "Combobox"

export { Combobox, comboboxVariants, comboboxTriggerVariants }
