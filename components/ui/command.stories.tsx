import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command"

const meta = {
  title: "UI/Command",
  component: Command,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

const suggestions = [
  { label: "Calendar", shortcut: "⌘K" },
  { label: "Search emoji", shortcut: "⌘E" },
  { label: "Calculator", shortcut: "⌘C" },
]

const settings = [
  { label: "Profile", shortcut: "⌘P" },
  { label: "Billing", shortcut: "⌘B" },
  { label: "Settings", shortcut: "⌘S" },
]

function CommandDemo() {
  return (
    <Command className="max-w-md">
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {suggestions.map((item) => (
            <CommandItem key={item.label} value={item.label}>
              {item.label}
              <CommandShortcut>{item.shortcut}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          {settings.map((item) => (
            <CommandItem key={item.label} value={item.label}>
              {item.label}
              <CommandShortcut>{item.shortcut}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export const Default: Story = {
  render: () => <CommandDemo />,
}

export const States: Story = {
  render: () => (
    <div className="max-w-md space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Item default</p>
        <Command>
          <CommandList>
            <CommandGroup heading="Items">
              <CommandItem value="default">Command item</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Highlighted</p>
        <Command>
          <CommandList>
            <CommandGroup heading="Items">
              <CommandItem value="highlight" className="bg-accent">
                Command item
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Disabled</p>
        <Command>
          <CommandList>
            <CommandGroup heading="Items">
              <CommandItem value="disabled" disabled>
                Command item
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Empty</p>
        <Command>
          <CommandInput defaultValue="zzzznomatch" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
          </CommandList>
        </Command>
      </div>
    </div>
  ),
}
