# Decisions

Judgement calls made while building the demo, where the docs were silent or ambiguous. Each one is the conservative option.

## Design direction

- **Concept: "the drawing office".** Surgical instruments start as engineering drawings: orthographic views, dimension lines, a title block. That vocabulary drives the one bold element (the hero's self-drawing technical drawing with front and side views), the generated placeholder art, and the gallery's labelled views. Everything else stays quiet.
- **Measurement as a motif.** The stats sit on ruler tick marks and the history timeline is a steel rule whose fill follows the scroll. Both come from the subject (instruments made to tolerance), not from a template.
- **Fonts:** Archivo (one variable file with width and weight axes) for everything: body at normal width, headings and `.font-display` at 112% width, weight 600. JetBrains Mono for codes, specs and drawing annotations only. Replaced the original Newsreader serif on 2026-10-17 because the client asked for no serif font; Archivo's wide, engineered cut suits a precision-steel catalogue and one family loads fewer bytes than two.

## Accessibility over a token value

- **Brand colour is #097E9E (client request, 2026-10-18), replacing the teal.** It is `--accent-strong` and the home `--scrub`: buttons, links and accent text on light backgrounds (white text on it is 4.7:1). On the dark navy it is only 3.9:1, so `--accent` is a lighter tint of the same blue (#2EA3C4, 6.2:1 on navy) for eyebrows and icons there. Hover uses `--accent-deep` (#07657F); tints use `--accent-soft` (#E0F1F6).

## Content

- **Company content comes from the client's current site (acme-cw.vercel.app), at the user's request.** Name (Acme Commercial Ways (Pvt) Ltd.), Sialkot address, phones, emails, founding year (1960), "50+ export markets", "1000+ instrument profiles", the eight product ranges and their sizes, the eight listed SKUs, the four certifications, the export markets and the process steps. These are the client's own claims, so they replace the earlier placeholders, but they sit in `src/config/site.ts` and the feature data files for one-place correction. The client's site itself says the certifications must be checked against verified documents before launch.
- **What was not taken from that site:** its layout and visuals, the cart, wishlist, newsletter, testimonials (marked fictional there) and the insights articles (placeholders there). The cart and wishlist are outside the brief. Manufacturing and quality content became sections of the About page instead of new routes, to keep the sitemap in SITEMAP_AND_PAGES.
- **Page copy lives with its feature:** `src/features/<page>/data/copy.ts`. Copy shared by the layout (header, footer, call to action) stays in `src/data/copy.ts`. Short control labels and screen-reader-only text stay in the components.
- **WhatsApp number is empty**, which hides the floating button. The client's site gives no WhatsApp number, and a fake number on a real company's site would be a broken link. Set `contact.whatsapp` in the site config to show it again.
- **Social links are empty** for the same reason; the footer hides empty ones.
- **Products:** 24 products, three per range. The eight from the client's site keep their SKUs (e.g. `ACME-SC-101`); the others use bracketed codes (`[ACME-HF-205]`) to mark them as samples. Every product has 5 views (front, side, top, detail, angle).
- **Filters:** material and availability ("Available" / "Made to requirement"), the two attributes the client's catalog shows. Facets with fewer than two options in a range are hidden.
- **Range size vs. listed products.** Category cards show the client's range size ("180+ instrument profiles"); the category page also states how many are listed online, so the two numbers are never confused.
- **Catalogue preview** pages are drawn from the product data (cover plus product pages) until real scans exist. The PDF is a one-page placeholder in `public/docs/`.

## Code structure

- **Feature folders.** Each page has a folder in `src/features/` (`home`, `about`, `products`, `catalogue`, `videos`, `contact`, `not-found`) with `components/`, `data/` and, where needed, `hooks/`, `lib/` and `types/`. Route files in `src/app` only export metadata and the page component, which composes feature sections. `generateStaticParams` and `generateMetadata` stay in the route files because Next.js requires them there; they delegate to feature functions.
- **Shared code stays outside features:** `src/components` (ui, layout, media, seo, the CTA banner), `src/lib` (utils, SEO helpers), `src/types` (types used by several features), `src/data` (shared copy and certifications).
- **Cross-feature imports go one way:** pages and the layout may read the products feature (categories for the menu, products for search); features never import from `src/app`.
- **Home page.** The self-contained client home page added to `src/app/page.tsx` was split into `src/features/home`. Its header and footer were dropped in favour of the shared layout (its own notes asked for this), its tokens moved to a `.home-root` block in `globals.css` (scoped so they cannot leak into other pages), and its fonts now come from the layout. Sections without interaction render on the server; only the drawing, range index, spotlight and video dialog are client components.
- **SEO.** Every route has a title, 150 to 160 character description, keywords, canonical URL, Open Graph and Twitter tags and robots rules, built by `pageMetadata` from the feature's `data/seo.ts`. Category and product pages build theirs from the data. Structured data: Organization (with address and contact points) site-wide, WebSite with search on the home page, BreadcrumbList, ItemList on catalog pages, Product on product pages and ContactPage on contact. The 404 page is `noindex`.

## Technical

- **Next.js 16 with Cache Components.** Dynamic routes (`/products/[category]` and `/products/[category]/[slug]`) read `params` inside a `<Suspense>` boundary, as Next 16 requires for instant navigation. All known paths are prerendered with `generateStaticParams`. Unknown slugs return the 404 page.
- **Header and WhatsApp button** read the pathname, so they sit in `<Suspense>` with a pathname-free fallback.
- **Filters** keep their state in URL search params (`?material=Titanium&sort=newest`), with optimistic local state so checkboxes respond at once.
- **Modals, the mobile menu and the lightbox use the native `<dialog>` element.** It provides the focus trap, Esc to close and inert background. Focus is returned to the trigger.
- **Lightbox is custom** (no library): zoom up to 4x by button, wheel, pinch or double-click/tap, drag to pan, swipe between views, swipe down to close, keyboard (Esc, ←, →, +, −, 0). It and the video modal load only on first open (`next/dynamic`).
- **No `/_kit` route.** Folders that start with `_` are private in the App Router, and the full site now shows every primitive in context.
- **The hero line drawing animates with CSS only** (`stroke-dashoffset`), so it is server-rendered and shows its final state for reduced-motion users.
- **Package manager:** the project was initialised with npm (`package-lock.json`), so commands use `npm run`.
- **Demo badge removed (2026-10-18).** The user deleted its text from `layoutCopy`, so the floating "Design preview" badge (`DemoRibbon`) was removed too. `NEXT_PUBLIC_DEMO_MODE` still controls the contact form's "nothing was sent" note.

## Redesign (shadcn/ui + V2 showcase look), from 2026-10-23

Work happens on the `redesign` branch. Plan: `docs/REDESIGN_PLAN.md`; brief: `docs/REDESIGN.md`.

- **V2 reference moved out of the app.** The V2 design file had been pasted over `src/app/page.tsx`, which broke the build (`new Date()` in a client component during prerender). It now lives at `docs/reference/page-v2.tsx` (excluded from typecheck and lint), and `src/app/page.tsx` is the small route file again, composing `src/features/home`.
- **21st.dev is optional, never blocking (user decision).** Its MCP search was failing, and the free tier has no AI generation and only 2 code retrievals a day. Showpiece sections are built from shadcn + Motion by adapting V2's own effects. Code the user sends from 21st.dev is adapted to our tokens and credited in `docs/COMPONENT_SOURCES.md`.
- **`components.json` fixed for Tailwind v4:** `new-york` style (Radix primitives), empty `tailwind.config`, `src/app/globals.css`, CSS variables, lucide icons. The old file is backed up at `docs/reference/components.json.bak`.
- **Colours.** `--primary` stays the client's #097E9E. V2's palette (night, deep, silver, steel) covers the dark surfaces, and #8EEBFF (`--glow`) covers small text, links and focus rings on dark. #097E9E is 4.23:1 on the dark background and 4.18:1 on V2's paper, so it is used for buttons, fills and large elements only. Small accent text on light uses #07657F (5.9:1). White text on #097E9E is 4.68:1.
- **Fonts: Bricolage Grotesque (display) + Geist (body), replacing Archivo (user approved, 2026-10-23).** Both are sans, so the client's "no serif" request still holds. Geist Mono replaces JetBrains Mono for codes and specs, so body and mono come from one family.
- **Real client details win.** Where V2 shows placeholders ("Brand Name", "[Street address]"), the values from `src/config/site.ts` are used.
- **No dates computed in components.** The footer shows no year, which keeps Cache Components prerendering safe.
- **Commands use npm** throughout the docs (CLAUDE.md, BUILD_PLAN, REDESIGN).
- **Redesign Phase 1 (foundation).**
  - **Placeholder art: V2's art, served as static files.** V2 drew instruments as inline React SVG. The art was ported to SVG strings (`instrument-art.ts`) so `PlaceholderImage` keeps serving prerendered `/art/*.svg` files that lazy-load and cache like photos. Its props are unchanged, so every page picked up the new art with no call-site edits.
  - **`Reveal` stays CSS + IntersectionObserver** instead of the Motion rebuild in the plan. It already does fade-up 16px once, honours reduced motion and stays visible without JavaScript. A Motion version would add JavaScript to every page for the same result.
  - **Custom primitives moved to `src/components/ui/legacy/`** (accordion, button, chip, field, icon-button, modal, skeleton, tabs) so shadcn could install into `ui/`. Pages move off them phase by phase; the folder is deleted in Phase 6.
  - **Legacy `accent` classes renamed to `legacy-accent`.** shadcn uses `--accent` for hover tints, while the old system used it for a bright blue on dark. Old components now point at `--legacy-accent`, which is removed with the other legacy aliases in Phase 6.
  - **Error colour changed to #B3412A** (5.1:1 on paper), with #FF9E8A on dark (9.9:1). The old #C8553D was 3.9:1 on the new paper background.
  - **`src/config/theme.ts`** holds the hex values for places CSS cannot reach (placeholder SVGs, OG image, browser theme colour). It must be kept in step with `globals.css`.
  - **`instrument-shapes.ts` (old line art) is kept** only for the inner-page `PageHero` until that component is redesigned in Phase 2.
- **Redesign Phase 2 (layout).**
  - **One dark glass pill on every page**, instead of "transparent over the hero, solid after scroll". The pill floats above light and dark tops alike, and after scrolling it only gains a shadow. One style means one logo treatment and no colour flips while scrolling.
  - **Logo in white on dark** (`siteConfig.logo.invertOnDark`): the client logo has near-black lettering that disappears on the dark pill and footer. The logo file, size and alt text now come from `siteConfig` (the alt was hard-coded before).
  - **Products is a menu button, not a link.** Radix NavigationMenu triggers are buttons. `/products` is reached from "All products" in the panel, the mobile menu and the footer. Hover, Enter/Space and Esc all work, and focus returns to the trigger.
  - **Breadcrumbs follow the surface tokens**, so the old `dark` prop was removed.
  - **WhatsApp green is a token** (`--whatsapp`), used by that button only. The button is still hidden while `contact.whatsapp` is empty.
  - **`instrument-shapes.ts` removed.** `PageHero` now uses the dark placeholder art.
  - **`--header-h` is 80px** (12 to 16px top offset plus the 56px pill).
- **Redesign Phase 3 (home).**
  - **Twelve sections, as planned.** Light and dark sheets alternate: hero with trust strip (dark), capabilities (light), range bento (dark), product viewer (light), story and stats (dark), featured products (light), video highlight (dark), certifications (light), then marquee and CTA (dark).
  - **Marquee shows the range names, not client logos** (user approved). No logo strip ships until real client logos exist.
  - **Hero headline shortened to two display lines** ("Precision instruments / for healthcare, worldwide."), from the client's longer title, which would run to five lines at display size. The full sentence and the client's facts remain in the lede.
  - **The headline only lifts into place; it never fades.** It is the largest element on screen (the LCP element), and transparent text would delay LCP.
  - **The hero light sweep starts after the page `load` event**, not during first paint. The SVG `drop-shadow`, the glow `blur()` and the grain's `mix-blend-mode` were removed because they were costly to paint on mid-range phones.
  - **Phones scroll the range tiles and featured products sideways** with CSS scroll snap, not the embla Carousel. Same behaviour, no JavaScript.
  - **The shared `CtaBanner` was rebuilt** in V2's gradient style. Every page that ends with it now ends on the dark band, joining the footer.
  - **CSS is inlined in `<head>`** (`experimental.inlineCss`, which Next recommends for Tailwind). This removes the render-blocking stylesheet request. Tailwind no longer scans `docs/`.
  - **Lighthouse baseline (local machine, mobile preset, CPU benchmark ~1,100).** Before the redesign: Home 58, About 51 performance, with blocking time 2.7 to 3.2s. After Phase 3: Home 56, About 55, blocking time 1.2s; Accessibility, Best Practices and SEO are 100. The remaining gap is site-wide hydration on a slow test machine, and it is the subject of the Phase 6 performance pass.
