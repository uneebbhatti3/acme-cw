<<<<<<< HEAD
import { PageHero } from "@/components/layout/page-hero";
import { ContactSection } from "@/features/contact/components/contact-section";
import { contactCopy } from "@/features/contact/data/copy";
import { contactSeo } from "@/features/contact/data/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { layoutCopy } from "@/data/copy";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(contactSeo);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: layoutCopy.breadcrumbHome, href: "/" }, { name: contactCopy.breadcrumb, href: "/contact" }])} />
      <PageHero title={contactCopy.hero.title} subtitle={contactCopy.hero.subtitle} kind="generic" />
      <ContactSection />
    </>
  );
=======
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
>>>>>>> c95d78430d80c9a2c3e8e7e28542bfe327beeafc
}
