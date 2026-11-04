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
- **Redesign Phase 4 (products).**
  - **The lightbox keeps its own engine.** It already did everything in the COMPONENTS spec (zoom to 4x by buttons, wheel, pinch or double-tap; pan; swipe; swipe down to close; keyboard), so only its shell changed: shadcn Dialog replaces the native `<dialog>`. No lightbox library was added.
  - **Product pages keep the inner 2.2x hover zoom** that the spec asks for; the magnifier loupe stays on the home viewer as the signature moment. The main image now also swipes between views on touch.
  - **The gallery stays sticky on desktop, not the info panel.** The info column is the taller one, so keeping the images in view while it scrolls is more useful.
  - **Product tabs use shadcn Tabs at every width**, with a sideways-scrolling tab list on phones, instead of Tabs plus a mobile Accordion. That avoids rendering the content twice.
  - **The spec sheet is a shadcn Table** with row headers (`<th scope="row">`) and a hidden caption, replacing the definition list. It stays readable to screen readers as label and value pairs.
  - **Filters:** toggle pills on desktop, because the facets have two or three options each and a pill row shows them at a glance; a bottom Drawer with checkboxes on phones. Pagination (12 per page) appears only when a range has more than 12 listed products, which none has today.
  - **Search starts from `?q=`**, so the 404 page's search box can hand off to the products page.
  - **The first four product images on a category page load eagerly**, because the first card image is the page's largest element.
  - **Phones scroll snap rows with matching scroll padding**, so the first card lines up with the page margin.
- **Redesign Phase 5 (About, Catalogue, Videos, Contact, 404).**
  - **About alternates dark and light:** intro (light), history timeline (dark, glowing fill, signature moment 3), manufacturing as sticky stacking cards (light), quality (light), world reach (dark, glowing map), leadership and certifications (light), CTA.
  - **Seven stacking cards** for the seven manufacturing stages, rather than V2's three. The client's process has seven stages, and the cards stay compact. Under reduced motion they are a plain list.
  - **Certifications on About use the shared component**, the same as on Home, as the sitemap asks. The old modal badge component was removed.
  - **The contact form is on shadcn Field, Input, Textarea and Checkbox.** The country field is a searchable Popover + Command (the browser `datalist` it replaced was hard to use on phones). A Sonner toast confirms the demo submission. The Toaster is mounted on the contact page only, so other pages don't load it.
  - **Form fields use `--steel-dim` borders (3.7:1 on white).** The `--rule` colour (1.4:1) is too faint for a field boundary.
  - **Dialogs that open without a `DialogTrigger` return focus by hand** (catalogue preview, video player, lightbox). Radix only restores focus to its own trigger.
  - **The 404 search links to `/products?q=…`** ("Search the full catalog") as well as showing results inline.
  - **The video grid sits on a dark band** and filters with a single-choice ToggleGroup.
  - **All legacy code is gone:** `ui/legacy`, the old `Section` and `SectionHeading`, `VisuallyHidden`, and the legacy colour, radius and utility aliases in `globals.css`. Every page now uses shadcn primitives and the new tokens.
- **Redesign Phase 6 (polish and performance).**
  - **Lighthouse on this machine:** Lighthouse's own Chrome delays first paint by ~2s on this Windows host, including on the pre-redesign site. The browser's Performance API shows first paint at 300ms. The default simulated mode treats that delay as page time and inflates LCP. Scores are therefore reported with `--throttling-method=devtools` (real 4x CPU and network throttling). Re-check on the deployed site with PageSpeed Insights.
  - **LCP fixes:**
    - The hero headline and lede no longer animate in.
    - `Reveal` hides only content that starts below the fold.
    - Priority images are preloaded from `<head>`.
    - The first row of video posters and of category product images loads eagerly.
  - **Rendering fixes:**
    - `content-visibility: auto` on bands, the footer and the CTA (off for the first band under a hero).
    - `text-wrap: pretty` removed from paragraphs.
  - **Blocking-time fixes:**
    - Each Band hydrates in its own Suspense boundary.
    - Spotlight cards are server components with one delegated pointer listener.
    - The mobile menu, mobile filter drawer, contact toaster and country list load on demand (the country list is prefetched once the page is idle).
  - **Motion removed.** The timeline fill is a native passive scroll listener. Motion was used for that effect only, and dropping it saves about 45KB of JavaScript.
  - **Removed unused code:** shadcn accordion, aspect-ratio, card, carousel (plus `embla-carousel-react`) and scroll-area.
  - **`dark:` is tied to a `.dark` class** the site never sets. By default, shadcn's dark styles would have followed the visitor's system dark mode.
  - **BreadcrumbList JSON-LD** added to About, Products, Catalogue, Videos and Contact.
  - **Focus rings** added to tab panels, which are focusable by default in Radix.
