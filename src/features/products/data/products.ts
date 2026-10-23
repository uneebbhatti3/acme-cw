import type { Availability, Product, ProductImage } from "@/features/products/types";
import type { InstrumentKind, ViewType } from "@/types";

/**
 * Products listed online: a sample of each range. The eight products with
 * plain SKUs (ACME-SC-101 and so on) come from the client's current site.
 * Values in [square brackets] are placeholders to confirm with the client.
 *
 * Images have no `src`, so generated drawings render. To use real photos, add
 * files to /public/products/<slug>/ and set `src` on each image.
 */

const VIEWS: ViewType[] = ["front", "side", "top", "detail", "angle"];
const VIEW_ALT: Record<ViewType, string> = {
  front: "front view",
  side: "side view",
  top: "top view",
  back: "back view",
  detail: "close-up of the working end",
  angle: "angled view",
};

function views(name: string): ProductImage[] {
  return VIEWS.map((view) => ({ view, alt: `${name}, ${VIEW_ALT[view]}` }));
}

/** Shared second paragraph per range. */
const CATEGORY_TEXT: Record<string, string> = {
  "surgical-instruments":
    "Each instrument is formed by hand, precision-ground, then sharpened and polished before it is checked and re-checked for alignment and action.",
  "dental-instruments":
    "Working ends are shaped and finished by hand for a precise fit, then inspected for alignment, surface finish and function before packing.",
  "veterinary-instruments":
    "Built for the demands of animal healthcare, with robust joints and surfaces that are easy to clean between procedures.",
  "manicure-instruments":
    "Edges are set and polished by hand. Each piece is checked for a clean cut, smooth action and an even surface finish.",
  "scissors-forceps":
    "Blades and tips are ground as a matched pair and set for smooth, even action. Every piece is tested before release.",
  "electro-surgical-instruments":
    "Insulated components and conductive tips are checked for fit and finish. Specifications are confirmed with you before production.",
  "single-use-instruments":
    "Made for procedures where a fresh instrument is required each time. Packaging and labelling follow your procurement requirements.",
  "hollow-ware-instruments":
    "Formed from stainless steel with smooth, rounded edges and a finish that is easy to clean and sterilise.",
};

interface Seed {
  slug: string;
  code: string;
  name: string;
  categorySlug: string;
  kind?: InstrumentKind;
  shortDescription: string;
  lead: string;
  features: string[];
  length?: string;
  finish: string;
  material?: string;
  availability?: Availability;
  featured?: boolean;
  related?: string[];
  tags?: string[];
  variants?: string[];
}

function product(s: Seed): Product {
  const material = s.material ?? "Stainless steel";
  const availability = s.availability ?? "Available";
  return {
    slug: s.slug,
    code: s.code,
    name: s.name,
    categorySlug: s.categorySlug,
    kind: s.kind,
    shortDescription: s.shortDescription,
    description: `${s.lead}\n\n${CATEGORY_TEXT[s.categorySlug]}`,
    features: s.features,
    specs: [
      { label: "Material", value: material },
      { label: "Finish", value: s.finish },
      { label: "Length", value: s.length ?? "[Size range on request]" },
      { label: "Availability", value: availability },
      { label: "Origin", value: "Manufactured in Sialkot, Pakistan" },
      { label: "Packaging", value: "[1] piece per pouch, [10] per box" },
    ],
    images: views(s.name),
    tags: s.tags,
    material,
    availability,
    datasheet: "/docs/datasheet-placeholder.pdf",
    featured: s.featured,
    related: s.related,
    variants: s.variants,
  };
}

