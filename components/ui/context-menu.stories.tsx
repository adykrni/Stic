import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./context-menu"

const meta = {
  title: "UI/Context Menu",
  component: ContextMenuContent,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ContextMenuContent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: null },
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-md items-center justify-center rounded-lg border border-dashed border-border text-sm text-neutral-500">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem>Forward</ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

export const States: Story = {
  args: { children: null },
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-md items-center justify-center rounded-lg border border-dashed border-border text-sm">
        Right click
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Default item</ContextMenuItem>
        <ContextMenuItem disabled>Disabled item</ContextMenuItem>
        <ContextMenuItem className="bg-accent">Highlighted</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

export const AsChild: Story = {
  args: { children: null },
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="rounded-lg border border-border px-4 py-8 text-center text-sm">Trigger as child div</div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Action</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}
