import { Container } from "@/components/layout/container";
import { LinkButton, buttonClasses } from "@/components/ui/legacy/button";
import { siteConfig } from "@/config/site";
import { ctaCopy, layoutCopy } from "@/data/copy";
import { whatsappHref } from "@/lib/utils";

export function CtaBanner() {
  const wa = siteConfig.contact.whatsapp;
  return (
    <section className="bg-paper pb-12 md:pb-16 lg:pb-24">
      <Container>
        <div className="on-dark relative isolate overflow-hidden rounded-[20px] bg-ink-soft px-6 py-12 md:px-12 md:py-16 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-16">
          <div aria-hidden className="drafting-grid absolute inset-0 -z-10 opacity-70" />
          <div className="max-w-xl">
            <h2 className="text-h2 text-white">{ctaCopy.title}</h2>
            <p className="mt-4 text-lg text-steel-300">{ctaCopy.text}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
            <LinkButton href="/contact">{ctaCopy.primary}</LinkButton>
            {wa && (
              <a
                href={whatsappHref(wa, layoutCopy.whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "onDark" })}
              >
                {ctaCopy.whatsapp}
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
