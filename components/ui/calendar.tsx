"use client"

import * as React from "react"
import { DayPicker, getDefaultClassNames, type DayPickerProps } from "react-day-picker"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { buttonVariants } from "./button"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const calendarVariants = cva(
  "rounded-[var(--radius-10)] border border-border bg-background p-3 font-geist shadow-popover",
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

const calendarDayButtonVariants = cva(
  "inline-flex size-8 items-center justify-center rounded-lg border border-transparent p-0 font-geist text-sm leading-5 text-foreground transition-colors hover:bg-accent hover:text-neutral-900 focus-visible:border-ring focus-visible:shadow-focus focus-visible:outline-none disabled:pointer-events-none disabled:text-neutral-500 disabled:opacity-50",
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

export type CalendarProps = DayPickerProps &
  VariantProps<typeof calendarVariants> & {
    dayButtonClassName?: string
  }

function ChevronLeftIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 4 6 8l4 4" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 4l4 4-4 4" />
    </svg>
  )
}

function Calendar({
  className,
  variant,
  size,
  dayButtonClassName,
  showOutsideDays = true,
  classNames,
  components,
  mode = "single",
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      data-slot="calendar"
      mode={mode}
      showOutsideDays={showOutsideDays}
      className={cn(calendarVariants({ variant, size }), className)}
      classNames={{
        root: cn(defaultClassNames.root),
        months: cn("relative flex flex-col gap-4", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        month_caption: cn(
          "relative flex h-8 w-full items-center justify-center px-8",
          defaultClassNames.month_caption,
        ),
        caption_label: cn(
          "font-geist text-sm font-medium leading-5 text-foreground",
          defaultClassNames.caption_label,
        ),
        nav: cn(
          "absolute inset-x-0 top-0 flex items-center justify-between",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-8 shrink-0",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-8 shrink-0",
          defaultClassNames.button_next,
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "size-8 text-center text-xs font-medium leading-4 text-neutral-500",
          defaultClassNames.weekday,
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        day: cn(
          "relative size-8 p-0 text-center text-sm focus-within:relative focus-within:z-20",
          defaultClassNames.day,
        ),
        day_button: cn(
          calendarDayButtonVariants(),
          dayButtonClassName,
          defaultClassNames.day_button,
        ),
        selected: cn(
          "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground",
          defaultClassNames.selected,
        ),
        today: cn(
          "[&>button]:bg-accent [&>button]:text-neutral-900 [&>button]:hover:bg-accent [&>button]:hover:text-neutral-900",
          defaultClassNames.today,
        ),
        outside: cn(
          "[&>button]:text-neutral-500 [&>button]:opacity-50 [&>button]:hover:bg-transparent [&>button]:hover:text-neutral-500",
          defaultClassNames.outside,
        ),
        disabled: cn("text-neutral-500 opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />,
        ...components,
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar, calendarVariants, calendarDayButtonVariants }
