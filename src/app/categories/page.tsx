import type { Metadata } from "next";

import { CategoriesPage as CategoriesFeaturePage } from "@/features/categories/components/categories-page";

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
  return <CategoriesFeaturePage />;
}
