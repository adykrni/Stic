import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "./button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

const meta = {
  title: "UI/Tooltip",
  component: TooltipContent,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof TooltipContent>

export default meta
type Story = StoryObj<typeof meta>

function Example({ open, delayDuration }: { open?: boolean; delayDuration?: number }) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip defaultOpen={open}>
        <TooltipTrigger asChild>
          <Button>Hint</Button>
        </TooltipTrigger>
        <TooltipContent>This is a tooltip</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const Default: Story = {
  args: { children: "This is a tooltip" },
  render: () => <Example delayDuration={700} />,
}

export const States: Story = {
  args: { children: "This is a tooltip" },
  render: () => (
    <div className="flex gap-16 pt-16">
      <Example />
      <Example open delayDuration={0} />
    </div>
  ),
}
