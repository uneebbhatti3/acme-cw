/**
 * Brand, contact and feature settings. Rebranding the site means editing this
 * file (plus colour tokens in `src/app/globals.css`). Never hard-code these
 * values in components.
 *
 * VERIFY BEFORE LAUNCH: the address, telephone numbers and emails below were
 * taken from the client's previous site. Set `contactVerified` to true once
 * the client has confirmed them.
 */
export const siteConfig = {
  brandName: "Acme Commercial Ways",
  /** Short name for tight spaces (browser tab, home screen). */
  shortName: "Acme",
  legalName: "Acme Commercial Ways (Pvt) Ltd.",
  /** Logo file under /public with its pixel size. `invertOnDark` shows it in white on navy (for logos with dark lettering). */
  logo: { src: "/logo.png", width: 1176, height: 266, invertOnDark: true },
  tagline: "Surgical & Dental Instrument Manufacturer",
  /** Used for meta descriptions and the footer. Keep it free of figures that are not verified. */
  description:
    "Manufacturer and exporter of surgical, dental, veterinary and beauty instruments in Sialkot, Pakistan, with OEM and private-label production for distributors and healthcare buyers.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://acme-cw.vercel.app",
  locale: "en_US",
  location: { city: "Sialkot", region: "Punjab", country: "Pakistan", countryCode: "PK" },

  /**
   * Company figures. A fact is shown on the site only when `verified` is true,
   * so nothing unconfirmed is ever published. Values are the client's own,
   * from their previous site, awaiting confirmation.
   */
  facts: [
    { key: "established", label: "Established", value: "1960", verified: false },
    { key: "markets", label: "Export markets", value: "50+", verified: false },
    { key: "patterns", label: "Instrument patterns", value: "1000+", verified: false },
  ],

  /** Clinical fields the product range serves (describes the range, not a claim). */
  specialties: [
    "General surgery",
    "Dental",
    "Veterinary",
    "ENT",
    "Gynaecology",
    "Orthopaedics",
    "Plastic surgery",
    "Ophthalmology",
  ],

  contact: {
    /** Set to true once the client has confirmed the details below. */
    contactVerified: false,
    street: "Nowl More, Roras Road, P.O. Box 1092",
    city: "Sialkot",
    postalCode: "51310",
    country: "Pakistan",
    /** Each number is shown on its own line and dialled with tel:. `label` is optional. */
    phones: [
      { number: "+92 52 3558738", label: "" },
      { number: "+92 52 3563693", label: "" },
    ],
    /** First address is the main one (header, footer, structured data). */
    emails: [
      { address: "info@acme-cw.com", label: "Sales and quotations" },
      { address: "acme-cw@live.com", label: "General" },
    ],
    /** Digits only, with country code. Leave empty to hide the WhatsApp button. */
    whatsapp: "",
    hours: "Monday to Saturday, 9:00 to 18:00 (PKT, UTC+5)",
  },
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    x: "",
  },
  /** Home hero photo under /public (4:3, at least 1600 x 1200 px). Empty shows the placeholder. */
  heroImage: "" as string,
  /** Path to the catalogue PDF under /public. */
  catalogueFile: "/docs/catalogue-placeholder.pdf",
  features: { showTeam: false, showCatalogue: true, showVideos: true },

  /** Where the Request a Quote buttons go. */
  quoteHref: "/request-quote",
  /** Main navigation. `menu: "products"` adds the product-range dropdown. */
  nav: [
    { label: "Products", href: "/products", menu: "products" },
    { label: "Manufacturing", href: "/manufacturing" },
    { label: "Quality", href: "/quality" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footerNav: {
    company: [
      { label: "About us", href: "/about" },
      { label: "Manufacturing and OEM", href: "/manufacturing" },
      { label: "Quality", href: "/quality" },
      { label: "Contact", href: "/contact" },
    ],
    resources: [
      { label: "Request a quote", href: "/request-quote" },
      { label: "Product catalogue", href: "/catalogue" },
      { label: "Videos", href: "/videos" },
    ],
    legal: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of use", href: "/terms" },
    ],
  },
  copyright: "All rights reserved.",
  /** Last review date shown on the legal pages. */
  legalUpdated: "[Date of legal review]",
} as const;

export type SiteConfig = typeof siteConfig;

/** Facts the client has confirmed. Components read facts only through this. */
export function verifiedFacts() {
  return siteConfig.facts.filter((f) => f.verified);
}

export function fullAddress() {
  const c = siteConfig.contact;
  return `${c.street}, ${c.city} ${c.postalCode}, ${c.country}`;
}

export function telHref(number: string) {
  return `tel:${number.replace(/[^\d+]/g, "")}`;
}

export const primaryEmail = siteConfig.contact.emails[0].address;
