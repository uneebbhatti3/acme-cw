# Redesign Plan (Phase 0)

Status: **awaiting approval.** No redesign code has been written. Brief: `docs/REDESIGN.md`. Visual reference: `docs/reference/page-v2.tsx` (V2).

## 1. Audit

| Item | Finding |
| --- | --- |
| Package manager | npm (`package-lock.json`). All commands use `npm run` / `npx`. |
| Framework | Next.js 16.4.2 (Turbopack, Cache Components, Partial Prefetching), React 19.3, React Compiler on |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`, `@theme inline`), no `tailwind.config` |
| Already installed | motion 14, lucide-react, react-hook-form, zod, @hookform/resolvers, clsx, tailwind-merge, shadcn CLI 4.22.1 (dev) |
| Already built | Every route in the sitemap, feature folders (`src/features/<page>`), typed data, SEO + JSON-LD, custom lightbox (zoom 4x, pan, swipe, keyboard) on native `<dialog>`, scroll-linked timeline, contact form with RHF + Zod |
| Existing primitives | Custom, not shadcn: `button`, `chip`, `field`, `icon-button`, `icon`, `modal`, `reveal`, `skeleton`, `tabs`, `accordion`, `visually-hidden` |
| `components.json` | Was set up for Tailwind v3 with wrong paths. Fixed: `new-york` style, empty `tailwind.config`, `src/app/globals.css`, `cssVariables: true`, lucide. Backup at `docs/reference/components.json.bak`. Dry run of `add button` resolves correctly. |
| Baseline (after housekeeping) | `typecheck` ✓, `lint` ✓, `build` ✓ (412 static pages). Before housekeeping the build failed because V2 had been pasted over `src/app/page.tsx` (`new Date()` in a client component). |
| shadcn MCP | Working (list, view, examples, add commands, audit checklist). Search needs `registries: ["@shadcn"]` passed explicitly. |
| 21st.dev MCP | Authenticated, free tier: 2 retrievals a day, AI generation off, catalogue search returning errors. **Optional per your decision**: showpieces are built from shadcn + Motion by adapting V2's own effects. Any 21st.dev code you send me is adapted and credited in `docs/COMPONENT_SOURCES.md`. |

## 2. Component map

Legend: **shadcn** = installed primitive restyled with tokens. **Custom** = our own component (adapted from V2 where noted). Showpieces are marked ★ (budget: at most 10, each built once and reused).

### Global layout

| Part | shadcn | Custom |
| --- | --- | --- |
| Header: glass pill nav | NavigationMenu, Button | `SiteHeader`: floating pill with `backdrop-blur`, transparent over dark hero, solid after scroll (V2 `glass-nav`) |
| Products mega-menu | NavigationMenu (content panel) | Category tiles with `PlaceholderImage` thumbnail + range size |
| Mobile menu | Sheet | Full-height, large tap targets, Contact button pinned at bottom |
| Breadcrumbs | Breadcrumb | Keeps `BreadcrumbList` JSON-LD |
| Footer | Separator, Button | ★ `WordmarkFooter`: big metal-gradient wordmark from `siteConfig.brandName` (V2) |
| WhatsApp button | Tooltip | Hidden while `contact.whatsapp` is empty (unchanged) |
| Skip link, `Reveal` | none | `Reveal` rebuilt on Motion `whileInView`, instant under reduced motion |

### Home `/` (sitemap order; V2 sections mapped in)

| # | Section | shadcn | Custom / V2 source |
| --- | --- | --- | --- |
| 1 | Hero | Button, Badge | ★ `LightSweepHero`: one light sweep across the polished instrument on load, then follows the pointer (V2 `Hero`). Grain, radial glow from `--primary`. Static light position under reduced motion. Video slot kept (`siteConfig.heroVideo`). |
| 2 | Trust strip | Separator | 4 claims in a 1px-ruled row under the hero (precision manufacturing, OEM / private label, export to 50+ markets, made to drawing). Values from config. |
| 3 | Capabilities | Card | ★ `SpotlightCard`: cursor-following glow border (V2 `.spot`). Manufacturing, Customisation, Quality assurance. |
| 4 | Featured categories | Card, Carousel (mobile snap) | V2 `Range` bento grid of the 8 ranges, reusing `SpotlightCard`. Horizontal snap carousel below `md`. |
| 5 | Product viewer | Tabs (view switcher), Button, Dialog | ★ `ProductViewer`: magnifier loupe on hover, labelled views (front / side / top / detail), Enlarge opens the lightbox (V2 `Viewer`). Shares the zoom engine with the product gallery. |
| 6 | Story teaser | AspectRatio, Button | V2 `Story`: split heading + text, three milestone cards in a horizontal snap strip, "Read our history" link |
| 7 | By the numbers | Card | ★ `CountUp` (IntersectionObserver, 1.4s, once): founded 1960, 50+ export markets, 1000+ instrument profiles, 8 ranges, 10 specialties. All from `siteConfig` / data. |
| 8 | Featured products | Card, Badge, Skeleton | `ProductCard` with second-view swap on hover (pointer devices only) |
| 9 | Video highlight | Dialog, AspectRatio | ★ `VideoCard` + lazy `VideoDialog`: one large poster + two small (V2 `Videos`) |
| 10 | Certifications | HoverCard, Dialog | Badge row from `siteConfig.company.certifications`; HoverCard for the description, Dialog when a file exists |
| 11 | Trusted by | Separator | ★ `Marquee` (pause on hover/focus, static under reduced motion). **Decision needed, see §6.** |
| 12 | CTA banner | Button | Gradient CTA on dark (V2 `FinalCta`); email, phone, WhatsApp from config |

V2's "Quality" sticky stacking cards move to About (process), where the brief puts them, so the home page doesn't repeat Material → Craft → Inspection.

### Products

| Page / part | shadcn | Custom |
| --- | --- | --- |
| Products index: search | Command (results list), Input | Keeps `searchProducts()`; results animate in with Motion layout |
| Products index: category grid | Card | `CategoryCard` (one link per card) |
| Category: filters | Checkbox, Select (sort), ToggleGroup (material), Drawer (mobile filters), Badge (active chips) | URL-synced state, unchanged logic in `use-product-filters` |
| Category: grid | Pagination, Skeleton, Empty | Designed no-results state via `Empty` |
| Product detail: gallery | Dialog (lightbox shell), Carousel (mobile swipe + thumbnails), Tooltip | ★ `ProductGallery`: custom inner hover zoom 2.2x + existing lightbox engine (zoom to 4x by wheel/pinch/buttons/double-tap, pan, keyboard Esc ← → + − 0, swipe, swipe down to close, counter, labelled thumbnail rail). Radix Dialog supplies focus trap and focus return. |
| Product detail: info | Badge, Table (spec table), Tabs, Accordion (mobile), Button, Tooltip (copy code) | Sticky info panel on `lg+` |
| Related products | Card, Carousel | `ProductCard` |

### Other pages

| Page / part | shadcn | Custom |
| --- | --- | --- |
| About: page hero, intro | Badge | Dark sheet with grain |
| About: timeline | Card | ★ `ScrollTimeline`: line fills with scroll (Motion `useScroll`), `<ol>` with year headings, alternating on desktop, filled and static under reduced motion. Follows `COMPONENTS.md` Timeline spec. |
| About: process | Card | ★ `StackingCards`: sticky stacking cards (V2 `Quality`), plain list under reduced motion |
| About: global reach | Card | Existing dotted SVG map restyled + `CountUp` |
| About: leadership, certifications | Card, HoverCard, Dialog | Same certification component as Home |
| Catalogue | Card, Dialog, Button | Document preview grid; lightbox reuses the gallery engine |
| Videos | ToggleGroup (category filter), Dialog | `VideoCard`, `VideoDialog` (YouTube nocookie on click, local MP4, "coming soon" state) |
| Contact | Field, Input, Textarea, Checkbox, Popover + Command (searchable country), Sonner | RHF + Zod unchanged, honeypot, success panel; toast on submit |
| 404 | Input, Button | Search box to `/products?q=` + links |

## 3. Dependencies

| Package | Why | Pulled by |
| --- | --- | --- |
| `radix-ui` | Accessible primitives behind every shadcn component (single unified package) | shadcn |
| `class-variance-authority` | Variants in Button, Badge, Toggle and others | shadcn (missing from its dep list; add explicitly) |
| `cmdk` | Command: product search and country picker | Command |
| `vaul` | Drawer for mobile filters | Drawer |
| `embla-carousel-react` | Carousel: mobile snap rows, gallery swipe | Carousel |
| `sonner` | Toast after form submit | Sonner |
| `tw-animate-css` | Enter/exit animations used by Dialog, Sheet, Popover classes (CSS only) | shadcn new-york v4 |

**Not adding:**
- `next-themes`: Sonner's template imports it, but there's no dark mode. Remove the import and pass the theme directly.
- `@base-ui/react`: pulled by `combobox`. Use Popover + Command instead, so we ship one primitive library, not two.
- `cn`: the CLI lists it because its templates import `cn` from `"cn"`. Rewrite those imports to `@/lib/utils` after each `add`.
- `yet-another-react-lightbox`: the custom lightbox already meets the full spec. Swap only its shell to Dialog.
- Smooth-scroll libraries (Lenis etc.): they hurt accessibility and INP. Native scrolling only.

No other packages. Every effect (sweep, glow, marquee, count-up, stacking, timeline) is CSS or Motion.

## 4. Token plan

All colours live in `src/app/globals.css` as shadcn variables, mapped to Tailwind with `@theme inline`. No hex values in components. Rebrand = edit `--primary` (+ `--primary-deep`) and `siteConfig`.

**Light surface (`:root`, catalogue and reading sections)**

| Token | Value | Notes |
| --- | --- | --- |
| `--background` | `#EEF3F5` (V2 paper) | |
| `--card` / `--popover` | `#FFFFFF` | |
| `--foreground` | `#08171C` (V2 ink) | 16.9:1 on paper |
| `--muted` | `#E2EAEE` | |
| `--muted-foreground` | `#44585F` (V2 ink-soft) | 6.7:1 on paper |
| `--primary` | `#097E9E` (client) | Buttons and fills. White text on it 4.68:1 ✓ |
| `--primary-foreground` | `#FFFFFF` | |
| `--primary-deep` | `#07657F` | **Links and small accent text on light**: 5.9:1. `#097E9E` is only 4.18:1 on paper, so it's not used for small text there. Also button hover. |
| `--accent` / `--accent-foreground` | `#DCEFF4` / `#07657F` | Tints, selected states |
| `--border` / `--input` | `#D3DDE2` (V2 rule) | |
| `--ring` | `#07657F` | |
| `--destructive` | `#C8553D` | Errors only |

