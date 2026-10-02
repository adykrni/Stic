import type { Meta, StoryObj } from "@storybook/react-vite"
import type { VariantProps } from "class-variance-authority"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  collapsibleVariants,
} from "./collapsible"

type CollapsibleVariant = NonNullable<VariantProps<typeof collapsibleVariants>["variant"]>
type CollapsibleSize = NonNullable<VariantProps<typeof collapsibleVariants>["size"]>

const sizes: CollapsibleSize[] = ["default"]

const meta = {
  title: "UI/Collapsible",
  component: Collapsible,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

function Panel({ variant }: { variant: CollapsibleVariant }) {
  return (
    <Collapsible defaultOpen className="w-full max-w-sm">
      <CollapsibleTrigger>@peduarte starred 3 repositories</CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-2 pt-2">
        {["@radix-ui/primitives", "@radix-ui/colors", "@radix-ui/react"].map((repo) => (
          <div
            key={repo}
            className="rounded-lg px-4 py-2 text-sm leading-5 text-foreground"
          >
            {repo}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

export const Default: Story = {
  args: {},
  render: () => (
    <div className="flex flex-wrap gap-4">
      {sizes.map((size) => (
        <Panel key={size} variant="default" />
      ))}
    </div>
  ),
}

export const States: Story = {
  args: {},
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Collapsible>
        <CollapsibleTrigger>Closed</CollapsibleTrigger>
        <CollapsibleContent className="px-4 py-2 text-sm">Hidden content</CollapsibleContent>
      </Collapsible>
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Open</CollapsibleTrigger>
        <CollapsibleContent className="px-4 py-2 text-sm">Visible content</CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger className="bg-neutral-100">Hover</CollapsibleTrigger>
        <CollapsibleContent className="px-4 py-2 text-sm">Content</CollapsibleContent>
      </Collapsible>
      <Collapsible disabled>
        <CollapsibleTrigger disabled>Disabled</CollapsibleTrigger>
        <CollapsibleContent className="px-4 py-2 text-sm">Content</CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger className="border-ring shadow-focus">Focus</CollapsibleTrigger>
        <CollapsibleContent className="px-4 py-2 text-sm">Content</CollapsibleContent>
      </Collapsible>
    </div>
  ),
}

export const AsChild: Story = {
  args: {},
  render: () => (
    <Collapsible className="max-w-sm">
      <CollapsibleTrigger asChild>
        <button type="button" className="w-full text-left">
          Custom trigger element
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 py-2 text-sm">Slot merged onto a native button.</CollapsibleContent>
    </Collapsible>
  ),
}
