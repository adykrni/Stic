import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "./button"
import {
  Drawer,
  DrawerClose,
  DrawerCloseButton,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer"

const meta = {
  title: "UI/Drawer",
  component: DrawerContent,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof DrawerContent>

export default meta
type Story = StoryObj<typeof meta>

function DrawerExample({ open }: { open?: boolean }) {
  return (
    <Drawer defaultOpen={open}>
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer title</DrawerTitle>
          <DrawerDescription>Drag the handle or tap outside to dismiss.</DrawerDescription>
        </DrawerHeader>
        <div className="px-6 py-2 text-sm text-foreground">
          Example body content. Try dragging down on the handle.
        </div>
        <DrawerFooter>
          <DrawerCloseButton>Done</DrawerCloseButton>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export const Default: Story = {
  args: { children: null },
  render: () => <DrawerExample />,
}

export const States: Story = {
  args: { children: null },
  render: () => <DrawerExample open />,
}

export const AsChild: Story = {
  args: { children: null },
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <a href="#drawer">Open drawer link</a>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer title</DrawerTitle>
          <DrawerDescription>Trigger is an anchor via `asChild`.</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  ),
}
