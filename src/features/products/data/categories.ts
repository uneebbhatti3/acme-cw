import type { Category } from "@/features/products/types";

/**
 * Product ranges. Organised by field of use, with the instrument type
 * (scissors, forceps, needle holders...) as a filter inside each range, so a
 * product belongs to exactly one range. Add, rename or reorder ranges here;
 * menus, cards, the footer and the sitemap follow automatically.
 *
 * Changing a slug changes a public URL: add a redirect in next.config.ts.
 */
export const categories: Category[] = [
  {
    slug: "surgical-instruments",
    name: "Surgical Instruments",
    description: "Scissors, forceps, needle holders, haemostats and retractors for general and specialist surgery.",
    keywords: ["surgical instruments", "surgical scissors", "dissecting forceps", "needle holders", "haemostatic forceps", "retractors"],
    order: 1,
    placeholderKind: "scissors",
  },
  {
    slug: "dental-instruments",
    name: "Dental Instruments",
    description: "Extraction forceps, elevators, scalers and examination instruments for dental practice.",
    keywords: ["dental instruments", "dental extraction forceps", "dental elevators", "dental scalers"],
    order: 2,
    placeholderKind: "forceps",
  },
  {
    slug: "veterinary-instruments",
    name: "Veterinary Instruments",
    description: "Surgical and husbandry instruments for small-animal and large-animal veterinary work.",
    keywords: ["veterinary instruments", "veterinary forceps", "hoof knife", "castrating forceps"],
    order: 3,
    placeholderKind: "clamp",
  },
  {
    slug: "manicure-instruments",
    name: "Beauty & Manicure",
    description: "Scissors, nippers and clippers for nail care, beauty salons and personal-care brands.",
    keywords: ["manicure instruments", "cuticle nippers", "nail scissors", "nail clippers", "beauty instruments"],
    order: 4,
    placeholderKind: "scissors",
  },
  {
    slug: "electro-surgical-instruments",
    name: "Electrosurgical Instruments",
    description: "Bipolar forceps and electrode handles with insulated components, made to specification.",
    keywords: ["electrosurgical instruments", "bipolar forceps", "electrosurgical handles", "diathermy instruments"],
    order: 5,
    placeholderKind: "forceps",
  },
  {
    slug: "single-use-instruments",
    name: "Single-Use Instruments",
    description: "Single-use forceps and scissors for procedures where a new instrument is needed each time.",
    keywords: ["single use instruments", "disposable surgical instruments", "single use forceps", "single use scissors"],
    order: 6,
    placeholderKind: "needleHolder",
  },
  {
    slug: "hollow-ware-instruments",
    name: "Hollow Ware",
    description: "Stainless steel trays, kidney dishes and gallipots for theatres, wards and clinics.",
    keywords: ["hollow ware", "stainless steel kidney dish", "instrument trays", "gallipots"],
    order: 7,
    placeholderKind: "generic",
  },
];
