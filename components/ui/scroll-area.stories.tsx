import type { Meta, StoryObj } from "@storybook/react-vite"
import { ScrollArea } from "./scroll-area"

const meta = {
  title: "UI/Scroll Area",
  component: ScrollArea,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

const tags = Array.from({ length: 30 }, (_, i) => `Tag ${i + 1}`)

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-48 w-48 rounded-lg border border-border p-4">
      <div className="flex flex-col gap-2">
        {tags.map((tag) => (
          <div key={tag} className="text-sm leading-5">
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const States: Story = {
  render: () => (
    <ScrollArea className="h-48 w-48 rounded-lg border border-border p-4">
      <div className="flex flex-col gap-2">
        {tags.slice(0, 10).map((tag) => (
          <div key={tag} className="text-sm leading-5">
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}
