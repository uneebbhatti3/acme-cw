import { siteConfig } from "@/config/site";
import type { PageSeo } from "@/lib/seo";

const { city } = siteConfig.location;

export const manufacturingSeo: PageSeo = {
  title: ["Manufacturing, OEM and Private Label", "OEM and Private Label Manufacturing"],
  description: `Instrument manufacturing in ${city}, from forging to finishing: made-to-drawing instruments, OEM and private label, laser marking and export packing.`,
  path: "/manufacturing",
  keywords: [
    "OEM surgical instruments",
    "private label surgical instruments",
    "custom surgical instruments",
    "surgical instruments made to drawing",
    "laser marking surgical instruments",
    `surgical instrument manufacturing ${city}`,
  ],
};
