import type { Meta, StoryObj } from "@storybook/react-vite"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

const meta = {
  title: "UI/Tabs",
  component: TabsTrigger,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof TabsTrigger>

export default meta
type Story = StoryObj<typeof meta>

function Example({
  activationMode = "automatic",
  disabled,
}: {
  activationMode?: "automatic" | "manual"
  disabled?: boolean
}) {
  return (
    <Tabs defaultValue="account" activationMode={activationMode}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="disabled" disabled={disabled}>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account details</TabsContent>
      <TabsContent value="password">Password details</TabsContent>
      <TabsContent value="disabled">Disabled details</TabsContent>
    </Tabs>
  )
}

export const Default: Story = {
  args: { value: "account", children: "Account" },
  render: () => <Example />,
}

export const Manual: Story = {
  args: { value: "account", children: "Account" },
  render: () => <Example activationMode="manual" />,
}

export const States: Story = {
  args: { value: "account", children: "Account" },
  render: () => (
    <Tabs defaultValue="active">
      <TabsList>
        <TabsTrigger value="rest">Default</TabsTrigger>
        <TabsTrigger value="hover">Hover</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="focus" className="border-ring shadow-focus">
          Focus
        </TabsTrigger>
        <TabsTrigger value="off" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="rest">Default panel</TabsContent>
      <TabsContent value="hover">Hover panel</TabsContent>
      <TabsContent value="active">Active panel</TabsContent>
      <TabsContent value="focus">Focus panel</TabsContent>
      <TabsContent value="off">Disabled panel</TabsContent>
    </Tabs>
  ),
}
