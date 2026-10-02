import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { calendarDayButtonVariants, Calendar } from "./calendar"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const meta = {
  title: "UI/Calendar",
  component: Calendar,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={{ before: new Date(2020, 0, 1) }}
    />
  )
}

export const Default: Story = {
  render: () => <CalendarDemo />,
}

function DaySwatch({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-sm text-foreground">{label}</span>
      <div className={cn(calendarDayButtonVariants(), className)}>{children}</div>
    </div>
  )
}

export const States: Story = {
  render: () => (
    <div className="space-y-3">
      <DaySwatch label="Day default">9</DaySwatch>
      <DaySwatch label="Day hover" className="bg-accent text-neutral-900">
        9
      </DaySwatch>
      <DaySwatch label="Selected" className="bg-primary text-primary-foreground">
        9
      </DaySwatch>
      <DaySwatch label="Today" className="bg-accent text-neutral-900">
        9
      </DaySwatch>
      <DaySwatch label="Outside" className="text-neutral-500 opacity-50">
        9
      </DaySwatch>
      <DaySwatch label="Disabled" className="text-neutral-500 opacity-50">
        9
      </DaySwatch>
    </div>
  ),
}
