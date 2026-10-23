# REDESIGN BRIEF: shadcn/ui + 21st.dev, modern showcase look

Saved as `docs/REDESIGN.md`; the Version 2 design file is `docs/reference/page-v2.tsx`. Commands use npm (the project has `package-lock.json`).

---

## 0. Your role and the goal

You are a senior front-end engineer and product designer. Redesign the **entire** demo website for the surgical instruments manufacturer so that it is built on **shadcn/ui primitives** and **selected 21st.dev components**, with a modern, high-polish "design showcase" look (the kind of work people post as web design shots: bold type, dark glass surfaces, bento grids, smooth scroll storytelling, one memorable interaction per page).

The redesign replaces the **visual and component layer only**. It must still be a credible, fast, accessible manufacturer website that a hospital buyer or distributor can use. A look that wins design awards but hides products or slows the page has failed.

## 1. Before writing any code (mandatory, no code until step 5 is approved)

1. Read, in order: `CLAUDE.md`, `docs/PROJECT_BRIEF.md`, `docs/SITEMAP_AND_PAGES.md`, `docs/DESIGN_SYSTEM.md`, `docs/COMPONENTS.md`, `docs/CONTENT_PLACEHOLDERS.md`, `docs/TECH_SPEC.md`, `docs/BUILD_PLAN.md`, then `docs/reference/page-v2.tsx`.
2. Inspect the repo: package manager, Next.js version, Tailwind version (v3 or v4), existing `src/` structure, what is already built. Do not assume.
3. List the MCP tools you actually have. Expect a shadcn MCP (registry search, view items, examples, add commands, audit checklist) and a 21st.dev Magic MCP (component inspiration, component builder, component refiner, logo search). Use the tool names you see, not the names in this brief. If either MCP is missing or failing, stop and tell me.
4. Run `npm run typecheck`, `npm run lint`, `npm run build` and record the baseline.
5. Write `docs/REDESIGN_PLAN.md` containing: a component map (page, section, shadcn part, 21st.dev candidate, custom part), the dependency list you intend to add and why, the token plan, and the risks. **Stop and wait for my approval.**

## 2. What stays and what changes

**Stays (source of truth, do not alter without telling me):**

- Routes and sections from `SITEMAP_AND_PAGES.md`
- Data types, data files and placeholder content rules from `CONTENT_PLACEHOLDERS.md`
- All hard rules in `CLAUDE.md` (do not copy the reference site, no invented facts, brand-agnostic, no lorem ipsum, no hotlinked images, no features outside the brief)
- Performance, SEO and accessibility targets in `TECH_SPEC.md`
- Behaviour spec of ProductGallery and Timeline in `COMPONENTS.md`

**Changes:**

- Primitives in `COMPONENTS.md` ("UI primitives") become shadcn/ui components, restyled with our tokens
- Sections and showpiece blocks are rebuilt from 21st.dev inspiration or components, adapted to our system
- Visual language follows section 4 below
- `docs/DESIGN_SYSTEM.md` is updated to match (colour tokens, type scale, radius, motion rules)

## 3. Tooling workflow

**shadcn first for anything functional.** Use the shadcn MCP to search, view and read examples before adding a component, then install with the CLI (`npx shadcn@latest add ...`). Initialise shadcn only if `components.json` does not exist, matching the detected Tailwind version. Likely components:

Button, Badge, Card, Separator, AspectRatio, Skeleton, Tabs, Accordion, Dialog, Sheet (mobile menu), Drawer (mobile filters), NavigationMenu (products mega-menu), Command (product search), Input, Textarea, Select, Checkbox, Toggle Group, Form with react-hook-form and Zod, Breadcrumb, Pagination, Table (spec table base), Carousel (embla), Tooltip, Sonner, ScrollArea, HoverCard.

Run the shadcn audit checklist (if the MCP provides one) after each phase.

**21st.dev for showpiece sections only.** For each target section:

