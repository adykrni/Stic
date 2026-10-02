"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const breadcrumbVariants = cva(
  "flex flex-wrap items-center font-geist text-sm font-normal leading-5",
  {
    variants: {
      variant: {
        default: "",
      },
      size: {
        default: "gap-2.5",
        sm: "gap-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const breadcrumbLinkClass =
  "inline-flex items-center rounded-xs border border-transparent text-neutral-500 hover:text-foreground focus-visible:border-ash focus-visible:outline-none"

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        data-slot="breadcrumb"
        aria-label="Breadcrumb"
        {...props}
        className={cn(className)}
      />
    )
  },
)
Breadcrumb.displayName = "Breadcrumb"

export interface BreadcrumbListProps
  extends React.HTMLAttributes<HTMLOListElement>,
    VariantProps<typeof breadcrumbVariants> {}

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <ol
        ref={ref}
        data-slot="breadcrumb-list"
        {...props}
        className={cn(breadcrumbVariants({ variant, size }), className)}
      />
    )
  },
)
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => {
  return (
    <li
      ref={ref}
      data-slot="breadcrumb-item"
      {...props}
      className={cn("inline-flex items-center", className)}
    />
  )
})
BreadcrumbItem.displayName = "BreadcrumbItem"

export interface BreadcrumbLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
}

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "a"

    return (
      <Comp
        ref={ref}
        data-slot="breadcrumb-link"
        {...props}
        className={cn(breadcrumbLinkClass, className)}
      />
    )
  },
)
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      data-slot="breadcrumb-page"
      aria-current="page"
      {...props}
      className={cn("text-foreground", className)}
    />
  )
})
BreadcrumbPage.displayName = "BreadcrumbPage"

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 15 15"
      className="size-15 text-neutral-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5.6 3.75 9.35 7.5 5.6 11.25" />
    </svg>
  )
}

const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, children, ...props }, ref) => {
  return (
    <li
      ref={ref}
      data-slot="breadcrumb-separator"
      aria-hidden="true"
      {...props}
      className={cn("inline-flex items-center", className)}
    >
      {children ?? <ChevronRight />}
    </li>
  )
})
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      data-slot="breadcrumb-ellipsis"
      role="img"
      aria-label="More"
      {...props}
      className={cn(
        "inline-flex size-9 items-center justify-center text-neutral-500",
        className,
      )}
    >
      <span aria-hidden="true">...</span>
    </span>
  )
})
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  breadcrumbVariants,
}
