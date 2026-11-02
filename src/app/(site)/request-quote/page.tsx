import { PageHero } from "@/components/layout/page-hero";
import { EnquirySection } from "@/features/quote/components/enquiry-section";
import { QuoteAside } from "@/features/quote/components/quote-aside";
import { quoteCopy } from "@/features/quote/data/copy";
import { quoteSeo } from "@/features/quote/data/seo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(quoteSeo);

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow={quoteCopy.hero.eyebrow}
        title={quoteCopy.hero.title}
        subtitle={quoteCopy.hero.subtitle}
        crumbs={[{ name: quoteCopy.breadcrumb, href: "/request-quote" }]}
      />
      <EnquirySection kind="quote" aside={<QuoteAside />} />
    </>
  );
}
