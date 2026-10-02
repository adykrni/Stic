# Orintis Design System: Primitive Tokens

**Layer:** Primitives (layer 1 of 3: primitives → semantic → component)  
**Scope:** Light mode; desktop and mobile. Dark mode is out of scope for now.  
**Total:** 237 tokens

Primitives are raw values with no meaning attached. Components never reference them directly. They are consumed by the semantic layer (e.g. `surface-default` → `--ori-colour-secondary-100`).

## Conventions

| Rule | Value |
|---|---|
| CSS prefix | `--ori-` (British spelling: `colour`) |
| Figma / JSON path | dot or slash form of the same name, e.g. `colour/primary/900` |
| Numeric names | Named by their px value (`spacing-16`, `radius-8`, `font-size-14`). No t-shirt names except breakpoints |
| Units | Every dimension is documented in **px and rem** (1rem = 16px). In code, use **rem** for spacing, radius, type and layout so they scale with user font size, and keep **px** for border widths, focus ring and shadows (hairlines and blur should not scale). Breakpoints use rem/em in media queries |
| Scale | Colour ramps run 50 → 950. Everything else uses the scale documented in its section |


---

## 1. Colour

### 1.1 Structure

**7 ramps × 11 stops = 77 tokens.** Stops run 50, 100, 200 … 900, 950 (higher = darker). Ramps are built in OKLCH (even lightness steps, constant hue per ramp, gamut-mapped to sRGB). Brand anchors are exact hex values.

| Ramp | OKLCH hue | Role |
|---|---|---|
| Primary | 282° | Brand anchor at **900** (`#2C2D41`). |
| Secondary | 269° | Brand anchor at **100** (`#EDEFF4`). |
| Neutral | 282° | Text, borders, dividers, disabled states. Faint brand tint (chroma ≤ 0.008). |
| Danger | 27° | Errors, destructive actions. |
| Warning | 75° | Cautions, pending states. Lightness curve shifted up because amber is inherently bright. |
| Success | 150° | Confirmations, completed states. |
| Info | 255° | Informative messaging, tips, inline help. Also the focus-ring colour on light surfaces. |


Contrast columns are WCAG 2.x ratios against **Secondary 50** (lightest surface) and **Primary 900** (darkest brand surface). ✅ = 4.5:1 or better. ⚓ = fixed brand colour.

### 1.2 Primary

| Stop | Token | Hex | vs Secondary 50 | vs Primary 900 |
|---|---|---|---|---|
| 50 | `--ori-colour-primary-50` | `#F8F8FC` | 1.00 | 12.72 ✅ |
| 100 | `--ori-colour-primary-100` | `#EEEFF8` | 1.08 | 11.76 ✅ |
| 200 | `--ori-colour-primary-200` | `#DDDEEE` | 1.25 | 10.11 ✅ |
| 300 | `--ori-colour-primary-300` | `#C5C7E0` | 1.57 | 8.10 ✅ |
| 400 | `--ori-colour-primary-400` | `#A4A6C7` | 2.23 | 5.68 ✅ |
| 500 | `--ori-colour-primary-500` | `#8487AF` | 3.26 | 3.89 |
| 600 | `--ori-colour-primary-600` | `#676992` | 4.93 ✅ | 2.57 |
| 700 | `--ori-colour-primary-700` | `#505174` | 7.14 ✅ | 1.78 |
| 800 | `--ori-colour-primary-800` | `#3C3D58` | 9.88 ✅ | 1.28 |
| 900 | `--ori-colour-primary-900` | `#2C2D41` ⚓ | 12.69 ✅ | 1.00 |
| 950 | `--ori-colour-primary-950` | `#191A29` | 16.19 ✅ | 1.28 |

### 1.3 Secondary

