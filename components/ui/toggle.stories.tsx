import type { Meta, StoryObj } from "@storybook/react-vite"
import { Toggle, type ToggleProps } from "./toggle"

type ToggleVariant = NonNullable<ToggleProps["variant"]>
type ToggleSize = NonNullable<ToggleProps["size"]>

const sizes: ToggleSize[] = ["default", "sm", "lg"]

const meta = {
  title: "UI/Toggle",
  component: Toggle,
  parameters: {
    layout: "padded",
  },
  args: {
    children: "Bold",
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

function VariantSizes({
  variant,
  children,
}: ToggleProps & { variant: ToggleVariant }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {sizes.map((size) => (
        <Toggle key={size} variant={variant} size={size}>
          {children}
        </Toggle>
      ))}
    </div>
  )
}

export const Default: Story = {
  args: { variant: "default" },
  render: (args) => <VariantSizes {...args} variant="default" />,
}

export const Outline: Story = {
  args: { variant: "outline" },
  render: (args) => <VariantSizes {...args} variant="outline" />,
}

export const States: Story = {
  args: { variant: "default", size: "default" },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Toggle {...args}>Default</Toggle>
      <Toggle {...args} className="bg-neutral-100 text-neutral-500">
        Hover
      </Toggle>
      <Toggle {...args} pressed onPressedChange={() => {}}>
        Pressed
      </Toggle>
      <Toggle {...args} disabled>
        Disabled
      </Toggle>
      <Toggle {...args} className="shadow-focus">
        Focus
      </Toggle>
    </div>
  ),
}

export const AsChild: Story = {
  args: { asChild: true },
  render: ({ children: _children, ...args }) => (
    <Toggle {...args}>
      <a href="#bold">Bold</a>
    </Toggle>
  ),
}
