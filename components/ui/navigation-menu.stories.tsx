import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLinkItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "./navigation-menu"

const meta = {
  title: "UI/Navigation Menu",
  component: NavigationMenu,
  parameters: { layout: "padded" },
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

function NavigationMenuDemo({ defaultValue }: { defaultValue?: string }) {
  return (
    <NavigationMenu defaultValue={defaultValue}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLinkItem href="#overview" active>
            Overview
          </NavigationMenuLinkItem>
        </NavigationMenuItem>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[280px] gap-2">
              <li>
                <NavigationMenuLinkItem href="#analytics" className="w-full justify-start">
                  Analytics
                </NavigationMenuLinkItem>
              </li>
              <li>
                <NavigationMenuLinkItem href="#automation" className="w-full justify-start">
                  Automation
                </NavigationMenuLinkItem>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLinkItem href="#pricing">Pricing</NavigationMenuLinkItem>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuIndicator />
      <NavigationMenuViewport />
    </NavigationMenu>
  )
}

export const Default: Story = {
  render: () => <NavigationMenuDemo />,
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Trigger and link (rest / open via keyboard)</p>
        <NavigationMenuDemo defaultValue="products" />
      </div>
      <div className="flex flex-wrap gap-2">
        <p className="mb-2 w-full text-sm font-medium text-foreground">Static link states</p>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLinkItem href="#default">Default link</NavigationMenuLinkItem>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLinkItem href="#current" active>
                Current page
              </NavigationMenuLinkItem>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  ),
}

export const AsChild: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLinkItem asChild active>
            <a href="#home">Home</a>
          </NavigationMenuLinkItem>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}
