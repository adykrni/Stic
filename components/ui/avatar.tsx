"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent font-geist font-normal text-foreground",
  {
    variants: {
      size: {
        xxs: "size-5 text-xs leading-4",
        xs: "size-6 text-sm leading-5",
        sm: "size-8 text-sm leading-5",
        md: "size-10 text-sm leading-5",
        lg: "size-12 text-sm leading-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, src, alt, fallback, ...props }, ref) => {
    const [failed, setFailed] = React.useState(false)

    React.useEffect(() => {
      setFailed(false)
    }, [src])

    const showImage = Boolean(src) && !failed

    return (
      <span
        ref={ref}
        data-slot="avatar"
        {...props}
        className={cn(avatarVariants({ size }), className)}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt ?? ""}
            className="size-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <span>{fallback}</span>
        )}
      </span>
    )
  },
)
Avatar.displayName = "Avatar"

export { Avatar, avatarVariants }
