import { siteConfig } from "@/config/site";
import type { DrawingPart, HomeStat, Milestone } from "@/features/home/types";

const { company } = siteConfig;

/**
 * Home page copy and content. Company facts come from `siteConfig`, which
 * holds the values from the client's current site. Edit text here, not in
 * components.
 */
export const homeCopy = {
  hero: {
    title: "Precision instruments manufactured for healthcare professionals worldwide.",
    text: `Since ${company.foundingYear}, ${siteConfig.brandName} has made surgical, dental, veterinary and manicure instruments in ${company.location.city} for hospitals, distributors and importers in ${company.exportMarkets} markets.`,
    primary: { label: "Explore products", href: "/products" },
    secondary: { label: "Request a quote", href: "/contact" },
    drawingLabel: "Technical drawing of a haemostatic forceps with its five main parts marked.",
    dimension: "Overall length 140 mm",
    partsTitle: "Parts of a haemostatic forceps",
  },
  range: {
    title: "Explore instruments by clinical workflow.",
    text: "A structured catalog for procurement teams, distributors, dental practices and specialist clinicians. Every product page shows each angle, the specifications and a quote request.",
  },
  spotlight: {
    productSlug: "needle-holder",
    title: "See every angle before you order.",
    text: "Each product page shows the front, back, side and a close-up of the working end. Enlarge any view to check the finish and the detail.",
    quote: "Request a quote",
    view: "View product page",
    enlarge: "Enlarge",
    viewsLabel: "Product views",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    dialogTitle: (name: string, view: string) => `${name}: ${view} view`,
  },
  quality: {
    title: "A controlled path from raw steel to finished instrument.",
    certTitle: "Certified and documented.",
    certText: "Buyers can ask for the certificates and inspection documents that apply to the instruments they order.",
    certLink: "Ask for documents",
    certStatus: "Available on request",
  },
  story: {
    title: `From a ${company.location.city} workshop in ${company.foundingYear} to buyers in ${company.exportMarkets} markets.`,
    text: "Instrument manufacture is an exacting skill demanding dexterity, concentration and patience. That craft has not changed: make each instrument to the drawing, and check it before it ships.",
    link: "Read our history",
  },
  videos: {
    title: "See how it’s made.",
    text: "Short clips from the workshop floor and the inspection bench.",
    play: (title: string) => `Play video: ${title}`,
    comingSoonTitle: "This clip is coming soon.",
    comingSoonText: "It will play here once the footage is ready.",
    fallbackTitle: "Video",
    close: "Close",
  },
  cta: {
    title: "Looking for a reliable instruments manufacturer?",
    text: "Send product names or SKUs, quantities and your delivery market. We reply with a quote, OEM and private-label options and lead times.",
    primary: "Request a quote",
    catalogue: "Download the catalogue",
    email: "Email",
    phone: "Phone",
    whatsapp: "WhatsApp",
    whatsappLink: "Message us",
  },
};

/** The five parts called out on the hero drawing (SVG units, 900 x 380). */
export const drawingParts: DrawingPart[] = [
  { id: 1, name: "Finger rings", note: "Sized for a secure, comfortable hold.", mx: 112, tx: 112, ty: 74 },
  { id: 2, name: "Shank", note: "Carries the grip from the hand to the jaw.", mx: 209, tx: 209, ty: 134 },
  { id: 3, name: "Ratchet", note: "Locks the jaws at set positions.", mx: 306, tx: 306, ty: 180 },
  { id: 4, name: "Box lock", note: "Joins the two halves and sets the pivot.", mx: 430, tx: 430, ty: 159 },
  { id: 5, name: "Serrated jaw", note: "Grips tissue or needle without slipping.", mx: 750, tx: 750, ty: 166 },
];

/** The four stages from the client's site. A true sequence, so they are numbered. */
export const processSteps = [
  { title: "Formed by hand", text: "Instrument manufacture is an exacting skill demanding dexterity, concentration and patience." },
  { title: "Precision-ground", text: "Each instrument is shaped and refined through careful grinding for controlled geometry and function." },
  { title: "Sharpened and polished", text: "Surfaces, edges and handling details are sharpened, polished and finished by hand." },
  { title: "Checked and re-checked", text: "Every instrument is thoroughly checked and re-checked before it reaches the customer." },
];

/** The founding year is from the client's site; the other steps are general. */
export const milestones: Milestone[] = [
  { title: String(company.foundingYear), text: `Instrument making begins in ${company.location.city}, ${company.location.country}.` },
  { title: "Export", text: "First shipments to buyers in Europe, then the USA and Canada." },
  { title: "Range", text: "Dental, veterinary and manicure instruments join the surgical range." },
  { title: "Today", text: `${company.exportMarkets} export markets and OEM work for distributors.` },
];

export const homeStats: HomeStat[] = [
  { value: String(company.foundingYear), label: "Established" },
  { value: company.exportMarkets, label: "Export markets" },
  { value: company.instrumentProfiles, label: "Instrument profiles" },
  { value: String(company.certifications.length), label: "Certifications held" },
];
