import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps,
} from "./card"

type CardVariant = NonNullable<CardProps["variant"]>
type CardSize = NonNullable<CardProps["size"]>

const sizes: CardSize[] = ["default"]

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

function VariantSizes({
  variant,
}: CardProps & { variant: CardVariant }) {
  return (
    <div className="flex flex-wrap items-start gap-4">
      {sizes.map((size) => (
        <Card key={size} variant={variant} size={size} className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Title Text</CardTitle>
            <CardDescription>This is a card description.</CardDescription>
          </CardHeader>
          <CardContent>Card content</CardContent>
          <CardFooter>Card footer</CardFooter>
        </Card>
      ))}
    </div>
  )
}

export const Default: Story = {
  args: { variant: "default", size: "default" },
  render: (args) => <VariantSizes {...args} variant="default" />,
}