**Dark surface (`.surface-dark` class: hero, feature sections, footer)**

| Token | Value | Notes |
| --- | --- | --- |
| `--background` | `#050B0E` (V2 night) | |
| `--card` | `#0B161B` (V2 deep) | `--raise` `#12232A` for nested |
| `--foreground` | `#EAF1F5` (V2 silver) | 17.4:1 |
| `--muted-foreground` | `#9DB0BA` (V2 steel) | 8.8:1. V2 `steel-dim` `#74888F` (4.9 to 5.3:1) kept for meta text only |
| `--primary` | `#097E9E` | **Buttons and large fills only** (4.23:1 on night, 3.92 on deep: passes 3:1 for UI/large, not small text) |
| `--link` / `--glow` | `#8EEBFF` | Small text, links, icons, focus ring on dark: 13.5 to 14.6:1 |
| `--border` | `rgb(255 255 255 / 0.1)` | |
| `--ring` | `#8EEBFF` | |

**Effects:** hero and spotlight glows use `color-mix(in oklab, var(--primary) …, transparent)` and `var(--glow)`, so they follow a brand swap. One grain texture (inline SVG data URI) as a utility.

**Type:** `next/font` with `display: swap` and Latin subset only.
- Bricolage Grotesque (display, `--font-display`, weight axis only).
- Geist (body, `--font-sans`).
- Geist Mono (SKUs and spec values, not preloaded). Replaces JetBrains Mono so the body and mono come from one family.
- Scale: display `clamp(2.75rem, 7vw, 6rem)` with tracking −0.04em and a metal gradient on key headlines; h2 `clamp(2rem, 4.5vw, 3.5rem)`; body 16 to 18px, line height 1.6.

