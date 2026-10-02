"use client"

import * as React from "react"
import * as ToastPrimitive from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Button } from "./button"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const toastVariants = cva(
  "flex w-full max-w-[336px] items-center gap-2 rounded-lg border bg-background p-4 font-geist shadow-toast focus-visible:border-transparent focus-visible:shadow-toast-focus focus-visible:outline-none",
  {
    variants: {
      variant: {
        default: "border-border",
        destructive: "border-destructive",
        success: "border-success-600",
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const ToastProvider = ToastPrimitive.Provider
const ToastViewport = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    data-slot="toast-viewport"
    className={cn("fixed right-0 bottom-0 z-toast flex max-w-[336px] flex-col gap-2 p-4 outline-none", className)}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitive.Viewport.displayName

const Toast = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    data-slot="toast"
    className={cn(toastVariants({ variant, size }), className)}
    {...props}
  >
    {children}
    <ToastPrimitive.Close asChild>
      <Button type="button" variant="ghost" size="icon" aria-label="Dismiss">
        <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 4 12 12M12 4 4 12" strokeLinecap="round" />
        </svg>
      </Button>
    </ToastPrimitive.Close>
  </ToastPrimitive.Root>
))
Toast.displayName = ToastPrimitive.Root.displayName

const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    data-slot="toast-title"
    className={cn("font-geist text-sm leading-5 font-medium text-foreground", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitive.Title.displayName

const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    data-slot="toast-description"
    className={cn("font-geist text-sm leading-5 font-normal text-neutral-500", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitive.Description.displayName

const ToastAction = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action ref={ref} data-slot="toast-action" className={cn(className)} {...props} />
))
ToastAction.displayName = ToastPrimitive.Action.displayName

const ToastClose = ToastPrimitive.Close

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  toastVariants,
}
