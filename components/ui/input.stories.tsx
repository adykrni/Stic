import type { Meta, StoryObj } from "@storybook/react-vite"
import { Input, type InputProps } from "./input"

type InputVariant = NonNullable<InputProps["variant"]>
type InputType = "text" | "email" | "password" | "number"

const types: InputType[] = ["text", "email", "password", "number"]

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "padded",
  },
  args: {
    placeholder: "Email address",
    "aria-label": "Email address",
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

function InputView({ variant, ...args }: InputProps & { variant: InputVariant }) {
  return (
    <div className="grid w-64 gap-3">
      {types.map((type) => (
        <Input key={type} {...args} variant={variant} type={type} aria-label={type} placeholder={type} />
      ))}
    </div>
  )
}

export const Default: Story = {
  args: { variant: "default" },
  render: (args) => <InputView {...args} variant="default" />,
}

export const Error: Story = {
  args: { variant: "error" },
  render: (args) => <InputView {...args} variant="error" />,
}

export const States: Story = {
  args: { variant: "default" },
  render: (args) => (
    <div className="grid w-64 gap-3">
      <Input {...args} aria-label="Default" placeholder="Default" />
      <Input {...args} aria-label="Focus" placeholder="Focus" className="border-ring shadow-focus" />
      <Input {...args} aria-label="Disabled" placeholder="Disabled" disabled />
      <Input {...args} variant="error" aria-label="Error" placeholder="Error" />
    </div>
  ),
}
