import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { Category, Product } from "@/features/products/types";

/*
 * Metadata and structured data helpers. Each feature keeps its own SEO copy in
 * `src/features/<page>/data/seo.ts` and passes it through `pageMetadata`, so
 * every route ships the same complete set of tags.
 */

export interface PageSeo {
  /** Page title. The layout template appends the brand name. */
  title: string;
  /** 140 to 160 characters: what the page offers and who it is for. */
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
}

/** Keywords that apply to every page. */
export const baseKeywords = [
  siteConfig.brandName,
  siteConfig.legalName,
  "surgical instruments manufacturer",
  "dental instruments manufacturer",
  "surgical instruments exporter",
  `surgical instruments ${siteConfig.company.location.city}`,
  `${siteConfig.company.location.country} surgical instruments`,
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
}: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.brandName}`;
  const shareTitle = socialTitle ?? fullTitle;
  const shareDescription = socialDescription ?? description;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
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
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDescription,
      images: [socialImage.url],
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
  const { contact, company } = siteConfig;
  return {
    "@type": "PostalAddress",
    streetAddress: contact.street,
    addressLocality: company.location.city,
    addressRegion: company.location.region,
    postalCode: contact.postalCode,
    addressCountry: company.location.countryCode,
  };
}

export function organizationJsonLd() {
  const { contact, company } = siteConfig;
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.brandName,
    legalName: siteConfig.legalName,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    description: siteConfig.description,
    foundingDate: String(company.foundingYear),
    foundingLocation: `${company.location.city}, ${company.location.country}`,
    email: contact.email,
    telephone: contact.phone,
    address: postalAddress(),
    areaServed: company.markets,
    knowsAbout: company.specialties,
    contactPoint: contact.phones.map((telephone) => ({
      "@type": "ContactPoint",
      telephone,
      email: contact.email,
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
    name: product.name,
    sku: product.code,
    mpn: product.code,
    category: category.name,
    description: product.shortDescription,
    url: absoluteUrl(path),
    image: images.length ? images : [absoluteUrl("/opengraph-image")],
    material: product.material,
    brand: { "@type": "Brand", name: siteConfig.brandName },
    manufacturer: org,
    countryOfOrigin: siteConfig.company.location.country,
    additionalProperty: product.specs.map((s) => ({ "@type": "PropertyValue", name: s.label, value: s.value })),
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
