import type { Meta, StoryObj } from "@storybook/react-vite"
import type { VariantProps } from "class-variance-authority"
import { Button } from "./button"
import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  popoverVariants,
} from "./popover"

type PopoverVariant = NonNullable<VariantProps<typeof popoverVariants>["variant"]>
type PopoverSize = NonNullable<VariantProps<typeof popoverVariants>["size"]>

const sizes: PopoverSize[] = ["default"]

const meta = {
  title: "UI/Popover",
  component: PopoverContent,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof PopoverContent>

export default meta
type Story = StoryObj<typeof meta>

function VariantSizes({ variant }: { variant: PopoverVariant }) {
  return (
    <div className="flex flex-wrap items-start gap-4">
      {sizes.map((size) => (
        <Popover key={size} defaultOpen>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent variant={variant} size={size} className="w-80">
            <div className="flex flex-col gap-4">
              <p className="font-medium leading-none">Dimensions</p>
              <p className="text-neutral-500">Set the dimensions for the layer.</p>
            </div>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  )
}

export const Default: Story = {
  args: { variant: "default", size: "default", children: null },
  render: () => <VariantSizes variant="default" />,
}

export const States: Story = {
  args: { variant: "default", size: "default", children: null },
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-neutral-500">Default</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Closed</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Popover content</p>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-neutral-500">Open</span>
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <Button variant="outline">Open</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Popover content</p>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-neutral-500">Disabled</span>
        <Button variant="outline" disabled>
          Disabled trigger
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-neutral-500">Focus</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="border-ring shadow-focus">
              Focus
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Popover content</p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  ),
}

export const AsChild: Story = {
  args: { children: null },
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open as child</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverClose asChild>
          <Button variant="ghost" size="sm" className="mt-2">
            Close
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  ),
}

export const WithAnchorAndArrow: Story = {
  args: { children: null },
  render: () => (
    <Popover defaultOpen>
      <PopoverAnchor asChild>
        <div className="h-9 w-40 rounded-lg border border-dashed border-border" />
      </PopoverAnchor>
      <PopoverContent side="bottom" align="start">
        <p>Aligned to anchor</p>
        <PopoverArrow width={12} height={6} />
      </PopoverContent>
    </Popover>
  ),
}
