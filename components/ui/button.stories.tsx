import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button, type ButtonProps } from "./button"

type ButtonVariant = NonNullable<ButtonProps["variant"]>
type ButtonSize = NonNullable<ButtonProps["size"]>

const sizes: ButtonSize[] = ["default", "sm", "lg", "icon"]

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "padded",
  },
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

function VariantSizes({
  variant,
  children: _children,
  ...args
}: ButtonProps & { variant: ButtonVariant }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {sizes.map((size) => (
        <Button key={size} {...args} variant={variant} size={size} aria-label={size}>
          {size === "icon" ? "+" : "Button"}
        </Button>
      ))}
    </div>
  )
}

export const Default: Story = {
  args: { variant: "default" },
  render: (args) => <VariantSizes {...args} variant="default" />,
}

export const Destructive: Story = {
  args: { variant: "destructive" },
  render: (args) => <VariantSizes {...args} variant="destructive" />,
}

export const Outline: Story = {
  args: { variant: "outline" },
  render: (args) => <VariantSizes {...args} variant="outline" />,
}

export const Secondary: Story = {
  args: { variant: "secondary" },
  render: (args) => <VariantSizes {...args} variant="secondary" />,
}

export const Ghost: Story = {
  args: { variant: "ghost" },
  render: (args) => <VariantSizes {...args} variant="ghost" />,
}

export const Link: Story = {
  args: { variant: "link" },
  render: (args) => <VariantSizes {...args} variant="link" />,
}

export const States: Story = {
  args: { variant: "default", size: "default" },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button {...args}>Default</Button>
      <Button {...args} className="overlay-white-10">
        Hover
      </Button>
      <Button {...args} className="opacity-60">
        Active
      </Button>
      <Button {...args} disabled>
        Disabled
      </Button>
      <Button {...args} loading>
        Loading
      </Button>
    </div>
  ),
}

export const AsChild: Story = {
  args: { variant: "default", asChild: true },
  render: ({ children: _children, ...args }) => (
    <Button {...args} asChild>
      <a href="#composition">Open link</a>
    </Button>
  ),
}
