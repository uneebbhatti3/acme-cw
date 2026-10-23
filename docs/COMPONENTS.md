# Components

Updated for the redesign (shadcn/ui + V2 look). Shared components live in `src/components/` (`layout/`, `sections/`, `media/`, `ui/`, `seo/`); page-specific ones live with their feature in `src/features/<page>/components/`. Every component is typed, accessible and responsive, and takes its content from `src/config` or `src/data` (never hard-coded copy). Sources and credits: `docs/COMPONENT_SOURCES.md`. Visual rules: `docs/DESIGN_SYSTEM.md`.

## Layout (`src/components/layout/`)

- **Header** (`header.tsx`):
  - Floating dark glass pill on every page; gains a shadow after scroll.
  - Desktop: shadcn NavigationMenu, with a Products mega-menu of every range (thumbnail, name, range size, "All products").
  - Below `lg`: a menu button opens **MobileMenu** (`mobile-menu.tsx`, shadcn Sheet). The sheet code loads on first tap (prefetched on hover or focus); focus returns to the button on close.
- **Footer** (`footer.tsx`): brand, links, ranges and contact from `siteConfig`, closed by a metal-gradient wordmark sized to the brand name.
- **Band** (`band.tsx`): a page section and the building block of every page.
  - **Look:** `tone` (night, deep, paper, white), a rounded `sheet` top that overlaps the section above, and `pre` bottom room for the next sheet.
  - **Performance:** `defer` turns on `content-visibility: auto` (off for the first band under a hero), and content sits in its own Suspense boundary for selective hydration.
- **Container**, **SectionIntro** (display title left, lede right, optional `metal`), **PageHero** (dark inner-page header with masked instrument art).
- **Breadcrumbs**: shadcn Breadcrumb with `BreadcrumbList` JSON-LD; colours follow the surface.
- **WhatsAppButton**: floating, with a tooltip; opens `https://wa.me/<number>?text=<prefilled>`, naming the product on product pages. Hidden while `contact.whatsapp` is empty.
- **Logo**: from `siteConfig.logo`; white on dark when `invertOnDark` is set.

## Sections (`src/components/sections/`)

- **CtaBanner**: closing call to action on a dark glow card: quote and catalogue buttons, plus email, phone and WhatsApp.
- **Certifications**: badge grid. Hover shows the full description (HoverCard); a badge with a `file` opens the document in a Dialog. Used on Home and About.
- **CountUp**: counts up once when visible (1.4s); server-renders the final value, and screen readers get the final value only.
- **Marquee**: slow row of range names (CSS); pauses on hover, off under reduced motion.
- **SpotlightCard** + **SpotlightTracker**:
  - The card is a server component with a pointer-following glow (`--spot` sets its colour).
  - One delegated listener in the layout moves every glow.

## Home (`src/features/home/components/`)

- **HomeHero** + **HeroArt**: one light sweep across the polished forceps after load, then the light follows the pointer. Also has part callouts, a rotating "made to your drawing" badge and a trust strip. Headline and lede are static (they are the LCP element).
- **Capabilities**, **RangeBento** (8 ranges; snap row on phones), **ViewerSection** + **ProductViewer** (labelled views as Tabs, magnifier loupe, Enlarge opens the lightbox), **StoryTeaser** + **HomeStats**, **FeaturedProducts**, **VideoHighlight**, **CertificationsSection**.

## Product components (`src/features/products/components/`)

- **CategoryCard**: image, name, range size, arrow. The entire card is one link.
- **CategoryGrid**: 1 / 2 / 4 columns with an ItemList JSON-LD.
- **ProductCard**:
  - Image swaps to the side view on hover (pointer devices), with code, category badge and "View details".
  - The first row on a category page loads eagerly; a skeleton variant covers loading.
- **ProductGrid**: handles the empty state; `priorityCount` makes the first images eager.
- **ProductSearch**: shadcn Command (cmdk).
  - Debounced client-side search on name, code, category and tags; arrow keys, Enter and Esc work.
  - Starts from `?q=`; `allResultsLink` hands off to `/products?q=…`.