1. Ask for inspiration first, review several options, pick one.
2. Generate or fetch the component, then run the refiner if it helps.
3. **Adapt it**: replace hard-coded colours with our tokens, replace copy with props from `src/data` and `src/config`, replace stock imagery with `PlaceholderImage`, fix accessibility, add reduced-motion handling.
4. Record the source (component name and author, as shown by the tool) in a comment at the top of the file and in `docs/COMPONENT_SOURCES.md`.

**Budget rules**

- Maximum 8 to 10 adapted 21st.dev components in the whole site. Quality over quantity.
- Do not add a dependency for a single effect if CSS or Motion can do it. Justify every new package in the plan.
- Never ship two components that do the same job (for example two marquees or two counters).
- Remove unused shadcn components and dependencies before finishing.
- Check the licence or usage terms shown for each 21st.dev component. If unclear, flag it in `COMPONENT_SOURCES.md` for me to review.

## 4. Design direction

**Mood:** precise, quiet, premium. Polished steel under a moving light. Medical-grade trust, not gaming neon.

- **Surfaces:** near-black teal canvas for hero and feature sections, paper-white for catalogue and reading sections, rounded overlapping "sheets" between them. Glass nav pill with blur. Fine 1px rules, subtle noise grain.
- **Colour:** steel and cool silver neutrals with one restrained teal-cyan accent (tokens from V2: night, deep, silver, steel, glow, teal-deep, paper, ink). Define everything as shadcn CSS variables (`--background`, `--foreground`, `--primary`, `--muted`, `--accent`, `--border`, `--ring`, `--radius`, plus chart-free extras such as `--glow`). No hard-coded hex in components. The brand colour must be swappable in one place because the client's palette is not final.
- **Type:** large display type with tight tracking and a metal gradient on key headlines; calm body text. Use `next/font`. V2 used Bricolage Grotesque and Geist; keep them unless you have a documented reason.
- **Layout:** bento grids, sticky stacking cards, horizontal snap scrollers on mobile, generous whitespace, one idea per viewport.
- **Motion:** purposeful only. Reveal on scroll, cursor-following light, count-up numbers, marquee. Everything honours `prefers-reduced-motion`. Nothing blocks content from being read or clicked.
- **Imagery:** SVG placeholder instruments from V2 (`ViewArt` family) wrapped in `PlaceholderImage`. Real photos must drop in later with no code change.

**Signature moments (keep, they are what makes the demo memorable):**

1. Home hero: light sweeping across a polished instrument, then following the cursor.
2. Product viewer: magnifier loupe on hover, labelled views (front, side, top, detail), full-screen lightbox. This directly answers the client's request for enlarge and side views.
3. About: scroll-linked history timeline that fills as you scroll.

## 5. Page-by-page component map (starting point; refine in the plan)

| Page / section                 | shadcn                                                                          | 21st.dev search terms (inspiration, then adapt)                    |
| ------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Header, mobile menu, mega-menu | NavigationMenu, Sheet, Button                                                   | floating glass navbar                                              |
| Home hero                      | Button, Badge                                                                   | spotlight or light-sweep hero, text reveal                         |
| Trust strip / client strip     | Separator                                                                       | logo marquee (pause on hover)                                      |
| Capabilities                   | Card                                                                            | spotlight cards, feature cards with hover glow                     |
| Featured categories            | Card, Carousel (mobile snap)                                                    | bento grid                                                         |
| Story teaser                   | AspectRatio, Button                                                             | split media section                                                |
| Stats                          | Card                                                                            | animated counter (IntersectionObserver)                            |
| Featured products              | Card, Badge, Skeleton                                                           | product card with image swap on hover                              |
| Video highlight                | Dialog, AspectRatio                                                             | video card with play button                                        |
| Certifications                 | Dialog, HoverCard                                                               | badge row                                                          |
| CTA banner, footer             | Button, Separator                                                               | large-wordmark footer, gradient CTA                                |
| Products index                 | Command, Input, Card                                                            | animated search results                                            |
| Category listing               | Toggle Group, Select, Checkbox, Drawer (mobile filters), Pagination, Breadcrumb | filter bar with chips                                              |
| Product detail                 | Tabs or Accordion, Table, Badge, Carousel, Dialog, Tooltip                      | image gallery with zoom (adapt), sticky info panel                 |
| Catalogue                      | Card, Dialog, Button                                                            | document preview grid                                              |
| Videos                         | Tabs or Toggle Group (filter), Dialog                                           | video grid                                                         |
| About: timeline                | Card                                                                            | scroll-linked timeline (must follow `COMPONENTS.md` Timeline spec) |
| About: process, global reach   | Card                                                                            | sticky stacking cards; dotted map                                  |
| Contact                        | Form, Input, Select (searchable country via Command), Checkbox, Sonner          | none needed                                                        |
| 404                            | Command or Input, Button                                                        | none needed                                                        |

