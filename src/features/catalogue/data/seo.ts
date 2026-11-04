import { siteConfig } from "@/config/site";
import type { PageSeo } from "@/lib/seo";

export const catalogueSeo: PageSeo = {
  title: ["Instrument Catalogues: View Online or as PDF", "Instrument Catalogues (PDF)"],
  description: `Browse ${siteConfig.brandName} catalogues online or request PDFs: general, ophthalmic and podiatry instruments, retractor systems and sterilization boxes.`,
  path: "/catalogue",
  keywords: [
    "surgical instruments catalogue PDF",
    "dental instruments catalogue",
    "instrument catalogue online",
    "surgical instruments price list",
    "wholesale instruments catalogue",
  ],
};
