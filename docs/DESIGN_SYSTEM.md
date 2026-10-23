# Design System

Updated for the redesign (2026-10-23): shadcn/ui primitives, V2 "showcase" look. Visual reference: `docs/reference/page-v2.tsx`. Decisions behind the values: `docs/DECISIONS.md` → Redesign.

## Design intent

**Precise, quiet, premium: polished steel under a moving light.** Medical-grade trust, not gaming neon. Near-black teal canvases for the hero and feature sections, paper-white for the catalogue and reading sections, joined by rounded overlapping sheets. Bold display type, bento grids, one memorable interaction per page. It must stay clearly its own design, not a restyle of the reference site.

Keywords: precise, calm, engineered, confident, legible.

## Colour tokens

Everything lives in `src/app/globals.css` as CSS variables, mapped to Tailwind with `@theme inline`. Components use semantic names (`bg-background`, `text-muted-foreground`, `bg-primary`, `text-link`…), never hex. Values that CSS cannot reach (placeholder SVGs, OG image, browser theme colour) come from `src/config/theme.ts`, kept in step with the CSS.

**Brand (the only values to change when rebranding)**

| Token | Value | Use |
| --- | --- | --- |
| `--brand` → `--primary` | `#097E9E` | Client colour. Buttons, fills, large accents. White text on it: 4.68:1 |
| `--brand-deep` → `--primary-deep`, `--link` (light) | `#07657F` | Links and small accent text on light (5.9:1 on paper), button hover |
| `--glow` → `--link` (dark) | `#8EEBFF` | Links, small accent text, icons and focus ring on dark (13.5:1 on deep) |

**Contrast rule:** `#097E9E` is 4.18:1 on paper and 4.23:1 on night, so it is **never used for small text**. Use it for buttons, fills and large type only. Small accent text uses `--link`, which resolves to `--brand-deep` on light and `--glow` on dark.

**Steel palette**

| Token | Value | Use |
| --- | --- | --- |
| `--night` | `#050B0E` | Dark section background |
| `--deep` | `#0B161B` | Cards on dark |
| `--raise` | `#12232A` | Nested surfaces on dark |
| `--silver` | `#EAF1F5` | Text on dark (17.4:1) |
| `--steel` | `#9DB0BA` | Secondary text on dark (8.8:1) |
| `--steel-dim` | `#74888F` | Meta text on dark only (4.9 to 5.3:1) |
| `--paper` | `#EEF3F5` | Light page background |
| `--ink` | `#08171C` | Text on light (16.9:1) |
| `--rule` | `#D3DDE2` | Borders and 1px rules on light |

**Semantic tokens (shadcn).** Light values on `:root`; the `.surface-dark` class redefines the same names for dark sections, so any shadcn component placed in a dark section restyles itself.

| Token | Light | `.surface-dark` |
| --- | --- | --- |
| `--background` / `--foreground` | paper / ink | night / silver |
| `--card` | `#FFFFFF` | deep |
| `--muted` / `--muted-foreground` | `#E2EAEE` / `#44585F` (6.7:1) | raise / steel |
| `--accent` / `--accent-foreground` | brand at 12% on white / brand-deep | white 8% / white |
| `--border` / `--input` | rule | white 10% / white 16% |
| `--ring`, `--link` | brand-deep | glow |
| `--destructive` | `#B3412A` (5.1:1 on paper) | `#FF9E8A` (9.9:1 on night) |

Dark mode is **not** required. Dark sections are dark by design; popovers and dialogs portal to `body` and use the light tokens unless given `surface-dark`.

**Legacy names** (`ink-soft`, `steel-900/600/300/100`, `legacy-accent`, `accent-strong/deep/soft`, `warn`, radii `control`/`card`) remain as aliases until every page is migrated. They are removed in redesign Phase 6; do not use them in new code.

## Typography

Loaded with `next/font/google` in `src/app/layout.tsx` (self-hosted, `display: swap`, Latin subset, no layout shift).

- **Display:** _Bricolage Grotesque_ (`--font-display`, weight axis only). H1 to H3, big numbers, the footer wordmark. Weight 600, tight tracking.
- **Body / UI:** _Geist_ (`--font-sans`).
- **Mono:** _Geist Mono_ (`--font-mono`, not preloaded). Product codes and spec values only.
- No serif fonts (client request, 2026-10-17).

Scale (fluid, in `globals.css`):

| Class | Size | Line height | Tracking |
| --- | --- | --- | --- |
| `.text-display` | 44 to 96px | 0.98 | −0.045em |
| `.text-h1` | 40 to 76px | 1.02 | −0.04em |
| `.text-h2` | 32 to 56px | 1.05 | −0.035em |
| `.text-h3` | 22 to 28px | 1.15 | −0.03em |
| `.text-lede` | 17 to 21px | 1.55 | normal |
| body | 16 to 18px | 1.6 | normal |

- `.text-metal` (dark) and `.text-metal-ink` (light) give key headlines a polished-metal gradient fill. Use on one headline per section at most.
- `.eyebrow`: 12px uppercase, 0.14em tracking, colour `--link`.
- Max text measure 68ch (`.measure`).

