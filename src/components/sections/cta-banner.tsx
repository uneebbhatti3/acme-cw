import { Download, Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ctaCopy, layoutCopy } from "@/data/copy";
import { whatsappHref } from "@/lib/utils";

function ContactTile({ icon, label, children, href, external }: { icon: ReactNode; label: string; children: ReactNode; href?: string; external?: boolean }) {
  const body = (
    <>
      <span className="text-glow">{icon}</span>
      <span className="min-w-0">
        <span className="block text-sm text-muted-foreground">{label}</span>
        <span className="block break-words font-semibold text-silver">{children}</span>
      </span>
    </>
  );
  const cls = "glass flex items-center gap-4 rounded-2xl p-4";
  if (!href) return <div className={cls}>{body}</div>;
  return (
    <a href={href} className={`${cls} transition-colors hover:border-white/25`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {body}
    </a>
  );
}

/**
 * Closing call to action on a dark glow card: quote and catalogue buttons,
 * plus email, phone and WhatsApp (when set) from config.
 */
export function CtaBanner() {
  const { contact } = siteConfig;
  const icon = "size-[22px]";
  return (
    <section aria-labelledby="cta-title" className="surface-dark py-12 md:py-16">
      <Container>
        <div className="cta-card grain overflow-hidden rounded-[2rem] border border-white/12 px-6 py-14 md:rounded-[3rem] md:px-16 md:py-24">
          <div className="relative z-[2] grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 id="cta-title" className="text-display text-metal pb-1">
                {ctaCopy.title}
              </h2>
              <p className="text-lede mt-6 max-w-[34rem] text-muted-foreground">{ctaCopy.text}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button asChild variant="glow" size="lg">
                  <Link href="/contact">{ctaCopy.primary}</Link>
                </Button>
                {siteConfig.features.showCatalogue && (
                  <Button asChild variant="outline" size="lg" className="text-silver hover:text-white">
                    <Link href="/catalogue">
                      <Download aria-hidden />
                      {ctaCopy.catalogue}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            <ul className="grid gap-3 lg:col-span-4">
              <li>
                <ContactTile icon={<Mail aria-hidden strokeWidth={1.6} className={icon} />} label={ctaCopy.email} href={`mailto:${contact.email}`}>
                  {contact.email}
                </ContactTile>
              </li>
              <li>
                <ContactTile
                  icon={<Phone aria-hidden strokeWidth={1.6} className={icon} />}
                  label={ctaCopy.phone}
                  href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                >
                  {contact.phone}
                </ContactTile>
              </li>
              {contact.whatsapp && (
                <li>
                  <ContactTile
                    icon={<MessageCircle aria-hidden strokeWidth={1.6} className={icon} />}
                    label={ctaCopy.whatsapp}
                    href={whatsappHref(contact.whatsapp, layoutCopy.whatsappText)}
                    external
                  >
                    {ctaCopy.whatsappLink}
                  </ContactTile>
                </li>
              )}
              <li className="px-1 text-sm text-steel-dim">{contact.hours}</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
