import type { Meta, StoryObj } from "@storybook/react-vite"
import { AspectRatio, type AspectRatioProps } from "./aspect-ratio"

type AspectRatioVariant = NonNullable<AspectRatioProps["variant"]>

const ratios = [
  { label: "1:1", ratio: 1 },
  { label: "16:9", ratio: 16 / 9 },
  { label: "4:3", ratio: 4 / 3 },
] as const

const meta = {
  title: "UI/AspectRatio",
  component: AspectRatio,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

function Frame({ label, ratio }: { label: string; ratio: number }) {
  return (
    <div className="w-60">
      <AspectRatio ratio={ratio}>
        <div className="flex h-full w-full items-center justify-center bg-neutral-100 font-geist text-sm text-foreground">
          {label}
        </div>
      </AspectRatio>
    </div>
  )
}

function VariantSizes({ variant: _variant }: { variant: AspectRatioVariant }) {
  return (
    <div className="flex flex-wrap items-start gap-4">
      {ratios.map((item) => (
        <Frame key={item.label} label={item.label} ratio={item.ratio} />
      ))}
    </div>
  )
}

export const Default: Story = {
  args: { variant: "default", size: "default", ratio: 1 },
  render: () => <VariantSizes variant="default" />,
}
