"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Button, type ButtonProps } from "./button"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselConfig = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselConfig &
  VariantProps<typeof carouselVariants>

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

const carouselVariants = cva("relative font-geist", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      default: "",
      sm: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

const carouselItemVariants = cva("min-w-0 shrink-0 grow-0 pl-1 pr-1", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      sm: "basis-full",
      default: "basis-1/2",
      lg: "basis-1/3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

const carouselSlideVariants = cva(
  "overflow-hidden rounded-14 border border-border bg-background shadow-sm",
  {
    variants: {
      variant: {
        default: "",
      },
      size: {
        default: "",
        sm: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Chevron({ direction }: { direction: "left" | "right" | "up" | "down" }) {
  const rotation =
    direction === "up"
      ? "-rotate-90"
      : direction === "down"
        ? "rotate-90"
        : ""

  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("size-4", rotation)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === "right" ? (
        <path d="M6 4l4 4-4 4" />
      ) : (
        <path d="M10 4 6 8l4 4" />
      )}
    </svg>
  )
}

export interface CarouselProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CarouselConfig,
    VariantProps<typeof carouselVariants> {}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      variant,
      size,
      ...props
    },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((carouselApi: CarouselApi) => {
      if (!carouselApi) return
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
    }, [])

    React.useEffect(() => {
      if (!api) return
      setApi?.(api)
      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)
      return () => {
        api.off("reInit", onSelect)
        api.off("select", onSelect)
      }
    }, [api, onSelect, setApi])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation,
          scrollPrev: () => api?.scrollPrev(),
          scrollNext: () => api?.scrollNext(),
          canScrollPrev,
          canScrollNext,
          variant,
          size,
        }}
      >
        <div
          ref={ref}
          data-slot="carousel"
          role="region"
          aria-roledescription="carousel"
          {...props}
          className={cn(carouselVariants({ variant, size }), className)}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  },
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} data-slot="carousel-viewport" className="overflow-hidden">
      <div
        ref={ref}
        data-slot="carousel-content"
        {...props}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-1" : "-mt-1 flex-col",
          className,
        )}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

export interface CarouselItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof carouselItemVariants> {}

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, variant, size, ...props }, ref) => {
    const context = useCarousel()

    return (
      <div
        ref={ref}
        data-slot="carousel-item"
        role="group"
        aria-roledescription="slide"
        {...props}
        className={cn(
          carouselItemVariants({
            variant: variant ?? context.variant,
            size: size ?? context.size,
          }),
          className,
        )}
      />
    )
  },
)
CarouselItem.displayName = "CarouselItem"

export interface CarouselSlideProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof carouselSlideVariants> {}

const CarouselSlide = React.forwardRef<HTMLDivElement, CarouselSlideProps>(
  ({ className, variant, size, ...props }, ref) => {
    const context = useCarousel()

    return (
      <div
        ref={ref}
        data-slot="carousel-slide"
        {...props}
        className={cn(
          carouselSlideVariants({
            variant: variant ?? context.variant,
            size: size ?? context.size,
          }),
          className,
        )}
      />
    )
  },
)
CarouselSlide.displayName = "CarouselSlide"

const CarouselPrevious = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "outline", size = "icon", asChild, ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel()
    const chevron =
      orientation === "horizontal" ? "left" : ("up" as const)

    return (
      <Button
        ref={ref}
        data-slot="carousel-previous"
        variant={variant}
        size={size}
        asChild={asChild}
        disabled={!canScrollPrev}
        aria-label="Previous slide"
        {...props}
        className={cn(
          "absolute size-8 shrink-0 rounded-full p-2.5 shadow-button",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2",
          className,
        )}
        onClick={(event) => {
          scrollPrev()
          props.onClick?.(event)
        }}
      >
        <Chevron direction={chevron} />
      </Button>
    )
  },
)
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "outline", size = "icon", asChild, ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel()
    const chevron =
      orientation === "horizontal" ? "right" : ("down" as const)

    return (
      <Button
        ref={ref}
        data-slot="carousel-next"
        variant={variant}
        size={size}
        asChild={asChild}
        disabled={!canScrollNext}
        aria-label="Next slide"
        {...props}
        className={cn(
          "absolute size-8 shrink-0 rounded-full p-2.5 shadow-button",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2",
          className,
        )}
        onClick={(event) => {
          scrollNext()
          props.onClick?.(event)
        }}
      >
        <Chevron direction={chevron} />
      </Button>
    )
  },
)
CarouselNext.displayName = "CarouselNext"

const CarouselDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      data-slot="carousel-description"
      {...props}
      className={cn("py-2 text-sm leading-5 text-neutral-500", className)}
    />
  )
})
CarouselDescription.displayName = "CarouselDescription"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselSlide,
  CarouselPrevious,
  CarouselNext,
  CarouselDescription,
  carouselVariants,
  type CarouselApi,
}
