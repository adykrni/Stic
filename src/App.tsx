import { Button } from "../components/ui/button"

const variants = [
  "default",
  "destructive",
  "outline",
  "secondary",
  "ghost",
  "link",
] as const

const sizes = ["sm", "default", "lg", "icon"] as const

export function App() {
  return (
    <main className="min-h-screen bg-background p-10 text-foreground">
      <h1 className="mb-8 text-2xl font-medium">Button</h1>

      <section className="mb-10">
        <h2 className="mb-4 text-sm font-medium">Variants</h2>
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-sm font-medium">Sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          {sizes.map((size) => (
            <Button key={size} size={size} aria-label={size}>
              {size === "icon" ? "＋" : size}
            </Button>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-sm font-medium">Disabled</h2>
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} disabled>
              {variant}
            </Button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-medium">Loading</h2>
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} loading>
              {variant}
            </Button>
          ))}
        </div>
      </section>
    </main>
  )
}
