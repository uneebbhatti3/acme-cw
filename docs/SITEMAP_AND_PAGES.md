# Sitemap and Page Specifications

## Reference observations (structure and quality bar only, not to be copied)

The reference site is a conventional manufacturer site with: a sticky header (Home, About, Products, Catalogue, Resources → Videos, a "Contact" button); a hero with a tagline and one call to action; three capability cards; a regulatory-compliance callout; an About teaser; animated statistics; a row of certification documents; a client-logo strip; a dark footer with contact details and social icons; an About page with story, global-reach numbers, team and testimonials; a Videos page with embedded clips.

Weaknesses to beat: leftover template filler text in several sections; the Products page is only a wall of brochure images, with no categories, no product pages and no zoom or side views; limited storytelling of history.

**Our edge:** a real catalogue (categories → products → gallery), a designed history timeline, clean original copy, and better performance and mobile experience.

## Routes

| Route                         | Page                                                      |
| ----------------------------- | --------------------------------------------------------- |
| `/`                           | Home                                                      |
| `/about`                      | About (story, history timeline, global reach, leadership) |
| `/products`                   | Products index (all categories, search)                   |
| `/products/[category]`        | Category listing                                          |
| `/products/[category]/[slug]` | Product detail                                            |
| `/catalogue`                  | Catalogue download and preview                            |
| `/videos`                     | Videos                                                    |
| `/contact`                    | Contact and quote request (supports `?product=<slug>`)    |
| `not-found`                   | 404                                                       |

Also generated: `/sitemap.xml`, `/robots.txt`.

## Global elements

**Header:** logo (from config) left; nav centre or right: Home, About, Products (mega-menu on desktop listing categories with a small image), Catalogue, Videos, plus a prominent "Contact us" button. Transparent over hero at top, solid with subtle shadow after scroll. Mobile: full-height slide-in menu with large tap targets and the contact button pinned at the bottom.

**Footer:** logo, one-line description, quick links, product categories, contact details (address, phone, email from config), social icons from config, copyright line from config. Subtle top border; deep ink background.

**Floating WhatsApp button:** bottom-right, shown on all pages, number from config, hidden if no number set.

**Demo ribbon:** small discreet badge "Design preview · placeholder content" when `NEXT_PUBLIC_DEMO_MODE=true`.

## Home `/`

1. **Hero:** full-viewport. Headline, one supporting sentence, primary button (Explore products), secondary text link (Watch our story). Background: slow looping video if `heroVideo` is set in config, otherwise an elegant animated steel-gradient with fine grid or line-art instrument silhouette. Scroll cue at the bottom.
2. **Trust strip:** 3 to 4 short claims with icons (placeholders: Precision manufacturing, International standards, Worldwide shipping, Custom orders).
3. **Capabilities:** three cards (placeholders: Manufacturing, Customization, Quality Assurance). Icon, title, two lines, hover lift.
4. **Featured categories:** horizontally scrollable on mobile, 3 to 4 column grid on desktop. Image, name, product count, arrow. Links to category pages.
5. **Our story teaser:** split layout. Image or video thumbnail on one side; short story text and "Read our history" link on the other. Includes a small three-point timeline preview.
6. **By the numbers:** count-up statistics (placeholders in config): years of experience, countries served, team members, clients, products.
7. **Featured products:** 4 product cards with quick-view of a second image on hover.
8. **Video highlight:** large poster with play button opening the video modal; two smaller clips beside it.
9. **Certifications and standards:** badge row (placeholders). Each opens the document or a modal if a file is provided.
10. **Trusted by:** client logos strip with gentle marquee, greyscale to colour on hover (placeholder logos as neutral shapes).
11. **CTA banner:** "Tell us what you need" with Contact button and WhatsApp link.

## About `/about`

1. **Page hero:** title, one-line subtitle, background image placeholder.
2. **Who we are:** two-column story with a short list of principles.
3. **History timeline:** the centrepiece. Vertical on mobile, alternating left/right on desktop, with a progress line that fills as the user scrolls. Each milestone: year, title, 1 to 2 sentences, optional image. 6 to 8 placeholder milestones. See COMPONENTS → Timeline.
4. **Manufacturing and quality:** three-step process strip (Material → Craft → Inspection) with icons.
5. **Global reach:** stylised world map (SVG, dotted) with highlighted regions and two key numbers.
6. **Leadership:** cards with portrait placeholder, name, role. Optional section, controlled by config.
7. **Certifications:** same component as Home.
8. **CTA banner.**

## Products index `/products`

- Page hero with short intro.
- Sticky search input (filters across all products by name, code, category).
- Category grid (large cards with image, name, description, product count).
- Below: "Popular products" row.
- Empty-state and no-results states designed, not default.

## Category `/products/[category]`

- Breadcrumbs.
- Category title, description, product count.
- Filter bar (placeholder facets: material, use) plus sort (name, newest). Keep the facets data-driven.
- Responsive product grid (1 / 2 / 3 / 4 columns).
- Other-categories rail at the bottom.
- Statically generated for every category in data.

## Product detail `/products/[category]/[slug]`

Two-column on desktop, stacked on mobile.

**Left: gallery** (see COMPONENTS → ProductGallery). Large image with hover zoom; thumbnails below with **view labels** (Front, Side, Top, Back, Detail); click opens full-screen lightbox with zoom, pan, next/previous, keyboard and swipe support.

**Right: information.** Product name, product code, category chip, short description, key features (4 to 6 bullets), specification table, available variants or sizes if any, buttons: **Request a quote** (to `/contact?product=<slug>`), **Download datasheet** (if provided), **Share**.

Below: tabs or accordion for Description, Specifications, Packaging and shipping, and Care and sterilisation (placeholder text clearly generic). Then **Related products**. Product JSON-LD in head.

## Catalogue `/catalogue`

- Intro and a prominent Download PDF button (placeholder file).
- Embedded flipbook-style preview is optional; for the demo use a grid of cover images per catalogue section with a lightbox.

## Videos `/videos`

- Intro, optional category filter chips (Manufacturing, Products, Quality, Company).
- Responsive grid of video cards: poster, title, duration, play icon.
- Click opens a modal player; supports YouTube embed (privacy-enhanced, loaded only on click) and local MP4 with poster.
- Autoplay only after explicit click; never with sound on page load.

## Contact `/contact`

- Two columns: form on one side, details on the other.
- Fields: name, company, email, phone (optional), country, product of interest (prefilled from `?product=`), message, consent checkbox. Inline validation, accessible error messages, honeypot field.
- Demo behaviour: on submit, validate and show a friendly success state. Do not send anywhere.
- Details: address, phone, email, working hours, WhatsApp button, map placeholder (static image or styled block, no live map key required).

## 404

Branded, with a search box and links to Products and Contact.
