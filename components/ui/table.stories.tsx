import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  type TableCellProps,
} from "./table"

type TableCellSize = NonNullable<TableCellProps["size"]>

const cellSizes: TableCellSize[] = ["default", "sm", "lg"]

const sampleRows = [
  { name: "Orintis Core", status: "Active", role: "Admin" },
  { name: "Design system", status: "Draft", role: "Editor" },
  { name: "Marketing site", status: "Active", role: "Viewer" },
]

const meta = {
  title: "UI/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

function SampleTable({ cellSize = "default" }: { cellSize?: TableCellSize }) {
  return (
    <Table>
      <TableCaption>Presentational table for tabular content.</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleRows.map((row) => (
          <TableRow key={row.name}>
            <TableCell size={cellSize}>{row.name}</TableCell>
            <TableCell size={cellSize}>{row.status}</TableCell>
            <TableCell size={cellSize} className="text-right">
              {row.role}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const Default: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-8">
      {cellSizes.map((size) => (
        <SampleTable key={size} cellSize={size} />
      ))}
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="max-w-2xl space-y-8">
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Header default</p>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Column</TableHead>
              <TableHead>Column</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Row default</p>
        <Table>
          <TableBody>
            <TableRow className="hover:bg-transparent">
              <TableCell>Row default</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Row hover</p>
        <Table>
          <TableBody>
            <TableRow className="bg-neutral-100">
              <TableCell>Row hover</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  ),
}