| Stop | Token | Hex | vs Secondary 50 | vs Primary 900 |
|---|---|---|---|---|
| 50 | `--ori-colour-secondary-50` | `#F7F8FB` | 1.00 | 12.69 ✅ |
| 100 | `--ori-colour-secondary-100` | `#EDEFF4` ⚓ | 1.08 | 11.71 ✅ |
| 200 | `--ori-colour-secondary-200` | `#DBDFEB` | 1.25 | 10.11 ✅ |
| 300 | `--ori-colour-secondary-300` | `#BFC9E1` | 1.56 | 8.12 ✅ |
| 400 | `--ori-colour-secondary-400` | `#99A8D0` | 2.23 | 5.69 ✅ |
| 500 | `--ori-colour-secondary-500` | `#7589BF` | 3.25 | 3.90 |
| 600 | `--ori-colour-secondary-600` | `#576BA2` | 4.91 ✅ | 2.59 |
| 700 | `--ori-colour-secondary-700` | `#435382` | 7.07 ✅ | 1.80 |
| 800 | `--ori-colour-secondary-800` | `#323E63` | 9.86 ✅ | 1.29 |
| 900 | `--ori-colour-secondary-900` | `#242E49` | 12.66 ✅ | 1.00 |
| 950 | `--ori-colour-secondary-950` | `#141B2E` | 16.13 ✅ | 1.27 |

### 1.4 Neutral

| Stop | Token | Hex | vs Secondary 50 | vs Primary 900 |
|---|---|---|---|---|
| 50 | `--ori-colour-neutral-50` | `#F8F9FC` | 1.01 | 12.80 ✅ |
| 100 | `--ori-colour-neutral-100` | `#F1F1F5` | 1.06 | 11.96 ✅ |
| 200 | `--ori-colour-neutral-200` | `#E4E4E9` | 1.19 | 10.63 ✅ |
| 300 | `--ori-colour-neutral-300` | `#D0D0D6` | 1.45 | 8.77 ✅ |
| 400 | `--ori-colour-neutral-400` | `#ABACB1` | 2.13 | 5.95 ✅ |
| 500 | `--ori-colour-neutral-500` | `#85868B` | 3.42 | 3.71 |
| 600 | `--ori-colour-neutral-600` | `#68686E` | 5.21 ✅ | 2.43 |
| 700 | `--ori-colour-neutral-700` | `#4F4F54` | 7.67 ✅ | 1.65 |
| 800 | `--ori-colour-neutral-800` | `#36363B` | 11.31 ✅ | 1.12 |
| 900 | `--ori-colour-neutral-900` | `#202024` | 15.29 ✅ | 1.21 |
| 950 | `--ori-colour-neutral-950` | `#101013` | 17.89 ✅ | 1.41 |

### 1.5 Danger

| Stop | Token | Hex | vs Secondary 50 | vs Primary 900 |
|---|---|---|---|---|
| 50 | `--ori-colour-danger-50` | `#FFF6F5` | 1.00 | 12.67 ✅ |
| 100 | `--ori-colour-danger-100` | `#FFEBE8` | 1.08 | 11.74 ✅ |
| 200 | `--ori-colour-danger-200` | `#FFD4CE` | 1.27 | 9.98 ✅ |
| 300 | `--ori-colour-danger-300` | `#FFB3A9` | 1.61 | 7.87 ✅ |
| 400 | `--ori-colour-danger-400` | `#FF7C70` | 2.36 | 5.37 ✅ |
| 500 | `--ori-colour-danger-500` | `#EF433D` | 3.57 | 3.55 |
| 600 | `--ori-colour-danger-600` | `#CB131C` | 5.42 ✅ | 2.34 |
| 700 | `--ori-colour-danger-700` | `#A3000E` | 7.71 ✅ | 1.64 |
| 800 | `--ori-colour-danger-800` | `#7E0009` | 10.46 ✅ | 1.21 |
| 900 | `--ori-colour-danger-900` | `#5F0005` | 13.28 ✅ | 1.05 |
| 950 | `--ori-colour-danger-950` | `#3D0002` | 16.49 ✅ | 1.30 |

### 1.6 Warning

| Stop | Token | Hex | vs Secondary 50 | vs Primary 900 |
|---|---|---|---|---|
| 50 | `--ori-colour-warning-50` | `#FFF9F2` | 1.02 | 12.88 ✅ |
| 100 | `--ori-colour-warning-100` | `#FFF1DF` | 1.05 | 12.12 ✅ |
| 200 | `--ori-colour-warning-200` | `#FFE1B9` | 1.18 | 10.73 ✅ |
| 300 | `--ori-colour-warning-300` | `#FFCE8B` | 1.37 | 9.27 ✅ |
| 400 | `--ori-colour-warning-400` | `#FFBA51` | 1.60 | 7.95 ✅ |
| 500 | `--ori-colour-warning-500` | `#F2A400` | 1.96 | 6.47 ✅ |
| 600 | `--ori-colour-warning-600` | `#C58501` | 2.94 | 4.32 |
| 700 | `--ori-colour-warning-700` | `#936201` | 4.96 ✅ | 2.56 |
| 800 | `--ori-colour-warning-800` | `#734C01` | 7.16 ✅ | 1.77 |
| 900 | `--ori-colour-warning-900` | `#593A00` | 9.74 ✅ | 1.30 |
| 950 | `--ori-colour-warning-950` | `#362200` | 14.27 ✅ | 1.12 |

