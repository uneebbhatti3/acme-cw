import type { Metadata } from "next";
import { primaryEmail, siteConfig, verifiedFacts } from "@/config/site";
import { isPlaceholder } from "@/lib/placeholder";
import { productLabel } from "@/features/products/lib/label";
import type { Category, Product } from "@/features/products/types";

/*
 * Metadata and structured data helpers. Each feature keeps its own SEO copy in
 * `src/features/<page>/data/seo.ts` and passes it through `pageMetadata`, so
 * every route ships the same complete set of tags.
 */

export interface PageSeo {
  /**
   * Page title, or candidates from most to least preferred. The first one that
   * fits in 60 characters is used, with " | <brand>" appended when that still
   * fits (see `fitTitle`), so long product or range names never get cut off.
   */
  title: string | readonly string[];
  /** Up to 160 characters: what the page offers and who it is for. Longer text is trimmed at a sentence or word. */
  description: string;
  path: string;
  keywords?: readonly string[];
  /** Title for social cards when it should differ from the page title. */
  socialTitle?: string;
  socialDescription?: string;
  /** Absolute title, skipping the layout template (used by the home page). */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  noIndex?: boolean;
  /** Image for social cards (path under /public). Defaults to the shared card. */
  image?: { src: string; alt: string };
}

/** Google shows about 60 characters of a title and 155 to 160 of a description. */
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 160;

const brandSuffix = ` | ${siteConfig.brandName}`;

/**
 * Picks the first candidate that fits, preferring each candidate with the brand
 * suffix, then without it, before moving on to the next. The last resort is
 * the final candidate cut at a word boundary.
 */
export function fitTitle(candidates: readonly string[]): { title: string; absolute: boolean } {
  for (const c of candidates) {
    if (c.length + brandSuffix.length <= TITLE_MAX) return { title: c, absolute: false };
    if (c.length <= TITLE_MAX) return { title: c, absolute: true };
  }
  return { title: truncate(candidates[candidates.length - 1], TITLE_MAX), absolute: true };
}

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), max / 2)).replace(/[\s,;:–-]+$/, "")}…`;
}

/** Ends a fragment with a full stop if it has no closing punctuation. */
export function sentence(text: string) {
  const t = text.trim().replace(/\s+/g, " ");
  return !t || /[.!?]$/.test(t) ? t : `${t}.`;
}

/**
 * Builds a description from sentences in priority order: required parts
 * always (trimmed if they overflow), then each optional part that still fits.
 * An optional part given as an array is a set of alternatives, longest first:
 * the first one that fits is used.
 */
export function composeDescription(
  required: readonly string[],
  optional: readonly (string | readonly string[])[] = [],
  max = DESCRIPTION_MAX,
) {
  let out = required.map(sentence).filter(Boolean).join(" ");
  for (const part of optional) {
    const options = (typeof part === "string" ? [part] : part).map(sentence).filter(Boolean);
    const fit = options.find((o) => `${out} ${o}`.length <= max);
    if (fit) out = out ? `${out} ${fit}` : fit;
  }
  return fitDescription(out, max);
}

/** Trims to the limit at the last full sentence, or else at a word. */
export function fitDescription(text: string, max = DESCRIPTION_MAX) {
  const t = text.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  const end = t.slice(0, max).lastIndexOf(". ");
  return end > max * 0.6 ? t.slice(0, end + 1) : truncate(t, max);
}

/** Keywords that apply to every page. */
export const baseKeywords = [
  siteConfig.brandName,
  siteConfig.legalName,
  "surgical instruments manufacturer",
  "dental instruments manufacturer",
  "surgical instruments exporter",
  "OEM surgical instruments",
  "private label instruments",
  `surgical instruments ${siteConfig.location.city}`,
  `${siteConfig.location.country} surgical instruments`,
] as const;

/** Shared social card (src/app/opengraph-image.tsx). Child routes must list it explicitly. */
const socialImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${siteConfig.legalName}: ${siteConfig.tagline}` };

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  socialTitle,
  socialDescription,
  absoluteTitle = false,
  type = "website",
  noIndex = false,
  image,
}: PageSeo): Metadata {
  const fitted = fitTitle(typeof title === "string" ? [title] : title);
  const absolute = absoluteTitle || fitted.absolute;
  const fullTitle = absolute ? fitted.title : `${fitted.title}${brandSuffix}`;
  const shareTitle = socialTitle ?? fullTitle;
  const metaDescription = fitDescription(description);
  const shareDescription = fitDescription(socialDescription ?? description, 200);
  const shareImage = image ? { url: image.src, alt: image.alt } : socialImage;

  return {
    title: absolute ? { absolute: fitted.title } : fitted.title,
    description: metaDescription,
    keywords: [...new Set([...keywords, ...baseKeywords])],
    alternates: { canonical: path },
    // Nested objects replace the layout's values, so each one is complete.
    openGraph: {
      title: shareTitle,
      description: shareDescription,
      url: path,
      siteName: siteConfig.brandName,
      locale: siteConfig.locale,
      type,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDescription,
      images: [shareImage.url],
    },
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
        },
  };
}

