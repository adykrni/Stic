import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  type InputOTPProps,
} from "./input-otp"

type InputOtpVariant = NonNullable<InputOTPProps["variant"]>
type InputOtpSize = NonNullable<InputOTPProps["size"]>

const sizes: InputOtpSize[] = ["default", "sm", "lg"]

const meta = {
  title: "UI/Input OTP",
  component: InputOTP,
  parameters: {
    layout: "padded",
  },
  args: {
    maxLength: 6,
    "aria-label": "One-time passcode",
  },
} satisfies Meta<typeof InputOTP>

export default meta
type Story = StoryObj<typeof meta>

function SixDigitOtp({
  variant,
  size,
  value: initial = "",
  ...args
}: InputOTPProps & { variant: InputOtpVariant }) {
  const [value, setValue] = React.useState(initial)
  return (
    <InputOTP {...args} variant={variant} size={size} value={value} onChange={setValue}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}

function VariantSizes({
  variant,
  ...args
}: InputOTPProps & { variant: InputOtpVariant }) {
  return (
    <div className="flex flex-col gap-6">
      {sizes.map((size) => (
        <SixDigitOtp key={size} {...args} variant={variant} size={size} />
      ))}
    </div>
  )
}

export const Default: Story = {
  args: { variant: "default" },
  render: (args) => <VariantSizes {...args} variant="default" />,
}

export const Error: Story = {
  args: { variant: "error" },
  render: (args) => <VariantSizes {...args} variant="error" value="123456" />,
}

export const States: Story = {
  args: { variant: "default", size: "default" },
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-geist text-sm text-neutral-500">Default</p>
        <SixDigitOtp {...args} variant="default" value="12" />
      </div>
      <div>
        <p className="mb-2 font-geist text-sm text-neutral-500">Focus</p>
        <InputOTP {...args} maxLength={6} value="12" aria-label="Focus example">
          <InputOTPGroup>
            <InputOTPSlot index={0} data-active className="border-ring shadow-focus" />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div>
        <p className="mb-2 font-geist text-sm text-neutral-500">Filled</p>
        <SixDigitOtp {...args} variant="default" value="123456" />
      </div>
      <div>
        <p className="mb-2 font-geist text-sm text-neutral-500">Disabled</p>
        <InputOTP {...args} disabled maxLength={6} value="123456">
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div>
        <p className="mb-2 font-geist text-sm text-neutral-500">Error</p>
        <SixDigitOtp {...args} variant="error" value="123456" />
      </div>
    </div>
  ),
}
