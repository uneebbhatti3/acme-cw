import { siteConfig } from "@/config/site";
import type { PageSeo } from "@/lib/seo";

const { brandName, tagline, location } = siteConfig;

export const homeSeo: PageSeo = {
  // The first candidate that fits in 60 characters wins (see fitTitle).
  title: [`${brandName} | ${tagline}`, `${brandName} | Surgical & Dental Instruments`, `Surgical & Dental Instruments | ${brandName}`],
  absoluteTitle: true,
  description: `Surgical, orthopedic, ophthalmic and dental instruments made in ${location.city}, ${location.country}. OEM and private label, made to drawing, with export packing.`,
  path: "/",
  keywords: [
    "surgical instruments",
    "dental instruments",
    "orthopedic instruments",
    "ophthalmic instruments",
    `surgical instruments manufacturer ${location.country}`,
    `${location.city} surgical instruments`,
    "OEM surgical instruments",
    "private label dental instruments",
  ],
  socialDescription: `Surgical, orthopedic, ophthalmic and dental instruments made in ${location.city}, ${location.country}, in standard patterns or to your drawing, under your brand.`,
};
