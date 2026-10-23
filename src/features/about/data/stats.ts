import { siteConfig } from "@/config/site";
import type { Stat } from "@/features/about/types";

const { company } = siteConfig;

/** The figures shown beside the world map on the About page. */
export const reachStats: Stat[] = [
  { label: "Export markets", value: parseInt(company.exportMarkets, 10), suffix: "+" },
  { label: "Instrument profiles", value: parseInt(company.instrumentProfiles, 10), suffix: "+" },
];