- **Admin panel (2026-10-30).**
  - **Requested by the user**, which lifts the brief's "no auth, no CMS, no database" rule for this feature only. The layout is the shadcn `dashboard-01` block the user installed; its sidebar, header, cards and chart were adapted and moved to `src/features/admin/components`. Its demo table and `data.json` were removed in the 2026-11-01 clean-up.
  - **Route groups.** Public pages moved to `src/app/(site)` with the header and footer in `(site)/layout.tsx`, so `/dashboard` renders without the site chrome. URLs did not change. The root `not-found.tsx` wraps itself in `SiteShell` because it renders outside the group.
  - **UI only (user's request, 2026-10-31).** The working admin logic was removed so the user can write their own: server actions, the JSON file store, enquiry saving in `/api/quote`, `/media/products` and the attachment download route, product validation and stats. `/api/quote` is back to email and webhook delivery only. Screens read static data from `src/features/admin/data/sample.ts`, and components keep the same props, so swapping in real data means replacing those imports. Search, filters, tabs, image preview and dialogs still work; save, delete, archive and status buttons change nothing. There is no sign-in, so access control must be added with the logic. `docker-compose.yml` and its Postgres variables were left for the user's own backend.
  - **"Catalogs" are the product ranges** (categories), the only catalog concept in the data.
  - **Lint fixes in installed shadcn files:** `useIsMobile` uses `useSyncExternalStore` (it set state inside an effect), and `SidebarMenuSkeleton` derives its width from `useId` instead of `Math.random` during render.
- **New category taxonomy (2026-11-01, user's request).**
  - **12 categories replace the 7 old ranges** in `src/features/products/data/categories.ts`, with sub-categories on 5 of them. The text in brackets after a sub-category (for example the list after Orthopedic Implant Boxes) is its description, not part of its name. Category descriptions restate the user's list and add no claims.
  - **Sub-category URLs** are `/products/<category>/<sub-category>`, on the same route as product pages (`category-child-view.tsx` picks which to render). The build fails if a product slug matches a sub-category slug in its category.
  - **Uncategorised products** live in `uncategorisedProducts` in `products.ts`. They have no public page and appear only in the admin list. Conservative choices: manicure products were not moved to Podiatry and single-use forceps and scissors were not moved to Podiatry, because nothing marks them as podiatry instruments. Iris Scissors stayed in General Surgery & ENT because their description is general fine-tissue work, not eye surgery. The Instrument Tray sits in Sterilization Boxes & Trays with no sub-category.
  - **About timeline** still mentions the dental, veterinary and beauty ranges, because it is company history rather than a category label.
  - **The header menu** drops category descriptions and widens, so all 12 categories and their sub-categories fit. The admin product form has no sub-category field yet.
- **Product images on Neon (2026-11-01, user's request).**
  - **The admin add and edit forms are live.** Details go to the Postgres `products` table (`db/migrations`, applied with `npm run db:migrate`) and images to the `products` bucket. This reverses part of the "UI only" entry above, for these two actions only.
  - **The `products` bucket is private, so the database stores an app URL**, `/media/products/<file>`, which `src/app/media/products/[file]/route.ts` serves from the bucket. A direct bucket URL would not load, and a presigned URL would expire. If the bucket is made `public_read` behind a CDN later, only `productImageUrl` and the stored rows change.
  - **Driver:** `pg` with `attachDatabasePool`, Neon's advice for Vercel. Migrations use the direct connection, the app uses the pooled one.
  - **Public site:** replaced by the "Database products on the website" entry below.
- **Email sign-up with Neon Auth (2026-11-01, user's request).**
  - **Pages:** `/auth/sign-up`, `/auth/sign-in` and `/account` (current user, sign out), with code in `src/features/auth`. They are custom forms using the site's components, not Better Auth UI, to avoid adding TanStack Query and generated components for a simple form. None are linked from the site navigation.
  - **This does not protect `/dashboard`.** Anyone can sign up, so being signed in cannot mean being an admin. Admin access still needs a role check as well as a session.
  - **`neon.ts` declares the `products` bucket** as well as `auth`, so the file matches the project. The bucket stays private.
  - **Production email:** emails use Neon's shared SMTP, and Neon requires custom SMTP for production.
- **Admin login API (2026-11-01, user's request).**
  - **Admins are rows in `public.users` with role `admin`**; that table has the columns the user described. `POST /api/admin/login` and `GET /api/admin/me` are in `src/app/api/admin`, with the logic in `src/features/admin/lib/auth.ts`.
  - **Neon Auth cannot read the bcrypt hash in `users`.** The first login checks that hash, creates the Neon Auth account and saves its id in `users.auth_user_id`. Later logins go to Neon Auth only, so `users.password` then stops being used, and changing it has no effect.
  - **Admin rights follow `auth_user_id`, never email**, because sign-up is public and emails are unverified. If someone registers an admin's email before that admin's first login, the attacker gets no access, but the admin's first login fails until that Neon Auth account is removed.
  - **Login page and guards:** the form is at `/admin/login`. Every dashboard page wraps its view in `AdminGuard`, `AdminShell` in the layout hides the sidebar, and both product server actions check the admin themselves. The page checks are required, not duplication: Next.js does not re-run layouts on client navigation, so a layout check alone would not protect a page's data. New dashboard pages and actions must add the same check.
- **Clean-up and rate limiting (2026-11-01, user's request).**
  - **Removed:** unreachable files (`data-table.tsx`, `nav-documents.tsx`, `ui/hover-card.tsx`, `ui/sonner.tsx`, `dashboard/data.json`), dead functions, the packages only they used, and `docker-compose.yml` with its Postgres variables, because the database is Neon. Unused sub-components inside `components/ui` were kept: those files are vendored from shadcn, and trimming them makes updates harder.
  - **The `cn` package was removed** and five shadcn files now use `@/lib/utils`. It had been installed by accident, against the rule in `REDESIGN_PLAN.md`, and its merge did not know the custom `text-h1` sizes.
  - **Shared code:** product URLs are in `features/products/lib/paths.ts`, safe for client components. Route helpers are in `src/lib/api.ts`.
  - **Rate limits are stored in Postgres** (`src/lib/rate-limit.ts`, table `rate_limits`), not in memory. Serverless instances do not share memory, so the old limiter barely limited anything on Vercel. Postgres needs no new service. Keys are hashed. If the check itself fails, the request is allowed and logged, so a database fault cannot block enquiries.
  - **`/media/products` is not limited:** a database write per image view would cost more than it protects, and those files are cached by the CDN.
- **Failure handling (2026-11-01).**
  - **`src/app/error.tsx` is at the root** because an `error.tsx` cannot catch errors from the layout beside it, and the dashboard layout is what checks the admin.
  - **The database pool has an `error` listener.** Neon closes idle connections when it scales to zero, and an unhandled pool error would stop the Node process.
  - **First login can resume.** If it stops after the Neon Auth account is created, the next login signs in to that account with the password that passed the bcrypt check, then links it.
  - **Neon Auth needs an `Origin` header on server-side calls.** Browsers send one; a script calling `/api/admin/login` must too, or it gets a 401.
- **Products API (2026-11-01, user's request).**
  - **`POST /api/admin/products`, `PUT` and `DELETE /api/admin/products/[id]` replace the two server actions**, so there is one write path. The form sends multipart data with `fetch`, and `serverActions.bodySizeLimit` was removed because no server actions remain. There is no `GET`: the admin pages read the database directly.
  - **Each route calls `denyProductWrite` first:** same origin, then admin, then the `adminSave` limit. Route handlers do not get the origin check Next.js gives server actions, so it is explicit.
  - **Delete is live.** It removes the row, then the image, and the dialog treats a 404 as already deleted.
  - **The form remounts after a save.** Next.js keeps visited pages mounted, so `/dashboard/products/new` would otherwise reopen with the old values. The edit form is keyed on `updatedAt` for the same reason.
  - **Loading and empty states are in `src/features/admin/components/states`,** one file per component, with `Spinner` and `Empty` from shadcn. They replace the admin `Skeleton` fallbacks. Dashboard cards and enquiries still use sample data that does not load asynchronously, so they have no Suspense boundary of their own beyond `AdminGuard`.
  - **The edit page shows an empty state for a missing product** instead of the public 404, so the admin keeps the sidebar.
  - **`cn` package removed again.** The shadcn CLI writes `from "cn"` in new files, so check that import after each `shadcn add` and change it to `@/lib/utils`.
- **Database products on the website (2026-11-01, user's request).**
  - **`data/products.ts` is deleted.** This replaces the "24 products" and "Uncategorised products" entries above. Postgres is the only product source; categories stay in `categories.ts`. Reads are in `features/products/lib/store.ts`.
  - **`GET /api/products?category=<slug>` is public** and returns summaries. The search box calls it on first use, so pages with search stay static. Server-rendered pages call `getStoreProducts`, the function behind that route, because a server component fetching its own API only adds a network hop.
  - **Product reads are uncached** (`connection()` inside Suspense), so a saved product appears at once, at the cost of one database read per view. Category pages keep a prerendered hero and stream the list behind `ProductListLoading`. `/sitemap.xml` is dynamic for the same reason.
  - **`/products` keeps the range cards** and adds "Products by range": up to four newest per category, with empty categories left out.
  - **Fields the admin form does not collect** (type, material, finish, features, specs) are left out of the pages. Cards and the top of the product page show the full title as the short description. There is one photo per product.
  - **Sub-category pages always show the empty state**, linking to the category. `products` has no sub-category column, and adding one needs a migration and a form field.
  - **Sizes share the product's model.** The size table has no SKU column, and each size's quote link fills in "model size".
  - **The WhatsApp message no longer names the product**, and the quote form shows the SKU without a product name, because both read the static list.
  - **Slugs avoid every sub-category slug**, because products and sub-categories share `/products/<category>/<slug>`.
  - **The dashboard's product figures are real.** Enquiry figures are still samples.
  - **A missing product returns status 200 with the 404 page**, because the response has already started streaming. Next.js adds `noindex` to it.
- **Home page products and photos (2026-11-02, user's request).**
  - **The home products section shows eight database products**, one from each range in turn, so the largest range does not fill it. The range cards stay on `/products`.
  - **The whole section is hidden when there are no products or the read fails**, so a database fault cannot take down the home page. The fault is logged. The section title and a card skeleton show while it loads.
  - **The database pool has a 10-second connection timeout** (`src/lib/db.ts`). There was none, so an unreachable database kept loading states on screen until the operating system gave up. This applies to every database read and write.
  - **Home photos are copies in `public/home`,** because `public/products` is replaced with each upload batch. They are product photos under 600 px wide, because no factory or facility photos have been supplied. They show whole in a bordered frame with an 8px radius and no background (`fit: "contain"`), and product images elsewhere have no background of their own, at the user's request. The manufacturing and about pages keep their photo slots.
- **Catalogue flipbook (2026-11-02, user's request).**
  - **The catalogue page shows the PDFs in `public/catalogue` as turning books**, and replaces the placeholder preview by range and the placeholder PDF download.
  - **The page turn is our own code** (`features/catalogue/lib/page-curl.ts`, `book-scene.ts`), modelled on the behaviour of a flipbook the user showed as an example. No flipbook plugin is used. The site keeps its own navy look and layout.
  - **`three` is a new dependency**, loaded only when a catalogue is opened.
  - **Every page takes the first page's shape.** A page of another shape, such as Nathanson page 2, is centred on white rather than stretched.
  - **Phones show one page at a time**, using the same book, so a page turn still plays.
  - **If WebGL fails, the viewer offers the PDF request form.** With reduced motion turned on, pages change without the animation.
- **Catalogue PDF protection (2026-11-02, user's request).**
  - **The PDFs left `public/`.** The repository is public, so they are not committed either. They are in the private `products` bucket under `catalogues/`, with local copies in the git-ignored `private/catalogue`.
  - **The viewer shows pre-rendered pictures, not the PDF.** A PDF sent to the browser for viewing could be saved from the network tab, so PDF.js moved to the publish script. Pictures are 1600 px tall and watermarked, and the downloaded PDF is clean.
  - **"Sent by the owner" is read as: the code goes straight to the requester from the company's mailbox, and the company gets a notice of each request.** Approving each request by hand would need a stored queue and an admin screen.
  - **Codes are stateless,** signed with `CATALOGUE_SECRET`, so no migration was needed. A code lasts 15 minutes and is valid for one catalogue and email. Each link lasts 5 minutes. A code can be reused until it expires.
  - **The catalogue routes have no rate limit, at the user's request (2026-11-02), for now.** They had 3 codes an hour per email, 10 an hour per IP and 5 guesses per 15 minutes. Without these, a script can guess a six-digit code within its 15 minutes and can send repeated mail to any address, so restore them before launch.
  - **Screenshots cannot truly be blocked by a web page.** The shield hides the book on window blur and known shortcuts, and pages print blank. The watermark is the protection that survives a capture.
- **SEO pass (2026-11-04, user's request).**
  - **Titles and descriptions are fitted, not hand-counted.** `fitTitle` takes candidates and uses the first that fits in 60 characters, with " | brand" when it still fits; `composeDescription` adds sentences by priority up to 160. A rebrand or a long product name cannot push a page past what search results show.
  - **Product titles use the pattern from the short description** ("Nail Cutter – Box Joint, Curved"), because several products share a plain name and gave duplicate titles (`features/products/lib/label.ts`).
  - **Range titles name a product** ("Gynecology Instruments Manufacturer", not "Gynecology Manufacturer"), via `rangeNoun`.
  - **Sub-category pages are `noindex, follow` and out of the sitemap** while they list no products (they show a "browse the whole range" notice). Thin, near-empty pages read as soft 404s. Set `indexSubcategories` in `features/products/data/seo.ts` to true once products carry a `subcategorySlug`.
  - **No `VideoObject` data yet:** the sample videos have no file, and an upload date would be invented. Add it when real clips arrive.
  - **Product data has no `offers`**, as prices are quoted per order. Product pages are understood by search engines but are not eligible for price rich results.
