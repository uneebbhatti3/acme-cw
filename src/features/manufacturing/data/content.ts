import type { Photo } from "@/components/media/photo-slot";

/**
 * Manufacturing, customisation, OEM, marking and packaging content. The home
 * page and /manufacturing both read from here, so editing an item updates both.
 * Descriptions are general and editable; replace them with the client's own
 * process details. Add photos by setting `src` (files under /public/factory/).
 */

export interface CapabilityItem {
  icon: "layers" | "hammer" | "cog" | "flame" | "sparkles" | "scan" | "package" | "ruler" | "tag" | "pen" | "box" | "barcode";
  title: string;
  text: string;
}

export const manufacturingCopy = {
  breadcrumb: "Manufacturing",
  hero: {
    eyebrow: "Manufacturing and OEM",
    title: "Manufacturing, customisation and private label",
    subtitle:
      "From raw steel to the packed instrument, made in our own facility in Sialkot. Standard patterns, or instruments made to your drawing, marked and packed under your brand.",
  },
  process: {
    eyebrow: "Capabilities",
    title: "How our instruments are made",
    text: "Each stage is carried out in-house, with checks before an instrument moves to the next.",
  },
  customisation: {
    eyebrow: "Customisation",
    title: "Made to your specification",
    text: "Tell us what you need to change. We confirm feasibility, then sample before production.",
  },
  oem: {
    eyebrow: "OEM and private label",
    title: "Your brand, our manufacturing",
    text: "Distributors and brand owners can source complete ranges under their own name, with their marking, codes and packaging.",
    steps: [
      { title: "Brief", text: "Send product references, drawings or samples, quantities and your branding requirements." },
      { title: "Samples", text: "We produce samples with your marking for approval." },
      { title: "Production", text: "Approved samples become the reference for production and inspection." },
      { title: "Packing and dispatch", text: "Packed and labelled to your specification, with export documents." },
    ],
  },
  marking: {
    eyebrow: "Marking",
    title: "Marking options",
  },
  packaging: {
    eyebrow: "Packaging",
    title: "Packaging options",
  },
  cta: {
    title: "Discuss an OEM or custom project",
    text: "Send your drawings, samples or product list. We will reply with feasibility, sampling steps and a quotation.",
  },
  homeLink: "Manufacturing and OEM",
};

/** Production stages, in order. */
export const processSteps: CapabilityItem[] = [
  { icon: "layers", title: "Material selection", text: "Stainless steel grades chosen for the function of each instrument." },
  { icon: "hammer", title: "Forging and shaping", text: "Profiles forged and shaped to controlled geometry." },
  { icon: "cog", title: "Machining", text: "Joints, jaws and serrations machined for consistent fit and alignment." },
  { icon: "flame", title: "Heat treatment", text: "Hardening and tempering for the hardness each instrument needs." },
  { icon: "sparkles", title: "Grinding and finishing", text: "Hand-finished edges and surfaces: satin, mirror or matt." },
  { icon: "scan", title: "Inspection", text: "Dimensional, visual and functional checks before packing." },
];

export const customisation: CapabilityItem[] = [
  { icon: "ruler", title: "Made to drawing or sample", text: "New patterns from your technical drawing, a sample or a reference product." },
  { icon: "pen", title: "Dimensions and patterns", text: "Length, tip, jaw, serration and handle changes to standard patterns." },
  { icon: "sparkles", title: "Finish", text: "Satin, mirror or matt finish, and coloured or coated options where suitable." },
  { icon: "barcode", title: "Your catalogue codes", text: "Products supplied under your own SKU numbering." },
];

export const markingOptions: CapabilityItem[] = [
  { icon: "tag", title: "Laser marking", text: "Logo, catalogue number and other marks laser-marked on the instrument." },
  { icon: "pen", title: "Etching", text: "Acid-etched marking for brand names and codes." },
  { icon: "barcode", title: "Codes for traceability", text: "Batch or lot numbers marked as agreed for your order." },
];

export const packagingOptions: CapabilityItem[] = [
  { icon: "package", title: "Individual pouches", text: "Each instrument in its own pouch, labelled with code and batch." },
  { icon: "box", title: "Branded boxes", text: "Retail or clinical boxes printed with your brand." },
  { icon: "layers", title: "Sets and cases", text: "Instrument sets in trays, wraps or cases." },
  { icon: "tag", title: "Labels", text: "Labels in your format and language, with barcodes on request." },
];

/** Photo slots on the manufacturing page and home page. */
export const factoryPhotos: Record<"hero" | "process" | "oem" | "packaging", Photo> = {
  hero: { alt: "Instrument production floor", brief: "Wide shot of the production floor, workers at forging or grinding stations" },
  process: { alt: "Instrument being hand-finished", brief: "Close-up of an instrument being ground or polished by hand" },
  oem: { alt: "Instruments with customer laser marking", brief: "Instruments laid out showing a customer's laser-marked logo" },
  packaging: { alt: "Packed instruments ready for export", brief: "Pouched and boxed instruments with labels, ready for dispatch" },
};
