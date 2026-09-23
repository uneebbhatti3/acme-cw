import {
  Building2,
  Factory,
  Home,
  LayoutGrid,
  Mail,
  Package,
  ShieldCheck,
} from "lucide-react";

import { productCategories } from "@/features/categories/data/categories";
import { products } from "@/features/products/data/data";
import type {
  SearchCategory,
  SearchPage,
  SearchProduct,
} from "@/features/search/types/search";

export const searchableProducts: SearchProduct[] = products.map((p) => ({
  type: "product",
  id: p.id,
  title: p.name,
  sku: p.sku,
  category: p.category,
  description: p.description,
  availability: p.availability,
  image: p.image,
  href: `/products/${p.slug}`,
}));

export const searchableCategories: SearchCategory[] = productCategories.map(
  (c) => ({
    type: "category",
    id: c.id,
    title: c.name,
    count: c.count,
    description: c.description,
    image: c.image,
    href: `/categories/${c.slug}`,
  }),
);

export const searchablePages: SearchPage[] = [
  {
    type: "page",
    id: "home",
    title: "Home",
    description:
      "Acme Commercial Ways homepage — company overview, featured products, and export markets.",
    href: "/",
    icon: Home,
  },
  {
    type: "page",
    id: "about",
    title: "About Us",
    description:
      "Company history, mission, values, manufacturing base in Sialkot, and certifications.",
    href: "/about",
    icon: Building2,
  },
  {
    type: "page",
    id: "products",
    title: "Product Catalog",
    description:
      "Browse and filter 1,000+ surgical, dental, veterinary, and manicure instrument profiles.",
    href: "/products",
    icon: Package,
  },
  {
    type: "page",
    id: "categories",
    title: "Product Categories",
    description:
      "Eight instrument ranges organized by clinical workflow for procurement teams and distributors.",
    href: "/categories",
    icon: LayoutGrid,
  },
  {
    type: "page",
    id: "manufacturing",
    title: "Manufacturing",
    description:
      "Seven-step manufacturing process from raw material selection to export-ready packaging.",
    href: "/manufacturing",
    icon: Factory,
  },
  {
    type: "page",
    id: "quality",
    title: "Quality Assurance",
    description:
      "ISO 9001:2015, ISO 13485:2016, CE, and FDA (GMP) certifications and inspection process.",
    href: "/quality",
    icon: ShieldCheck,
  },
  {
    type: "page",
    id: "contact",
    title: "Contact Us",
    description:
      "Send product inquiries, OEM requests, export quotations, and distribution partnership requests.",
    href: "/contact",
    icon: Mail,
  },
];

export const popularSearches = [
  "Surgical scissors",
  "Dental forceps",
  "Needle holder",
  "Veterinary",
  "ISO 13485",
  "OEM",
  "Manicure",
  "Hollow ware",
];
