# Component patterns

Follow this when adding a component. Button is the reference implementation for file structure, `cva`, stories, and docs: `components/ui/button.tsx`, `components/ui/button.stories.tsx`, and `components/ui/button.mdx`. Copy that structure. Do not invent a second way to name files, variants, tokens, stories, or docs. Do not copy Button's padding, radius, type, or icon size onto another component. Those values come from the measurement below.

## Measure in Figma before writing code

Do this before writing `{name}.tsx`, the stories, or the docs. Stop if the measurement is missing or if a value does not match a primitive. Do not start from Button's dimensions, and do not start from a general convention.

1. Read the component in Figma via Console MCP. Use the component being built, not a similar one.
2. Extract the exact values for every documented variant and every documented state:
   - padding, horizontal and vertical
   - gap between internal elements
   - corner radius
   - border width
   - icon size
   - font size, line height, and weight for any text
   - width, height, and any other sizing that changes by variant or state
3. Report those measured values before building. Map each one to the closest existing primitive in `orintis-primitive-tokens.md`. Write the mapping as the measured value and the token name, for example `16px padding → spacing-16`.
4. If a measured value does not match an existing primitive exactly, flag it. Do not round it to a nearby token. Do not build until that gap is resolved.
5. Only after those values are confirmed, build the component with them. Classes come from that confirmed mapping.

## File structure

Add one component as three files, all in `components/ui/`:

| File | Role |
|---|---|
| `{name}.tsx` | The component |
| `{name}.stories.tsx` | Stories only. No extra example components. |
| `{name}.mdx` | Docs. Embed the stories. Do not rebuild the component in MDX. |

`{name}` is the component name in kebab case (`button`, `icon-button`). Export the component as PascalCase (`Button`) and the style function as `{camelName}Variants` (`buttonVariants`).

Do not put stories in `src/stories/`. Storybook already loads `components/**/*.stories.tsx` and `components/**/*.mdx`. Attach the MDX to the stories with `<Meta of={...} />` so it becomes the Docs page for that component, not a second sidebar entry.

The component file is a client component (`"use client"`). It owns its `cn` helper (`clsx` + `tailwind-merge`). Do not add a shared `lib/utils` as part of the component. Export the component and its variants function. Set `displayName`. Use `React.forwardRef`. Set `data-slot="{name}"` on the root element.

## cva variants and sizes

Define one `cva` call named `{camelName}Variants`.

- Axes are `variant` and `size`. Do not add a third axis for status, tone, or intent.
- `defaultVariants` sets both to `"default"`.
- The first variant key is `default`. That is the resting, primary emphasis.
- Further variant keys are an emphasis ranking only. Button’s ranking is `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`. A new component uses only the ranks it actually has, with these names when the rank means the same thing. Do not add `success`, `warning`, or `info`. Status belongs on Badge or Alert.
- Size keys are `default`, `sm`, `lg`, and `icon`, in that order. Omit a size the component does not have. Do not add `xs`, `xl`, or other names.
- Shared classes (layout, typography, transparent border, focus, disabled pointer behavior) go in the `cva` base string. Variant classes only change color, border, and emphasis. Size classes only change dimensions and padding. The numbers in those classes are the confirmed Figma mapping, not Button's sizes.
- Props come from `VariantProps<typeof {camelName}Variants>` intersected with the underlying element’s attributes, plus `asChild` and `loading` when the component has those behaviors.

```tsx
const buttonVariants = cva("…shared classes…", {
  variants: {
    variant: { default: "…", destructive: "…" },
    size: { default: "…", sm: "…", lg: "…", icon: "…" },
  },
  defaultVariants: { variant: "default", size: "default" },
})
```

Story and doc types must be taken from that definition: `NonNullable<ComponentProps["variant"]>` and `NonNullable<ComponentProps["size"]>`. Never write a variant or size string that is not a key in the `cva` call.

## Component-tier tokens

Name every color decision before writing a class, using this path:

```
{component}.{part}.{variant}.{state}
```

