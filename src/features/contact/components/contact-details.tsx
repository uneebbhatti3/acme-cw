import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ctaCopy, layoutCopy } from "@/data/copy";
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
      <dl className="mt-6 divide-y divide-steel-100 border-y border-steel-100">
        {rows.map(({ icon: I, label, values }) => (
          <div key={label} className="relative py-4 pl-9">
            <dt className="text-sm text-steel-600">
              <I aria-hidden className="absolute left-0 top-[1.125rem] size-5 text-accent-strong" strokeWidth={1.5} />
              {label}
            </dt>
            {values.map((v) => (
              <dd key={v.text} className="mt-0.5 font-medium text-ink">
                {"href" in v && v.href ? (
                  <a href={v.href} className="link-draw">
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
        <a
          href={whatsappHref(contact.whatsapp, layoutCopy.whatsappText)}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses({ variant: "secondary", className: "mt-6 w-full" })}
        >
          {ctaCopy.whatsapp}
        </a>
      )}

      <div className="mt-8 rounded-[var(--radius-card)] border border-steel-100 bg-white p-5">
        <h3 className="font-sans text-base font-semibold text-ink">{details.quoteTitle}</h3>
        <p className="mt-2 leading-relaxed text-steel-600">{details.quoteTip}</p>
      </div>

      <MapPlaceholder caption={details.mapLabel} />
    </aside>
  );
}
