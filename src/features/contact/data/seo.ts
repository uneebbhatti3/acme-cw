import { siteConfig } from "@/config/site";
import type { PageSeo } from "@/lib/seo";

const { brandName, location } = siteConfig;

export const contactSeo: PageSeo = {
  // Distinct from /request-quote, so the two pages do not compete for the same search.
  title: [`Contact Us: Sales Team in ${location.city}`, "Contact Us"],
  description: `Contact ${brandName} in ${location.city}, ${location.country} about products, quotations, OEM and private label, catalogues or distribution partnerships.`,
  path: "/contact",
  keywords: [
    `contact ${brandName}`,
    "surgical instruments supplier contact",
    "OEM instruments inquiry",
    "instrument export inquiry",
    "surgical instruments distributor",
  ],
  socialTitle: `Contact ${brandName}`,
  socialDescription: `Send product questions, OEM requests or distribution enquiries to our sales team in ${location.city}, ${location.country}.`,
};
