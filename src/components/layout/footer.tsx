import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { layoutCopy } from "@/data/copy";
import { getCategories } from "@/features/products/lib/content";
import { Container } from "./container";
import { Logo } from "./logo";
import { SocialIcons } from "./social-icons";

const heading = "text-sm text-steel-dim";
const link = "inline-flex min-h-9 items-center text-silver/90 underline decoration-transparent underline-offset-[6px] transition-colors hover:text-white hover:decoration-glow";

/**
 * Dark footer: brand, links, ranges and contact details from config, closed
 * by a large wordmark of the brand name in a metal gradient (decorative).
 */
export function Footer() {
  const categories = getCategories();
  const { contact } = siteConfig;
  const tel = (n: string) => `tel:${n.replace(/[^\d+]/g, "")}`;

  return (
    <footer className="surface-dark grain overflow-hidden">
      <Container className="relative z-[2]">
        <div className="grid gap-12 pb-12 pt-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:pt-20">
          <div className="lg:col-span-4">
            <Logo onDark />
            <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">{siteConfig.description}</p>
            {Object.values(siteConfig.social).some(Boolean) && (
              <div className="mt-6">
                <p className="sr-only">{layoutCopy.footer.follow}</p>
                <SocialIcons />
              </div>
            )}
          </div>

          <nav aria-label="Footer: explore" className="lg:col-span-2">
            <p className={heading}>{layoutCopy.footer.quickLinks}</p>
            <ul className="mt-4">
              {siteConfig.nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={link}>
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className={link}>
                  {layoutCopy.contactButton}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Footer: products" className="lg:col-span-3">
            <p className={heading}>{layoutCopy.footer.categories}</p>
            <ul className="mt-4">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/products/${c.slug}`} className={link}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className={heading}>{layoutCopy.footer.contact}</p>
            <address className="mt-4 space-y-3 not-italic leading-relaxed text-silver/90">
              <p className="flex gap-3">
                <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-glow" strokeWidth={1.5} />
                <span>{contact.address}</span>
              </p>
              <p className="flex gap-3">
                <Phone aria-hidden className="mt-1 size-4 shrink-0 text-glow" strokeWidth={1.5} />
                <span className="flex flex-col">
                  {contact.phones.map((p) => (
                    <a key={p} href={tel(p)} className="hover:text-white">
                      {p}
                    </a>
                  ))}
                </span>
              </p>
              <p className="flex gap-3">
                <Mail aria-hidden className="mt-1 size-4 shrink-0 text-glow" strokeWidth={1.5} />
                <a href={`mailto:${contact.email}`} className="hover:text-white">
                  {contact.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <Separator />
        <div className="flex flex-col gap-2 py-6 text-sm text-steel-dim sm:flex-row sm:justify-between">
          <p>
            © {siteConfig.legalName.replace(/\.$/, "")}. {siteConfig.copyright}
          </p>
          <p>{contact.hours}</p>
        </div>
      </Container>

      <div aria-hidden className="mx-auto w-full max-w-[1320px] px-5 md:px-10">
        <p className="wordmark font-display" style={{ "--chars": siteConfig.brandName.length } as CSSProperties}>
          {siteConfig.brandName}
        </p>
      </div>
    </footer>
  );
}
