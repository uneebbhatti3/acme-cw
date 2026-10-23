# Component Sources

Where every UI component in the redesign comes from, so licences and credits can be checked.

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

Installed (Phase 1): accordion, aspect-ratio, badge, breadcrumb, button, card, carousel, checkbox, command, dialog, drawer, empty, field, hover-card, input, label, navigation-menu, pagination, popover, scroll-area, select, separator, sheet, skeleton, sonner, table, tabs, textarea, toggle, toggle-group, tooltip.

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
| `src/components/media/placeholder-svg.ts` | V2 viewer stage (`.dots`) and hero ground | Light dotted stage and dark glow ground; colours from `src/config/theme.ts`. |
