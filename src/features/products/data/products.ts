import type { Product, ProductImage, ProductVariant } from "@/features/products/types";
import type { InstrumentKind, ViewType } from "@/types";

/**
 * SAMPLE PRODUCTS. Everything in [square brackets] (SKUs, sizes, grades,
 * finishes) is a placeholder that renders with a dashed outline until the
 * client's catalogue data replaces it. See docs/CONTENT_GUIDE.md.
 *
 * To add a product: copy an entry, give it a unique `slug` (used in the URL)
 * and a unique `sku`, and pick its `categorySlug` and `type`. The build checks
 * that slugs and SKUs are unique and that categories and related products exist.
 *
 * Photos: put files in /public/products/<slug>/ and pass them to `views()`,
 * e.g. views(name, { front: "/products/needle-holder/front.webp" }).
 * Any number of images is supported; the gallery and cards adapt.
 */

const VIEWS: ViewType[] = ["front", "side", "top", "detail"];
const VIEW_ALT: Record<ViewType, string> = {
  front: "front view",
  side: "side view",
  top: "top view",
  back: "back view",
  detail: "close-up of the working end",
  angle: "angled view",
};

/** The standard four views. Pass real photo paths per view as they arrive. */
function views(name: string, src: Partial<Record<ViewType, string>> = {}): ProductImage[] {
  return VIEWS.map((view) => ({ view, alt: `${name}, ${VIEW_ALT[view]}`, src: src[view] }));
}

/** Placeholder size rows: one SKU per size. */
function sizes(sku: string, list: string[]): ProductVariant[] {
  const base = sku.replace(/[[\]]/g, "");
  return list.map((size) => ({ sku: `[${base}-${size.replace(/\D/g, "")}]`, size: `[${size}]` }));
}

const datasheet = { label: "Product datasheet (placeholder)", file: "/docs/datasheet-placeholder.pdf", meta: "PDF" };

interface Seed extends Omit<Product, "images" | "material" | "finish" | "specs" | "variants" | "description"> {
  kind: InstrumentKind;
  lead: string;
  material?: string;
  finish?: string;
  specs?: Product["specs"];
  variants?: ProductVariant[];
}

/** Shared paragraph per range. */
const RANGE_TEXT: Record<string, string> = {
  "surgical-instruments":
    "Supplied in standard patterns or made to your drawing or sample, with your marking and packaging on request.",
  "dental-instruments": "Patterns, handle styles and working ends can be matched to your existing range.",
  "veterinary-instruments": "Made for the demands of veterinary practice, with joints and surfaces that clean easily.",
  "manicure-instruments": "Available with your brand marking and retail or professional packaging.",
  "electro-surgical-instruments": "Connector type, insulation and dimensions are agreed with you before production.",
  "single-use-instruments": "Packaging, labelling and sterility requirements are agreed with you for each order.",
  "hollow-ware-instruments": "Formed from stainless steel with rolled edges and a finish that is easy to clean.",
};

function product(s: Seed): Product {
  const { lead, material, finish, specs, variants, ...rest } = s;
  return {
    ...rest,
    description: [lead, RANGE_TEXT[s.categorySlug]],
    material: material ?? "[Stainless steel, grade to be confirmed]",
    finish: finish ?? "[Satin]",
    specs: specs ?? [],
    variants: variants ?? [],
    images: views(s.name),
  };
}

