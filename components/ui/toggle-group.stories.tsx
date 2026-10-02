import type { Meta, StoryObj } from "@storybook/react-vite"
import { ToggleGroup, ToggleGroupItem, type ToggleGroupProps } from "./toggle-group"

type ToggleGroupVariant = NonNullable<ToggleGroupProps["variant"]>
type ToggleGroupSize = NonNullable<ToggleGroupProps["size"]>

const sizes: ToggleGroupSize[] = ["default", "sm", "lg"]
const items = ["Bold", "Italic", "Underline"] as const

const meta = {
  title: "UI/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

function Group({
  variant,
  size,
  type,
}: {
  variant: ToggleGroupVariant
  size: ToggleGroupSize
  type: "single" | "multiple"
}) {
  return (
    <ToggleGroup type={type} variant={variant} size={size} aria-label="Text style">
      {items.map((item) => (
        <ToggleGroupItem key={item} value={item} aria-label={item}>
          {item}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

function VariantSizes({ variant }: { variant: ToggleGroupVariant }) {
  return (
    <div className="flex flex-col items-start gap-4">
      {sizes.map((size) => (
        <Group key={size} variant={variant} size={size} type="single" />
      ))}
      <Group variant={variant} size="default" type="multiple" />
    </div>
  )
}

export const Default: Story = {
  args: { type: "single", variant: "default", size: "default" },
  render: () => <VariantSizes variant="default" />,
}

export const Outline: Story = {
  args: { type: "single", variant: "outline", size: "default" },
  render: () => <VariantSizes variant="outline" />,
}

export const States: Story = {
  args: { type: "single", variant: "default", size: "default" },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <ToggleGroup type="single" variant={args.variant} size={args.size} aria-label="Default">
        <ToggleGroupItem value="bold">Default</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" variant={args.variant} size={args.size} aria-label="Hover">
        <ToggleGroupItem value="bold" className="bg-neutral-100 text-neutral-500">
          Hover
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        type="single"
        variant={args.variant}
        size={args.size}
        defaultValue="bold"
        aria-label="Pressed"
      >
        <ToggleGroupItem value="bold">Pressed</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" variant={args.variant} size={args.size} aria-label="Disabled">
        <ToggleGroupItem value="bold" disabled>
          Disabled
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" variant={args.variant} size={args.size} aria-label="Focus">
        <ToggleGroupItem value="bold" className="shadow-focus">
          Focus
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
}
