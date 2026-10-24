import type { FeatureItem } from "@/components/sections/feature-grid";
import type { PageSeo } from "@/lib/seo";

/**
 * Quality page content. The inspection checkpoints come from the client's
 * previous site; the rest is neutral copy to be confirmed by the client.
 * Certificates live in src/data/certifications.ts and appear only once verified.
 */
export const qualityCopy = {
  breadcrumb: "Quality",
  hero: {
    eyebrow: "Quality",
    title: "Quality control and documentation",
    subtitle: "How each instrument is checked before it leaves our facility, and the documents we can prepare for your order.",
  },
  management: {
    eyebrow: "Quality management",
    title: "Checks built into every stage",
    paragraphs: [
      "Quality is checked at each stage of production, not only at the end. Instruments move to the next stage only after the checks for the current one are complete.",
      "Inspection results and material details are recorded so that a batch can be traced back through production.",
    ],
  },
  inspection: {
    eyebrow: "Inspection",
    title: "What we inspect",
    text: "Checkpoints applied to every production batch.",
  },
  stages: {
    eyebrow: "Inspection stages",
    title: "From incoming steel to packed order",
  },
  documents: {
    eyebrow: "Documentation",
    title: "Documents for your order",
    text: "Requirements differ by product and destination market. Tell us what your market requires and we will confirm which documents we can supply with your order.",
    request: "Ask about documentation",
  },
  certificates: {
    eyebrow: "Certificates",
    title: "Certificates and registrations",
    pendingTitle: "Certificate details are being verified",
    pendingText:
      "Each certificate will be listed here with its number, issuing body, scope and expiry date once it has been checked against the original document.",
    fields: { issuer: "Issued by", number: "Certificate no.", scope: "Scope", validUntil: "Valid until" },
    view: "View certificate (PDF)",
  },
};

export const checkpoints: FeatureItem[] = [
  { icon: "ruler", title: "Dimensional accuracy", text: "Geometry, alignment and critical dimensions are checked at set points." },
  { icon: "sparkles", title: "Surface finish", text: "Surfaces are inspected for an even finish, clean edges and no defects." },
  { icon: "cog", title: "Function", text: "Joints, ratchets, cutting edges and springs are tested for reliable action." },
  { icon: "layers", title: "Material control", text: "Material is recorded for each batch so it can be traced." },
  { icon: "package", title: "Final packing check", text: "Labels, quantities and packaging are checked against the order." },
];

export const inspectionStages = [
  { title: "Incoming material", text: "Steel is checked against the order specification before use." },
  { title: "In-process checks", text: "Dimensions and alignment are checked after forging, machining and heat treatment." },
  { title: "Final inspection", text: "Each instrument is inspected for finish and function." },
  { title: "Packing and release", text: "Packaging, labelling and quantities are verified before dispatch." },
];

/** Documents buyers commonly ask for. Availability is confirmed per order. */
export const documentTypes: FeatureItem[] = [
  { icon: "file", title: "Product specifications", text: "Dimensions, materials and finishes for each SKU." },
  { icon: "clipboard", title: "Inspection records", text: "Results of the checks carried out on your batch." },
  { icon: "layers", title: "Material information", text: "Details of the material used for your order." },
  { icon: "tag", title: "Labelling and instructions", text: "Labels and instructions for use in your required format." },
  { icon: "package", title: "Export documents", text: "Commercial invoice, packing list and certificate of origin." },
];

export const qualitySeo: PageSeo = {
  title: "Quality Control and Documentation",
  description:
    "How Acme Commercial Ways inspects surgical and dental instruments at each production stage, the documents available for orders, and our certificate details.",
  path: "/quality",
  keywords: ["surgical instruments quality control", "instrument inspection", "instrument traceability", "surgical instruments documentation"],
};
