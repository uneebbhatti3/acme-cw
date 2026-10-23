@AGENTS.md
<<<<<<< HEAD

# CLAUDE.md — Surgical Instruments Manufacturer Website (Demo)

You are building a **demo business website** for a surgical instruments manufacturer. The goal of the demo is to win the client's confidence by showing a polished, credible, fast interface with real product-catalogue behaviour (categories, product pages, image gallery with enlarge and side views, short video clips, history timeline). Content is placeholder until the client supplies the real material.

## Read these first, in this order

1. `docs/PROJECT_BRIEF.md` — goals, audience, scope, what the demo must and must not do
2. `docs/SITEMAP_AND_PAGES.md` — every page and every section on it
3. `docs/DESIGN_SYSTEM.md` — colour, type, spacing, motion, imagery rules
4. `docs/COMPONENTS.md` — component behaviour, especially the product gallery
5. `docs/CONTENT_PLACEHOLDERS.md` — data types and sample data
6. `docs/TECH_SPEC.md` — stack, folder structure, performance, SEO, accessibility
7. `docs/BUILD_PLAN.md` — phased plan with acceptance checks. **Work from this.**

## Stack (summary; details in TECH_SPEC)

Next.js (App Router) + TypeScript + Tailwind CSS + Motion (Framer Motion) for animation. Content lives in typed local data files, no backend and no CMS for the demo. Deploy target: Vercel.

## Commands

The project uses npm (`package-lock.json`):

- `npm run dev` — local dev server
- `npm run lint` — lint
- `npm run typecheck` — `tsc --noEmit`
- `npm run build` — production build (must pass before any phase is marked done)

## Hard rules

1. **Do not copy the reference website.** A reference site was analysed for _structure and quality bar only_. Never reuse its text, images, logos, certificates, team names, phone numbers, address, colours-as-a-set or exact layout. The result must be visually and verbally original.
2. **No invented factual claims.** Do not write real-sounding claims such as specific years in business, certification names, country counts, client names or awards. Every such value is a clearly marked placeholder (see CONTENT_PLACEHOLDERS) that renders plausibly but is stored in one place for replacement.
3. **Brand-agnostic.** The client's name, logo and colours are not final. Brand name, tagline, contact details and colours come only from `src/config/site.ts` and design tokens. Never hard-code them in components.
4. **No lorem ipsum anywhere visible.** Write short, believable, neutral placeholder copy instead.
5. **No hotlinked or third-party copyrighted images.** Use generated SVG placeholders (see DESIGN_SYSTEM → Imagery). Real photos will be dropped in later without code changes.
6. **Accessibility and performance are requirements, not extras** (targets in TECH_SPEC).
7. **Do not add features outside the brief** (no auth, cart, checkout, payments, CMS, database) unless told to.

## Working method

- Follow `BUILD_PLAN.md` phase by phase. After each phase: run lint, typecheck and build; fix everything; then commit with a clear message.
- Prefer small, reusable components that match the names in `COMPONENTS.md`.
- Keep all copy and data in `src/data/` and `src/config/`, never inline in JSX.
- When a decision is genuinely ambiguous and not covered by the docs, choose the most conservative option, note it in `docs/DECISIONS.md` (create it) and continue. Ask the user only if blocked.
- Mobile-first. Test at 375px, 768px, 1280px and 1536px widths.

## Definition of done (demo)

- All routes in SITEMAP_AND_PAGES render with no console errors
- Product page has working gallery: thumbnails, labelled views (front / side / top / detail), hover zoom on desktop, full-screen lightbox with zoom and keyboard navigation
- Video section plays placeholder clips through a lazy-loaded modal or inline player
- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- Changing `src/config/site.ts` and `src/data/*` is enough to rebrand and swap content
- `npm run build` passes; README explains how to run and how to replace content
=======
>>>>>>> c95d78430d80c9a2c3e8e7e28542bfe327beeafc
