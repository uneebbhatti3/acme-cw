# Surgical Instruments Manufacturer: Website Demo

A front-end demo for a surgical instruments manufacturer. It covers the product catalogue (categories, product pages, a gallery with labelled views, hover zoom and a full-screen lightbox), a history timeline, videos, a catalogue download and an inquiry form. All content is placeholder and lives in typed local files.

Built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS 4 and Motion.

## Run it

```bash
npm install
cp .env.example .env.local   # optional; enables the "Design preview" badge
npm run dev                  # http://localhost:3000
```

Other scripts:

| Command             | What it does                    |
| ------------------- | ------------------------------- |
| `npm run lint`      | ESLint                          |
| `npm run typecheck` | TypeScript, no output           |
| `npm run build`     | Production build (must pass)    |
| `npm start`         | Serve the production build      |

### Environment variables

| Name                    | Purpose                                                   |
| ----------------------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_DEMO_MODE` | `true` shows the "Design preview" badge and sample notes  |
| `NEXT_PUBLIC_SITE_URL`  | Public URL for canonical links, sitemap and Open Graph    |

## Deploy to Vercel

1. Push the repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository. The framework is detected automatically.
3. Add the environment variables above, then deploy.

## Replace the placeholder content

No component changes are needed.

1. **Brand and contact details:** edit `src/config/site.ts` (name, tagline, address, phone, email, WhatsApp number, social links, hero video, feature flags).
2. **Colours:** edit the tokens at the top of `src/app/globals.css`.
3. **Logo and favicon:** replace `src/components/layout/logo.tsx` with the client's logo file, and replace `src/app/favicon.ico`.
4. **Product photos:** add files to `public/products/<slug>/` (for example `front.webp`, `side.webp`, `top.webp`, `detail.webp`, `angle.webp`), then set `src` on each image in `src/features/products/data/products.ts`. Use a white or neutral background, at least 2000 px on the long edge for zoom. Any image without `src` keeps the generated drawing.
5. **Products and categories:** edit `src/features/products/data/products.ts` and `categories.ts`. Data is validated at build time: duplicate slugs, unknown categories or unknown related products fail the build with a clear message.
6. **History, team, map regions:** `src/features/about/data/` (`timeline.ts`, `team.ts`, `reach.ts`). Company figures (founding year, markets, profiles) are in `src/config/site.ts`. Certifications are in `src/data/certifications.ts`.
7. **Documents:** put certificate and catalogue PDFs in `public/docs/`, then set `file` on certifications and `catalogueFile` in the site config.
8. **Videos:** in `src/features/videos/data/videos.ts`, set `src` to a local MP4 path (`provider: "file"`, plus a `poster`) or a YouTube ID (`provider: "youtube"`). An empty `src` shows a "coming soon" state.
9. **Page copy and SEO:** each page's text is in `src/features/<page>/data/copy.ts`, and its title, description and keywords in `src/features/<page>/data/seo.ts`. Header, footer and call-to-action copy is in `src/data/copy.ts`.

## Project structure

Route files in `src/app` only hold metadata and the page component. Everything else lives with the page it belongs to.

```
src/
  app/                  routes: page.tsx files compose feature sections
  features/
    home/               components/ (hero, range index, spotlight, quality, story, videos, CTA, art/)
                        data/ (copy, seo), hooks/ (useHoverZoom, useStepper), types/
    about/              components/ (intro, history, manufacturing, quality, reach, leadership, certifications)
                        data/ (copy, seo, timeline, team, reach, stats), types/
    products/           components/ (cards, grid, search, filters, gallery, lightbox, category/, detail/)
                        data/ (categories, products, filters, copy, seo), hooks/ (useProductFilters)
                        lib/ (content accessors, search, metadata), types/
    catalogue/          components/ (download, sections, viewer), data/
    videos/             components/ (grid, card, trigger, modal), data/, types/
    contact/            components/ (form, details, map), data/ (copy, seo, countries), lib/ (form schema)
    not-found/          components/, data/
  components/           shared: ui/, layout/, media/ (placeholder art), seo/ (JsonLd), sections/ (CTA banner)
  config/site.ts        brand, company facts, contact, navigation, feature flags
  data/                 copy and certifications shared by several pages
  lib/                  utils, SEO helpers (metadata and JSON-LD)
  types/                types shared by several features
docs/                   project brief, specs and DECISIONS.md
```

## Known limitations (demo)

- The contact form validates and shows a success state, but sends nothing.
- Placeholder images are generated SVG drawings. The 360° gallery slot is not built because there are no spin frames.
- The map on the contact page is a static illustration.
- Certificates open a details modal until real files are supplied.