**Radius:** `--radius: 0.875rem`.
- Buttons and chips are pills.
- Cards use `calc(var(--radius) + 10px)`, about 1.5rem (V2).
- Inputs use `var(--radius)`.

**Motion:** reveal fade-up 16px / 500ms ease-out, stagger 60ms, once. Everything checks `useReducedMotion()` or `@media (prefers-reduced-motion)`. No effect blocks reading or clicking (`pointer-events: none` on overlays).

**Migration:** existing token names (`ink`, `steel-*`, `paper`, `accent-*`) stay as aliases of the new variables until every page is migrated, then are removed in Phase 6.

## 5. Phases (gate each: `npm run lint`, `npm run typecheck`, `npm run build`, no console errors, screenshots at 375 and 1280 px, shadcn audit; then commit)

1. **Foundation:**
   - Move the custom primitives to `src/components/ui/legacy/` and update imports, so nothing breaks while shadcn writes into `ui/`.
   - Install shadcn components, fix the `cn` imports, add tokens and fonts.
   - Rebuild `PlaceholderImage` on V2's `ViewArt` / `KindArt` art.
   - Rebuild `Reveal`; update `DESIGN_SYSTEM.md`.
2. **Layout:** SiteHeader (glass pill, NavigationMenu mega-menu, Sheet), WordmarkFooter, WhatsAppButton, Breadcrumbs.
3. **Home:** all sections in §2.
4. **Products:** index, category (filters, Drawer, URL state), detail with the full gallery.
5. **About** (timeline, stacking cards, map), **Catalogue**, **Videos**, **Contact**, **404**.
6. **Polish and QA:**
   - Motion, reduced-motion and keyboard passes.
   - Lighthouse on Home and a product page; JSON-LD check.
   - Delete `ui/legacy` and unused shadcn files and packages.
   - Update README and `COMPONENT_SOURCES.md`.

