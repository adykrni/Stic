"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const tableVariants = cva("w-full caption-bottom font-geist text-sm", {
  variants: {
    variant: {
      default: "text-foreground",
    },
    size: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

const tableRowVariants = cva(
  "border-b border-border transition-colors last:border-b-0 [thead_&]:hover:bg-transparent",
  {
    variants: {
      variant: {
        default: "hover:bg-neutral-100",
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

const tableHeadVariants = cva(
  "h-10 min-w-20 border-b border-border px-2 text-left align-middle font-medium text-neutral-500",
  {
    variants: {
      variant: {
        default: "",
      },
      size: {
        default: "text-sm leading-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const tableCellVariants = cva("px-2 align-middle font-normal text-foreground", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      default: "h-13 text-sm leading-5",
      sm: "h-18 text-sm leading-5",
      lg: "h-24 text-sm leading-5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div data-slot="table-container" className="relative w-full overflow-auto">
        <table
          ref={ref}
          data-slot="table"
          {...props}
          className={cn(tableVariants({ variant, size }), className)}
        />
      </div>
    )
  },
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <thead
      ref={ref}
      data-slot="table-header"
      {...props}
      className={cn("[&_tr]:border-b", className)}
    />
  )
})
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      data-slot="table-body"
      {...props}
      className={cn("[&_tr:last-child]:border-0", className)}
    />
  )
})
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <tfoot
      ref={ref}
      data-slot="table-footer"
      {...props}
      className={cn(
        "border-t border-border bg-neutral-100 font-medium [&>tr]:last:border-b-0",
        className,
      )}
    />
  )
})
TableFooter.displayName = "TableFooter"

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof tableRowVariants> {}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        data-slot="table-row"
        {...props}
        className={cn(tableRowVariants({ variant, size }), className)}
      />
    )
  },
)
TableRow.displayName = "TableRow"

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableHeadVariants> {}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <th
        ref={ref}
        data-slot="table-head"
        scope="col"
        {...props}
        className={cn(tableHeadVariants({ variant, size }), className)}
      />
    )
  },
)
TableHead.displayName = "TableHead"

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableCellVariants> {}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <td
        ref={ref}
        data-slot="table-cell"
        {...props}
        className={cn(tableCellVariants({ variant, size }), className)}
      />
    )
  },
)
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => {
  return (
    <caption
      ref={ref}
      data-slot="table-caption"
      {...props}
      className={cn("mt-4 text-sm text-neutral-500", className)}
    />
  )
})
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  tableVariants,
  tableRowVariants,
  tableHeadVariants,
  tableCellVariants,
}
