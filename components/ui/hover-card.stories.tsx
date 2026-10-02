import type { Meta, StoryObj } from "@storybook/react-vite"
import type { VariantProps } from "class-variance-authority"
import { Button } from "./button"
import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
  hoverCardVariants,
} from "./hover-card"

type HoverCardVariant = NonNullable<VariantProps<typeof hoverCardVariants>["variant"]>
type HoverCardSize = NonNullable<VariantProps<typeof hoverCardVariants>["size"]>

const sizes: HoverCardSize[] = ["default"]

const meta = {
  title: "UI/Hover Card",
  component: HoverCardContent,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof HoverCardContent>

export default meta
type Story = StoryObj<typeof meta>

function VariantSizes({ variant }: { variant: HoverCardVariant }) {
  return (
    <div className="flex flex-wrap items-start gap-4">
      {sizes.map((size) => (
        <HoverCard key={size} open>
          <HoverCardTrigger asChild>
            <Button variant="link">@nextjs</Button>
          </HoverCardTrigger>
          <HoverCardContent variant={variant} size={size}>
            <div className="flex flex-col gap-4">
              <p className="font-medium leading-none">Next.js</p>
              <p className="text-neutral-500">The React framework for production.</p>
            </div>
          </HoverCardContent>
        </HoverCard>
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
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <p>Preview copy</p>
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-neutral-500">Open</span>
        <HoverCard open>
          <HoverCardTrigger asChild>
            <Button variant="link">Open</Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <p>Preview copy</p>
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-neutral-500">Focus</span>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="shadow-focus">
              Focus
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <p>Preview copy</p>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  ),
}

export const AsChild: Story = {
  args: { children: null },
  render: () => (
    <HoverCard open>
      <HoverCardTrigger asChild>
        <a href="#" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
          Documentation
        </a>
      </HoverCardTrigger>
      <HoverCardContent>
        <p>Opens from a link trigger via Slot.</p>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const WithDelays: Story = {
  args: { children: null },
  render: () => (
    <HoverCard openDelay={200} closeDelay={100} open>
      <HoverCardTrigger asChild>
        <Button variant="outline">Custom delays</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p>openDelay 200ms, closeDelay 100ms</p>
        <HoverCardArrow width={12} height={6} />
      </HoverCardContent>
    </HoverCard>
  ),
}
