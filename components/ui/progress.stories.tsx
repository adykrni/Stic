import type { Meta, StoryObj } from "@storybook/react-vite"
import { Progress, type ProgressProps } from "./progress"

type ProgressVariant = NonNullable<ProgressProps["variant"]>
type ProgressSize = NonNullable<ProgressProps["size"]>

const sizes: ProgressSize[] = ["default"]
const values = [0, 25, 50, 75, 100]

const meta = {
  title: "UI/Progress",
  component: Progress,
  parameters: {
    layout: "padded",
  },
  args: {
    value: 50,
    "aria-label": "Progress",
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

function VariantSizes({ variant }: { variant: ProgressVariant }) {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      {sizes.map((size) =>
        values.map((value) => (
          <Progress
            key={`${size}-${value}`}
            variant={variant}
            size={size}
            value={value}
            aria-label={`${value} percent`}
          />
        )),
      )}
    </div>
  )
}

export const Default: Story = {
  args: { variant: "default", size: "default", value: 50 },
  render: () => <VariantSizes variant="default" />,
}
