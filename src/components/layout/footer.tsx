import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { layoutCopy } from "@/data/copy";
import { getCategories } from "@/features/products/lib/content";
import { Container } from "./container";
import { Logo } from "./logo";
import { SocialIcons } from "./social-icons";

export function Footer() {
  const categories = getCategories();
  const { contact } = siteConfig;
  const heading = "mb-4 text-sm font-semibold text-white";
  const link = "inline-flex min-h-9 items-center text-steel-300 transition-colors hover:text-white";

  return (
    <footer className="on-dark border-t border-white/10 bg-ink text-steel-300">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-4">
          <Logo onDark />
          <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed">{siteConfig.description}</p>
          {Object.values(siteConfig.social).some(Boolean) && (
            <div className="mt-6">
              <p className="sr-only">{layoutCopy.footer.follow}</p>
              <SocialIcons />
            </div>
          )}
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <p className={heading}>{layoutCopy.footer.quickLinks}</p>
          <ul>
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

        <div className="lg:col-span-3">
          <p className={heading}>{layoutCopy.footer.categories}</p>
          <ul>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/products/${c.slug}`} className={link}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className={heading}>{layoutCopy.footer.contact}</p>
          <ul className="space-y-3 text-[0.95rem]">
            <li className="flex gap-3">
              <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-accent" strokeWidth={1.5} />
              <span>{contact.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone aria-hidden className="mt-1 size-4 shrink-0 text-accent" strokeWidth={1.5} />
              <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="hover:text-white">
                {contact.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail aria-hidden className="mt-1 size-4 shrink-0 text-accent" strokeWidth={1.5} />
              <a href={`mailto:${contact.email}`} className="hover:text-white">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm text-steel-300/80 sm:flex-row sm:justify-between">
          <p>
            © {siteConfig.legalName.replace(/\.$/, "")}. {siteConfig.copyright}
          </p>
          <p>{siteConfig.contact.hours}</p>
        </Container>
      </div>
    </footer>
  );
}
