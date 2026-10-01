import type { Meta, StoryObj } from "@storybook/react-vite"
import { RadioGroup, RadioGroupItem } from "./radio-group"

const meta = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args} aria-label="Delivery">
      <RadioGroupItem value="standard" label="Standard" />
      <RadioGroupItem value="express" label="Express" />
    </RadioGroup>
  ),
}

export const States: Story = {
  render: () => (
    <RadioGroup defaultValue="selected" aria-label="Plan">
      <RadioGroupItem value="unselected" label="Unselected" />
      <RadioGroupItem value="selected" label="Selected" />
      <RadioGroupItem value="disabled" label="Disabled" disabled />
      <RadioGroupItem value="focus" label="Focus" className="border-ring shadow-focus" />
    </RadioGroup>
  ),
}
