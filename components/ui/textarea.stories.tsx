import type { Meta, StoryObj } from "@storybook/react-vite"
import { Textarea, type TextareaProps } from "./textarea"

type TextareaVariant = NonNullable<TextareaProps["variant"]>

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "padded",
  },
  args: {
    placeholder: "Project brief",
    "aria-label": "Project brief",
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

function TextareaView({
  variant,
  ...args
}: TextareaProps & { variant: TextareaVariant }) {
  return (
    <div className="w-64">
      <Textarea {...args} variant={variant} />
    </div>
  )
}

export const Default: Story = {
  args: { variant: "default" },
  render: (args) => <TextareaView {...args} variant="default" />,
}

export const Error: Story = {
  args: { variant: "error" },
  render: (args) => <TextareaView {...args} variant="error" />,
}

export const States: Story = {
  args: { variant: "default" },
  render: (args) => (
    <div className="grid w-64 gap-3">
      <Textarea {...args} aria-label="Default" placeholder="Default" />
      <Textarea {...args} aria-label="Focus" placeholder="Focus" className="border-ring" />
      <Textarea {...args} aria-label="Disabled" placeholder="Disabled" disabled />
      <Textarea {...args} variant="error" aria-label="Error" placeholder="Error" />
    </div>
  ),
}