### 1.7 Success

| Stop | Token | Hex | vs Secondary 50 | vs Primary 900 |
|---|---|---|---|---|
| 50 | `--ori-colour-success-50` | `#EFFDF1` | 1.01 | 12.82 ✅ |
| 100 | `--ori-colour-success-100` | `#DCF9E1` | 1.06 | 11.98 ✅ |
| 200 | `--ori-colour-success-200` | `#BAEFC4` | 1.22 | 10.41 ✅ |
| 300 | `--ori-colour-success-300` | `#8CE09E` | 1.49 | 8.51 ✅ |
| 400 | `--ori-colour-success-400` | `#51C471` | 2.09 | 6.08 ✅ |
| 500 | `--ori-colour-success-500` | `#00A54B` | 3.05 | 4.16 |
| 600 | `--ori-colour-success-600` | `#017F38` | 4.83 ✅ | 2.63 |
| 700 | `--ori-colour-success-700` | `#00642B` | 6.92 ✅ | 1.83 |
| 800 | `--ori-colour-success-800` | `#004C1F` | 9.63 ✅ | 1.32 |
| 900 | `--ori-colour-success-900` | `#003915` | 12.39 ✅ | 1.02 |
| 950 | `--ori-colour-success-950` | `#00230A` | 15.89 ✅ | 1.25 |

### 1.8 Info

| Stop | Token | Hex | vs Secondary 50 | vs Primary 900 |
|---|---|---|---|---|
| 50 | `--ori-colour-info-50` | `#F4F9FF` | 1.00 | 12.73 ✅ |
| 100 | `--ori-colour-info-100` | `#E7F1FF` | 1.07 | 11.82 ✅ |
| 200 | `--ori-colour-info-200` | `#CCE2FF` | 1.24 | 10.19 ✅ |
| 300 | `--ori-colour-info-300` | `#A5CCFF` | 1.56 | 8.14 ✅ |
| 400 | `--ori-colour-info-400` | `#6AACFF` | 2.21 | 5.75 ✅ |
| 500 | `--ori-colour-info-500` | `#1888FF` | 3.29 | 3.85 |
| 600 | `--ori-colour-info-600` | `#006BD0` | 4.93 ✅ | 2.58 |
| 700 | `--ori-colour-info-700` | `#0053A4` | 7.13 ✅ | 1.78 |
| 800 | `--ori-colour-info-800` | `#003F7F` | 9.80 ✅ | 1.29 |
| 900 | `--ori-colour-info-900` | `#002E60` | 12.68 ✅ | 1.00 |
| 950 | `--ori-colour-info-950` | `#001B3D` | 16.15 ✅ | 1.27 |

### 1.9 Alpha and transparent

**Why alpha tokens exist:** hover and pressed *state layers* on transparent or ghost components (text buttons, list rows, table rows, icon buttons) and scrims behind overlays. A state layer has to work on whatever surface it sits on, which stepping along a ramp can't do. **Filled buttons should still step along the ramp** (e.g. Primary 900 → 800), not use alpha.

Only two alpha ramps, one per brand surface: **Primary 900** (dark layer on light surfaces) and **Secondary 100** (light layer on Primary surfaces). Steps are 10/20/40/60/80: the opacity scale (§7) plus a **10** for subtle hover.

