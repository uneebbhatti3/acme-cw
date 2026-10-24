import { siteConfig } from "@/config/site";
import type { TimelineEvent } from "@/features/about/types";

const established = siteConfig.facts.find((f) => f.key === "established");
const foundingYear = established?.verified ? established.value : "[Year]";

/**
 * Company history. Years in brackets are placeholders for the client to
 * confirm; the founding year appears once the "established" fact in
 * siteConfig is verified.
 */
export const timeline: TimelineEvent[] = [
  {
    year: foundingYear,
    title: `Founded in ${siteConfig.location.city}`,
    description: "The company begins making surgical instruments by hand.",
  },
  {
    year: "[Year]",
    title: "First export orders",
    description: "The first shipments leave for buyers abroad, and export packing becomes part of the work.",
  },
  {
    year: "[Year]",
    title: "Dental, veterinary and beauty ranges",
    description: "The range grows beyond surgical instruments to serve dental practices, clinics and beauty professionals.",
  },
  {
    year: "[Year]",
    title: "OEM and private label",
    description: "Distributors begin ordering instruments with their own marking, codes and packaging.",
  },
];
