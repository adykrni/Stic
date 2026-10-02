"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Button } from "./button"
import { Divider } from "./divider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const SIDEBAR_WIDTH = "17.4375rem"
const SIDEBAR_WIDTH_ICON = "3rem"

type SidebarContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider.")
  }
  return context
}

export interface SidebarProviderProps extends React.ComponentProps<"div"> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const open = openProp ?? uncontrolledOpen

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const next = typeof value === "function" ? value(open) : value
      if (openProp === undefined) {
        setUncontrolledOpen(next)
      }
      onOpenChange?.(next)
    },
    [onOpenChange, open, openProp],
  )

  const toggleSidebar = React.useCallback(() => {
    setOpen((current) => !current)
  }, [setOpen])

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggleSidebar }}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn("flex min-h-0 w-full", className)}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

const sidebarVariants = cva(
  "flex h-full shrink-0 flex-col border-r border-border bg-background font-geist text-foreground transition-[width] duration-200 ease-linear",
  {
    variants: {
      variant: {
        default: "",
      },
      size: {
        default: "w-[var(--sidebar-width)]",
        icon: "w-[var(--sidebar-width-icon)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface SidebarProps
  extends React.ComponentProps<"aside">,
    VariantProps<typeof sidebarVariants> {}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, variant, size, ...props }, ref) => {
    const { open } = useSidebar()
    return (
      <aside
        ref={ref}
        data-slot="sidebar"
        data-state={open ? "expanded" : "collapsed"}
        className={cn(
          sidebarVariants({ variant, size: open ? "default" : "icon" }),
          "group/sidebar",
          className,
        )}
        {...props}
      />
    )
  },
)
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()
  return (
    <Button
      ref={ref}
      data-slot="sidebar-trigger"
      type="button"
      variant="ghost"
      size="icon"
      className={className}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      aria-label="Toggle sidebar"
      {...props}
    >
      <svg
        viewBox="0 0 16 16"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M2 4h12M2 8h12M2 12h12" />
      </svg>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarInset = ({ className, ...props }: React.ComponentProps<"main">) => (
  <main
    data-slot="sidebar-inset"
    className={cn("flex min-h-0 flex-1 flex-col bg-background", className)}
    {...props}
  />
)
SidebarInset.displayName = "SidebarInset"

const SidebarHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="sidebar-header"
    className={cn("flex flex-col gap-2 p-2", className)}
    {...props}
  />
)
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="sidebar-footer"
    className={cn("flex flex-col gap-2 p-2", className)}
    {...props}
  />
)
SidebarFooter.displayName = "SidebarFooter"

const SidebarContent = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="sidebar-content"
    className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2", className)}
    {...props}
  />
)
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="sidebar-group" className={cn("flex w-full flex-col gap-1", className)} {...props} />
)
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = ({ className, ...props }: React.ComponentProps<"div">) => {
  const { open } = useSidebar()
  if (!open) {
    return null
  }
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        "px-2 py-1.5 font-geist text-xs font-medium leading-4 text-neutral-500",
        className,
      )}
      {...props}
    />
  )
}
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarMenu = ({ className, ...props }: React.ComponentProps<"ul">) => (
  <ul
    data-slot="sidebar-menu"
    className={cn("flex w-full flex-col gap-1", className)}
    {...props}
  />
)
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = ({ className, ...props }: React.ComponentProps<"li">) => (
  <li data-slot="sidebar-menu-item" className={cn("group/menu-item relative", className)} {...props} />
)
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva("", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      default: "h-10 w-full justify-start gap-2 px-2",
      icon: "size-8 justify-center px-0",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface SidebarMenuButtonProps
  extends React.ComponentProps<typeof Button> {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string
}

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  (
    {
      asChild = false,
      isActive = false,
      tooltip,
      className,
      variant = "ghost",
      size,
      children,
      ...props
    },
    ref,
  ) => {
    const { open } = useSidebar()
    const Comp = asChild ? Slot : Button
    const buttonSize = open ? size ?? "default" : "icon"

    const button = (
      <Comp
        ref={ref}
        data-slot="sidebar-menu-button"
        data-active={isActive ? "" : undefined}
        variant={variant}
        size={buttonSize}
        className={cn(
          sidebarMenuButtonVariants({ size: open ? "default" : "icon" }),
          !open && "size-8",
          isActive
            ? "bg-accent text-primary hover:bg-accent hover:text-primary"
            : "text-neutral-500 hover:text-primary",
          !open && "[&_span]:hidden",
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    )

    if (!open && tooltip) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="right">{tooltip}</TooltipContent>
        </Tooltip>
      )
    }

    return button
  },
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarSeparator = ({ className, ...props }: React.ComponentProps<typeof Divider>) => (
  <Divider
    data-slot="sidebar-separator"
    variant="horizontal"
    className={cn("mx-2", className)}
    {...props}
  />
)
SidebarSeparator.displayName = "SidebarSeparator"

export {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  useSidebar,
  sidebarVariants,
  sidebarMenuButtonVariants,
}