| Token | rgba | Hex8 | Typical use |
|---|---|---|---|
| `--ori-colour-transparent` | `rgba(0, 0, 0, 0)` | `#00000000` | Transparent fills and borders |
| `--ori-colour-primary-alpha-900-10` | `rgba(44, 45, 65, 0.1)` | `#2C2D411A` | Hover state layer |
| `--ori-colour-primary-alpha-900-20` | `rgba(44, 45, 65, 0.2)` | `#2C2D4133` | Pressed / selected state layer |
| `--ori-colour-primary-alpha-900-40` | `rgba(44, 45, 65, 0.4)` | `#2C2D4166` | Disabled overlay, dimming |
| `--ori-colour-primary-alpha-900-60` | `rgba(44, 45, 65, 0.6)` | `#2C2D4199` | Scrim behind modals and drawers |
| `--ori-colour-primary-alpha-900-80` | `rgba(44, 45, 65, 0.8)` | `#2C2D41CC` | Heavy scrim, image overlays |
| `--ori-colour-secondary-alpha-100-10` | `rgba(237, 239, 244, 0.1)` | `#EDEFF41A` | Hover state layer |
| `--ori-colour-secondary-alpha-100-20` | `rgba(237, 239, 244, 0.2)` | `#EDEFF433` | Pressed / selected state layer |
| `--ori-colour-secondary-alpha-100-40` | `rgba(237, 239, 244, 0.4)` | `#EDEFF466` | Disabled overlay, dimming |
| `--ori-colour-secondary-alpha-100-60` | `rgba(237, 239, 244, 0.6)` | `#EDEFF499` | Scrim behind modals and drawers |
| `--ori-colour-secondary-alpha-100-80` | `rgba(237, 239, 244, 0.8)` | `#EDEFF4CC` | Heavy scrim, image overlays |

**Checked:** at 10% and 20%, Primary 900 text stays ≥ 8:1 on a Primary-900 layer over Secondary 100, and Secondary 100 text stays ≥ 6.4:1 on a Secondary-100 layer over Primary 900. **At 40% and above, text contrast breaks down** (Secondary 100 text drops to 3.65:1 at 40%), so those steps are for scrims and dimming only, never for interactive state layers with text on top.

| Composite | Result | Text contrast |
|---|---|---|
| `primary-alpha-900-10` over Secondary 100 | `#DADCE2` | Primary 900 text: 9.83:1 |
| `primary-alpha-900-20` over Secondary 100 | `#C6C8D0` | Primary 900 text: 8.07:1 |
| `secondary-alpha-100-10` over Primary 900 | `#3F4053` | Secondary 100 text: 8.82:1 |
| `secondary-alpha-100-20` over Primary 900 | `#535465` | Secondary 100 text: 6.46:1 |

### 1.10 Measured literals

These colours were read off built components in the ShadCN UI Kit file. They are not stops on the OKLCH ramps. Do not round them onto a nearby stop.

| Token | Value | Measured on |
|---|---|---|
| `--ori-colour-white` | `#FFFFFF` | Badge destructive text. Ghost and Link fills are white at alpha 0 (transparent), not this solid. |
| `--ori-colour-white-alpha-10` | `rgba(255, 255, 255, 0.1)` | Button Default hover, painted over Primary 900 |
| `--ori-colour-white-alpha-20` | `rgba(255, 255, 255, 0.2)` | Button Secondary hover, and Badge Default hover |
| `--ori-colour-ash` | `#A3A3A3` | Focus shadow colour. Neutral 400 is `#ABACB1`. |
| `--ori-colour-scarlet` | `#DC2626` | Button Destructive focus shadow, at alpha 0.2. Danger 500 is `#EF433D`. Danger 600 is `#CB131C`. |

---

## 2. Shadows

Raw box-shadow values. **Number = blur radius of the outermost layer in px** for the five scale shadows. Each of those is two layers (a tight contact shadow plus a soft ambient one); larger shadows use negative spread so they stay tight instead of bloating. Those five layers are tinted with **Primary 950** (`rgb(25, 26, 41)`) rather than black. Shadows stay in px (they should not scale with font size).

The measured literals below are copied from component effects. They are black or ash or scarlet, not Primary 950, and they are not part of the blur-radius scale.

