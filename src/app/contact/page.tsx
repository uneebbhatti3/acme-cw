import type { Metadata } from "next";

import { ContactPage as ContactFeaturePage } from "@/features/contact/components/contact-page";

export const metadata: Metadata = {
  title: "Contact Us | Acme Commercial Ways (Pvt) Ltd.",
  description:
    "Contact Acme Commercial Ways for product inquiries, OEM requests, catalog information, export quotations, and distribution partnerships. Reach our sales team in Sialkot, Pakistan.",
  keywords: [
    "contact Acme Commercial Ways",
    "surgical instruments inquiry",
    "OEM instruments manufacturer",
    "dental instruments quotation",
    "instrument export inquiry",
    "Sialkot Pakistan contact",
  ],
  openGraph: {
    title: "Contact Acme Commercial Ways | Get a Quote",
    description:
      "Send your product requirements, OEM requests, or distribution inquiries to Acme Commercial Ways. We serve buyers in 50+ markets worldwide.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactFeaturePage />;
}
