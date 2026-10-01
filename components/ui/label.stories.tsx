import type { Meta, StoryObj } from "@storybook/react-vite"
import { Label, type LabelProps } from "./label"

type LabelVariant = NonNullable<LabelProps["variant"]>

const meta = {
  title: "UI/Label",
  component: Label,
  parameters: {
    layout: "padded",
  },
  args: {
    children: "Email address",
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

function LabelView({ variant, ...args }: LabelProps & { variant: LabelVariant }) {
  return <Label {...args} variant={variant} />
}

export const Default: Story = {
  args: { variant: "default" },
  render: (args) => <LabelView {...args} variant="default" />,
}

export const Required: Story = {
  args: { variant: "required" },
  render: (args) => <LabelView {...args} variant="required" />,
}

export const Disabled: Story = {
  args: { variant: "disabled" },
  render: (args) => <LabelView {...args} variant="disabled" />,
}

export const States: Story = {
  args: { variant: "default" },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Label {...args}>Default</Label>
      <Label {...args} disabled>
        Disabled
      </Label>
    </div>
  ),
}
