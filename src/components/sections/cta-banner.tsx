import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ctaCopy } from "@/data/copy";

/**
 * Closing call to action on navy: one heading, one sentence, the quote button
 * and a contact link. Contact details live in the footer only, so they are not
 * repeated here.
 */
export function CtaBanner({ title = ctaCopy.title, text = ctaCopy.text }: { title?: string; text?: string }) {
  return (
    <section aria-labelledby="cta-title" className="surface-dark page-head defer-render py-14 [contain-intrinsic-size:auto_360px] md:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-4">{ctaCopy.eyebrow}</p>
            <h2 id="cta-title" className="text-h2">
              {title}
            </h2>
            <p className="text-lede mt-4 max-w-2xl text-muted-foreground">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch xl:flex-row xl:justify-end">
            <Button asChild variant="accent" size="lg">
              <Link href={siteConfig.quoteHref}>
                {ctaCopy.primary}
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-white hover:bg-white/10">
              <Link href="/contact">{ctaCopy.secondary}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