Screenshots: I'll capture them with Playwright at 375 and 1280 px and list the files for your review at each gate.

## 6. Decisions I need from you

1. **Home "Trusted by" (client logos).** The client's site doesn't name its clients, and neutral placeholder logos on a real company's site could read as a claim. Proposal: build the `Marquee` with V2's instrument-family words instead (V2 already does this). Show a client-logo strip only when `src/data/clients.ts` has real entries and `features.showClients` is true; it ships empty, so the section is hidden. That gives one marquee, no implied clients.
2. **Home length.** The sitemap's 11 sections plus the V2 product viewer make 12. I'd keep all 12, because the viewer is signature moment 2. The alternative is to fold Featured products into the viewer section.

## 7. Risks

| Risk | Mitigation |
| --- | --- |
| The shadcn CLI writes `import { cn } from "cn"` | Rewrite to `@/lib/utils` after each `add`; never install `cn`. Typecheck catches any miss. |
| `add` overwrites 5 custom primitives (button, skeleton, tabs, accordion, field) | Move them to `ui/legacy` first; migrate call sites page by page; delete in Phase 6 |
| `backdrop-filter` blur and grain cost on mid-range phones (Lighthouse ≥ 90) | Blur only on the nav pill; grain is one static layer; `@supports` fallback to a solid surface |
| Bricolage + Geist + Geist Mono add font bytes, and switching fonts can shift layout | Latin subset, variable fonts, mono not preloaded; `next/font` size-adjust avoids CLS |
| `--primary` fails small-text contrast on both night and paper | Enforced by tokens: small text uses `--primary-deep` (light) or `--glow` (dark). Contrast checked in Phase 6 with axe. |
| Radix Dialog replacing native `<dialog>` in the lightbox may change gesture handling | Keep the zoom/pan engine as is, swap only the shell; re-test wheel, pinch, swipe-down and keyboard |
| Cache Components: client values read during prerender (`new Date()`, `Math.random`) break the build | No dates in components (the footer has no year). Seeded variation only, from `hashString`. |
| Next 16 API changes | Read `node_modules/next/dist/docs/` before touching routing, fonts or metadata |
| Scroll-linked effects (timeline, stacking cards, cursor glow) raising INP | Motion values and CSS variables, no React state per frame; pointer handlers throttled with rAF |
| 21st.dev unavailable | Not a dependency. Showpieces come from V2 + Motion. |
