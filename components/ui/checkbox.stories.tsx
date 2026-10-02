import type { Meta, StoryObj } from "@storybook/react-vite"
import { Checkbox } from "./checkbox"

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "padded",
  },
  args: {
    label: "Accept terms",
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const States: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" checked onCheckedChange={() => {}} />
      <Checkbox label="Indeterminate" checked="indeterminate" onCheckedChange={() => {}} />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Focus" className="border-ring shadow-focus" />
    </div>
  ),
}
