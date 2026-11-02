import { siteConfig } from "@/config/site";
import type { PageSeo } from "@/lib/seo";

export const homeSeo: PageSeo = {
  title: `${siteConfig.legalName} | Surgical & Dental Instrument Manufacturer`,
  absoluteTitle: true,
  description:
    "Manufacturer and exporter of surgical, orthopedic, ophthalmic and dental instruments in Sialkot, Pakistan. OEM and private label, made to drawing, export packing.",
  path: "/",
  keywords: [
    "surgical instruments",
    "dental instruments",
    "orthopedic instruments",
    "ophthalmic instruments",
    "surgical instruments manufacturer Pakistan",
    "Sialkot surgical instruments",
    "OEM surgical instruments",
    "private label dental instruments",
  ],
  socialDescription:
    "Surgical, orthopedic, ophthalmic and dental instruments made in Sialkot, Pakistan, in standard patterns or to your drawing, under your brand.",
};
