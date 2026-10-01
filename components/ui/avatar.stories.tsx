import type { Meta, StoryObj } from "@storybook/react-vite"
import { Avatar, type AvatarProps } from "./avatar"

type AvatarSize = NonNullable<AvatarProps["size"]>

const sizes: AvatarSize[] = ["xxs", "xs", "sm", "md", "lg"]

const portrait =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#3C3D58"/><circle cx="32" cy="24" r="10" fill="#F7F8FB"/><ellipse cx="32" cy="54" rx="18" ry="14" fill="#F7F8FB"/></svg>`,
  )

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "padded",
  },
  args: {
    alt: "Amina Kade",
    fallback: "AK",
    src: portrait,
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Xxs: Story = {
  args: { size: "xxs" },
}

export const Xs: Story = {
  args: { size: "xs" },
}

export const Sm: Story = {
  args: { size: "sm" },
}

export const Md: Story = {
  args: { size: "md" },
}

export const Lg: Story = {
  args: { size: "lg" },
}

export const States: Story = {
  args: { size: "md" },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {sizes.map((size) => (
        <Avatar key={`image-${size}`} {...args} size={size} />
      ))}
      {sizes.map((size) => (
        <Avatar key={`fallback-${size}`} {...args} size={size} src={undefined} />
      ))}
    </div>
  ),
}
