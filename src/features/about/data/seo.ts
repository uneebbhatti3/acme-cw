import { siteConfig } from "@/config/site";
import type { PageSeo } from "@/lib/seo";

const { brandName, location } = siteConfig;

export const aboutSeo: PageSeo = {
  title: [`About Us: Instrument Manufacturer, ${location.city}`, `About Us: Instrument Maker, ${location.city}`, "About Us"],
  description: `${brandName} makes and exports surgical, orthopedic, ophthalmic and dental instruments from ${location.city}, ${location.country}, for distributors and brand owners.`,
  path: "/about",
  keywords: [
    `about ${brandName}`,
    `${location.city} instrument manufacturer`,
    "dental instruments exporter",
    `${location.country} surgical instruments`,
    "OEM instruments manufacturer",
  ],
  socialTitle: `About ${brandName} | Surgical & Dental Instruments`,
  socialDescription: `A ${location.city} manufacturer of surgical, orthopedic, ophthalmic and dental instruments, supplying distributors and brand owners worldwide.`,
};
