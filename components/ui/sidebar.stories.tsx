import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "./sidebar"

const meta = {
  title: "UI/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

function NavIcon({ label }: { label: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.33"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="5" />
      <title>{label}</title>
    </svg>
  )
}

function SidebarDemo({ defaultOpen = true }: { defaultOpen?: boolean }) {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex h-[480px] w-full border border-border">
        <Sidebar>
          <SidebarHeader className="flex flex-row items-center justify-between">
            <span className="truncate px-2 text-sm font-semibold text-foreground group-data-[state=collapsed]/sidebar:hidden">
              Acme
            </span>
            <SidebarTrigger />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Platform</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive tooltip="Dashboard">
                    <NavIcon label="Dashboard" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Projects">
                    <NavIcon label="Projects" />
                    <span>Projects</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Settings">
                    <NavIcon label="Settings" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Help">
                  <NavIcon label="Help" />
                  <span>Help</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="p-6">
          <p className="text-sm text-neutral-500">Main content area</p>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export const Default: Story = {
  render: () => <SidebarDemo defaultOpen />,
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 px-4 text-sm font-medium text-foreground">Expanded</p>
        <SidebarDemo defaultOpen />
      </div>
      <div>
        <p className="mb-2 px-4 text-sm font-medium text-foreground">Collapsed</p>
        <SidebarDemo defaultOpen={false} />
      </div>
    </div>
  ),
}

export const AsChild: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-48 w-full border border-border">
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive tooltip="Home">
                  <a href="#home">
                    <NavIcon label="Home" />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  ),
}
