# Surgical Instruments Manufacturer: Website Demo

A front-end demo for a surgical instruments manufacturer. It covers:
- the product catalogue: categories, search, filters, and product pages with a gallery (labelled views, hover zoom, full-screen lightbox)
- a scroll-linked history timeline, videos, a catalogue download and an inquiry form

All content lives in typed local files. Company facts come from the client's current site; everything else is clearly marked placeholder.

Built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS 4, [shadcn/ui](https://ui.shadcn.com) (Radix primitives) and Motion. The visual design is the "V2 showcase" direction: dark glass surfaces, polished-steel art and light/dark sheets. See `docs/DESIGN_SYSTEM.md`.

## Run it

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
```

| Command             | What it does                 |
| ------------------- | ---------------------------- |
| `npm run lint`      | ESLint                       |
| `npm run typecheck` | TypeScript, no output        |
| `npm run build`     | Production build (must pass) |
| `npm start`         | Serve the production build   |

### Environment variables

| Name                    | Purpose                                                            |
| ----------------------- | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_DEMO_MODE` | `true` adds "nothing was sent" to the contact form's success state |
| `NEXT_PUBLIC_SITE_URL`  | Public URL for canonical links, sitemap and Open Graph             |

## Deploy to Vercel

1. Push the repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository. The framework is detected automatically.
3. Add the environment variables above, then deploy.

## Rebrand and replace content

No component changes are needed.

1. **Brand, company facts and contact details:** `src/config/site.ts`. This covers:
   - name, tagline, address, phones, emails, WhatsApp number, social links
   - logo file (with `invertOnDark` for logos with dark lettering), catalogue file and feature flags
2. **Colours:** the three brand values at the top of `src/app/globals.css`:
   - `--brand`: buttons and fills
   - `--brand-deep`: links and small text on light
   - `--glow`: accents on dark

   Mirror them in `src/config/theme.ts`, which colours the generated art, the social image and the browser theme. Keep the contrast rules in `docs/DESIGN_SYSTEM.md`.
3. **Fonts:** `src/app/layout.tsx` (`next/font`).
4. **Logo and favicon:** put the logo in `public/` and point `siteConfig.logo` at it; replace `src/app/favicon.ico`.
5. **Product photos:** add files to `public/products/<slug>/` (for example `front.webp`, `side.webp`, `top.webp`, `detail.webp`, `angle.webp`), then set `src` on each image in `src/features/products/data/products.ts`.
   - Use a white or neutral background, at least 2000 px on the long edge for zoom.
   - Any image without `src` keeps the generated drawing. The gallery, loupe and lightbox work the same with real photos.
6. **Products and categories:** `src/features/products/data/products.ts` and `categories.ts`. Data is validated at build time: duplicate slugs, unknown categories or unknown related products fail the build with a clear message.
7. **History, team, map regions:** `src/features/about/data/` (`timeline.ts`, `team.ts`, `reach.ts`). Certifications are in `src/data/certifications.ts`.
8. **Documents:** put certificate and catalogue PDFs in `public/docs/`, then set `file` on a certification (its badge then opens the document) and `catalogueFile` in the site config.
9. **Videos:** in `src/features/videos/data/videos.ts`, set `src` to a local MP4 (`provider: "file"`, plus a `poster`) or a YouTube ID (`provider: "youtube"`). An empty `src` shows a "coming soon" state.
10. **Page copy and SEO:**
    - Each page's text is in `src/features/<page>/data/copy.ts`, and its title, description and keywords in `src/features/<page>/data/seo.ts`.
    - Header, footer, CTA and certificate copy is in `src/data/copy.ts`.

## Project structure

Route files in `src/app` only hold metadata and the page component. Everything else lives with the page it belongs to.

```
src/
  app/                  routes; globals.css holds every design token
  features/
    home/               hero (light sweep), capabilities, range bento, product viewer (loupe),
                        story and stats, featured products, video highlight, certifications
    about/              intro, history timeline, manufacturing (stacking cards), quality,
                        world reach, leadership, certifications
    products/           cards, grid, search (Command), filters (ToggleGroup, Drawer, Select),
                        gallery, lightbox, category/ and detail/ views, data, content accessors
    catalogue/          download, preview grid, page viewer
    videos/             grid, card, trigger, player dialog
    contact/            form (react-hook-form + Zod), country picker, details, map
    not-found/
  components/
    ui/                 shadcn/ui primitives (restyled; see docs/COMPONENT_SOURCES.md)
    layout/             header, footer, Band (page sheets), container, page hero, breadcrumbs
    sections/           CTA banner, certifications, count-up, marquee, spotlight card
    media/              placeholder art (static SVGs from /art/...), product visual
  config/               site.ts (brand, facts, contact, flags), theme.ts (colours for non-CSS uses)
  data/                 copy and certifications shared by several pages
  lib/                  utils, SEO helpers (metadata and JSON-LD)
docs/                   brief, specs, REDESIGN plan, DECISIONS.md, COMPONENT_SOURCES.md
```

### Adding a shadcn component

```bash
npx shadcn@latest add <name>
```

Then change `import { cn } from "cn"` to `import { cn } from "@/lib/utils"` in the new file (the project keeps its own `cn`), and remove any `dark:` classes (the site has no dark theme).

## Known limitations (demo)

- The contact form validates and shows a success state, but sends nothing.
- Placeholder images are generated SVG drawings. The 360° gallery slot is not built because there are no spin frames.
- The map on the contact page is a static illustration.
- Certificates show their description on hover until real files are supplied.
- Years in square brackets on the history timeline are placeholders for the client to confirm.
