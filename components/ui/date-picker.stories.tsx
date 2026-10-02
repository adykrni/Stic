import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Input, inputVariants } from "./input"
import { DatePicker } from "./date-picker"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const meta = {
  title: "UI/Date Picker",
  component: DatePicker,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

function DatePickerDemo(props: Partial<React.ComponentProps<typeof DatePicker>>) {
  const [value, setValue] = React.useState<Date | undefined>(new Date(2026, 9, 2))
  return (
    <div className="max-w-xs">
      <DatePicker value={value} onValueChange={setValue} {...props} />
    </div>
  )
}

export const Default: Story = {
  render: () => <DatePickerDemo placeholder="Pick a date" />,
}

export const States: Story = {
  render: () => (
    <div className="flex max-w-xs flex-col gap-4">
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Trigger default</p>
        <DatePicker placeholder="Pick a date" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Trigger hover</p>
        <Input
          readOnly
          placeholder="Pick a date"
          className="cursor-default hover:border-border"
          value=""
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Trigger focus / open</p>
        <Input
          readOnly
          placeholder="Pick a date"
          className={cn(inputVariants(), "border-ring shadow-focus")}
          value="Oct 2, 2026"
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Trigger disabled</p>
        <DatePicker placeholder="Pick a date" disabled />
      </div>
    </div>
  ),
}