export const products: Product[] = [
  // Surgical instruments
  product({
    slug: "needle-holder",
    code: "ACME-NH-204",
    name: "Needle Holder",
    categorySlug: "surgical-instruments",
    kind: "needleHolder",
    shortDescription: "Surgical needle holder developed around grip, alignment, control and repeatable handling.",
    lead: "Jaws are machined for a secure hold on the needle, and the ratchet is set to close cleanly and release with light pressure.",
    features: ["Secure, serrated jaws", "Smooth three-step ratchet", "Balanced for fine control"],
    length: "[140 to 200] mm",
    finish: "Polished",
    featured: true,
    related: ["haemostatic-forceps", "surgical-scissors", "dissecting-forceps"],
    tags: ["needle holder", "suturing"],
    variants: ["[140] mm", "[160] mm", "[180] mm", "[200] mm"],
  }),
  product({
    slug: "haemostatic-forceps",
    code: "[ACME-HF-205]",
    name: "Haemostatic Forceps",
    categorySlug: "surgical-instruments",
    kind: "clamp",
    shortDescription: "Straight or curved haemostats for clamping vessels and tissue.",
    lead: "Jaw serrations are cut for even pressure along the length. The ratchet holds firmly at each step and releases smoothly.",
    features: ["Full-length serrations", "Firm, even ratchet", "Straight or curved pattern"],
    length: "[125 to 180] mm",
    finish: "Satin",
    related: ["needle-holder", "dissecting-forceps", "self-retaining-retractor"],
    tags: ["haemostat", "clamp", "mosquito"],
  }),
  product({
    slug: "self-retaining-retractor",
    code: "[ACME-RT-206]",
    name: "Self-retaining Retractor",
    categorySlug: "surgical-instruments",
    kind: "retractor",
    shortDescription: "Holds the wound open so both hands stay free.",
    lead: "A ratchet holds the blades at the chosen opening. Blunt or sharp prongs suit different tissue types.",
    features: ["Ratchet lock", "Blunt or sharp prongs", "Rounded, polished edges"],
    finish: "Satin",
    availability: "Made to requirement",
    related: ["needle-holder", "haemostatic-forceps"],
    tags: ["retractor", "self-retaining"],
  }),

  // Dental instruments
  product({
    slug: "dental-forceps",
    code: "ACME-DF-150",
    name: "Dental Forceps",
    categorySlug: "dental-instruments",
    kind: "forceps",
    shortDescription: "Dental forceps profiles designed for dental professionals, distributors and clinical procurement buyers.",
    lead: "Beaks are shaped to the tooth type and finished by hand for a precise, secure grip during extraction.",
    features: ["Anatomically shaped beaks", "Secure, non-slip grip", "Upper and lower patterns"],
    finish: "Satin / Polished",
    featured: true,
    related: ["dental-elevator", "dental-scaler", "surgical-scissors"],
    tags: ["dental", "extraction"],
    variants: ["Upper incisors", "Upper molars", "Lower incisors", "Lower molars"],
  }),
  product({
    slug: "dental-elevator",
    code: "[ACME-DE-151]",
    name: "Dental Elevator",
    categorySlug: "dental-instruments",
    kind: "generic",
    shortDescription: "Straight and angled elevators for luxating teeth and roots.",
    lead: "A sharp, polished blade and a broad handle give controlled force with a comfortable hold.",
    features: ["Sharp, polished blade", "Broad, comfortable handle", "Straight or angled"],
    finish: "Satin",
    related: ["dental-forceps", "dental-scaler"],
    tags: ["dental", "elevator", "luxator"],
  }),
  product({
    slug: "dental-scaler",
    code: "[ACME-DS-152]",
    name: "Dental Scaler",
    categorySlug: "dental-instruments",
    kind: "generic",
    shortDescription: "Double-ended scalers for removing calculus above and below the gum line.",
    lead: "Fine, hardened tips hold their edge. The textured handle gives a steady, controlled grip.",
    features: ["Hardened, fine tips", "Double-ended", "Textured handle"],
    finish: "Satin",
    related: ["dental-forceps", "dental-elevator"],
    tags: ["dental", "scaler", "periodontal"],
  }),

  // Veterinary instruments
  product({
    slug: "veterinary-forceps",
    code: "ACME-VF-410",
    name: "Veterinary Forceps",
    categorySlug: "veterinary-instruments",
    kind: "forceps",
    shortDescription: "Veterinary forceps manufactured for professional animal healthcare, clinics and specialist buyers.",
    lead: "A robust pattern with a firm spring and serrated tips, built for repeated use in busy clinics.",
    features: ["Robust spring", "Serrated tips", "Easy to clean"],
    finish: "Polished",
    featured: true,
    related: ["hoof-knife", "castrating-forceps"],
    tags: ["veterinary", "forceps"],
  }),
  product({
    slug: "hoof-knife",
    code: "[ACME-VK-411]",
    name: "Hoof Knife",
    categorySlug: "veterinary-instruments",
    kind: "generic",
    shortDescription: "A curved, sharpened blade for hoof trimming and care.",
    lead: "The blade is hardened and sharpened by hand. Left and right-handed versions are available.",
    features: ["Hand-sharpened blade", "Left or right-handed", "Comfortable handle"],
    finish: "Satin",
    availability: "Made to requirement",
    related: ["veterinary-forceps", "castrating-forceps"],
    tags: ["veterinary", "hoof", "farrier"],
  }),
  product({
    slug: "castrating-forceps",
    code: "[ACME-VC-412]",
    name: "Castrating Forceps",
    categorySlug: "veterinary-instruments",
    kind: "clamp",
    shortDescription: "Heavy-duty forceps for bloodless castration procedures.",
    lead: "Long handles give leverage. Jaws close evenly for consistent pressure.",
    features: ["Long, leveraged handles", "Even jaw closure", "Heavy-duty pattern"],
    finish: "Satin",
    related: ["veterinary-forceps", "hoof-knife"],
    tags: ["veterinary", "castration"],
  }),

  // Manicure instruments
  product({
    slug: "manicure-scissors",
    code: "ACME-MS-310",
    name: "Manicure Scissors",
    categorySlug: "manicure-instruments",
    kind: "scissors",
    shortDescription: "Professional manicure scissors manufactured with surface finishing, edge quality and handling control.",
    lead: "Fine, curved blades are set by hand for a clean cut around the nail and cuticle.",
    features: ["Fine, curved blades", "Hand-set edges", "Mirror-polished finish"],
    finish: "Mirror polished",
    availability: "Made to requirement",
    featured: true,
    related: ["cuticle-nipper", "nail-clipper", "surgical-scissors"],
    tags: ["manicure", "cuticle", "nail"],
  }),
  product({
    slug: "cuticle-nipper",
    code: "[ACME-MC-311]",
    name: "Cuticle Nipper",
    categorySlug: "manicure-instruments",
    kind: "scissors",
    shortDescription: "Spring-loaded nippers with sharp, precisely meeting jaws.",
    lead: "Jaws are ground to meet precisely for a clean cut. The double spring gives smooth, even action.",
    features: ["Precisely meeting jaws", "Double spring", "Lap joint"],
    finish: "Polished",
    related: ["manicure-scissors", "nail-clipper"],
    tags: ["manicure", "cuticle", "nipper"],
  }),
  product({
    slug: "nail-clipper",
    code: "[ACME-MN-312]",
    name: "Nail Clipper",
    categorySlug: "manicure-instruments",
    kind: "generic",
    shortDescription: "Straight or curved clippers for fingernails and toenails.",
    lead: "Hardened cutting edges stay sharp. The lever is sized for a firm, comfortable press.",
    features: ["Hardened edges", "Straight or curved", "Comfortable lever"],
    finish: "Satin",
    related: ["manicure-scissors", "cuticle-nipper"],
    tags: ["manicure", "nail"],
  }),

  // Scissors & forceps
  product({
    slug: "surgical-scissors",
    code: "ACME-SC-101",
    name: "Surgical Scissors",
    categorySlug: "scissors-forceps",
    kind: "scissors",
    shortDescription: "Precision surgical scissors manufactured for handling, cutting performance and professional healthcare use.",
    lead: "A dependable pair for cutting and dissecting tissue. Blades are set for a smooth cut from pivot to tip.",
    features: ["Matched, hand-set blades", "Straight or curved", "Smooth, even action"],
    length: "[115 to 230] mm",
    finish: "Polished",
    featured: true,
    related: ["dissecting-forceps", "needle-holder", "manicure-scissors"],
    tags: ["scissors", "Mayo", "Metzenbaum"],
    variants: ["[145] mm", "[180] mm", "[230] mm"],
  }),
  product({
    slug: "dissecting-forceps",
    code: "[ACME-FC-102]",
    name: "Dissecting Forceps",
    categorySlug: "scissors-forceps",
    kind: "forceps",
    shortDescription: "General-purpose dissecting forceps with serrated or toothed tips.",
    lead: "A lightweight forceps for holding and lifting tissue. Fine cross-serrations give a reliable grip without extra force.",
    features: ["Serrated or 1x2 toothed tips", "Balanced for fine control", "Textured grip area"],
    length: "[115 to 180] mm",
    finish: "Satin",
    related: ["surgical-scissors", "needle-holder"],
    tags: ["forceps", "dissecting", "tissue"],
  }),
  product({
    slug: "iris-scissors",
    code: "[ACME-SC-103]",
    name: "Iris Scissors",
    categorySlug: "scissors-forceps",
    kind: "scissors",
    shortDescription: "Small, sharp scissors for fine and delicate cutting.",
    lead: "Short, very sharp blades for detailed work. The small rings suit precise fingertip control.",
    features: ["Sharp/sharp tips", "Small finger rings", "Straight or curved"],
    length: "[115] mm",
    finish: "Polished",
    related: ["surgical-scissors", "dissecting-forceps"],
    tags: ["scissors", "iris", "fine"],
  }),

  // Electro-surgical instruments
  product({
    slug: "electro-surgical-handle",
    code: "ACME-ES-720",
    name: "Electro-Surgical Handle",
    categorySlug: "electro-surgical-instruments",
    kind: "generic",
    shortDescription: "Electro-surgical instrument profile manufactured for specialist procedural requirements.",
    lead: "A reusable handle with insulated components, made to fit your specified electrodes and cables.",
    features: ["Insulated components", "Made to your connector spec", "Reusable"],
    material: "Stainless steel / insulated components",
    finish: "Functional finish",
    availability: "Made to requirement",
    featured: true,
    related: ["bipolar-forceps"],
    tags: ["electrosurgical", "diathermy", "handle"],
  }),
  product({
    slug: "bipolar-forceps",
    code: "[ACME-EB-721]",
    name: "Bipolar Forceps",
    categorySlug: "electro-surgical-instruments",
    kind: "forceps",
    shortDescription: "Insulated bipolar forceps with conductive tips.",
    lead: "Insulation covers the body up to the tips. Tips are aligned so they meet evenly.",
    features: ["Full-body insulation", "Aligned conductive tips", "Standard connector"],
    material: "Stainless steel / insulated components",
    finish: "Functional finish",
    availability: "Made to requirement",
    related: ["electro-surgical-handle"],
    tags: ["electrosurgical", "bipolar", "forceps"],
  }),

  // Single use instruments
  product({
    slug: "single-use-instrument",
    code: "ACME-SU-610",
    name: "Single Use Instrument",
    categorySlug: "single-use-instruments",
    kind: "forceps",
    shortDescription: "Single use instrument profile designed for healthcare procurement and procedural use.",
    lead: "Made for procedures where a fresh instrument is required each time, and packed to your labelling requirements.",
    features: ["Individually packed", "Procurement-ready labelling", "Consistent quality per batch"],
    material: "Medical grade material",
    finish: "Standard",
    featured: true,
    related: ["single-use-scissors"],
    tags: ["single use", "disposable"],
  }),
  product({
    slug: "single-use-scissors",
    code: "[ACME-SU-611]",
    name: "Single Use Scissors",
    categorySlug: "single-use-instruments",
    kind: "scissors",
    shortDescription: "Disposable scissors for dressings and minor procedures.",
    lead: "Sharp, consistent blades in a light pattern, individually packed.",
    features: ["Individually packed", "Sharp, consistent blades", "Light pattern"],
    finish: "Standard",
    related: ["single-use-instrument"],
    tags: ["single use", "disposable", "scissors"],
  }),

  // Hollow ware
  product({
    slug: "hollow-ware-tray",
    code: "ACME-HW-520",
    name: "Hollow Ware Tray",
    categorySlug: "hollow-ware-instruments",
    kind: "generic",
    shortDescription: "Hollow ware product manufactured for clinical, surgical and healthcare support environments.",
    lead: "A deep-drawn stainless steel tray with rolled edges, for holding instruments during procedures.",
    features: ["Deep-drawn stainless steel", "Rolled, smooth edges", "Several sizes"],
    finish: "Polished",
    availability: "Made to requirement",
    featured: true,
    related: ["kidney-dish", "gallipot"],
    tags: ["hollow ware", "tray"],
  }),
  product({
    slug: "kidney-dish",
    code: "[ACME-HW-521]",
    name: "Kidney Dish",
    categorySlug: "hollow-ware-instruments",
    kind: "generic",
    shortDescription: "Kidney-shaped dish for instruments, dressings and fluids.",
    lead: "The curved shape sits close to the body. Rolled edges make it easy to handle and clean.",
    features: ["Kidney shape", "Rolled edges", "Several sizes"],
    finish: "Polished",
    related: ["hollow-ware-tray", "gallipot"],
    tags: ["hollow ware", "kidney dish"],
  }),
  product({
    slug: "gallipot",
    code: "[ACME-HW-522]",
    name: "Gallipot",
    categorySlug: "hollow-ware-instruments",
    kind: "generic",
    shortDescription: "Small stainless steel pot for solutions and swabs.",
    lead: "A small, stable pot with a flat base, for holding solutions and swabs during procedures.",
    features: ["Flat, stable base", "Smooth inner surface", "Several capacities"],
    finish: "Polished",
    related: ["hollow-ware-tray", "kidney-dish"],
    tags: ["hollow ware", "gallipot", "bowl"],
  }),
];
