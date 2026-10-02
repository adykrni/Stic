import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "./button"
import { Combobox, type ComboboxOption } from "./combobox"

const frameworks: ComboboxOption[] = [
  { value: "next", label: "Next.js" },
  { value: "svelte", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

const meta = {
  title: "UI/Combobox",
  component: Combobox,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

function ComboboxDemo(props: Partial<React.ComponentProps<typeof Combobox>>) {
  const [value, setValue] = React.useState("next")
  return (
    <div className="max-w-xs">
      <Combobox
        options={frameworks}
        value={value}
        onValueChange={setValue}
        placeholder="Select framework…"
        searchPlaceholder="Search framework…"
        {...props}
      />
    </div>
  )
}

export const Default: Story = {
  render: () => <ComboboxDemo />,
}

export const States: Story = {
  render: () => (
    <div className="flex max-w-xs flex-col gap-4">
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Trigger default</p>
        <Combobox options={frameworks} placeholder="Placeholder" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Trigger hover</p>
        <Button
          variant="outline"
          className="w-full justify-between font-normal hover:bg-neutral-100 hover:text-neutral-900"
        >
          Placeholder
        </Button>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Trigger focus / open</p>
        <Button
          variant="outline"
          className="w-full justify-between border-ring font-normal shadow-focus"
          aria-expanded
        >
          Next.js
        </Button>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Trigger disabled</p>
        <Combobox options={frameworks} placeholder="Placeholder" disabled />
      </div>
    </div>
  ),
}