- **ProductFilters**: state kept in URL search params, so filtered views are shareable and survive a refresh.
  - Desktop: data-driven facets as ToggleGroup pills, plus a Select for sort.
  - Phones: **MobileFilters** (Drawer with checkboxes), loaded on first use.
  - Active-filter chips with "Clear all"; an Empty state; Pagination past 12 products.
- **SpecTable**: shadcn Table with row headers, mono values, zebra rows and a copy-code button with a tooltip. **FeatureList**: icon bullets.
- **ProductTabs**: Description, Specifications, Packaging and shipping, Care and sterilisation (shadcn Tabs, arrow keys move between them).
- **RelatedProducts**: up to 4 cards. **ShareButton**: native share sheet, otherwise copies the link.

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

Implementation:
- **Gallery** (`product-gallery.tsx`): also swipes between views on touch.
- **Lightbox** (`lightbox.tsx`):
  - A custom zoom/pan/pinch/swipe engine inside the shadcn Dialog, loaded on first open; no lightbox library.
  - The Dialog provides the focus trap, Esc and scroll lock; focus returns to the opener by hand, because it opens without a DialogTrigger.

## Media components (`src/components/media/`)

- **PlaceholderImage**: generated polished-steel art (`instrument-art.ts`, served as static SVGs from `/art/<kind>-<view>-<ratio>-<tone>.svg`).
  - Props: `kind` (forceps, scissors, retractor, needleHolder, clamp, generic), `view` (front, side, top, back, detail, angle), `ratio`, `tone` (steel, ink, clear), `showLabel`, `fill`, `priority`.
  - `priority` preloads the image from the document head.
- **ProductVisual**: real photo via `next/image` when `src` is set, otherwise the placeholder for the same view; the aspect ratio is always reserved.
- **VideoCard**, **VideoPoster**, **VideoTrigger** and **VideoModal** (`src/features/videos/components/`):
  - The player loads only when opened, inside a shadcn Dialog: YouTube via `youtube-nocookie.com`, local files via `<video controls playsInline preload="none" poster>`.
  - Esc closes it, playback stops on close, focus returns to the play button, and a captions track slot is supported.

## Timeline (history)

Props: `events: { year, title, description, image?, highlight? }[]`.

- Desktop: central vertical line, cards alternate left and right, year in large display numerals on the opposite side, small node dot on the line.
- Mobile: single column, line on the left.
- The line fills with the glow colour as the section scrolls (one passive scroll listener writing a transform). Each card below the fold fades up when it enters.
- `highlight: true` makes a milestone larger with an image.
- Keyboard and screen readers get an ordered list (`<ol>`), with years in the headings. Reduced motion: no scroll-linked fill, line shown filled.

About also uses **ProcessSteps** (seven sticky stacking cards; a plain list under reduced motion) and **WorldReach** (dotted map with glowing markets and CountUp figures).

## Forms (`src/features/contact/components/`)

- **ContactForm**: React Hook Form + Zod on shadcn Field, Input, Textarea and Checkbox.
  - Fields per SITEMAP, plus a honeypot field and `?product=` prefill.
  - Error summary for screen readers; focus moves to the first invalid field.
  - States: idle, submitting, success. The success panel has next-step text and a Sonner toast (loaded on submit). In demo mode nothing is sent.
- **CountryPicker**: searchable list (Popover + Command). The list (`country-list.tsx`) is prefetched when the page is idle.

## UI primitives (`src/components/ui/`)

shadcn/ui (`new-york`, Radix): Badge, Breadcrumb, Button (pill; `glow` variant for dark), Checkbox, Command, Dialog (labelled close button), Drawer, Empty, Field, HoverCard, Input, Label, NavigationMenu, Pagination, Popover, Select, Separator, Sheet, Skeleton, Sonner, Table, Tabs, Textarea, Toggle, ToggleGroup, Tooltip.

Local helpers: **Reveal** (fade-up on scroll; only hides elements that start below the fold) and **Icon** (named Lucide icons).

## States every data component must handle

Loading (skeleton), empty (designed message with next step), error (friendly, with retry or link), and long text (truncate with line-clamp, never break layout).