## Spacing and layout

- 8px base unit. Section padding: 112px desktop, 80px tablet, 64px mobile.
- Container max width 1320px; side gutters 20px mobile, 40px from `md`.
- Layout patterns: bento grids (featured ranges), sticky stacking cards (process), horizontal snap scrollers on mobile, one idea per viewport.
- `.sheet`: a section with a 2 to 2.5rem rounded top that overlaps the section above it.
- **Radius:** `--radius` 0.875rem. Buttons and chips are pills (`rounded-full`). Inputs `rounded-lg` (`--radius`). Cards `rounded-2xl` (about 1.5rem). Large sheets 2 to 2.5rem.
- Borders are 1px (`--border`). Shadows soft and low; `--shadow-sheet` for stacked cards on dark.

## Surfaces and effects

All decorative layers use `pointer-events: none` and never cover content.

- `.surface-dark`: switches a section to the dark token set.
- `.glass`: frosted nav pill (blur 16px). Solid fallback where `backdrop-filter` is unsupported. Use on the nav only, for performance.
- `.grain`: subtle noise over dark sections (one static layer).
- `.spotlight`: pointer-following glow; set `--x` / `--y` from a pointer handler (rAF-throttled, no React state per frame).
- `.dots`: dotted stage behind product art on light surfaces.
- Glows derive from `--brand` and `--glow` with `color-mix`, so they follow a brand swap.

## Components

Primitives are shadcn/ui (`new-york` style, Radix) in `src/components/ui/`, restyled through the tokens above. Install with `npx shadcn@latest add <name>`, then change any `import { cn } from "cn"` to `@/lib/utils` (the project keeps its own `cn`). Sources and credits: `docs/COMPONENT_SOURCES.md`.

- **Buttons:** pill, 44 to 48px tall. Primary = `bg-primary` with white text; on dark, outline and ghost variants use silver text. Visible focus ring (2px `--ring`, 2px offset).
- **Cards:** `rounded-2xl`, 1px border; on dark, `bg-card` (deep) with a spotlight hover; on light, white.
- **Inputs:** 48px tall, label above, clear focus and error states (`aria-invalid` styles from shadcn).
- **Chips:** shadcn `Badge`, pill.
- **Section headings:** eyebrow + display title + optional one-line lede, left-aligned by default.

## Motion

Library: Motion (`motion/react`) for scroll-linked and gesture work; CSS for everything else.

- **Reveal:** fade up 16px, 500ms, ease-out, staggered 60ms, once on scroll into view (`Reveal`: CSS + IntersectionObserver, visible without JavaScript).
- **Hero:** one light sweep across the instrument on load (about 2.4s), then the light follows the pointer.
- **Count-up:** 1.4s, ease-out, once.
- **Marquee:** about 40s per loop, pauses on hover and focus.
- **Timeline:** line fills with scroll (`useScroll`). **Stacking cards:** CSS `position: sticky`.
- No page transitions; no smooth-scroll libraries.
- **Always respect `prefers-reduced-motion`:** no sweep, parallax, count-up, marquee or scroll-linked fill. Show final states at once.

## Imagery

All demo imagery is **generated placeholder art**, never third-party photos.

- `PlaceholderImage` (`src/components/media/placeholder-image.tsx`) shows a static SVG from `/art/<kind>-<view>-<ratio>-<tone>.svg`, prerendered at build time and lazy-loaded like a photo.
- The art (`instrument-art.ts`) is polished steel adapted from V2: each rod drawn as outline, body, shade and highlight. Kinds: forceps, scissors, retractor, needle holder, clamp, generic (made to order, drawn as a dashed outline). Views: front, back (mirrored), side (profile), top, angle, detail (close-up of the working end).
- Tones: `steel` (dotted white stage, for light sections and product pages) and `ink` (night ground with brand glow, for dark sections).
- Label chip (e.g. "Side view") when `showLabel` is set.
- Aspect ratios: product 4:3 (main), 1:1 (thumbnails), category 3:2, hero and video poster 16:9, portrait 4:5.
- Real photos later: set `src` on the product image; `ProductVisual` switches to `next/image` with no other change. White or neutral background, at least 2000px on the long edge for zoom, WebP/AVIF.
- Icons: Lucide, 1.5px stroke.

## Tone of voice for placeholder copy

Short, concrete, calm. Active voice. No superlatives like "world's best" or "No.1". No medical claims. Sentences under 22 words. Written for readers whose first language may not be English.

## Accessibility

- WCAG 2.2 AA minimum
- All interactive elements keyboard reachable, visible focus, logical tab order
- Touch targets ≥ 44px
- Semantic landmarks (`header`, `nav`, `main`, `footer`), one H1 per page
- Meaningful `alt` on images; decorative images `alt=""`
- Modals and lightbox: focus trap, Esc to close, return focus to trigger, `aria-modal`
- Forms: programmatic labels, error text linked via `aria-describedby`