| Token | Value | Typical use |
|---|---|---|
| `--ori-shadow-2` | `0px 1px 2px 0px rgba(25, 26, 41, 0.08)` | Hairline lift: resting cards, inputs |
| `--ori-shadow-4` | `0px 1px 2px 0px rgba(25, 26, 41, 0.06), 0px 2px 4px 0px rgba(25, 26, 41, 0.08)` | Raised: hovered cards, sticky bars |
| `--ori-shadow-8` | `0px 2px 4px 0px rgba(25, 26, 41, 0.05), 0px 4px 8px 0px rgba(25, 26, 41, 0.1)` | Floating: menus, dropdowns, popovers |
| `--ori-shadow-16` | `0px 4px 8px -2px rgba(25, 26, 41, 0.06), 0px 8px 16px -2px rgba(25, 26, 41, 0.12)` | Overlay: drawers, side panels, toasts |
| `--ori-shadow-32` | `0px 8px 16px -4px rgba(25, 26, 41, 0.08), 0px 16px 32px -4px rgba(25, 26, 41, 0.16)` | Modal: dialogs, command palette |
| `--ori-shadow-black-2` | `0px 1px 2px 0px rgba(0, 0, 0, 0.05)` | Button, Outline, Checkbox, Input, and Textarea resting shadow. Not `--ori-shadow-2`. |
| `--ori-shadow-focus-ash` | `0px 0px 0px 3px rgba(163, 163, 163, 0.5)` | Focus ring on Button (except Destructive), Ghost, Link, Outline, Checkbox, Radio, Input, Textarea |
| `--ori-shadow-focus-scarlet` | `0px 0px 0px 3px rgba(220, 38, 38, 0.2)` | Button Destructive focus |
| `--ori-shadow-toast` | `0px 4px 12px -1px rgba(0, 0, 0, 0.1)` | Toast rest. Not `--ori-shadow-16`. |
| `--ori-shadow-toast-focus` | `0px 4px 12px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px 2px rgba(0, 0, 0, 0.2)` | Toast focus. Not the ash focus shadow. |

> The shadow colour is a literal rgba value (CSS shadows cannot take an alpha of a token). If Primary 950 ever changes, update the five scale shadows. Leave the measured literals alone.

---

## 3. Spacing

4px base with 2px for hairline adjustments. Named by px value, so `spacing-16` is always 16px. Used for padding, margin, gap and sizing. Steps 1, 3, 6, 10, 14, 36, and 76 were added from component measurements. They are exact px values.

| Token | px | rem |
|---|---|---|
| `--ori-spacing-0` | 0px | 0 |
| `--ori-spacing-1` | 1px | 0.0625rem |
| `--ori-spacing-2` | 2px | 0.125rem |
| `--ori-spacing-3` | 3px | 0.1875rem |
| `--ori-spacing-4` | 4px | 0.25rem |
| `--ori-spacing-6` | 6px | 0.375rem |
| `--ori-spacing-8` | 8px | 0.5rem |
| `--ori-spacing-10` | 10px | 0.625rem |
| `--ori-spacing-12` | 12px | 0.75rem |
| `--ori-spacing-14` | 14px | 0.875rem |
| `--ori-spacing-16` | 16px | 1rem |
| `--ori-spacing-20` | 20px | 1.25rem |
| `--ori-spacing-24` | 24px | 1.5rem |
| `--ori-spacing-32` | 32px | 2rem |
| `--ori-spacing-36` | 36px | 2.25rem |
| `--ori-spacing-40` | 40px | 2.5rem |
| `--ori-spacing-48` | 48px | 3rem |
| `--ori-spacing-64` | 64px | 4rem |
| `--ori-spacing-76` | 76px | 4.75rem |
| `--ori-spacing-80` | 80px | 5rem |
| `--ori-spacing-96` | 96px | 6rem |

---

## 4. Radius

Medium-soft personality: friendly enough for a career product, still precise. `full` (9999px) gives pills and circles; one token covers both.

| Token | px | rem | Typical use |
|---|---|---|---|
| `--ori-radius-0` | 0px | 0 | Square: tables, dividers, full-bleed media |
| `--ori-radius-4` | 4px | 0.25rem | Small elements: tags, checkboxes, tooltips |
| `--ori-radius-8` | 8px | 0.5rem | Default: buttons, inputs, selects |
| `--ori-radius-12` | 12px | 0.75rem | Cards, panels, dropdown menus |
| `--ori-radius-16` | 16px | 1rem | Modals, large cards, drawers |
| `--ori-radius-24` | 24px | 1.5rem | Hero blocks, feature containers |
| `--ori-radius-full` | 9999px | n/a (sentinel, not scaled) | Pills, avatars, toggles, circular buttons |

---

## 5. Elevations

Named levels 0–5 that map onto the shadow scale. A shadow is a raw value; an elevation is a *rung on the ladder*, which is what the semantic layer should reference (e.g. `card-resting` → `elevation-1`).

| Token | Resolves to | Typical use |
|---|---|---|
| `--ori-elevation-0` | `none` | Flat: page background, inline content |
| `--ori-elevation-1` | `--ori-shadow-2` | Resting cards, inputs |
| `--ori-elevation-2` | `--ori-shadow-4` | Hovered / raised cards, sticky header |
| `--ori-elevation-3` | `--ori-shadow-8` | Menus, dropdowns, popovers, tooltips |
| `--ori-elevation-4` | `--ori-shadow-16` | Drawers, side panels, toasts |
| `--ori-elevation-5` | `--ori-shadow-32` | Modals, dialogs, command palette |

