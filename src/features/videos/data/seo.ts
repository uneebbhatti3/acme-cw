import { siteConfig } from "@/config/site";
import type { PageSeo } from "@/lib/seo";

const { brandName, location } = siteConfig;

export const videosSeo: PageSeo = {
  title: "Manufacturing & Quality Videos",
  description: `See how ${brandName} makes surgical and dental instruments in ${location.city}: forging, grinding, polishing, inspection and export packing.`,
  path: "/videos",
  keywords: [
    "surgical instruments manufacturing video",
    "how surgical instruments are made",
    `instrument forging ${location.city}`,
    "instrument quality inspection",
    "factory tour surgical instruments",
  ],
};
