import Link from "next/link";
import type { ReactNode } from "react";
import { fullAddress, primaryEmail, siteConfig, telHref } from "@/config/site";
import { layoutCopy } from "@/data/copy";
import { getCategories } from "@/features/products/lib/content";
import { Container } from "./container";
import { Logo } from "./logo";
import { SocialIcons } from "./social-icons";

const fc = layoutCopy.footer;
const link = "inline-flex min-h-10 items-center text-[0.9375rem] text-white/80 transition-colors hover:text-white hover:underline underline-offset-4 md:min-h-9";

function Column({ title, children, label }: { title: string; children: ReactNode; label?: string }) {
  const body = (
    <>
      <p className="text-sm font-semibold text-white">{title}</p>
      <div className="mt-3">{children}</div>
    </>
  );
  return label ? <nav aria-label={label}>{body}</nav> : <div>{body}</div>;
}

function Links({ items }: { items: readonly { label: string; href: string }[] }) {
  return (
    <ul>
      {items.map((n) => (
        <li key={n.href}>
          <Link href={n.href} className={link}>
            {n.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Navy footer. Contact details appear once: address, each telephone number on
 * its own line (tap to call) and the main email. Legal links in the base row.
 */
export function Footer() {
  const categories = getCategories();
  const { contact, footerNav } = siteConfig;

  return (
    <footer className="surface-dark defer-render bg-navy-deep [contain-intrinsic-size:auto_640px]">
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo onDark />
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-muted-foreground">{siteConfig.description}</p>
            {Object.values(siteConfig.social).some(Boolean) && (
              <div className="mt-6">
                <p className="sr-only">{fc.follow}</p>
                <SocialIcons />
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <Column title={fc.products} label="Footer: products">
              <Links items={categories.map((c) => ({ label: c.name, href: `/products/${c.slug}` }))} />
            </Column>
          </div>

          <div className="grid gap-10 lg:col-span-2">
            <Column title={fc.company} label="Footer: company">
              <Links items={footerNav.company} />
            </Column>
            <Column title={fc.resources} label="Footer: resources">
              <Links items={footerNav.resources} />
            </Column>
          </div>

          <div className="sm:col-span-2 lg:col-span-4">
            <Column title={fc.contact}>
              <address className="grid gap-5 not-italic sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{fc.address}</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-white/80">{fullAddress()}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{fc.phone}</p>
                  <ul className="mt-1">
                    {contact.phones.map((p) => (
                      <li key={p.number}>
                        <a href={telHref(p.number)} className={link}>
                          {p.label && <span className="mr-2 text-muted-foreground">{p.label}</span>}
                          {p.number}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{fc.email}</p>
                  <a href={`mailto:${primaryEmail}`} className={`${link} break-all`}>
                    {primaryEmail}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{fc.hours}</p>
                  <p className="mt-1.5 text-[0.9375rem] text-white/80">{contact.hours}</p>
                </div>
              </address>
            </Column>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {siteConfig.legalName.replace(/\.$/, "")}. {siteConfig.copyright}
          </p>
          <nav aria-label={fc.legal}>
            <ul className="flex flex-wrap gap-x-6">
              {footerNav.legal.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="inline-flex min-h-10 items-center hover:text-white hover:underline underline-offset-4">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
