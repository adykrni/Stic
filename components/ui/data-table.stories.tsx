import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  DataTable,
  DataTableColumnHeader,
  type ColumnDef,
} from "./data-table"

type Payment = {
  id: string
  email: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
}

const payments: Payment[] = [
  { id: "728ed52f", email: "m@example.com", amount: 100, status: "pending" },
  { id: "489e1d42", email: "a@example.com", amount: 125, status: "processing" },
  { id: "b91c0e3a", email: "z@example.com", amount: 250, status: "success" },
  { id: "c4fd9e12", email: "k@example.com", amount: 75, status: "failed" },
  { id: "d8a2b011", email: "n@example.com", amount: 310, status: "success" },
  { id: "e17c3f88", email: "p@example.com", amount: 42, status: "pending" },
  { id: "f29d4a77", email: "r@example.com", amount: 180, status: "processing" },
  { id: "a03b5c66", email: "s@example.com", amount: 520, status: "success" },
  { id: "b14c6d55", email: "t@example.com", amount: 90, status: "failed" },
  { id: "c25d7e44", email: "u@example.com", amount: 215, status: "success" },
  { id: "d36e8f33", email: "v@example.com", amount: 160, status: "pending" },
  { id: "e47f9022", email: "w@example.com", amount: 440, status: "processing" },
]

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => row.getValue("email"),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => row.getValue("status"),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" className="ml-auto" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]

const meta = {
  title: "UI/Data Table",
  component: DataTable,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="max-w-3xl">
      <DataTable
        columns={columns}
        data={payments}
        filterColumnId="email"
        filterPlaceholder="Filter by email…"
        pageSize={5}
      />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="max-w-xl">
      <p className="mb-2 text-sm font-medium text-foreground">
        Sortable header (ghost button + sort icon)
      </p>
      <DataTable
        columns={columns.slice(0, 2)}
        data={payments.slice(0, 4)}
        pageSize={10}
      />
    </div>
  ),
}
