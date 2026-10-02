"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Button } from "./button"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const dialogVariants = cva(
  "fixed top-1/2 left-1/2 z-dialog w-full max-w-[425px] -translate-x-1/2 -translate-y-1/2 rounded-10 border border-border bg-background p-6 font-geist shadow-dialog focus:outline-none",
  {
    variants: {
      variant: {
        default: "",
      },
      size: {
        default: "flex flex-col gap-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-slot="dialog-overlay"
    className={cn("fixed inset-0 z-overlay bg-scrim", className)}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
    VariantProps<typeof dialogVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      data-slot="dialog"
      className={cn(dialogVariants({ variant, size }), "relative", className)}
      {...props}
    >
      {children}
      <DialogPrimitive.Close asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          aria-label="Close"
        >
          <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M4 4 12 12M12 4 4 12" strokeLinecap="round" />
          </svg>
        </Button>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="dialog-header" className={cn("flex flex-col gap-1.5 pr-8", className)} {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="dialog-footer" className={cn("flex justify-end gap-2", className)} {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    data-slot="dialog-title"
    className={cn("font-geist text-lg leading-none font-semibold text-foreground", className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    data-slot="dialog-description"
    className={cn("font-geist text-sm leading-5 font-normal text-neutral-500", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  dialogVariants,
}
