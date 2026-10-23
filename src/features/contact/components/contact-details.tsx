import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { layoutCopy } from "@/data/copy";
import { contactCopy } from "@/features/contact/data/copy";
import { whatsappHref } from "@/lib/utils";
import { MapPlaceholder } from "./map-placeholder";

const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/** Address, phones, emails and hours, with the quote checklist and map. */
export function ContactDetails() {
  const { contact } = siteConfig;
  const { details } = contactCopy;
  const rows = [
    { icon: MapPin, label: details.address, values: [{ text: contact.address }] },
    { icon: Phone, label: details.phone, values: contact.phones.map((p) => ({ text: p, href: telHref(p) })) },
    { icon: Mail, label: details.email, values: contact.emails.map((e) => ({ text: e, href: `mailto:${e}` })) },
    { icon: Clock, label: details.hours, values: [{ text: contact.hours }] },
  ];

  return (
    <aside aria-labelledby="details-title">
      <h2 id="details-title" className="text-h3">
        {details.title}
      </h2>
      <dl className="mt-6 divide-y border-y">
        {rows.map(({ icon: I, label, values }) => (
          <div key={label} className="relative py-4 pl-9">
            <dt className="text-sm text-muted-foreground">
              <I aria-hidden className="absolute left-0 top-[1.125rem] size-5 text-primary-deep" strokeWidth={1.5} />
              {label}
            </dt>
            {values.map((v) => (
              <dd key={v.text} className="mt-0.5 font-medium">
                {"href" in v && v.href ? (
                  <a href={v.href} className="underline decoration-current/30 underline-offset-4 hover:decoration-current">
                    {v.text}
                  </a>
                ) : (
                  v.text
                )}
              </dd>
            ))}
          </div>
        ))}
      </dl>

      {contact.whatsapp && (
        <Button asChild variant="outline" size="lg" className="mt-6 w-full">
          <a href={whatsappHref(contact.whatsapp, layoutCopy.whatsappText)} target="_blank" rel="noopener noreferrer">
            {layoutCopy.whatsapp}
          </a>
        </Button>
      )}

      <div className="mt-8 rounded-[1.75rem] border bg-card p-6">
        <h3 className="font-sans text-base font-semibold tracking-normal">{details.quoteTitle}</h3>
        <p className="mt-2 leading-relaxed text-muted-foreground">{details.quoteTip}</p>
      </div>

      <MapPlaceholder caption={details.mapLabel} />
    </aside>
  );
}
