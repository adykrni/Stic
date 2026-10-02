import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./menubar"

const meta = {
  title: "UI/Menubar",
  component: Menubar,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Menubar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New Tab</MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}

export const States: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="bg-accent">Open menu</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Item</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}

export const AsChild: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger asChild>
          <button type="button">Custom trigger</button>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Item</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}
