# Technical Specification

## Stack

| Concern         | Choice                                                                     |
| --------------- | -------------------------------------------------------------------------- |
| Framework       | Next.js (App Router), React, TypeScript (strict)                           |
| Styling         | Tailwind CSS with design tokens as CSS variables                           |
| Animation       | Motion (Framer Motion)                                                     |
| Icons           | Lucide                                                                     |
| Forms           | React Hook Form + Zod                                                      |
| Lightbox        | `yet-another-react-lightbox` (Zoom, Thumbnails, Counter plugins) or custom |
| Fonts           | `next/font` (self-hosted Google fonts)                                     |
| Content         | Typed local files in `src/data`, statically generated                      |
| Hosting         | Vercel                                                                     |
| Lint and format | ESLint, Prettier                                                           |

No backend, database or CMS in the demo. Keep the data layer behind small accessor functions (`getCategories()`, `getProductsByCategory()`, `getProduct()`, `searchProducts()`) in `src/lib/content.ts` so a CMS can replace the local files later without touching pages.

## Folder structure

```
src/
  app/
    layout.tsx
    page.tsx
    about/page.tsx
    products/page.tsx
    products/[category]/page.tsx
    products/[category]/[slug]/page.tsx
    catalogue/page.tsx
    videos/page.tsx
    contact/page.tsx
    not-found.tsx
    sitemap.ts
    robots.ts
    globals.css
  components/
    layout/  sections/  product/  media/  ui/
  config/site.ts
  data/*.ts
  lib/
    content.ts      data accessors
    seo.ts          metadata and JSON-LD helpers
    utils.ts
  types/index.ts
public/
  placeholders/  docs/  products/  fonts?/
docs/
  (these specification files)
```

## Rendering strategy

- All pages statically generated (`generateStaticParams` for category and product routes).
- Client components only where interactivity is needed (header menu, gallery, lightbox, search, filters, video modal, forms, count-up, timeline scroll).
- Search and filters run client-side on the already-serialised product list; keep the list lean (no long descriptions in the search payload).
- Filter and sort state stored in URL search params.

## Performance requirements

- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- LCP < 2.5s, CLS < 0.05, INP < 200ms on a mid-range phone
- `next/image` everywhere with correct `sizes`; priority only for the hero or main product image
- Lazy-load below-the-fold sections, the lightbox, the video modal and the YouTube iframe (click-to-load)
- No autoplaying video with sound; hero video muted, short, compressed (< 3 MB), with poster; skipped on data-saver and reduced-motion
- Fonts: preload display and body only; `display: swap`; subset Latin
- Keep JS lean: dynamic-import heavy components; avoid large libraries for small tasks
- No layout shift: reserve aspect ratios for all media

## SEO

- Per-page `metadata` (title template `%s | {brandName}`, description, canonical, Open Graph, Twitter)
- Default OG image generated (`opengraph-image`) from brand name and tagline
- JSON-LD: `Organization` (site-wide), `BreadcrumbList` (inner pages), `Product` (product pages, without price; include `sku`, `category`, `image`, `description`)
- `sitemap.xml` and `robots.txt` generated from data
- Clean, readable slugs; no query-string-only content pages
- One H1 per page; logical heading order

## Accessibility

See DESIGN_SYSTEM → Accessibility. Additionally:

- Run `axe` checks on every route during QA and fix all serious and critical issues
- Test keyboard-only flows: header menu, product search, filters, gallery, lightbox, video modal, contact form
- Provide a skip-to-content link
- Respect `prefers-reduced-motion` and `prefers-color-scheme` where relevant (no dark theme needed)

## Security and privacy

- No third-party trackers in the demo
- YouTube embeds via `youtube-nocookie.com` and only after user click
- Contact form (demo) does not transmit data. Production plan: server action or API route sending email through a transactional provider, with rate limiting, honeypot and basic spam checks
- Set sensible security headers in `next.config` (X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors via CSP where feasible)

## Environment variables

```
NEXT_PUBLIC_DEMO_MODE=true      # shows the "design preview" ribbon
NEXT_PUBLIC_SITE_URL=https://example.com
```

## Browser support

Latest two versions of Chrome, Edge, Safari (including iOS), Firefox; Samsung Internet. Graceful behaviour without JavaScript for content pages (content is server-rendered).

## Testing and QA

- Type-check, lint and production build pass
- Manual test matrix: 375, 768, 1280, 1536 px; iOS Safari and Android Chrome
- Gallery tests: hover zoom, lightbox keyboard controls, swipe, pinch (on device), single-image product, many-image product
- Slow 4G throttled check of Home and a product page
- Broken-link check across all routes

## Production roadmap (not part of demo)

1. Real content and photography
2. Headless CMS (e.g. Sanity, Payload or Strapi) if the client wants to add products himself
3. Email delivery and spam protection for inquiries
4. Analytics (privacy-friendly) and search-console setup
5. Domain, SSL, business email, backups and a maintenance plan