> **Dark surfaces:** a navy-tinted shadow is nearly invisible on Primary 900. When dark surfaces need elevation, express it by stepping the surface (Primary 900 → 800) plus a border, not by shadow. That decision belongs in the semantic layer.

---

## 6. Borders and focus ring

### 6.1 Width

| Token | px | rem | Typical use |
|---|---|---|---|
| `--ori-border-width-0` | 0px | 0 | Reset / remove border |
| `--ori-border-width-1` | 1px | 0.0625rem | Default: inputs, cards, dividers |
| `--ori-border-width-1-33` | 1.33px | 0.083125rem | Checkbox check stroke and Radio selected-dot stroke |
| `--ori-border-width-2` | 2px | 0.125rem | Emphasis: selected, error, active states |
| `--ori-border-width-4` | 4px | 0.25rem | Heavy accents: progress, indicator bars |

### 6.2 Style

| Token | Value | Typical use |
|---|---|---|
| `--ori-border-style-solid` | `solid` | Default |
| `--ori-border-style-dashed` | `dashed` | Drop zones, file upload, placeholders |

### 6.3 Focus ring

Two-layer approach: a **2px solid outline** with a **2px offset**, so the ring floats in a gap and only has to contrast with the surface behind it, not with the component's own fill. Applies to every interactive element on `:focus-visible`.

| Token | Value | Notes |
|---|---|---|
| `--ori-focus-ring-width` | 2px (0.125rem) | Meets WCAG 2.2 minimum thickness |
| `--ori-focus-ring-offset` | 2px (0.125rem) | Gap between component edge and ring |
| `--ori-focus-ring-style` | `solid` | |
| `--ori-focus-ring-colour-on-light` | `--ori-colour-info-600` (`#006BD0`) | ≥ 3:1 on Secondary 50 (4.93), Secondary 100 (4.55) and Secondary 200 (3.93) |
| `--ori-focus-ring-colour-on-dark` | `--ori-colour-secondary-300` (`#BFC9E1`) | ≥ 3:1 on Primary 950 (10.37), Primary 900 (8.12) and Primary 800 (6.33) |

The two colour rows are **aliases** to colour primitives, included here so the ring is complete in one place. Blue on light surfaces is deliberate: it stays distinct from the navy brand fills and from red error borders, so focus and error can appear together without confusion.

---

## 7. Opacity

**Do we need both opacity and alpha tokens? Yes, for different jobs.** Alpha tokens (§1.9) bake a *colour* plus transparency, for state layers and scrims. Opacity tokens dim a *whole element* whose colour you don't control: disabled controls, loading states, image fades, fade-in/out transitions.

| Token | Value | Percent | Typical use |
|---|---|---|---|
| `--ori-opacity-0` | 0 | 0% | Fully transparent (fade-out end state) |
| `--ori-opacity-20` | 0.2 | 20% | Faint: ghosted skeletons, watermarks |
| `--ori-opacity-40` | 0.4 | 40% | Disabled controls that Figma still draws at 0.4 |
| `--ori-opacity-50` | 0.5 | 50% | Button disabled and loading. Checkbox, Input, and Textarea disabled |
| `--ori-opacity-60` | 0.6 | 60% | Button pressed |
| `--ori-opacity-80` | 0.8 | 80% | Slightly dimmed, hover on media |
| `--ori-opacity-100` | 1 | 100% | Fully opaque (default) |

---

## 8. Breakpoints

Mobile-first (`min-width`). Orintis ships on desktop and mobile; tablets use the `md` layout. **Media queries must use rem/em**, not px, so layouts respond correctly to browser zoom and larger default font sizes.

| Token | px | rem | Device class | Notes |
|---|---|---|---|---|
| `--ori-breakpoint-xs` | 320px | 20rem | Mobile | Minimum supported width (floor, not a query) |
| `--ori-breakpoint-sm` | 480px | 30rem | Mobile | Large phones, small landscape |
| `--ori-breakpoint-md` | 768px | 48rem | Tablet | Tablets, portrait |
| `--ori-breakpoint-lg` | 1024px | 64rem | Desktop | Small laptops, tablet landscape |
| `--ori-breakpoint-xl` | 1280px | 80rem | Desktop | Standard desktop |
| `--ori-breakpoint-2xl` | 1440px | 90rem | Desktop | Large desktop |

