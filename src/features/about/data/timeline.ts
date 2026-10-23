import { siteConfig } from "@/config/site";
import type { TimelineEvent } from "@/features/about/types";

const { company } = siteConfig;

/**
 * Company history. The founding year comes from the client's current site;
 * the other years are placeholders for the client to confirm.
 */
export const timeline: TimelineEvent[] = [
  {
    year: String(company.foundingYear),
    title: `Founded in ${company.location.city}`,
    description:
      "The company starts making surgical instruments by hand, in a city known worldwide for instrument craft.",
    highlight: true,
  },
  {
    year: "[Year]",
    title: "First export orders",
    description: "The first shipments leave for buyers in Europe. Packing and export paperwork become part of the craft.",
  },
  {
    year: "[Year]",
    title: "Dental, veterinary and manicure ranges",
    description: "The range grows beyond surgical instruments to serve dental practices, clinics and beauty professionals.",
  },
  {
    year: "[Year]",
    title: "Certified quality system",
    description: "Written procedures, batch records and inspection steps are introduced across every line.",
    highlight: true,
  },
  {
    year: "[Year]",
    title: "OEM and private label",
    description: "Distributors start ordering instruments with their own marking, packaging and catalogue codes.",
  },
  {
    year: "Today",
    title: `${company.exportMarkets} export markets`,
    description: `${company.instrumentProfiles} instrument profiles, shipped to buyers across Europe, the Americas, Africa, Asia and Australia.`,
  },
];