function postalAddress() {
  const { contact, location } = siteConfig;
  return {
    "@type": "PostalAddress",
    streetAddress: contact.street,
    addressLocality: location.city,
    addressRegion: location.region,
    postalCode: contact.postalCode,
    addressCountry: location.countryCode,
  };
}

/** Organisation data. Only verified facts (see siteConfig.facts) are included. */
export function organizationJsonLd() {
  const { contact, location } = siteConfig;
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  const established = verifiedFacts().find((f) => f.key === "established");
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.brandName,
    legalName: siteConfig.legalName,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.logo.src),
      width: siteConfig.logo.width,
      height: siteConfig.logo.height,
    },
    image: absoluteUrl("/opengraph-image"),
    description: siteConfig.description,
    ...(established ? { foundingDate: established.value } : {}),
    foundingLocation: `${location.city}, ${location.country}`,
    email: primaryEmail,
    telephone: contact.phones[0].number,
    address: postalAddress(),
    knowsAbout: siteConfig.specialties,
    contactPoint: contact.phones.map(({ number }) => ({
      "@type": "ContactPoint",
      telephone: number,
      email: primaryEmail,
      contactType: "sales",
      availableLanguage: ["English", "Urdu"],
    })),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.brandName,
    url: siteConfig.url,
    inLanguage: "en",
    publisher: { "@id": absoluteUrl("/#organization") },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${absoluteUrl("/products")}?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function itemListJsonLd(name: string, items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.href),
    })),
  };
}

export function productJsonLd(product: Product, category: Category, path: string) {
  const images = product.images.filter((i) => i.src).map((i) => absoluteUrl(i.src!));
  const org = { "@id": absoluteUrl("/#organization") };
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productLabel(product),
    ...(isPlaceholder(product.sku) ? {} : { sku: product.sku, mpn: product.sku }),
    category: category.name,
    description: product.shortDescription,
    url: absoluteUrl(path),
    image: images.length ? images : [absoluteUrl("/opengraph-image")],
    ...(!product.material || isPlaceholder(product.material) ? {} : { material: product.material }),
    brand: { "@type": "Brand", name: siteConfig.brandName },
    manufacturer: org,
    countryOfOrigin: siteConfig.location.country,
    additionalProperty: [{ label: "Finish", value: product.finish }, ...product.specs]
      .filter((s) => s.value && !isPlaceholder(s.value))
      .map((s) => ({ "@type": "PropertyValue", name: s.label, value: s.value })),
  };
}

/** WebPage subtypes (AboutPage, CollectionPage…) tying a page to the site and organisation. */
export function webPageJsonLd(type: "AboutPage" | "CollectionPage" | "WebPage", { name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": absoluteUrl(`${path}#webpage`),
    name,
    description: fitDescription(description),
    url: absoluteUrl(path),
    inLanguage: "en",
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: { "@id": absoluteUrl("/#organization") },
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${siteConfig.brandName}`,
    url: absoluteUrl("/contact"),
    about: { "@id": absoluteUrl("/#organization") },
  };
}

/** Serialise JSON-LD safely for a <script> tag. */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
