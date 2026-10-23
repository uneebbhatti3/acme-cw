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
}
