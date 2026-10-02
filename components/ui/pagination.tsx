"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Button, type ButtonProps } from "./button"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const paginationVariants = cva("flex items-center", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      default: "gap-1",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <path d="M10 4 6 8l4 4" />
      ) : (
        <path d="M6 4l4 4-4 4" />
      )}
    </svg>
  )
}

export interface PaginationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof paginationVariants> {}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        data-slot="pagination"
        aria-label="Pagination"
        {...props}
        className={cn(paginationVariants({ variant, size }), className)}
      />
    )
  },
)
Pagination.displayName = "Pagination"

const PaginationItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="pagination-item"
      {...props}
      className={cn("inline-flex", className)}
    />
  )
})
PaginationItem.displayName = "PaginationItem"

export interface PaginationLinkProps extends ButtonProps {
  isActive?: boolean
}

const PaginationLink = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ className, isActive = false, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        data-slot="pagination-link"
        variant={isActive ? "outline" : "ghost"}
        size="icon"
        aria-current={isActive ? "page" : undefined}
        {...props}
        className={className}
      />
    )
  },
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        data-slot="pagination-previous"
        variant="ghost"
        size="default"
        {...props}
        className={className}
      >
        <Chevron direction="left" />
        {children ?? "Previous"}
      </Button>
    )
  },
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        data-slot="pagination-next"
        variant="ghost"
        size="default"
        {...props}
        className={className}
      >
        {children ?? "Next"}
        <Chevron direction="right" />
      </Button>
    )
  },
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      data-slot="pagination-ellipsis"
      role="img"
      aria-label="More pages"
      {...props}
      className={cn(
        "inline-flex size-9 items-center justify-center text-sm text-foreground",
        className,
      )}
    >
      <span aria-hidden="true">...</span>
    </span>
  )
})
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  paginationVariants,
}
