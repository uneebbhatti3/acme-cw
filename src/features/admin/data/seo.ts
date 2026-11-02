import type { Metadata } from "next";

/** The admin panel is never indexed. */
const hidden: Metadata["robots"] = { index: false, follow: false };

export const adminSeo = {
  login: { title: "Admin sign in", robots: hidden },
  dashboard: { title: "Dashboard", robots: hidden },
  products: { title: "Products", robots: hidden },
  newProduct: { title: "Add product", robots: hidden },
  editProduct: { title: "Edit product", robots: hidden },
  enquiries: { title: "Enquiries", robots: hidden },
  enquiry: { title: "Enquiry", robots: hidden },
} satisfies Record<string, Metadata>;
