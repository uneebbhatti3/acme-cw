import type { Photo } from "@/components/media/photo-slot";
import { siteConfig } from "@/config/site";

const { location } = siteConfig;

/**
 * About page copy. No figures here: verified company facts come from
 * `siteConfig.facts`. Edit text here, not in components.
 */
export const aboutCopy = {
  breadcrumb: "About us",
  hero: {
    eyebrow: "About us",
    title: "An instrument manufacturer built for international buyers",
    subtitle: `${siteConfig.legalName} manufactures and exports surgical, dental, veterinary and beauty instruments from ${location.city}, ${location.country}.`,
  },
  who: {
    eyebrow: "Company profile",
    title: "Who we are",
    paragraphs: [
      `We are based in ${location.city}, a city known worldwide for surgical instrument making. We manufacture and export instruments for importers, distributors, brand owners and healthcare procurement teams.`,
      "Our range covers general and specialist surgery, dentistry, veterinary practice and beauty care, supplied in standard patterns or made to the customer's own drawing, marking and packaging.",
    ],
    principles: [
      {
        title: "Mission",
        text: "To manufacture instruments that healthcare professionals, distributors and procurement teams can rely on, made precisely and described clearly.",
      },
      {
        title: "Vision",
        text: "To be a long-term manufacturing partner for international buyers, through dependable quality and clear communication.",
      },
      {
        title: "Values",
        text: "Craftsmanship, process control, responsiveness and ethical, long-term business relationships.",
      },
    ],
  },
  facts: {
    title: "Company facts",
  },
  history: {
    eyebrow: "History",
    title: "Our history",
    intro: "Key moments in the company's development. Years in brackets are to be confirmed.",
  },
  facility: {
    eyebrow: "Facility",
    title: "Our facility",
    text: "Forging, machining, finishing, inspection and packing under one roof.",
    photos: [
      { alt: "Factory exterior", brief: "Exterior of the factory building" },
      { alt: "Production hall", brief: "Production hall with workers at their stations" },
      { alt: "Inspection area", brief: "Quality inspection bench" },
    ] satisfies Photo[],
  },
  more: {
    title: "Learn more",
    links: [
      { title: "Manufacturing and OEM", text: "Our process, customisation, marking and packaging options.", href: "/manufacturing" },
      { title: "Quality", text: "Inspection stages, documentation and certificates.", href: "/quality" },
      { title: "Products", text: "Browse the instrument ranges and request a quote.", href: "/products" },
    ],
  },
  leadership: {
    title: "Leadership",
  },
};