> CSS custom properties can't be used inside media queries. These tokens exist for documentation, design tooling and JS/build pipelines; write the rem value into the `@media` rule.

---

## 9. Z-index

Numeric layers spaced 100 apart so a layer can be inserted later (e.g. 150) without renumbering. **Components never use raw numbers**; the semantic layer will name them. Suggested mapping below.

| Token | Value | Suggested semantic use |
|---|---|---|
| `--ori-z-index-below` | -100 | Decorative layers behind content |
| `--ori-z-index-0` | 0 | Base content |
| `--ori-z-index-100` | 100 | Sticky headers, fixed sidebar |
| `--ori-z-index-200` | 200 | Dropdowns, select menus, popovers |
| `--ori-z-index-300` | 300 | Drawers, side panels |
| `--ori-z-index-400` | 400 | Modal backdrop (scrim) |
| `--ori-z-index-500` | 500 | Modals, dialogs |
| `--ori-z-index-600` | 600 | Toasts, snackbars |
| `--ori-z-index-700` | 700 | Tooltips |
| `--ori-z-index-top` | 9999 | Emergency layer: skip-links, dev overlays |

---

## 10. Layout

### 10.1 Grid

4 columns on mobile, 8 on tablet, 12 on desktop. Gutters and margins all come from the spacing scale.

| Breakpoint | Range | Columns | Gutter | Margin |
|---|---|---|---|---|
| `xs` | 320–479px | 4 | 16px (1rem) | 16px (1rem) |
| `sm` | 480–767px | 4 | 16px (1rem) | 24px (1.5rem) |
| `md` | 768–1023px | 8 | 24px (1.5rem) | 32px (2rem) |
| `lg` | 1024–1279px | 12 | 24px (1.5rem) | 48px (3rem) |
| `xl` | 1280–1439px | 12 | 24px (1.5rem) | 64px (4rem) |
| `2xl` | 1440+px | 12 | 24px (1.5rem) | 64px (4rem) |

Tokens: `--ori-layout-grid-columns-{bp}`, `--ori-layout-grid-gutter-{bp}`, `--ori-layout-grid-margin-{bp}`.

### 10.2 Content widths

| Token | px | rem | Use |
|---|---|---|---|
| `--ori-layout-content-max` | 1200px | 75rem | Max width of page content; 12 cols × 78px + 11 × 24px gutters |
| `--ori-layout-reading-max` | 720px | 45rem | Chat threads, long-form text (~70 characters per line) |
| `--ori-layout-form-max` | 480px | 30rem | Single-column forms and auth screens |

### 10.3 App shell

Fixed dimensions for the persistent chrome of the product. These are proposals; validate them against your first real screens.

| Token | px | rem | Use |
|---|---|---|---|
| `--ori-layout-sidebar-width` | 264px | 16.5rem | Expanded sidebar (desktop) |
| `--ori-layout-sidebar-width-collapsed` | 72px | 4.5rem | Collapsed, icon-only sidebar |
| `--ori-layout-header-height` | 64px | 4rem | Top bar, tablet and desktop |
| `--ori-layout-header-height-mobile` | 56px | 3.5rem | Top bar, mobile |
| `--ori-layout-bottom-nav-height` | 56px | 3.5rem | Bottom tab bar, mobile |
| `--ori-layout-panel-width-sm` | 360px | 22.5rem | Side panel / drawer (e.g. details) |
| `--ori-layout-panel-width-lg` | 480px | 30rem | Wide side panel / drawer (e.g. AI assistant) |

---

## 11. Typography

Fonts are Google Fonts. Atomic primitives only; composite text styles (heading-lg, body-md …) belong in the semantic layer.

### 11.1 Families

