import { ArrowRight, Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fullAddress, siteConfig, telHref } from "@/config/site";
import { layoutCopy } from "@/data/copy";
import { contactCopy } from "@/features/contact/data/copy";
import { whatsappHref } from "@/lib/utils";

/**
 * Address, each telephone number on its own tappable line, emails by purpose
 * and office hours, from the site config. Plus a link to the quote form.
 */
export function ContactDetails() {
  const { contact } = siteConfig;
  const { details } = contactCopy;
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${siteConfig.legalName}, ${fullAddress()}`)}`;

  return (
    <aside aria-labelledby="details-title" className="grid gap-6">
      <div className="rounded-lg border bg-white p-6">
        <h2 id="details-title" className="text-h3">
          {details.title}
        </h2>
        <dl className="mt-5 grid gap-5">
          <div className="flex gap-3">
            <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-teal-deep" strokeWidth={1.5} />
            <div>
              <dt className="text-sm text-muted-foreground">{details.address}</dt>
              <dd className="mt-0.5 font-medium text-navy">{fullAddress()}</dd>
              <dd>
                <a href={mapHref} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-link hover:underline">
                  {details.map}
                  <ExternalLink aria-hidden className="size-3.5" />
                  <span className="sr-only">{details.newTab}</span>
                </a>
              </dd>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone aria-hidden className="mt-0.5 size-5 shrink-0 text-teal-deep" strokeWidth={1.5} />
            <div>
              <dt className="text-sm text-muted-foreground">{details.phone}</dt>
              {contact.phones.map((p) => (
                <dd key={p.number}>
                  <a href={telHref(p.number)} className="inline-flex min-h-10 items-center font-medium text-navy hover:underline">
                    {p.label && <span className="mr-2 font-normal text-muted-foreground">{p.label}</span>}
                    {p.number}
                  </a>
                </dd>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Mail aria-hidden className="mt-0.5 size-5 shrink-0 text-teal-deep" strokeWidth={1.5} />
            <div className="min-w-0">
              <dt className="text-sm text-muted-foreground">{details.email}</dt>
              {contact.emails.map((e) => (
                <dd key={e.address} className="mt-1">
                  <span className="block text-xs text-muted-foreground">{e.label}</span>
                  <a href={`mailto:${e.address}`} className="inline-flex min-h-9 items-center break-all font-medium text-navy hover:underline">
                    {e.address}
                  </a>
                </dd>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Clock aria-hidden className="mt-0.5 size-5 shrink-0 text-teal-deep" strokeWidth={1.5} />
            <div>
              <dt className="text-sm text-muted-foreground">{details.hours}</dt>
              <dd className="mt-0.5 font-medium text-navy">{contact.hours}</dd>
            </div>
          </div>
        </dl>
        {contact.whatsapp && (
          <Button asChild variant="outline" size="lg" className="mt-6 w-full">
            <a href={whatsappHref(contact.whatsapp, layoutCopy.whatsappText)} target="_blank" rel="noopener noreferrer">
              {layoutCopy.whatsapp}
            </a>
          </Button>
        )}
      </div>

      <div className="rounded-lg bg-navy p-6 text-white">
        <h2 className="text-base font-semibold text-white">{details.quoteTitle}</h2>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-mist">{details.quoteTip}</p>
        <Button asChild variant="accent" className="mt-4">
          <Link href={siteConfig.quoteHref}>
            {details.quoteButton}
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </div>
    </aside>
  );
}
