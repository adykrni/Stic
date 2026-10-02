import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge, type BadgeProps } from "./badge"

type BadgeVariant = NonNullable<BadgeProps["variant"]>

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "padded",
  },
  args: {
    children: "Badge",
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

function BadgeView({ variant, ...args }: BadgeProps & { variant: BadgeVariant }) {
  return <Badge {...args} variant={variant} />
}

export const Default: Story = {
  args: { variant: "default" },
  render: (args) => <BadgeView {...args} variant="default" />,
}

export const Secondary: Story = {
  args: { variant: "secondary" },
  render: (args) => <BadgeView {...args} variant="secondary" />,
}

export const Destructive: Story = {
  args: { variant: "destructive" },
  render: (args) => <BadgeView {...args} variant="destructive" />,
}

export const Outline: Story = {
  args: { variant: "outline" },
  render: (args) => <BadgeView {...args} variant="outline" />,
}

export const States: Story = {
  args: { variant: "default" },
  render: (args) => <Badge {...args}>Default</Badge>,
}
