import type { Meta, StoryObj } from "@storybook/react-vite"
import { Skeleton, type SkeletonProps } from "./skeleton"

type SkeletonVariant = NonNullable<SkeletonProps["variant"]>

const meta = {
  title: "UI/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

function SkeletonView({
  variant,
  ...args
}: SkeletonProps & { variant: SkeletonVariant }) {
  return (
    <div className="w-64">
      <Skeleton {...args} variant={variant} />
    </div>
  )
}

export const Text: Story = {
  args: { variant: "text" },
  render: (args) => <SkeletonView {...args} variant="text" />,
}

export const Circular: Story = {
  args: { variant: "circular" },
  render: (args) => <SkeletonView {...args} variant="circular" />,
}

export const Rectangular: Story = {
  args: { variant: "rectangular" },
  render: (args) => <SkeletonView {...args} variant="rectangular" />,
}

export const States: Story = {
  args: { variant: "text" },
  render: (args) => (
    <div className="w-64">
      <Skeleton {...args} />
    </div>
  ),
}