`part` is `background`, `text`, or `border`. `state` is `default`, `hover`, `active`, `disabled`, or `focus`. Drop the variant segment when the decision is shared by every variant (`button.border.focus`). Drop the state segment when the part does not change per state (`button.text.default`).

Examples from Button:

- `button.background.default.default` → semantic `primary`
- `button.background.default.hover` → primitive `primary-800`
- `button.background.default.disabled` → primitive `neutral-200`
- `button.text.destructive` → semantic `destructive-foreground`
- `button.border.outline` → semantic `border`
- `button.border.focus` → semantic `ring`
- `button.background.loading` → the variant’s `default` background. There is no loading color.

Map those names to Tailwind classes. Do not use arbitrary values or hex.

- A semantic token is an unsuffixed color class: `bg-primary`, `text-primary-foreground`, `border-border`, `bg-accent`, `focus-visible:border-ring`.
- A primitive token keeps its step: `hover:bg-primary-800`, `active:bg-primary-700`, `disabled:bg-neutral-200`, `hover:bg-danger-700`.
- Rest, text, and shared borders use semantic tokens. Hover, active, and a disabled fill use the primitive step named in the token path.
- `transparent` is the primitive transparent token: `bg-transparent`.
- State prefixes are `hover:`, `active:`, `disabled:`, and `focus-visible:`. The resting class has no prefix.

In the MDX token trail, write the path as the class token and then the resolved primitive: `` `primary` → `primary-900` ``. If a state skips the semantic layer, say so (`Hover `primary-800``).

## States

Every interactive component implements these states. Wire them in the base or variant classes, not as a separate visual-only prop.

| State | How to implement it |
|---|---|
| Default | The variant’s resting classes. |
| Hover | `hover:` on that variant’s hover token. |
| Active | `active:` on that variant’s active token. |
| Disabled | The real `disabled` prop, passed through to the native attribute (`disabled={isDisabled \|\| undefined}`). Also `disabled:pointer-events-none` in the base. A disabled class with no `disabled` prop is not a disabled state. |
| Focus | `focus-visible:border-ring` and `focus-visible:outline-none` in the base. Keep a transparent `border` in the base so the ring does not change the box size. This is the semantic `ring` token as a 1px border color, not a box-shadow. |
| Loading | Only when the component triggers an action that can be in progress. See below. |

Loading, when the component has it:

- Add `loading?: boolean`. Default it to `false`.
- Do not set `disabled` while loading. The resting background stays.
- Hide the label with `invisible` so the control keeps its width. Center a spinner over it. The spinner is `aria-hidden`.
- Add `pointer-events-none` while loading, set `aria-busy`, set `data-loading=""`, and ignore the click.
- The loading control stays focusable. Say that in the docs. Do not pretend it is removed from the tab order.

If a variant has no token for a state, do not invent one. Button’s destructive variant has no disabled fill; only `default` changes background when disabled. Document that gap instead of adding a color.

## asChild

Use this on components that can stand in for another element. Skip it on components that are not a single interactive control.

- Import `Slot` from `@radix-ui/react-slot`.
- `asChild` defaults to `false`.
- Render `Slot` only when `asChild` is true and `loading` is not. Otherwise render the native element (`button`, and so on). Loading wraps the children, so Slot cannot merge onto them.
- The caller passes exactly one element child (`<a>`, for example). Slot copies the classes and props onto it.
- Do not pass `type` when rendering Slot. On the native element, default `type` to `"button"` unless the caller set one.
- Still pass `disabled` through. It remains the native attribute.

## Stories

`{name}.stories.tsx` imports `Meta` and `StoryObj` from `@storybook/react-vite`. The meta uses `satisfies Meta<typeof Component>`, `title: "UI/{Component}"`, and `parameters.layout: "padded"`.

Export three kinds of story, and no others:

