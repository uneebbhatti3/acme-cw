/**
 * Brand, contact and feature settings. Rebranding the site means editing this
 * file (plus colour tokens in `src/app/globals.css`). Never hard-code these
 * values in components.
 *
 * Company facts below were taken from the client's current site
 * (acme-cw.vercel.app). Confirm them with the client before launch, in
 * particular the certifications, which must match verified documents.
 */
export const siteConfig = {
  brandName: "Acme Commercial Ways",
  /** Short name for tight spaces (browser tab, home screen). */
  shortName: "Acme",
  /** Short mark used in the logo badge. */
  brandMark: "ACW",
  legalName: "Acme Commercial Ways (Pvt) Ltd.",
  tagline: "Surgical & Dental Instruments Manufacturer",
  description:
    "Sialkot-based manufacturer and exporter of surgical, dental, veterinary and manicure instruments and scissors, serving healthcare professionals in 50+ export markets since 1960.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://acme-cw.vercel.app",
  locale: "en_US",
  company: {
    foundingYear: 1960,
    exportMarkets: "50+",
    instrumentProfiles: "1000+",
    location: { city: "Sialkot", region: "Punjab", country: "Pakistan", countryCode: "PK" },
    /** Shown as badges. Confirm each against a verified certificate. */
    certifications: ["ISO 9001:2015", "ISO 13485:2016", "CE", "FDA (GMP)"],
    markets: [
      "Europe",
      "USA",
      "Canada",
      "Morocco",
      "Brazil",
      "Mexico",
      "Turkey",
      "Australia",
      "South Africa",
      "Thailand",
    ],
    specialties: [
      "General Surgery",
      "Cardiovascular",
      "ENT",
      "Gynecology",
      "Orthopedic",
      "Neurosurgery",
      "Plastic and Orthodontic Surgery",
      "Veterinary",
      "Ophthalmology",
      "Dental",
    ],
  },
  contact: {
    address: "Nowl More, Roras Road, P.O. Box 1092, Sialkot 51310, Pakistan",
    street: "Nowl More, Roras Road, P.O. Box 1092",
    postalCode: "51310",
    phone: "+92 52 3558738",
    phones: ["+92 52 3558738", "+92 52 3563693"],
    email: "info@acme-cw.com",
    emails: ["info@acme-cw.com", "acme-cw@live.com"],
    /** Digits only, with country code. Leave empty to hide the WhatsApp button. */
    whatsapp: "",
    hours: "Mon to Sat, 9:00 to 18:00 (PKT)",
  },
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    x: "",
  },
  /** Path to a short, muted, looping mp4 under /public. Empty = drawn hero. */
  heroVideo: "",
  /** Path to the catalogue PDF under /public. */
  catalogueFile: "/docs/catalogue-placeholder.pdf",
  features: { showTeam: true, showClients: true, showCatalogue: true },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Videos", href: "/videos" },
  ],
  copyright: "All rights reserved.",
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE === "true",
} as const;

export type SiteConfig = typeof siteConfig;
