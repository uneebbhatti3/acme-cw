import { Suspense } from "react";
import { Section } from "@/components/layout/section";
import { JsonLd } from "@/components/seo/json-ld";
import { getProducts } from "@/features/products/lib/content";
import { contactPageJsonLd } from "@/lib/seo";
import { ContactDetails } from "./contact-details";
import { ContactForm } from "./contact-form";
import { ContactFormSkeleton } from "./contact-form-skeleton";

/** Inquiry form beside the contact details. */
export function ContactSection() {
  const productNames = Object.fromEntries(getProducts().map((p) => [p.slug, p.name]));
  return (
    <Section>
      <JsonLd data={contactPageJsonLd()} />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          {/* The form reads ?product= from the URL, so it renders on the client. */}
          <Suspense fallback={<ContactFormSkeleton />}>
            <ContactForm productNames={productNames} />
          </Suspense>
        </div>
        <div className="lg:col-span-5">
          <ContactDetails />
        </div>
      </div>
    </Section>
  );
}
