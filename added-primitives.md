# Primitives added from Figma

Read on 1 October 2026 from **ShadCN UI Kit & Components** (`7ZzhgX8noYLSjAXLvr0Lo8`) through the Figma desktop bridge. Values below were on the component variants and were not already in `orintis-primitive-tokens.md`. The token total went from 212 to 230.

Tailwind’s default spacing scale already equals several of these px values under a different key. Those were **not** registered as `--spacing-*` theme keys, because `--spacing-3` would change `p-3` from 12px to 3px, and the same collision exists for 6, 10, 14, and 36. Only `spacing-76` is new to the theme (`min-h-76`).

| Token | Value | Measured on | Class in code |
|---|---|---|---|
| `--ori-spacing-1` | 1px / 0.0625rem | Radio label wrapper padding-top | `pt-px` |
| `--ori-spacing-3` | 3px / 0.1875rem | Focus shadow spread | Inside `--ori-shadow-focus-ash` and `--ori-shadow-focus-scarlet`. Not a spacing utility. |
| `--ori-spacing-6` | 6px / 0.375rem | Gap between a Checkbox or Radio label and its description | Recorded only. Those components have no description slot. Tailwind `gap-1.5` equals 6px. |
| `--ori-spacing-10` | 10px / 0.625rem | Textarea field item spacing | Recorded only. The field has one text child, so the gap does not change the box. Tailwind `gap-2.5` equals 10px. |
| `--ori-spacing-14` | 14px / 0.875rem | Checkbox check icon | `size-3.5` |
| `--ori-spacing-36` | 36px / 2.25rem | Button default height, icon button, Input height | `h-9`, `size-9` |
| `--ori-spacing-76` | 76px / 4.75rem | Textarea field height | `min-h-76` |
| `--ori-opacity-50` | 0.5 | Button disabled and loading. Checkbox, Input, and Textarea disabled | `opacity-50` |
| `--ori-border-width-1-33` | 1.33px | Checkbox check stroke and Radio selected-dot stroke | SVG `strokeWidth={1.33}` |
| `--ori-colour-white` | `#FFFFFF` | Badge destructive text | `text-white` |
| `--ori-colour-white-alpha-10` | `rgba(255, 255, 255, 0.1)` | Button Default hover, over Primary 900 | `hover:overlay-white-10` |
| `--ori-colour-white-alpha-20` | `rgba(255, 255, 255, 0.2)` | Button Secondary hover, Badge Default hover | `hover:overlay-white-20` |
| `--ori-colour-ash` | `#A3A3A3` | Focus shadow. Neutral 400 is `#ABACB1`. | Colour of `shadow-focus` |
| `--ori-colour-scarlet` | `#DC2626` | Button Destructive focus shadow at alpha 0.2. Danger 600 is `#CB131C`. | Colour of `shadow-focus-destructive` |
| `--ori-shadow-black-2` | `0px 1px 2px 0px rgba(0, 0, 0, 0.05)` | Resting shadow on Button, Outline, Checkbox, Input, Textarea. Not `--ori-shadow-2` (`rgba(25, 26, 41, 0.08)`). | `shadow-button` |
| `--ori-shadow-focus-ash` | `0px 0px 0px 3px rgba(163, 163, 163, 0.5)` | Focus on Button (except Destructive), Ghost, Link, Outline, Checkbox, Radio, Input, Textarea | `shadow-focus` |
| `--ori-shadow-focus-scarlet` | `0px 0px 0px 3px rgba(220, 38, 38, 0.2)` | Button Destructive focus | `shadow-focus-destructive` |
| `--ori-font-family-geist` | Geist, then Noto Sans | Typeface on the built components | `font-geist` |

## Wired, not added

These already existed as primitives and were only connected in `src/index.css`.

| Token | Value | Used for |
|---|---|---|
| `--ori-colour-neutral-900` | `#202024` | Outline and Ghost button hover text |
| `--ori-colour-neutral-500` | `#85868B` | Input and Textarea placeholder |

## Measured, and already on the scale

| Value | Existing token | What changed in code |
|---|---|---|
| 8px radius | `radius-8` | Badge radius, Skeleton text radius |
| 600 weight | `font-weight-600` | Badge |
| 16px line height | `line-height-16` | Badge, Button sm, Avatar xxs |
| 20px | `spacing-20` | Divider vertical minimum, Avatar xxs |
| 24px | `spacing-24` | Avatar xs |
| 12px gap | `spacing-12` | Radio control to label (`gap-3`) |
| 400 weight | `font-weight-400` | Avatar fallback |
| `#F1F1F5` | `neutral-100` / `accent` | Avatar fallback fill |
| `#101013` | `neutral-950` / `foreground` | Avatar fallback text |

## Not added

| Value | Why |
|---|---|
| 10px radius | Radio Box variant. The built Radio is the circle item, not the box. |
| `#3B82F6` | Badge Verified. That variant was not built. |
| 334px | Skeleton Card sample width. It is a drawing, not a component size. |
