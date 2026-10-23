# Component Sources

Where every UI component in the redesign comes from, so licences and credits can be checked.

## Summary

- **shadcn/ui:** 26 primitives (MIT), restyled with the project tokens.
- **21st.dev:** none used (MCP search unavailable; user decision to proceed without it).
- **Custom showpieces adapted from V2:** 10 (marked ★ below): light-sweep hero, spotlight card, product viewer with loupe, count-up, marquee, video player dialog, product gallery, history timeline, stacking cards, plus the wordmark footer.

## 21st.dev

**Status: optional, not used so far (user decision, 2026-10-23).** At audit time the 21st.dev MCP was authenticated, but catalogue search returned errors and the free tier allows 2 code retrievals a day with no AI generation. Showpiece sections are therefore built from shadcn/ui + Motion, adapting the effects already designed in V2 (`docs/reference/page-v2.tsx`).

If the user supplies 21st.dev components, each gets a row here with: our file, the 21st.dev component name, its author, URL, the licence or usage terms shown, and what was adapted (tokens, copy, imagery, accessibility, reduced motion). Unclear licences are flagged for review.

| Our file | 21st.dev component | Author | URL | Licence / terms | Adapted |
| --- | --- | --- | --- | --- | --- |
| none yet | | | | | |

## shadcn/ui

Installed with `npx shadcn@latest add …` (CLI 4.22.1, `new-york` style, Radix primitives) into `src/components/ui/`. Licence: MIT. Unused ones are removed in Phase 6.

Local changes to the generated files:
- `import { cn } from "cn"` rewritten to `@/lib/utils` in every file (the project keeps its own `cn`; the `cn` package is not installed).
- `sonner.tsx`: `next-themes` removed (no dark mode); the toaster uses the light theme.
- `carousel.tsx`: initial scroll state read on the next animation frame (fixes the `react-hooks/set-state-in-effect` lint error), and the `reInit` listener is now removed on cleanup.

**In use (final):** badge, breadcrumb, button, checkbox, command, dialog, drawer, empty, field, hover-card, input, label, navigation-menu, pagination, popover, select, separator, sheet, skeleton, sonner, table, tabs, textarea, toggle, toggle-group, tooltip (26).

**Removed in Phase 6 (unused):** accordion, aspect-ratio, card, carousel (and its `embla-carousel-react` dependency), scroll-area.

Changed in Phase 6: every `dark:` class was stripped from the generated files (no dark theme; `dark:` is also tied to an unused `.dark` class).

Changed in Phase 5: `input.tsx`, `textarea.tsx` and `checkbox.tsx` (48px fields, rounder corners, card background, borders in `--steel-dim` for 3:1 non-text contrast, stronger focus ring).

Changed in Phase 4: `command.tsx` (`CommandInput` takes a `wrapperClassName`, and its search icon is hidden from screen readers), `carousel.tsx` is not used yet (phones use CSS scroll snap).

Changed in Phase 3: `dialog.tsx` (night overlay with blur, rounder panel, larger close button with a `closeLabel` prop for its accessible name).

Changed in Phase 2: `button.tsx` (pill shape, larger sizes, full-strength focus ring, `glow` variant for dark surfaces, token-based outline and link variants), `navigation-menu.tsx` (rounder, deeper dropdown panel with more offset), `breadcrumb.tsx` (`BreadcrumbPage` no longer claims `role="link"`, which misled screen readers).

Not installed: `combobox` (it pulls in `@base-ui/react`; the country picker uses Popover + Command instead).

## Custom (adapted from V2)

Showpieces built in-house from the V2 design. The list is filled in per phase.

| Our file | Adapted from (V2) | Notes |
| --- | --- | --- |
| `src/components/media/instrument-art.ts` | `Tube`, `Ring`, `HingedBody`, `RetractorBody`, `SideBody`, `DetailBody`, `CustomFrame` | Ported from React SVG to SVG strings so the art is served as prerendered static images. Added views: back (mirrored), top, angle, retractor side and detail. |
| `src/components/layout/header.tsx` | V2 `Header` (glass nav pill) | Rebuilt on shadcn NavigationMenu (Products mega-menu with range thumbnails) and Sheet (mobile menu). |
| `src/components/layout/footer.tsx` | V2 `Footer` (large wordmark) | Wordmark sized from the brand-name length so any name fits on one line. |
| `src/components/layout/page-hero.tsx` | V2 hero ground (glow, grain) | Reuses the dark placeholder art as a masked decorative image. |
| `src/features/home/components/hero/hero-art.tsx` ★ | V2 `Hero` (light sweep, pointer light, callouts, rotating badge) | Art drawn from `instrument-art.ts`; sweep starts after load; static light under reduced motion. |
| `src/components/sections/spotlight-card.tsx` ★ + `spotlight-tracker.tsx` | V2 `.spot` tiles | Server component for capability cards and range tiles; one delegated pointer listener moves the glow. Glow colour set per surface with `--spot`. |
| `src/features/home/components/viewer/product-viewer.tsx` ★ | V2 `Viewer` / `Stage` (loupe, view tabs) | shadcn Tabs for the views; the loupe magnifies the same image file; Enlarge opens the product lightbox. |
| `src/components/sections/count-up.tsx` ★ | V2 `Counter` | Server-renders the final value; screen readers get the final value only. |
| `src/components/sections/marquee.tsx` ★ | V2 `Marquee` | Range names (no client logos); pauses on hover; off under reduced motion. |
| `src/components/sections/cta-banner.tsx` | V2 `FinalCta` | Shared closing CTA on every page. |
| `src/features/videos/components/video-modal.tsx` ★ | V2 `Videos` modal | Rebuilt on shadcn Dialog; focus returns to the play button. |
| `src/components/sections/certifications.tsx` | V2 certificate list | HoverCard for the full description; Dialog when a document file exists. Shared with About. |
| `src/features/products/components/product-gallery.tsx` ★ | Existing gallery (COMPONENTS spec) | Restyled on tokens; inner 2.2x hover zoom, touch swipe, labelled thumbnails with arrow keys, view counter. |
| `src/features/products/components/lightbox.tsx` | Existing custom lightbox | Same zoom/pan/pinch/swipe engine, now inside shadcn Dialog (focus trap, Esc, scroll lock, focus return). |
| `src/features/products/components/product-search.tsx` | Existing search | Rebuilt on shadcn Command (cmdk); starts from `?q=`. |
| `src/features/products/components/product-filters.tsx` | Existing filters | ToggleGroup (desktop), Drawer with Checkbox (mobile), Select (sort), Empty, Pagination; URL-synced. |
| `src/features/about/components/timeline.tsx` ★ | Existing timeline (COMPONENTS spec) + V2 glow | Dark band, glowing scroll-linked fill (Motion `useScroll`), filled under reduced motion. |
| `src/features/about/components/process-steps.tsx` ★ | V2 `Quality` stacking cards | Seven sticky stacking cards; a plain list under reduced motion. |
| `src/features/about/components/world-reach.tsx` | Existing dotted map | Dark band with glowing markets and CountUp figures. |
| `src/features/contact/components/country-picker.tsx` | shadcn combobox pattern | Popover + Command (no Base UI). |
| `src/components/media/placeholder-svg.ts` | V2 viewer stage (`.dots`) and hero ground | Light dotted stage and dark glow ground; colours from `src/config/theme.ts`. |
