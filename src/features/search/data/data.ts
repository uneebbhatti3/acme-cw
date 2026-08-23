import {
  Building2,
  Factory,
  Home,
  LayoutGrid,
  Mail,
  Package,
  ShieldCheck,
} from "lucide-react";

import { productCategories } from "@/features/home/data/data";
import { products } from "@/features/products/data/data";

export type SearchProduct = {
  type: "product";
  id: string;
  title: string;
  sku: string;
  category: string;
  description: string;
  availability: string;
  image: string;
  href: string;
};

export type SearchCategory = {
  type: "category";
  id: string;
  title: string;
  count: number;
  description: string;
  image: string;
  href: string;
};

export type SearchPage = {
  type: "page";
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
};

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

export function runSearch(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return { products: [], categories: [], pages: [] };

  return {
    products: searchableProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.availability.toLowerCase().includes(q),
    ),
    categories: searchableCategories.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q),
    ),
    pages: searchablePages.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    ),
  };
}
