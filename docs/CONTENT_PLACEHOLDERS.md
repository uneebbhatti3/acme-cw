# Content, Data Types and Placeholders

All content is local and typed. Nothing is hard-coded in components. Replacing real content later means editing these files and dropping assets into `public/`.

Everything below is **sample content**. Values in `[square brackets]` are placeholders that must be obviously replaceable and must not be presented as real facts.

## Files

```
src/config/site.ts            brand, contact, social, nav, feature flags
src/data/categories.ts        product categories
src/data/products.ts          products
src/data/timeline.ts          company history
src/data/stats.ts             numbers
src/data/certifications.ts    badges and documents
src/data/videos.ts            video items
src/data/team.ts              leadership (optional)
src/data/clients.ts           client logo placeholders
src/types/index.ts            shared types
public/placeholders/          generated or static placeholder assets
public/docs/                  catalogue and datasheet PDFs (placeholder)
```

## Types (`src/types/index.ts`)

```ts
export type ViewType = "front" | "side" | "top" | "back" | "detail" | "angle";

export interface ProductImage {
  src?: string; // when omitted, PlaceholderImage is rendered
  alt: string;
  view: ViewType;
  label?: string; // overrides the default label for the view
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  image?: string;
  order: number;
  placeholderKind:
    | "forceps"
    | "scissors"
    | "retractor"
    | "needleHolder"
    | "clamp"
    | "generic";
}

export interface Product {
  slug: string;
  code: string; // e.g. "[CODE-001]"
  name: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  images: ProductImage[]; // include several views
  tags?: string[];
  material?: string; // used by filters
  datasheet?: string; // path under /public/docs
  featured?: boolean;
  related?: string[]; // product slugs
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
  highlight?: boolean;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export interface Certification {
  name: string;
  description?: string;
  image?: string;
  file?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description?: string;
  category: "Manufacturing" | "Products" | "Quality" | "Company";
  provider: "youtube" | "file";
  src: string; // YouTube ID or file path
  poster?: string;
  duration?: string; // "1:24"
}

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
}
```

## Site config (`src/config/site.ts`)

```ts
export const siteConfig = {
  brandName: "[Brand Name]",
  legalName: "[Brand Name Pvt Ltd]",
  tagline: "Instruments crafted for the operating room.",
  description:
    "Surgical instruments manufacturer serving hospitals and distributors worldwide.",
  url: "https://example.com",
  contact: {
    address: "[Street address, City, Country]",
    phone: "[+00 000 0000000]",
    email: "info@example.com",
    whatsapp: "", // digits only; leave empty to hide the button
    hours: "Mon to Sat, 9:00 to 18:00",
  },
  social: { facebook: "", instagram: "", linkedin: "", youtube: "", x: "" },
  heroVideo: "", // path to looping mp4; empty = animated gradient
  features: { showTeam: true, showClients: true, showCatalogue: true },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Videos", href: "/videos" },
  ],
} as const;
```

## Sample categories

Use these generic categories. Order and counts are driven by the data.

| slug                 | name               | description (one line)                                              | placeholderKind |
| -------------------- | ------------------ | ------------------------------------------------------------------- | --------------- |
| `forceps`            | Forceps            | Grasping and dissecting forceps in multiple tip and length options. | forceps         |
| `scissors`           | Scissors           | Precision-ground scissors for tissue and suture work.               | scissors        |
| `retractors`         | Retractors         | Hand-held and self-retaining retractors for exposure.               | retractor       |
| `needle-holders`     | Needle Holders     | Secure-grip needle holders with fine or standard jaws.              | needleHolder    |
| `clamps`             | Clamps             | Haemostatic and vascular clamps in assorted curves.                 | clamp           |
| `custom-instruments` | Custom Instruments | Made to your drawing, specification or sample.                      | generic         |

## Sample products

Create **4 to 6 products per category** (at least 24 in total) so grids, filters and pagination feel real. Follow this pattern for each product:

- `name`: plain, descriptive, e.g. "Dissecting Forceps, Straight" (generic names only; no brand names, no named-surgeon eponyms unless generic and public domain)
- `code`: `[FC-101]`, `[SC-204]` style placeholders
- `shortDescription`: one sentence
- `description`: two short paragraphs
- `features`: 4 to 6 bullets (e.g. "Mirror-polished finish", "Balanced for fine control", "Autoclavable")
- `specs`: Material, Length, Tip type, Finish, Sterilisation, Packaging, each with plausible placeholder values (e.g. "Stainless steel [grade]", "[150] mm")
- `images`: **5 entries**, views `front`, `side`, `top`, `detail`, `angle`, with descriptive alt text. `src` omitted so the placeholder renders.
- `material`: one of "Stainless steel", "Titanium" (for filter demo)
- `related`: 3 slugs
- Mark 4 products `featured: true`

## Sample timeline (placeholders)

Seven milestones, years in `[brackets]`, so they read as clearly replaceable:

1. `[Year]` Founded: a small workshop with a handful of craftspeople
2. `[Year]` First export order
3. `[Year]` New production facility
4. `[Year]` Quality management system introduced
5. `[Year]` Expanded product range
6. `[Year]` Entered new international markets
7. `[Year]` Today: modern manufacturing, global customers

Descriptions are one to two neutral sentences, no figures.

## Sample stats

Years of experience `[00]+`, countries served `[00]+`, team members `[000]+`, clients `[000]+`, products `[000]+`. Render using realistic sample numbers for the count-up animation but keep them in `stats.ts` and mark the file header with a comment "SAMPLE VALUES, REPLACE WITH CLIENT FIGURES".

## Sample certifications

Generic badge labels such as "Quality Management Certificate", "Regulatory Compliance Certificate", "Manufacturing Licence". **Do not name real standards, certificate numbers or issuing bodies.** The client's real documents will be added later.

## Sample videos

Six items across the four categories, using local placeholder posters and `provider: "file"` with no real src (the modal shows a designed "Video coming soon" state when `src` is empty) and, optionally, one YouTube entry commented out as an example of the format.

## Sample leadership

Four cards with neutral placeholders: "[Name]", roles (Chief Executive, Production Director, Quality Director, International Sales Director), portrait placeholders. No real names.

## Sample clients

Six neutral logo placeholders (abstract geometric marks drawn as SVG), labelled "Client 1" to "Client 6" in alt text.

## Copy rules for placeholder text

- Short, calm, concrete, no superlatives
- No claims about regulation, medical outcomes or rankings
- Never reuse wording from the reference site
- UK English spelling (consistent with "colour", "sterilisation")

## Swapping to real content later (document this in README)

1. Edit `src/config/site.ts` (brand, contact, social)
2. Replace logo and favicon in `public/`
3. Add real photos to `public/products/<slug>/` and set `src` on each `ProductImage` (name files `front.webp`, `side.webp`, etc.)
4. Replace data files in `src/data/`
5. Drop certificate and catalogue PDFs into `public/docs/`
6. Add video files or YouTube IDs to `videos.ts`
