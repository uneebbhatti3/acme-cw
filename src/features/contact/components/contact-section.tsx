import { Suspense } from "react";
import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { Toaster } from "@/components/ui/sonner";
import { contactCopy } from "@/features/contact/data/copy";
import { getProducts } from "@/features/products/lib/content";
import { contactPageJsonLd } from "@/lib/seo";
import { ContactDetails } from "./contact-details";
import { ContactForm } from "./contact-form";
import { ContactFormSkeleton } from "./contact-form-skeleton";

/** Inquiry form beside the contact details, on a light sheet. */
export function ContactSection() {
  const productNames = Object.fromEntries(getProducts().map((p) => [p.slug, p.name]));
  return (
    <Band tone="paper" pre={false} label={contactCopy.form.title}>
      <JsonLd data={contactPageJsonLd()} />
      <Container>
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
      </Container>
      <Toaster position="bottom-center" richColors={false} />
    </Band>
  );
}