1. **One story per variant.** The export name is the variant key in PascalCase (`Default`, `Destructive`, `Outline`). `args.variant` is that key. The render function shows every size in the component’s size union, side by side, in the order `default`, `sm`, `lg`, `icon` (skipping any size the component does not have). Take the keys from `NonNullable<Props["variant"]>` and `NonNullable<Props["size"]>`. An icon-only size needs an accessible name; the Button row passes `aria-label={size}`.
2. **One `States` story** for the `default` variant at the `default` size. Render five controls in a row, labeled Default, Hover, Active, Disabled, and Loading. Disabled uses the `disabled` prop. Loading uses the `loading` prop. This project has no `withPseudoState` addon, so Hover and Active are not pseudo parameters: apply that variant’s own hover and active classes through `className` (Button uses `bg-primary-800` and `bg-primary-700`) so the canvas shows them.
3. **One `AsChild` story** when the component supports `asChild`. Set `asChild: true` and render a single `<a>` as the child. Strip `children` out of `args` before spreading so the link is the only child.

Do not add a story for a variant that is not in the `cva` map.

## MDX docs

`{name}.mdx` uses this and nothing else at the top:

```mdx
import { ArgTypes, Canvas, Meta } from "@storybook/addon-docs/blocks"
import * as ComponentStories from "./{name}.stories"

<Meta of={ComponentStories} />
```

Then these sections, in this order, with these headings:

1. **Guidance** — One paragraph. What the component is for, and that `variant` is an emphasis ranking only. Status belongs on Badge or Alert, not on this component. Under the paragraph, `<Canvas of={ComponentStories.Default} />` and one Canvas for each other variant story.
2. **When to use / When not to use** — Two short blocks. Name the jobs that belong here and the jobs that belong on another component.
3. **Do / Don't** — Rules taken from the component’s code, not from a generic checklist. Cover `asChild` if it exists, the real `disabled` prop, `loading` if it exists, and `aria-label` for icon-only. Put `<Canvas of={ComponentStories.AsChild} />` after the Do list and `<Canvas of={ComponentStories.States} />` after the Don't list.
4. **Accessibility in practice** — Focus (the `ring` token via `focus-visible:border-ring`), keyboard behavior the element actually has, and the icon-only `aria-label` requirement. If loading stays in the tab order, say that.
5. **Content guidelines** — Exactly three short rules. For an action, the label is a verb plus its object.
6. **Token trail** — One bullet per variant, in variant-key order, plus a shared focus bullet and a loading bullet when loading exists. Form: `` `primary` → `primary-900` ``. Include hover, active, and disabled only where the classes exist.
7. **Figma parity** — The single line `Last synced with Figma: [date]`. The date is the day the measurement above was confirmed. The classes in the component are that mapping.
8. **Props** — One short paragraph, then `<ArgTypes of={ComponentStories} />`. Describe what docgen actually lists. `variant` and `size` include `null` because `VariantProps` does. Their defaults live in `defaultVariants` and do not appear in the table. Inherited DOM attributes such as `disabled` are part of the props type and are usually absent from the table; point at the Do / Don't section for `disabled`.
9. **Accessibility results** — Run the Storybook a11y addon against every story and write what it reported. Use the addon’s setup: `document.body`, exclude `.sb-wrapper`, `region` disabled. Name each story that passed and each violation (`rule`, impact, which element). Do not write that the run was clean unless the addon said so. Note any state the addon did not measure (axe skips disabled elements; hidden loading text is not a contrast check). Date the run.
10. **Status** — The heading, then a single word: `stable` or `beta`.

`stable` means the component, stories, and docs follow this file and the a11y results are recorded. `beta` means the API or the token paths are still expected to change. Do not use any other status word.

## Adding the next component

1. Measure the component in Figma and report the primitive mapping. Stop if any measured value does not match an existing primitive exactly.
2. Write `{name}.tsx` with `cva`, the confirmed measurements, the token classes, the states above, and `asChild` only if composition applies.
3. Write `{name}.stories.tsx` with one story per variant, `States`, and `AsChild` when composition applies.
4. Run the a11y addon on those stories.
5. Write `{name}.mdx` with the ten sections, canvases pointed at those stories, and the real a11y results.
6. Set Status to `beta` until the token paths and API are settled, then `stable`.
