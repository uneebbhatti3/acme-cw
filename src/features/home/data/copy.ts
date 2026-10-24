import type { Photo } from "@/components/media/photo-slot";
import { siteConfig } from "@/config/site";

const { location } = siteConfig;

/**
 * Home page copy. No figures or certifications appear here: verified company
 * facts come from `siteConfig.facts`, and certificates from
 * src/data/certifications.ts, each shown only once verified.
 */
export const homeCopy = {
  hero: {
    eyebrow: `Manufacturer and exporter · ${location.city}, ${location.country}`,
    title: "Surgical and dental instruments, made to your specification",
    text: "We manufacture surgical, dental, veterinary and beauty instruments for distributors, brand owners and healthcare buyers, in standard patterns or to your drawing, under our name or yours.",
    primary: "Request a quote",
    secondary: "View products",
    points: ["OEM and private label", "Made to drawing or sample", "Export packing and documents"],
    photo: {
      alt: "Stainless steel surgical instruments",
      brief: "Hero image: a group of finished instruments on a neutral background, or the production floor",
    } satisfies Photo,
  },
  ranges: {
    eyebrow: "Product ranges",
    title: "Instruments for surgery, dentistry, veterinary and beauty care",
    text: "Browse sample products with specifications and sizes in each range. Patterns not listed online can be quoted on request.",
    link: "View all products",
  },
  capabilities: {
    eyebrow: "Manufacturing",
    title: "Made in our own facility, from forging to finishing",
    text: "Each stage of production is carried out in-house, with checks before an instrument moves on.",
    link: "Manufacturing capabilities",
  },
  oem: {
    eyebrow: "OEM and private label",
    title: "Your brand, your codes, your packaging",
    text: "Source complete instrument ranges under your own name. We work from your drawings, samples or product list, and sample before production.",
    link: "OEM and private-label services",
    cta: "Discuss a project",
  },
  quality: {
    eyebrow: "Quality and certifications",
    title: "Inspected at every stage, documented for every order",
    text: "Dimensions, finish and function are checked during production and before packing. Inspection and material records are kept for each batch.",
    link: "Quality and documentation",
    certificatesPending: "Certificate details will be published here once verified against the original documents.",
    certificatesLink: "Certificates",
  },
  company: {
    eyebrow: "About us",
    title: `An instrument manufacturer in ${location.city}`,
    paragraphs: [
      `${siteConfig.legalName} manufactures and exports surgical, dental, veterinary and beauty instruments from ${location.city}, ${location.country}, a city known worldwide for instrument making.`,
      "We work with importers, distributors, brand owners and healthcare buyers who need consistent quality, clear specifications and dependable lead times.",
    ],
    link: "About the company",
    photo: {
      alt: "Company facility",
      brief: "Exterior of the facility, or the team in the workshop",
    } satisfies Photo,
  },
  quote: {
    eyebrow: "Quotations",
    title: "Request a quotation",
    text: "Send us product names or SKUs, quantities and your destination market. Drawings and samples for custom work are welcome.",
    steps: [
      { title: "Send your requirements", text: "Products or SKUs, quantities, and drawings or samples for custom items." },
      { title: "We confirm the details", text: "Specifications, marking, packaging and documents for your market." },
      { title: "Receive your quotation", text: "Prices, minimum quantities and lead times." },
    ],
    primary: "Request a quote",
    secondary: "Contact our team",
  },
};
