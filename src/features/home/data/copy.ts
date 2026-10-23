import { siteConfig } from "@/config/site";
import type { HeroCallout, HomeFeature, HomeStat, Milestone } from "@/features/home/types";

const { company } = siteConfig;
const markets = parseInt(company.exportMarkets, 10);
const profiles = parseInt(company.instrumentProfiles, 10);

/**
 * Home page copy and content. Company facts come from `siteConfig`, which
 * holds the values from the client's current site. Edit text here, not in
 * components.
 */
export const homeCopy = {
  hero: {
    lines: ["Precision instruments", "for healthcare, worldwide."],
    text: `Surgical, dental, veterinary and manicure instruments, made in ${company.location.city} since ${company.foundingYear} for hospitals, distributors and importers in ${company.exportMarkets} markets.`,
    primary: { label: "Explore products", href: "/products" },
    secondary: { label: "Request a quote", href: "/contact" },
    note: "Certificates and inspection documents are available on request.",
    artLabel: "A polished steel forceps, with light moving across it.",
    callouts: [
      { label: "Finger rings", x: 11.3, y: 33.2 },
      { label: "Box lock joint", x: 47.7, y: 48 },
      { label: "Serrated jaw", x: 82.4, y: 37.9, below: true },
    ] satisfies HeroCallout[],
    badge: {
      text: "Made to your drawing • OEM and private label •",
      label: "Instruments made to your drawing or sample. Ask for a quote.",
      href: "/contact",
    },
  },
  trust: {
    label: "Why buyers work with us",
    items: [
      { icon: "factory", title: `Made in ${company.location.city}`, text: `Manufacturing since ${company.foundingYear}.` },
      { icon: "globe", title: `${company.exportMarkets} export markets`, text: "Shipped to buyers worldwide." },
      { icon: "tag", title: "OEM and private label", text: "Your marking and packaging." },
      { icon: "file", title: "Documented quality", text: "Certificates on request." },
    ] satisfies HomeFeature[],
  },
  capabilities: {
    title: "What we do for buyers.",
    text: "One manufacturer for the instrument, the finish, the marking and the paperwork.",
    items: [
      {
        icon: "wrench",
        title: "Manufacturing",
        text: "Forging, grinding, finishing and assembly in our own facility, for steady quality from batch to batch.",
      },
      {
        icon: "ruler",
        title: "Customisation",
        text: "Instruments made to your drawing or sample, with your marking, finish and packaging.",
      },
      {
        icon: "shield",
        title: "Quality assurance",
        text: "Every instrument is checked and re-checked before it is packed, with documents for your order.",
      },
    ] satisfies HomeFeature[],
  },
  range: {
    title: "Eight ranges. One manufacturer.",
    text: "Browse by range. Every product page shows each angle, the specifications and a quote request.",
  },
  viewer: {
    productSlug: "needle-holder",
    title: "Check every angle before you order.",
    text: "Front, side, top and a close-up of the working end. Move the cursor over a view to magnify it, or select Enlarge.",
    viewsLabel: "Product views",
    enlarge: "Enlarge",
    enlargeLabel: (view: string) => `Enlarge the ${view.toLowerCase()} view`,
    quote: "Request a quote",
    view: "View product page",
  },
  story: {
    title: `From a ${company.location.city} workshop in ${company.foundingYear} to buyers in ${company.exportMarkets} markets.`,
    text: "Instrument making is an exacting skill that takes dexterity, concentration and patience. The craft has not changed: make each instrument to the drawing, and check it before it ships.",
    link: "Read our history",
    stripLabel: "Company history. Scroll sideways to see more.",
  },
  stats: {
    label: "By the numbers",
  },
  featured: {
    title: "Featured products.",
    text: "A few instruments from across the ranges. Hover a card to see a second angle.",
    link: "All products",
  },
  videos: {
    title: "See how it’s made.",
    text: "Short clips from the workshop floor and the inspection bench.",
    play: (title: string) => `Play video: ${title}`,
  },
  certifications: {
    title: "Certified and documented.",
    text: "Buyers can ask for the certificates and inspection documents that apply to the instruments they order.",
    link: "Ask for documents",
  },
  marquee: {
    label: "Product ranges",
  },
};

/** The founding year is from the client's site; the other steps are general. */
export const milestones: Milestone[] = [
  { when: String(company.foundingYear), title: "Founded", text: `Instrument making begins in ${company.location.city}, ${company.location.country}.` },
  { when: "Export", title: "First shipments abroad", text: "Buyers in Europe, then the USA and Canada." },
  { when: "Range", title: "More specialties", text: "Dental, veterinary and manicure instruments join the surgical range." },
  { when: "Today", title: `${company.exportMarkets} export markets`, text: "OEM and private-label work for distributors worldwide." },
];

export const homeStats: HomeStat[] = [
  { value: company.foundingYear, display: String(company.foundingYear), label: "Established" },
  { value: markets, suffix: "+", label: "Export markets" },
  { value: profiles, suffix: "+", label: "Instrument profiles" },
  { value: company.certifications.length, label: "Certifications held" },
];
