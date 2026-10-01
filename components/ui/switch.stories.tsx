import type { Meta, StoryObj } from "@storybook/react-vite"
import { Switch, type SwitchProps } from "./switch"

type SwitchVariant = NonNullable<SwitchProps["variant"]>
type SwitchSize = NonNullable<SwitchProps["size"]>

const sizes: SwitchSize[] = ["default"]

const meta = {
  title: "UI/Switch",
  component: Switch,
  parameters: {
    layout: "padded",
  },
  args: {
    "aria-label": "Switch",
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

function VariantSizes({
  variant,
}: SwitchProps & { variant: SwitchVariant }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {sizes.map((size) => (
        <Switch key={size} variant={variant} size={size} aria-label={size} />
      ))}
    </div>
  )
}

export const Default: Story = {
  args: { variant: "default", size: "default" },
  render: (args) => <VariantSizes {...args} variant="default" />,
}

export const States: Story = {
  args: { variant: "default", size: "default" },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Switch {...args} aria-label="Off" />
      <Switch {...args} aria-label="On" checked onCheckedChange={() => {}} />
      <Switch {...args} aria-label="Disabled" disabled />
      <Switch {...args} aria-label="Focus" className="border-ring shadow-focus" />
    </div>
  ),
}
