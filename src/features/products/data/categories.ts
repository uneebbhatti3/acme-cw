import type { Category } from "@/features/products/types";

/**
 * Product ranges, taken from the client's current site. `rangeSize` is the
 * number of instrument profiles in the full range; only a sample of each range
 * is listed online in this demo.
 */
export const categories: Category[] = [
  {
    slug: "surgical-instruments",
    name: "Surgical Instruments",
    description:
      "Precision surgical instruments for general surgery, operating room workflows and healthcare procurement.",
    rangeSize: 180,
    keywords: ["surgical instruments", "needle holders", "retractors", "haemostatic forceps", "operating room instruments"],
    order: 1,
    placeholderKind: "needleHolder",
  },
  {
    slug: "dental-instruments",
    name: "Dental Instruments",
    description:
      "Dental instruments manufactured for clinical practices, distributors and professional healthcare buyers.",
    rangeSize: 220,
    keywords: ["dental instruments", "dental forceps", "dental elevators", "dental scalers", "orthodontic instruments"],
    order: 2,
    placeholderKind: "forceps",
  },
  {
    slug: "veterinary-instruments",
    name: "Veterinary Instruments",
    description: "Veterinary instruments for animal healthcare professionals, clinics and specialist distributors.",
    rangeSize: 60,
    keywords: ["veterinary instruments", "veterinary forceps", "veterinary surgical instruments", "animal surgery instruments"],
    order: 3,
    placeholderKind: "retractor",
  },
  {
    slug: "manicure-instruments",
    name: "Manicure Instruments",
    description:
      "Professional manicure instruments and grooming tools, manufactured with careful finishing and handling quality.",
    rangeSize: 75,
    keywords: ["manicure instruments", "manicure scissors", "cuticle nippers", "nail clippers", "beauty instruments"],
    order: 4,
    placeholderKind: "scissors",
  },
  {
    slug: "scissors-forceps",
    name: "Scissors & Forceps",
    description: "Scissors, forceps and precision-held instruments for surgical, dental and healthcare applications.",
    rangeSize: 140,
    keywords: ["surgical scissors", "dissecting forceps", "tissue forceps", "Metzenbaum scissors", "Mayo scissors"],
    order: 5,
    placeholderKind: "clamp",
  },
  {
    slug: "electro-surgical-instruments",
    name: "Electro-Surgical Instruments",
    description: "Electro-surgical instrument profiles manufactured for specialist procedural requirements.",
    rangeSize: 45,
    keywords: ["electro-surgical instruments", "bipolar forceps", "electrosurgical handles", "diathermy instruments"],
    order: 6,
    placeholderKind: "generic",
  },
  {
    slug: "single-use-instruments",
    name: "Single Use Instruments",
    description: "Single use instrument ranges designed for healthcare procurement and procedural use.",
    rangeSize: 90,
    keywords: ["single use instruments", "disposable surgical instruments", "sterile single use forceps", "disposable scissors"],
    order: 7,
    placeholderKind: "forceps",
  },
  {
    slug: "hollow-ware-instruments",
    name: "Hollow Ware Instruments",
    description: "Hollow ware products for surgical, clinical and healthcare support environments.",
    rangeSize: 55,
    keywords: ["hollow ware", "stainless steel kidney dish", "instrument trays", "surgical bowls", "gallipots"],
    order: 8,
    placeholderKind: "generic",
  },
];