| Token | Value |
|---|---|
| `--ori-font-family-sans` | `"Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--ori-font-family-serif` | `"Noto Serif", Georgia, "Times New Roman", serif` |
| `--ori-font-family-geist` | `"Geist", "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |

Geist is the typeface on the built components in Figma (Button, Badge, Avatar, Label, Checkbox, Radio, Input, Textarea). Noto Sans stays the default sans token. Load Geist at weights 400–700.

Google Fonts has **Noto Sans** and **Noto Serif** (there is no family called "Noto Sans Serif"), so the serif token assumes Noto Serif. Both are variable fonts; load weights 400–700 only.

### 11.2 Weights

| Token | Value | Name |
|---|---|---|
| `--ori-font-weight-400` | 400 | Regular |
| `--ori-font-weight-500` | 500 | Medium |
| `--ori-font-weight-600` | 600 | Semibold |
| `--ori-font-weight-700` | 700 | Bold |

### 11.3 Sizes

| Token | px | rem |
|---|---|---|
| `--ori-font-size-12` | 12px | 0.75rem |
| `--ori-font-size-14` | 14px | 0.875rem |
| `--ori-font-size-16` | 16px | 1rem |
| `--ori-font-size-18` | 18px | 1.125rem |
| `--ori-font-size-20` | 20px | 1.25rem |
| `--ori-font-size-24` | 24px | 1.5rem |
| `--ori-font-size-28` | 28px | 1.75rem |
| `--ori-font-size-32` | 32px | 2rem |
| `--ori-font-size-40` | 40px | 2.5rem |
| `--ori-font-size-48` | 48px | 3rem |

### 11.4 Line heights

Two kinds of token. **Leading** tokens are fixed px values on the 4px grid, for any text that can wrap or truncate. **Non-leading** (`none`) is a single unitless ratio of 1 (100%) that works at every font size, for single-line text inside fixed-size controls.

**Leading (4px grid)**

Suggested size → line-height pairings for the semantic layer: 12→16, 14→20, 16→24, 18→28, 20→28, 24→32, 28→36, 32→40, 40→48, 48→56.

| Token | px | rem |
|---|---|---|
| `--ori-line-height-16` | 16px | 1rem |
| `--ori-line-height-20` | 20px | 1.25rem |
| `--ori-line-height-24` | 24px | 1.5rem |
| `--ori-line-height-28` | 28px | 1.75rem |
| `--ori-line-height-32` | 32px | 2rem |
| `--ori-line-height-36` | 36px | 2.25rem |
| `--ori-line-height-40` | 40px | 2.5rem |
| `--ori-line-height-48` | 48px | 3rem |
| `--ori-line-height-56` | 56px | 3.5rem |

**Non-leading**

| Token | Value | Use |
|---|---|---|
| `--ori-line-height-none` | 1 (100%) | Single-line labels whose measured line height is 100%, such as Label |

**Rules for `line-height-none`**

1. **Single-line only.** Never on text that can wrap (lines would touch) or truncate with an ellipsis (`overflow: hidden` clips descenders and accents, because Noto Sans's natural line height is taller than 1).
2. **Height comes from the control, not from padding.** Use `min-height` from the control-size scale plus flex centring (`display: inline-flex; align-items: center`). Deriving height from padding lands off the 4px grid (a 14px label in a 40px button would need 13px of vertical padding).
3. **Never a fixed `height`.** WCAG 1.4.12 lets users override line-height to 1.5; fixed heights clip the text, `min-height` does not.
4. **Test with real strings**, including German compounds and any non-Latin script you will support, before approving a component that uses it.

### 11.5 Letter spacing

| Token | Value | Typical use |
|---|---|---|
| `--ori-letter-spacing-tight` | -0.02em | Display sizes (40px and up) |
| `--ori-letter-spacing-snug` | -0.01em | Headings |
| `--ori-letter-spacing-normal` | 0em | Body text |
| `--ori-letter-spacing-wide` | 0.02em | Small text, buttons |
| `--ori-letter-spacing-wider` | 0.04em | All-caps labels and overlines |

---


## Merge: branch-only primitives

| `--ori-radius-6` | 6px | 0.375rem | Select menu item. Tailwind `rounded-md` is this value. |
| `--ori-shadow-menu` | `0px 2px 4px -2px rgba(0, 0, 0, 0.1), 0px 4px 6px -1px rgba(0, 0, 0, 0.1)` | Select menu. Not `--ori-shadow-8`. |


## Merge: branch-only primitives

| `--ori-radius-10` | 10px | 0.625rem | Dialog surface. Not radius-8 or radius-12. |
| `--ori-shadow-dialog` | `0px 4px 6px -4px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)` | Dialog surface. Not `--ori-shadow-32`. |


## Merge: branch-only primitives

| `--ori-shadow-tabs` | `0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1)` | Selected Tabs trigger. Not `--ori-shadow-2`. |
