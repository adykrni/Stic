import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "./button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  type SheetSide,
} from "./sheet"

const meta = {
  title: "UI/Sheet",
  component: SheetContent,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof SheetContent>

export default meta
type Story = StoryObj<typeof meta>

function SheetExample({ side = "right", open }: { side?: SheetSide; open?: boolean }) {
  return (
    <Sheet defaultOpen={open}>
      <SheetTrigger asChild>
        <Button>Open sheet</Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>Supporting copy for the sheet panel.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export const Right: Story = {
  args: { children: null },
  render: () => <SheetExample side="right" />,
}

export const Left: Story = {
  args: { children: null },
  render: () => <SheetExample side="left" />,
}

export const Top: Story = {
  args: { children: null },
  render: () => <SheetExample side="top" />,
}

export const Bottom: Story = {
  args: { children: null },
  render: () => <SheetExample side="bottom" />,
}

export const States: Story = {
  args: { children: null },
  render: () => <SheetExample side="right" open />,
}

export const AsChild: Story = {
  args: { children: null },
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <a href="#sheet">Open sheet link</a>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>Trigger is an anchor via `asChild`.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}
