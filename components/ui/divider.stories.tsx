import type { Meta, StoryObj } from "@storybook/react-vite"
import { Divider } from "./divider"

const meta = {
  title: "UI/Divider",
  component: Divider,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: { variant: "horizontal" },
}

export const Vertical: Story = {
  args: { variant: "vertical" },
  render: (args) => (
    <div className="flex h-12 items-center">
      <Divider {...args} variant="vertical" />
    </div>
  ),
}
