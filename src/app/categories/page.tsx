import type { Metadata } from "next";

import { CategoriesCTASection } from "@/features/categories/components/categories-cta-section";
import { CategoriesGridSection } from "@/features/categories/components/categories-grid-section";
import { CategoriesHeroSection } from "@/features/categories/components/categories-hero-section";
import { SpecializedLinesSection } from "@/features/categories/components/specialized-lines-section";

export const metadata: Metadata = {
  title: "Product Categories | Acme Commercial Ways (Pvt) Ltd.",
  description:
    "Browse all Acme Commercial Ways instrument categories: surgical, dental, veterinary, manicure, scissors & forceps, electro-surgical, single use, and hollow ware instruments. Structured for procurement teams, distributors, and specialist buyers.",
  keywords: [
    "surgical instruments categories",
    "dental instruments categories",
    "veterinary instruments",
    "manicure instruments",
    "electro-surgical instruments",
    "hollow ware instruments",
    "single use instruments",
    "scissors forceps",
    "instrument catalog categories",
    "Sialkot instruments",
  ],
  openGraph: {
    title: "Product Categories | Acme Commercial Ways",
    description:
      "Eight instrument ranges across surgical, dental, veterinary, and manicure disciplines. Browse by clinical workflow or specialization.",
    type: "website",
  },
};

export default function CategoriesPage() {
  return (
    <>
      <CategoriesHeroSection />
      <CategoriesGridSection />
      <SpecializedLinesSection />
      <CategoriesCTASection />
    </>
  );
}
