import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination"

const meta = {
  title: "UI/Pagination",
  component: Pagination,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

function Row() {
  return (
    <Pagination>
      <PaginationItem>
        <PaginationPrevious />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink>1</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink isActive>2</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink>3</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext />
      </PaginationItem>
    </Pagination>
  )
}

export const Default: Story = {
  args: { variant: "default", size: "default" },
  render: () => <Row />,
}

export const States: Story = {
  render: () => (
    <Pagination>
      <PaginationItem>
        <PaginationPrevious>Default</PaginationPrevious>
      </PaginationItem>
      <PaginationItem>
        <PaginationPrevious className="bg-neutral-100 text-neutral-900">
          Hover
        </PaginationPrevious>
      </PaginationItem>
      <PaginationItem>
        <PaginationPrevious className="opacity-60">Active</PaginationPrevious>
      </PaginationItem>
      <PaginationItem>
        <PaginationPrevious disabled>Disabled</PaginationPrevious>
      </PaginationItem>
      <PaginationItem>
        <PaginationPrevious className="shadow-focus">Focus</PaginationPrevious>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink isActive>2</PaginationLink>
      </PaginationItem>
    </Pagination>
  ),
}

export const AsChild: Story = {
  render: () => (
    <Pagination>
      <PaginationItem>
        <PaginationLink asChild>
          <a href="#page-1">1</a>
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  ),
}
