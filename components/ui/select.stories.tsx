import type { Meta, StoryObj } from "@storybook/react-vite"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

const meta = {
  title: "UI/Select",
  component: SelectTrigger,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof SelectTrigger>

export default meta
type Story = StoryObj<typeof meta>

function Field({
  placeholder = "Select a fruit",
  disabled,
  className,
  defaultValue,
  open,
}: {
  placeholder?: string
  disabled?: boolean
  className?: string
  defaultValue?: string
  open?: boolean
}) {
  return (
    <Select defaultValue={defaultValue} open={open} disabled={disabled}>
      <SelectTrigger className={className} disabled={disabled} aria-label={placeholder}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="pear">Pear</SelectItem>
        <SelectItem value="plum" disabled>
          Plum
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export const Default: Story = {
  args: {},
  render: () => (
    <div className="w-52">
      <Field />
    </div>
  ),
}

export const States: Story = {
  args: {},
  render: () => (
    <div className="flex w-52 flex-col gap-3">
      <Field placeholder="Default" />
      <Field placeholder="Hover" />
      <Field placeholder="Open" open />
      <Field placeholder="Focus" className="border-ring bg-accent shadow-focus" />
      <Field placeholder="Disabled" disabled />
    </div>
  ),
}
