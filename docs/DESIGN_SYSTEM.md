# Design System

## Design intent

**Precision, calm, trust.** The site should feel like a well-made instrument: restrained, exact, quietly premium. Think surgical steel, clean operating-room light and deep ink, not hospital-brochure blue gradients and stock handshakes. It must be clearly its own design, not a restyle of the reference.

Keywords: precise, clinical-clean, refined, confident, warm enough to feel human.

## Colour tokens

Defined once as CSS variables (and mapped into Tailwind theme). All values are **placeholders for the client's brand** and must be swappable in one file.

| Token             | Value     | Use                                                           |
| ----------------- | --------- | ------------------------------------------------------------- |
| `--ink`           | `#0B1620` | Deep background, footer, headings on light                    |
| `--ink-soft`      | `#16242F` | Cards on dark                                                 |
| `--steel-900`     | `#1F2D38` | Body text on light                                            |
| `--steel-600`     | `#52626E` | Secondary text                                                |
| `--steel-300`     | `#B8C2CA` | Borders on dark, dividers                                     |
| `--steel-100`     | `#E7ECEF` | Subtle surfaces                                               |
| `--paper`         | `#F7F9FA` | Page background                                               |
| `--white`         | `#FFFFFF` | Cards                                                         |
| `--accent`        | `#2EA3C4` | Light tint of the brand blue, for accents on dark backgrounds |
| `--accent-strong` | `#097E9E` | Brand colour: buttons, links and text on light backgrounds    |
| `--accent-soft`   | `#E0F1F6` | Accent tint backgrounds                                       |
| `--warn`          | `#C8553D` | Errors only                                                   |

Rules: text contrast ≥ 4.5:1 (7:1 for body copy where possible). Accent is used sparingly: one primary button style, link hovers, small highlights. Do not use gradients beyond a subtle steel sheen.

Dark mode is **not** required. The footer, hero and some sections are dark by design.

## Typography

Load with `next/font` (self-hosted, no layout shift).

- **Display / headings:** _Archivo_ semi-expanded (width 112%, weight 600). Used for H1 to H3 and big numbers. No serif fonts (client request, 2026-10-17).
- **UI / body:** a clean geometric or grotesk sans, _Archivo_ at normal width. Avoid default Inter/Arial/Roboto look.
- **Mono (specs and product codes):** _JetBrains Mono_ or _IBM Plex Mono_, small sizes only.

Scale (fluid with `clamp`): H1 44 to 80px, H2 32 to 48px, H3 22 to 28px, body 16 to 18px, small 13 to 14px. Line height 1.15 for headings, 1.65 for body. Max text measure 68ch. Eyebrow labels in uppercase, 12px, letter-spacing 0.14em, accent colour.

## Spacing and layout

- 8px base unit. Section padding: 96px desktop, 64px tablet, 48px mobile.
- Container max width 1280px, side gutters 24px mobile / 40px desktop.
- 12-column grid on desktop; cards align to it. Generous whitespace is part of the look.
- Radius: 6px for inputs and buttons, 14px for cards, full for chips. Keep consistent.
- Shadows: soft, low-opacity, layered; no heavy drop shadows. Borders 1px `--steel-100`.

## Components look and feel

- **Buttons:** primary = solid accent, white text, 48px height, subtle lift on hover; secondary = outlined steel; text link = underline that draws in on hover. Visible focus ring (2px accent offset 2px).
- **Cards:** white, 14px radius, thin border, image with 4:3 ratio; on hover the image scales 1.03, card lifts 4px, arrow nudges.
- **Inputs:** 48px height, label above, clear focus and error states.
- **Chips and tags:** pill, steel-100 background.
- **Section headings:** eyebrow + serif title + optional one-line intro, left-aligned by default.

## Motion

Library: Motion (Framer Motion).

- Entrance: fade-up 16px, 500ms, ease-out, staggered 60ms, triggered once on scroll into view.
- Hero: slow, subtle (parallax up to 20px, or a looping steel-sheen gradient). Nothing flashing.
- Count-up numbers: 1.4s, ease-out, once.
- Timeline: progress line fills with scroll.
- Page transitions: none or a very light fade.
- **Always respect `prefers-reduced-motion`:** disable parallax, count-up and entrance movement; show final states instantly.

## Imagery

All imagery in the demo is **generated placeholder art**, never third-party photos.

- Build a `PlaceholderImage` component that renders an SVG: brushed-steel gradient background, soft vignette, and a simple **self-drawn line-art silhouette** of a generic instrument (forceps, scissors, retractor, needle holder, clamp). Each silhouette has variants for views (front, side, top, detail) so the gallery clearly demonstrates multi-angle behaviour.
- Overlay a small label chip (e.g. "Side view") in the corner when `showLabel` is true.
- Aspect ratios: product 4:3 (main), 1:1 (thumbnails), category 3:2, hero 16:9, video poster 16:9, team portrait 4:5.
- Real photos later: `next/image`, white or neutral background, consistent lighting, minimum 2000px on the long edge for zoom, WebP/AVIF output.
- Icons: a single consistent line-icon set (e.g. Lucide). 1.5px stroke.

## Tone of voice for placeholder copy

Short, concrete, calm. Active voice. No superlatives like "world's best" or "No.1". No medical claims. Sentences under 22 words. Written for readers whose first language may not be English.

## Accessibility

- WCAG 2.2 AA minimum
- All interactive elements keyboard reachable, visible focus, logical tab order
- Touch targets ≥ 44px
- Semantic landmarks (`header`, `nav`, `main`, `footer`), one H1 per page
- Meaningful `alt` on images; decorative images `alt=""`
- Modals and lightbox: focus trap, Esc to close, return focus to trigger, `aria-modal`
- Forms: programmatic labels, error text linked via `aria-describedby`
