import { PageHero } from "@/components/layout/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { ContactDetails } from "@/features/contact/components/contact-details";
import { contactCopy } from "@/features/contact/data/copy";
import { contactSeo } from "@/features/contact/data/seo";
import { EnquirySection } from "@/features/quote/components/enquiry-section";
import { contactPageJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(contactSeo);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageJsonLd()} />
      <PageHero
        eyebrow={contactCopy.hero.eyebrow}
        title={contactCopy.hero.title}
        subtitle={contactCopy.hero.subtitle}
        crumbs={[{ name: contactCopy.breadcrumb, href: "/contact" }]}
      />
      <EnquirySection kind="general" aside={<ContactDetails />} asideFirst />
    </>
  );
}
