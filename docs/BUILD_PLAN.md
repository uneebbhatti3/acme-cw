# Build Plan

Work through the phases in order. At the end of every phase run `pnpm lint`, `pnpm typecheck` and `pnpm build`, fix all issues, verify the acceptance checks, then commit. Do not start a phase until the previous one passes.

## How to start (prompt for Claude Code)

> Read `CLAUDE.md` and everything in `docs/`. Then execute Phase 0 and Phase 1 of `docs/BUILD_PLAN.md`. Stop after each phase and summarise what you built and any decisions in `docs/DECISIONS.md`.

---

## Phase 0: Project setup

- Initialise Next.js (App Router, TypeScript strict, Tailwind, ESLint) with `pnpm`
- Add dependencies: motion, lucide-react, react-hook-form, zod, @hookform/resolvers, yet-another-react-lightbox (if used), clsx / tailwind-merge
- Create the folder structure from TECH_SPEC
- Set up design tokens in `globals.css` and the Tailwind theme per DESIGN_SYSTEM
- Load fonts via `next/font`
- Create `src/types/index.ts` and `src/config/site.ts`
- Add `.env.example`, a short `README.md`, Prettier config

**Acceptance:** dev server runs, tokens visible on a scratch page, build passes.

## Phase 1: Foundations and UI primitives

- Build `ui/` primitives (Button, Chip, Input, Textarea, Select, Checkbox, Modal, Tabs, Accordion, Skeleton, Reveal)
- Build `PlaceholderImage` with all instrument silhouettes and views (front, side, top, detail), labelled variant
- Build `Container`, `Section`, `SectionHeading`, `Breadcrumbs`
- Build `Header` (desktop and mobile menus, mega-menu), `Footer`, `WhatsAppButton`, `DemoRibbon`, skip link

**Acceptance:** a `/_kit` scratch route (excluded from sitemap, noindex) shows every primitive and placeholder variant; keyboard and mobile menu work.

## Phase 2: Content layer

- Write all data files per CONTENT_PLACEHOLDERS (6 categories, at least 24 products with 5 images each, timeline, stats, certifications, videos, team, clients)
- Implement `src/lib/content.ts` accessors and `src/lib/seo.ts` helpers
- Validate data with Zod at build time (fail the build on invalid or duplicate slugs)

**Acceptance:** unit-level sanity script or test confirms unique slugs, every product references a valid category, every `related` slug exists.

## Phase 3: Home page

- Build all Home sections in the order in SITEMAP_AND_PAGES
- Hero with video-or-gradient logic; count-up stats; featured categories; featured products; video highlight (modal can be stubbed until Phase 6); certifications; client logos; CTA banner

**Acceptance:** Home looks finished at 375 and 1440 px; no layout shift; animations respect reduced motion.

## Phase 4: Catalogue browsing

- `/products` index with category grid and global search
- `/products/[category]` with filters, sort, URL-synced state, empty state
- `ProductCard`, `ProductGrid`, `CategoryCard`, `ProductSearch`, `ProductFilters`
- `generateStaticParams` for categories

**Acceptance:** every category renders; filters and sort work and survive refresh; no-results state looks designed.

## Phase 5: Product detail and gallery

- `/products/[category]/[slug]` with the layout in SITEMAP
- Implement `ProductGallery` exactly per COMPONENTS (labelled views, hover zoom, lightbox with zoom/pan/keyboard/swipe)
- `SpecTable`, `FeatureList`, `ProductTabs`, `RelatedProducts`, `QuoteButton`, Product JSON-LD
- Single-image and many-image edge cases

**Acceptance:** all gallery behaviours verified with keyboard, mouse and touch emulation; lightbox traps focus and restores it; Lighthouse accessibility ≥ 95 on a product page.

## Phase 6: About, Videos, Catalogue

- `/about`: story, **Timeline** (scroll-linked line), process steps, world reach, leadership, certifications, CTA
- `/videos`: grid, category chips, `VideoModal` (lazy, focus-trapped, click-to-load YouTube, "coming soon" state)
- `/catalogue`: download button and section preview with lightbox

**Acceptance:** timeline is smooth on mobile and desktop and static under reduced motion; video modal pauses and cleans up on close.

## Phase 7: Contact and quote flow

- `/contact` with `ContactForm` (validation, honeypot, success state), details column, map placeholder
- `?product=<slug>` prefill and subject line
- 404 page

**Acceptance:** errors are announced to screen readers; prefilled product appears; nothing is transmitted in demo mode.

## Phase 8: SEO, performance and polish

- Metadata, OG images, JSON-LD, sitemap, robots
- Image `sizes` review, lazy loading, bundle analysis, dynamic imports for lightbox and modal
- Micro-interactions pass (hover states, focus states, page-load reveal) without hurting performance
- Copy pass: remove any filler, check tone rules, check UK spelling

**Acceptance:** Lighthouse mobile targets from TECH_SPEC met on Home, Category and Product pages.

## Phase 9: QA and handover

- Run the QA matrix in TECH_SPEC (breakpoints, devices, throttled network, axe, keyboard-only)
- Broken-link crawl across all routes
- Write the final README: how to run, how to deploy to Vercel, **how to replace content** (see CONTENT_PLACEHOLDERS)
- Produce `docs/DECISIONS.md` and a short "known limitations" list
- Final production build and deploy preview

**Acceptance:** Definition of done in CLAUDE.md is fully met.

---

## Final QA checklist

- [ ] All routes load, no console errors or hydration warnings
- [ ] No lorem ipsum, no real-company claims, no text or images from the reference site
- [ ] Brand name, contact details and colours change from config and tokens only
- [ ] Gallery: hover zoom, lightbox zoom/pan, keyboard, swipe, labelled views
- [ ] Videos: lazy, click-to-play, accessible modal
- [ ] Timeline looks polished on mobile and desktop
- [ ] Forms validate and announce errors
- [ ] Reduced-motion mode tested
- [ ] Lighthouse mobile targets met
- [ ] README explains content replacement

## Suggested follow-up prompts

- "Polish the Home hero. Make the animated steel-sheen background more refined and add a subtle line-art instrument silhouette that parallaxes slowly."
- "Audit the whole site with axe and fix all serious and critical issues."
- "Compare the build against `docs/DESIGN_SYSTEM.md` and list any deviations, then fix them."
- "Replace placeholder product images for the `forceps` category with files from `public/products/` and update the data."