**Product gallery:** build on shadcn Dialog and Carousel with a custom inner hover zoom, or an accessible lightbox library, per `COMPONENTS.md`. All behaviours in that spec (labelled thumbnails, pinch and wheel zoom to 4x, pan, keyboard shortcuts, focus trap, return focus, swipe) are required, not optional.

## 6. Guardrails

- Content only from `src/config` and `src/data`. Every placeholder number, year and certificate stays clearly marked as sample. No testimonials, awards, client names or invented claims, even though many 21st.dev templates include them.
- UK English in copy (colour, sterilisation).
- Mobile-first; test at 375, 768, 1280 and 1536 px.
- Accessible: visible focus rings, keyboard paths for every interaction, correct roles for tabs, dialogs and carousels, colour contrast AA on both dark and light surfaces, no information conveyed by colour alone.
- Performance: Lighthouse mobile Performance 90 or higher, Accessibility 95 or higher, SEO 95 or higher. Server Components by default; `"use client"` only where interaction needs it; lazy-load heavy effects below the fold; no layout shift from fonts or images.
- No client-side secrets, no backend, no auth, no cart (per brief).
- Never leave a half-adapted 21st.dev component with stock text, stock images or its own colour palette.

## 7. Phases (commit after each; every gate must pass before moving on)

Gate for every phase: `npm run lint`, `npm run typecheck`, `npm run build` clean; no console errors; screenshots at 375 and 1280 px reviewed by you; shadcn audit run.

| Phase | Scope                                                                                                                                                           |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | Audit, plan, approval (section 1)                                                                                                                               |
| 1     | Foundation: shadcn init, tokens in `globals.css`, fonts, theme from `siteConfig`, `PlaceholderImage`, `Reveal`, `docs/DESIGN_SYSTEM.md` update                  |
| 2     | Layout: Header (glass pill, mega-menu, mobile Sheet), Footer, WhatsAppButton, DemoRibbon, Breadcrumbs                                                           |
| 3     | Home page, all 11 sections                                                                                                                                      |
| 4     | Products index, category listing (filters, search, URL-synced state), product detail with the full gallery                                                      |
| 5     | About with timeline, Catalogue, Videos, Contact, 404                                                                                                            |
| 6     | Polish and QA: motion pass, reduced-motion pass, keyboard pass, Lighthouse, SEO metadata and JSON-LD, README update, `COMPONENT_SOURCES.md`, dependency cleanup |

If a decision is ambiguous, choose the conservative option, record it in `docs/DECISIONS.md` and continue. Ask me only if blocked.

## 8. Definition of done

- Every route in the sitemap renders with no console errors
- All primitives are shadcn-based and themed by tokens; rebranding needs edits to `siteConfig`, token variables and data files only
- Product gallery meets every behaviour in `COMPONENTS.md`
- Timeline, stats, marquee and hero respect reduced motion
- Lighthouse targets met on Home and on a product page
- `COMPONENT_SOURCES.md` lists every 21st.dev component with its source
- `npm run build` passes; README explains how to run, rebrand and swap content

## 9. Final report format

When finished, reply with: what changed (short), a table of shadcn components used and 21st.dev components adapted, Lighthouse scores, anything you deviated from and why, open risks, and the three things you would improve next.

---

### Launcher line (paste into Claude Code)

```
Read docs/REDESIGN.md fully and follow it exactly. Start at section 1 only: audit the repo, confirm the shadcn and 21st.dev MCP tools you can access, write docs/REDESIGN_PLAN.md, then stop and wait for my approval before writing any code.
```
