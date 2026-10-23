# Components

Location: `src/components/`. Group by purpose: `layout/`, `sections/`, `product/`, `media/`, `ui/`. Every component is typed, accessible, responsive, and takes its content via props (never hard-coded copy).

## Layout

- **Header**: sticky, transparent-to-solid on scroll. Desktop mega-menu for Products lists categories (image + name). Mobile slide-in menu with focus trap.
- **Footer**: columns for brand, links, categories, contact; reads from `siteConfig`.
- **Container, Section, SectionHeading** (eyebrow, title, intro, alignment).
- **Breadcrumbs**: with `BreadcrumbList` JSON-LD.
- **WhatsAppButton**: floating, accessible label, opens `https://wa.me/<number>?text=<prefilled>`; prefilled text includes product name on product pages.
- **DemoRibbon**: shown only when `NEXT_PUBLIC_DEMO_MODE=true`.

## Sections (page building blocks)

- **Hero**: props `headline`, `subline`, `primaryCta`, `secondaryCta`, `video?`, `poster?`. Falls back to the animated steel-sheen background. Video is muted, looped, `playsInline`, lazy, and replaced by the poster for reduced-motion users and slow connections (`navigator.connection.saveData`).
- **TrustStrip**, **CapabilityCards**, **StatsCounter** (count-up with `IntersectionObserver`), **StoryTeaser**, **CtaBanner**, **ClientLogos** (marquee, pauses on hover and for reduced motion), **CertificationBadges** (opens PDF or modal), **ProcessSteps**, **WorldReach** (dotted SVG map).
- **Timeline** (history): see below.

## Product components

- **CategoryCard**: image, name, count, arrow. Entire card is one link.
- **CategoryGrid**: responsive 1 / 2 / 3 / 4 columns. Mobile variant on Home is a horizontal snap scroller.
- **ProductCard**: image (primary, swaps to second image on hover on pointer devices), name, code, category chip, "View details". Skeleton variant for loading.
- **ProductGrid**: handles empty state.
- **ProductSearch**: client-side, debounced, matches name, code, category, tags. Keyboard navigable results.
- **ProductFilters**: data-driven facets (checkbox groups), sort select, active-filter chips with "Clear all". State kept in URL search params so filtered views are shareable.
- **SpecTable**: two-column definition list; mono font for values like codes and sizes; zebra rows; copy-code button.
- **FeatureList**: icon bullets.
- **ProductTabs**: Description, Specifications, Packaging and shipping, Care and sterilisation. Accessible tabs (arrow-key navigation).
- **RelatedProducts**: 4 cards from same category.
- **QuoteButton**: links to `/contact?product=<slug>`.

### ProductGallery (most important component)

Purpose: show each instrument properly from several angles with enlarge capability.

Data: `images: { src, alt, view: "front" | "side" | "top" | "back" | "detail" | "angle", label? }[]`

Behaviour:

1. **Main stage** (4:3). Shows the selected image on a clean neutral background.
2. **Thumbnail strip** below (desktop) or beneath as a horizontal scroller (mobile). Each thumbnail shows a **view label** ("Front", "Side", "Top", "Detail"). Selected thumbnail has accent outline. Arrow keys move selection.
3. **Hover zoom (pointer devices):** on hover the main image magnifies 2.2× following the cursor within the stage (inner zoom). A small "Enlarge" button (magnifier icon) is always visible at the top right of the stage.
4. **Lightbox (all devices):** click the stage or the Enlarge button to open a full-screen viewer. Features: zoom in/out buttons, mouse-wheel and pinch zoom up to 4×, drag-to-pan when zoomed, double-click/double-tap to toggle zoom, next/previous arrows, swipe between views, thumbnail rail with labels, counter ("2 / 5"), keyboard support (Esc, ←, →, +, −, 0 to reset), focus trap, return focus on close, swipe-down to close on mobile.
5. **Prefetch** the next image when the lightbox opens. Use responsive `srcset`; the lightbox loads the highest-resolution source on demand.
6. **Optional 360° slot:** if `spin` frames are supplied, show a "360°" tab that scrubs frames by dragging. Disabled when no frames (not needed for the demo).
7. **Fallback:** if there is only one image, hide the thumbnail strip but keep zoom and lightbox.
8. **Accessibility:** stage has `role="group"` with `aria-roledescription="carousel"`; announce view changes politely; all controls are real buttons with labels.

Implementation guidance: a well-maintained lightbox library with the Zoom, Thumbnails and Counter plugins is acceptable (for example `yet-another-react-lightbox`), styled to match the design system. Otherwise build custom. Either way, the inner hover zoom is custom.

## Media components

- **PlaceholderImage**: generated SVG art per DESIGN_SYSTEM → Imagery. Props: `kind` (forceps | scissors | retractor | needleHolder | clamp | generic), `view` (front | side | top | detail), `ratio`, `showLabel`, `seed` (for slight variation per product).
- **VideoCard**: poster, title, duration, play button.
- **VideoModal**: loads player only when opened. YouTube via `youtube-nocookie.com`; local files via `<video controls playsInline preload="none" poster>`. Focus trap, Esc to close, pauses on close. Captions track slot supported.
- **ResponsiveImage**: wrapper around `next/image` with sensible `sizes`, blur placeholder and fallback to `PlaceholderImage` when `src` is missing.

## Timeline (history)

Props: `events: { year, title, description, image?, highlight? }[]`.

- Desktop: central vertical line, cards alternate left and right, year in large serif numerals on the opposite side, small node dot on the line.
- Mobile: single column, line on the left.
- The line fills with accent colour as the section scrolls (scroll-linked, using Motion's `useScroll`). Each card fades up when it enters.
- `highlight: true` makes a milestone larger with an image.
- Keyboard and screen readers get an ordered list (`<ol>`), with years as headings. Reduced-motion: no scroll-linked fill, line shown filled.

## Forms

- **ContactForm**: React Hook Form + Zod. Fields per SITEMAP. Honeypot field. States: idle, submitting, success, error. Success panel with next-step text. In demo mode nothing is sent.
- Country select: searchable list (plain list of countries from a local file).

## UI primitives (`ui/`)

Button, LinkButton, Chip, Input, Textarea, Select, Checkbox, Tabs, Accordion, Modal (focus-trapped), Tooltip (rarely), Skeleton, IconButton, VisuallyHidden, Reveal (scroll-in wrapper honoring reduced motion).

## States every data component must handle

Loading (skeleton), empty (designed message with next step), error (friendly, with retry or link), and long text (truncate with line-clamp, never break layout).
