import type { Metadata } from "next";

import { ProductsPage as ProductsFeaturePage } from "@/features/products/components/products-page";

export const metadata: Metadata = {
  title: "Product Catalog | Acme Commercial Ways (Pvt) Ltd.",
  description:
    "Browse the Acme Commercial Ways product catalog: surgical scissors, dental forceps, needle holders, veterinary instruments, manicure scissors, hollow ware, single use instruments, and electro-surgical handles. 1000+ instrument profiles available.",
  keywords: [
    "surgical scissors",
    "dental forceps",
    "needle holder",
    "veterinary forceps",
    "manicure scissors",
    "electro-surgical instruments",
    "hollow ware instruments",
    "single use instruments",
    "stainless steel instruments",
    "instrument catalog",
  ],
  openGraph: {
    title: "Product Catalog | Acme Commercial Ways",
    description:
      "1000+ precision surgical, dental, veterinary, and manicure instrument profiles. Search, filter, and request specifications from our export-ready catalog.",
    type: "website",
  },
};

export default function ProductsPage() {
  return <ProductsFeaturePage />;
}