export const products: Product[] = [
  // Surgical instruments
  product({
    slug: "surgical-scissors",
    sku: "[ACME-SC-101]",
    name: "Mayo Dissecting Scissors",
    categorySlug: "surgical-instruments",
    type: "Scissors",
    kind: "scissors",
    shortDescription: "Heavy-pattern scissors for cutting tissue and sutures, in straight and curved versions.",
    lead: "Blades are ground as a matched pair and set for an even cut along the full length.",
    features: ["Matched, hand-set blades", "Straight or curved pattern", "Smooth screw-joint action"],
    specs: [
      { label: "Pattern", value: "[Straight / curved]" },
      { label: "Tips", value: "[Blunt / blunt]" },
      { label: "Joint", value: "[Screw joint]" },
      { label: "Reusable", value: "Yes" },
    ],
    variants: sizes("[ACME-SC-101]", ["145 mm", "170 mm", "230 mm"]),
    documents: [datasheet],
    featured: true,
    related: ["iris-scissors", "dissecting-forceps", "needle-holder"],
    tags: ["mayo scissors", "dissecting scissors"],
  }),
  product({
    slug: "iris-scissors",
    sku: "[ACME-SC-103]",
    name: "Iris Scissors",
    categorySlug: "surgical-instruments",
    type: "Scissors",
    kind: "scissors",
    shortDescription: "Fine, sharp-pointed scissors for delicate tissue work.",
    lead: "Short, fine blades with sharp points give control in confined areas.",
    features: ["Fine, sharp points", "Straight or curved blades", "Large finger rings"],
    specs: [
      { label: "Pattern", value: "[Straight / curved]" },
      { label: "Tips", value: "[Sharp / sharp]" },
      { label: "Reusable", value: "Yes" },
    ],
    variants: sizes("[ACME-SC-103]", ["105 mm", "115 mm"]),
    related: ["surgical-scissors", "dissecting-forceps"],
    tags: ["iris scissors", "fine scissors"],
  }),
  product({
    slug: "dissecting-forceps",
    sku: "[ACME-FC-102]",
    name: "Dissecting Forceps",
    categorySlug: "surgical-instruments",
    type: "Forceps",
    kind: "forceps",
    shortDescription: "Spring forceps for holding tissue, with serrated or toothed tips.",
    lead: "Tips are aligned and checked so they meet evenly along their length.",
    features: ["Even tip alignment", "Serrated or 1x2 teeth", "Textured grip"],
    specs: [
      { label: "Tips", value: "[Serrated / 1x2 teeth]" },
      { label: "Reusable", value: "Yes" },
    ],
    variants: sizes("[ACME-FC-102]", ["130 mm", "145 mm", "200 mm"]),
    related: ["surgical-scissors", "needle-holder"],
    tags: ["tissue forceps", "thumb forceps"],
  }),
  product({
    slug: "needle-holder",
    sku: "[ACME-NH-204]",
    name: "Mayo-Hegar Needle Holder",
    categorySlug: "surgical-instruments",
    type: "Needle holders",
    kind: "needleHolder",
    shortDescription: "Needle holder with serrated jaws and a three-step ratchet for a secure hold.",
    lead: "Jaws are machined for a secure hold on the needle, and the ratchet closes cleanly and releases with light pressure.",
    features: ["Serrated jaws, optional tungsten carbide inserts", "Three-step ratchet", "Balanced for fine control"],
    specs: [
      { label: "Jaw", value: "[Serrated / TC insert]" },
      { label: "Ratchet", value: "[3 steps]" },
      { label: "Reusable", value: "Yes" },
    ],
    variants: sizes("[ACME-NH-204]", ["140 mm", "160 mm", "180 mm", "200 mm"]),
    documents: [datasheet],
    featured: true,
    related: ["haemostatic-forceps", "surgical-scissors", "dissecting-forceps"],
    tags: ["needle holder", "suturing"],
  }),
  product({
    slug: "haemostatic-forceps",
    sku: "[ACME-HF-205]",
    name: "Haemostatic Forceps",
    categorySlug: "surgical-instruments",
    type: "Haemostatic clamps",
    kind: "clamp",
    shortDescription: "Ratcheted forceps for clamping vessels, in straight and curved patterns.",
    lead: "Jaws close evenly from tip to box joint, and the ratchet holds at every step.",
    features: ["Fully serrated jaws", "Box joint", "Straight or curved"],
    specs: [
      { label: "Pattern", value: "[Straight / curved]" },
      { label: "Ratchet", value: "[3 steps]" },
      { label: "Reusable", value: "Yes" },
    ],
    variants: sizes("[ACME-HF-205]", ["125 mm", "140 mm", "160 mm"]),
    related: ["needle-holder", "self-retaining-retractor"],
    tags: ["haemostat", "artery forceps", "mosquito forceps"],
  }),
  product({
    slug: "self-retaining-retractor",
    sku: "[ACME-RT-206]",
    name: "Self-retaining Retractor",
    categorySlug: "surgical-instruments",
    type: "Retractors",
    kind: "retractor",
    shortDescription: "Ratcheted retractor that holds the wound open without an assistant.",
    lead: "The ratchet locks at each position and releases with one movement.",
    features: ["Sharp or blunt prongs", "Locking ratchet", "Open finger rings"],
    specs: [
      { label: "Prongs", value: "[3x4, sharp / blunt]" },
      { label: "Reusable", value: "Yes" },
    ],
    variants: sizes("[ACME-RT-206]", ["140 mm", "165 mm"]),
    related: ["haemostatic-forceps", "needle-holder"],
    tags: ["retractor", "wound retractor"],
  }),

  // Dental instruments
  product({
    slug: "dental-forceps",
    sku: "[ACME-DF-150]",
    name: "Dental Extraction Forceps",
    categorySlug: "dental-instruments",
    type: "Extraction forceps",
    kind: "forceps",
    shortDescription: "Extraction forceps with beaks shaped for specific teeth.",
    lead: "Beaks are shaped and finished for a secure grip, and handles are sized for control.",
    features: ["Anatomically shaped beaks", "Upper and lower patterns", "Serrated handles"],
    specs: [
      { label: "Pattern", value: "[Figure no.]" },
      { label: "Jaw", value: "[Upper / lower]" },
      { label: "Reusable", value: "Yes" },
    ],
    variants: [
      { sku: "[ACME-DF-150-UM]", size: "[Upper molars]" },
      { sku: "[ACME-DF-150-LM]", size: "[Lower molars]" },
      { sku: "[ACME-DF-150-UI]", size: "[Upper incisors]" },
    ],
    documents: [datasheet],
    featured: true,
    related: ["dental-elevator", "dental-scaler"],
    tags: ["dental forceps", "extraction forceps"],
  }),
  product({
    slug: "dental-elevator",
    sku: "[ACME-DE-151]",
    name: "Dental Elevator",
    categorySlug: "dental-instruments",
    type: "Elevators",
    kind: "generic",
    shortDescription: "Elevator for loosening teeth and roots, in straight and angled patterns.",
    lead: "Blades are ground thin at the tip for access, with a handle shaped for grip.",
    features: ["Thin, tempered blade", "Straight or angled", "Ergonomic handle"],
    specs: [
      { label: "Blade", value: "[Straight / left / right]" },
      { label: "Blade width", value: "[3 mm]" },
      { label: "Reusable", value: "Yes" },
    ],
    variants: sizes("[ACME-DE-151]", ["2 mm", "3 mm", "4 mm"]),
    related: ["dental-forceps", "dental-scaler"],
    tags: ["dental elevator", "root elevator"],
  }),
  product({
    slug: "dental-scaler",
    sku: "[ACME-DS-152]",
    name: "Dental Scaler",
    categorySlug: "dental-instruments",
    type: "Scalers",
    kind: "generic",
    shortDescription: "Double-ended scaler for removing deposits above and below the gum line.",
    lead: "Working ends are shaped by hand and inspected for a consistent edge.",
    features: ["Double-ended", "Hollow or solid handle", "Fine working ends"],
    specs: [
      { label: "Pattern", value: "[H6/H7]" },
      { label: "Handle", value: "[Hollow, 8 mm]" },
      { label: "Reusable", value: "Yes" },
    ],
    related: ["dental-elevator", "dental-forceps"],
    tags: ["scaler", "periodontal"],
  }),

  // Veterinary instruments
  product({
    slug: "veterinary-forceps",
    sku: "[ACME-VF-410]",
    name: "Veterinary Tissue Forceps",
    categorySlug: "veterinary-instruments",
    type: "Forceps",
    kind: "forceps",
    shortDescription: "Strong tissue forceps for veterinary surgery.",
    lead: "Heavier stock and robust teeth for secure grip in veterinary procedures.",
    features: ["Heavy pattern", "Toothed tips", "Easy to clean"],
    specs: [{ label: "Reusable", value: "Yes" }],
    variants: sizes("[ACME-VF-410]", ["150 mm", "200 mm"]),
    featured: true,
    related: ["castrating-forceps", "hoof-knife"],
    tags: ["veterinary forceps"],
  }),
  product({
    slug: "hoof-knife",
    sku: "[ACME-VK-411]",
    name: "Hoof Knife",
    categorySlug: "veterinary-instruments",
    type: "Hoof care",
    kind: "generic",
    shortDescription: "Hoof knife for trimming and hoof care, in left and right-hand versions.",
    lead: "The blade is hardened and sharpened for a clean, controlled cut.",
    features: ["Hardened blade", "Left or right hand", "Wooden or synthetic handle"],
    specs: [
      { label: "Hand", value: "[Left / right]" },
      { label: "Handle", value: "[Wood / synthetic]" },
    ],
    related: ["veterinary-forceps", "castrating-forceps"],
    tags: ["hoof knife", "farrier"],
  }),
  product({
    slug: "castrating-forceps",
    sku: "[ACME-VC-412]",
    name: "Castrating Forceps",
    categorySlug: "veterinary-instruments",
    type: "Forceps",
    kind: "clamp",
    shortDescription: "Bloodless castrating forceps for large-animal practice.",
    lead: "Long handles give leverage, and the jaws close evenly under load.",
    features: ["Long handles", "Even jaw closure", "Heavy pattern"],
    specs: [{ label: "Reusable", value: "Yes" }],
    variants: sizes("[ACME-VC-412]", ["300 mm", "400 mm"]),
    related: ["veterinary-forceps", "hoof-knife"],
    tags: ["castrating forceps", "burdizzo"],
  }),

  // Beauty & manicure
  product({
    slug: "manicure-scissors",
    sku: "[ACME-MS-310]",
    name: "Cuticle Scissors",
    categorySlug: "manicure-instruments",
    type: "Scissors",
    kind: "scissors",
    shortDescription: "Fine curved scissors for cuticle and nail care.",
    lead: "Fine, curved blades are set by hand for a clean cut close to the nail.",
    features: ["Fine curved blades", "Hand-set edges", "Brand marking available"],
    finish: "[Mirror polish]",
    variants: sizes("[ACME-MS-310]", ["90 mm", "100 mm"]),
    featured: true,
    related: ["cuticle-nipper", "nail-clipper"],
    tags: ["cuticle scissors", "nail scissors"],
  }),
  product({
    slug: "cuticle-nipper",
    sku: "[ACME-MC-311]",
    name: "Cuticle Nipper",
    categorySlug: "manicure-instruments",
    type: "Nippers",
    kind: "scissors",
    shortDescription: "Double-spring cuticle nipper with a precise bite.",
    lead: "Jaws are ground to meet along the full edge for a clean cut.",
    features: ["Double spring", "Full, half or quarter jaw", "Box joint"],
    finish: "[Satin / mirror]",
    specs: [{ label: "Jaw", value: "[Full / half / quarter]" }],
    related: ["manicure-scissors", "nail-clipper"],
    tags: ["cuticle nipper"],
  }),
  product({
    slug: "nail-clipper",
    sku: "[ACME-MN-312]",
    name: "Nail Clipper",
    categorySlug: "manicure-instruments",
    type: "Clippers",
    kind: "generic",
    shortDescription: "Lever nail clipper with curved or straight jaws.",
    lead: "Hardened edges and a firm lever give a clean cut with little effort.",
    features: ["Hardened edges", "Curved or straight jaw", "Optional nail catcher"],
    variants: sizes("[ACME-MN-312]", ["60 mm", "80 mm"]),
    related: ["manicure-scissors", "cuticle-nipper"],
    tags: ["nail clipper"],
  }),

  // Electrosurgical
  product({
    slug: "bipolar-forceps",
    sku: "[ACME-EB-721]",
    name: "Bipolar Forceps",
    categorySlug: "electro-surgical-instruments",
    type: "Bipolar forceps",
    kind: "forceps",
    shortDescription: "Insulated bipolar forceps with fine tips for coagulation.",
    lead: "Insulation, tip size and connector are confirmed with you before production.",
    features: ["Insulated shafts", "Fine, non-stick tips", "Standard connectors"],
    material: "[Stainless steel, insulated]",
    specs: [
      { label: "Connector", value: "[European / US pin]" },
      { label: "Tip", value: "[1 mm]" },
    ],
    variants: sizes("[ACME-EB-721]", ["160 mm", "190 mm"]),
    documents: [datasheet],
    related: ["electro-surgical-handle"],
    tags: ["bipolar forceps", "coagulation forceps"],
  }),
  product({
    slug: "electro-surgical-handle",
    sku: "[ACME-ES-720]",
    name: "Electrode Handle",
    categorySlug: "electro-surgical-instruments",
    type: "Handles and electrodes",
    kind: "generic",
    shortDescription: "Reusable handle for monopolar electrodes.",
    lead: "Built around your electrode and connector specification.",
    features: ["Reusable handle", "Standard electrode fitting", "Insulated body"],
    material: "[Stainless steel / insulated body]",
    specs: [{ label: "Fitting", value: "[2.4 mm]" }],
    related: ["bipolar-forceps"],
    tags: ["electrode handle", "monopolar"],
  }),

  // Single-use
  product({
    slug: "single-use-forceps",
    sku: "[ACME-SU-610]",
    name: "Single-use Dissecting Forceps",
    categorySlug: "single-use-instruments",
    type: "Forceps",
    kind: "forceps",
    shortDescription: "Single-use dissecting forceps, individually packed.",
    lead: "Made for procedures where a new instrument is required each time.",
    features: ["Single use", "Individually packed", "Labelling to your requirement"],
    specs: [
      { label: "Reusable", value: "No, single use" },
      { label: "Sterility", value: "[To be confirmed per order]" },
      { label: "Packaging", value: "[1 per pouch, 25 per box]" },
    ],
    related: ["single-use-scissors"],
    tags: ["single use forceps", "disposable forceps"],
  }),
  product({
    slug: "single-use-scissors",
    sku: "[ACME-SU-611]",
    name: "Single-use Scissors",
    categorySlug: "single-use-instruments",
    type: "Scissors",
    kind: "scissors",
    shortDescription: "Single-use scissors for dressing and suture cutting, individually packed.",
    lead: "A sharp, consistent cut for one procedure, with no reprocessing.",
    features: ["Single use", "Individually packed", "Sharp or blunt tips"],
    specs: [
      { label: "Reusable", value: "No, single use" },
      { label: "Sterility", value: "[To be confirmed per order]" },
      { label: "Packaging", value: "[1 per pouch, 25 per box]" },
    ],
    related: ["single-use-forceps"],
    tags: ["single use scissors", "disposable scissors"],
  }),

  // Hollow ware
  product({
    slug: "instrument-tray",
    sku: "[ACME-HW-520]",
    name: "Instrument Tray",
    categorySlug: "hollow-ware-instruments",
    type: "Trays",
    kind: "generic",
    shortDescription: "Stainless steel tray for holding instruments, with or without a lid.",
    lead: "Rolled edges and rounded corners make the tray easy to clean.",
    features: ["Rolled edges", "With or without lid", "Stackable"],
    variants: [
      { sku: "[ACME-HW-520-S]", size: "[250 x 150 x 50 mm]" },
      { sku: "[ACME-HW-520-M]", size: "[300 x 200 x 50 mm]" },
    ],
    related: ["kidney-dish", "gallipot"],
    tags: ["instrument tray"],
  }),
  product({
    slug: "kidney-dish",
    sku: "[ACME-HW-521]",
    name: "Kidney Dish",
    categorySlug: "hollow-ware-instruments",
    type: "Dishes and bowls",
    kind: "generic",
    shortDescription: "Kidney-shaped dish for wards, theatres and clinics.",
    lead: "Seamless, smooth surfaces with no corners where residue can collect.",
    features: ["Seamless", "Rolled rim", "Several sizes"],
    variants: sizes("[ACME-HW-521]", ["200 mm", "250 mm"]),
    related: ["instrument-tray", "gallipot"],
    tags: ["kidney dish", "emesis basin"],
  }),
  product({
    slug: "gallipot",
    sku: "[ACME-HW-522]",
    name: "Gallipot",
    categorySlug: "hollow-ware-instruments",
    type: "Dishes and bowls",
    kind: "generic",
    shortDescription: "Small stainless steel pot for solutions and swabs.",
    lead: "A rolled rim and smooth interior make it easy to pour from and to clean.",
    features: ["Rolled rim", "Seamless", "Graduated on request"],
    variants: sizes("[ACME-HW-522]", ["60 ml", "100 ml", "200 ml"]),
    related: ["kidney-dish", "instrument-tray"],
    tags: ["gallipot", "solution cup"],
  }),
];
