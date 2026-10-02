"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type Table as TanStackTable,
} from "@tanstack/react-table"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Button } from "./button"
import { Input } from "./input"
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function SortIcon({ direction }: { direction: false | "asc" | "desc" }) {
  if (direction === "asc") {
    return (
      <svg
        viewBox="0 0 16 16"
        className="size-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8 3v10M5 6l3-3 3 3" />
      </svg>
    )
  }
  if (direction === "desc") {
    return (
      <svg
        viewBox="0 0 16 16"
        className="size-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8 13V3M5 10l3 3 3-3" />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4 shrink-0 text-neutral-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 6.5 8 3.5 5 6.5" />
      <path d="M5 9.5 8 12.5l3-3" />
    </svg>
  )
}

export interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <span className={cn("font-medium", className)}>{title}</span>
  }

  const sorted = column.getIsSorted()

  return (
    <Button
      type="button"
      variant="ghost"
      size="default"
      className={cn(
        "-ml-4 h-9 gap-2 px-4 font-medium text-neutral-500 hover:text-neutral-900",
        className,
      )}
      onClick={() => column.toggleSorting(sorted === "asc")}
      aria-label={
        sorted === "asc"
          ? `${title}, sorted ascending. Activate to sort descending.`
          : sorted === "desc"
            ? `${title}, sorted descending. Activate to clear sort.`
            : `${title}, not sorted. Activate to sort ascending.`
      }
    >
      {title}
      <SortIcon direction={sorted} />
    </Button>
  )
}

export interface DataTableToolbarProps<TData> {
  table: TanStackTable<TData>
  filterColumnId?: string
  filterPlaceholder?: string
  className?: string
}

function DataTableToolbar<TData>({
  table,
  filterColumnId,
  filterPlaceholder = "Filter rows…",
  className,
}: DataTableToolbarProps<TData>) {
  if (!filterColumnId) {
    return null
  }

  const column = table.getColumn(filterColumnId)
  if (!column) {
    return null
  }

  return (
    <div className={cn("flex items-center", className)}>
      <Input
        placeholder={filterPlaceholder}
        value={(column.getFilterValue() as string) ?? ""}
        onChange={(event) => column.setFilterValue(event.target.value)}
        className="max-w-sm"
        aria-label={filterPlaceholder}
      />
    </div>
  )
}

export interface DataTablePaginationProps<TData> {
  table: TanStackTable<TData>
  className?: string
}

function DataTablePagination<TData>({
  table,
  className,
}: DataTablePaginationProps<TData>) {
  const pageCount = table.getPageCount()
  const pageIndex = table.getState().pagination.pageIndex

  const pageItems = React.useMemo(() => {
    if (pageCount <= 1) {
      return [] as (number | "ellipsis")[]
    }
    if (pageCount <= 7) {
      return Array.from({ length: pageCount }, (_, i) => i)
    }
    const items: (number | "ellipsis")[] = []
    items.push(0)
    if (pageIndex > 2) {
      items.push("ellipsis")
    }
    const start = Math.max(1, pageIndex - 1)
    const end = Math.min(pageCount - 2, pageIndex + 1)
    for (let i = start; i <= end; i++) {
      items.push(i)
    }
    if (pageIndex < pageCount - 3) {
      items.push("ellipsis")
    }
    if (pageCount > 1) {
      items.push(pageCount - 1)
    }
    return items
  }, [pageCount, pageIndex])

  return (
    <Pagination className={cn("justify-end", className)}>
      <PaginationItem>
        <PaginationPrevious
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        />
      </PaginationItem>
      {pageItems.map((item, index) =>
        item === "ellipsis" ? (
          <PaginationItem key={`ellipsis-${index}`}>
            <PaginationEllipsis />
          </PaginationItem>
        ) : (
          <PaginationItem key={item}>
            <PaginationLink
              isActive={pageIndex === item}
              onClick={() => table.setPageIndex(item)}
            >
              {item + 1}
            </PaginationLink>
          </PaginationItem>
        ),
      )}
      {pageCount <= 1 ? (
        <PaginationItem>
          <PaginationLink isActive>{1}</PaginationLink>
        </PaginationItem>
      ) : null}
      <PaginationItem>
        <PaginationNext
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        />
      </PaginationItem>
    </Pagination>
  )
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterColumnId?: string
  filterPlaceholder?: string
  pageSize?: number
  className?: string
}

function DataTable<TData, TValue>({
  columns,
  data,
  filterColumnId,
  filterPlaceholder,
  pageSize = 5,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  return (
    <div className={cn("space-y-4", className)}>
      <DataTableToolbar
        table={table}
        filterColumnId={filterColumnId}
        filterPlaceholder={filterPlaceholder}
      />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-13 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  )
}

export {
  DataTable,
  DataTableColumnHeader,
  DataTableToolbar,
  DataTablePagination,
}

export type { ColumnDef }
