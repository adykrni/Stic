import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { AspectRatio } from "./aspect-ratio"
import {
  Carousel,
  CarouselContent,
  CarouselDescription,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselSlide,
  type CarouselApi,
  type CarouselProps,
} from "./carousel"
import { Button } from "./button"

type CarouselSize = NonNullable<CarouselProps["size"]>

const sizes: CarouselSize[] = ["sm", "default", "lg"]

const meta = {
  title: "UI/Carousel",
  component: Carousel,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

const slides = [
  { title: "One", tone: "bg-secondary" },
  { title: "Two", tone: "bg-accent" },
  { title: "Three", tone: "bg-neutral-100" },
  { title: "Four", tone: "bg-secondary" },
  { title: "Five", tone: "bg-accent" },
]

function SlideExample({ size }: { size: CarouselSize }) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <Carousel setApi={setApi} size={size} className="mx-12 w-full max-w-sm">
      <CarouselContent className="gap-4">
        {slides.map((slide) => (
          <CarouselItem key={slide.title}>
            <CarouselSlide>
              <AspectRatio ratio={1}>
                <div
                  className={`flex size-full items-center justify-center font-medium ${slide.tone}`}
                >
                  {slide.title}
                </div>
              </AspectRatio>
            </CarouselSlide>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDescription>
        Slide {current} of {count}
      </CarouselDescription>
    </Carousel>
  )
}

function VariantSizes({
  variant,
  ...args
}: CarouselProps & { variant: NonNullable<CarouselProps["variant"]> }) {
  return (
    <div className="flex flex-col gap-10">
      {sizes.map((size) => (
        <SlideExample key={size} size={size} />
      ))}
    </div>
  )
}

export const Default: Story = {
  args: { variant: "default", size: "default" },
  render: (args) => <VariantSizes {...args} variant="default" />,
}

export const States: Story = {
  render: () => (
    <div className="mx-12 flex max-w-sm flex-wrap items-center gap-4">
      <Button variant="outline" size="icon" className="size-8 rounded-full p-2.5 shadow-button">
        Prev
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="size-8 rounded-full bg-neutral-100 p-2.5 shadow-button"
      >
        Hover
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="size-8 rounded-full p-2.5 opacity-60 shadow-button"
      >
        Active
      </Button>
      <Button variant="outline" size="icon" className="size-8 rounded-full p-2.5 shadow-button" disabled>
        Disabled
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="size-8 rounded-full border-ring p-2.5 shadow-focus"
      >
        Focus
      </Button>
    </div>
  ),
}

export const AsChild: Story = {
  render: () => (
    <Carousel className="mx-12 w-full max-w-sm">
      <CarouselContent className="gap-4">
        {slides.slice(0, 3).map((slide) => (
          <CarouselItem key={slide.title}>
            <CarouselSlide>
              <AspectRatio ratio={1}>
                <div
                  className={`flex size-full items-center justify-center font-medium ${slide.tone}`}
                >
                  {slide.title}
                </div>
              </AspectRatio>
            </CarouselSlide>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious asChild>
        <button type="button">Previous slide</button>
      </CarouselPrevious>
      <CarouselNext />
    </Carousel>
  ),
}
