import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "./button"
import {
  Toast,
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast"

const meta = {
  title: "UI/Toast",
  component: Toast,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

function Notice({
  variant,
  duration,
}: {
  variant?: "default" | "destructive" | "success"
  duration?: number
}) {
  return (
    <ToastProvider duration={duration}>
      <Toast open variant={variant}>
        <ToastTitle>Title Text</ToastTitle>
        <ToastDescription>This is a toast description.</ToastDescription>
        <ToastAction asChild altText="Undo">
          <Button size="sm">Undo</Button>
        </ToastAction>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}

export const Default: Story = {
  args: { children: null },
  render: () => <Notice duration={5000} />,
}

export const Destructive: Story = {
  args: { children: null },
  render: () => <Notice variant="destructive" duration={5000} />,
}

export const Success: Story = {
  args: { children: null },
  render: () => <Notice variant="success" duration={5000} />,
}
