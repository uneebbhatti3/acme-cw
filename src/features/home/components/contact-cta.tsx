import { Download, Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { homeCopy } from "@/features/home/data/copy";
import { HomeContainer } from "./home-container";
import { HomeHeading } from "./home-heading";

const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/** Closing call to action with direct contact routes. */
export function ContactCta() {
  const { contact } = siteConfig;
  const { cta } = homeCopy;
  return (
    <section className="bg-tint py-24 lg:py-32">
      <HomeContainer>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <HomeHeading>{cta.title}</HomeHeading>
            <p className="c-steel mt-5 max-w-[32rem] text-lg leading-relaxed">{cta.text}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href="/contact" className="btn btn-primary">
                {cta.primary}
              </Link>
              <Link href="/catalogue" className="tlink c-ink inline-flex items-center gap-2 font-semibold">
                <Download size={17} aria-hidden="true" />
                {cta.catalogue}
              </Link>
            </div>
          </div>
          <ul className="lg:col-span-5 lg:col-start-8">
            <li className="bd-line flex items-center gap-4 border-b py-5 first:pt-0">
              <Mail size={22} strokeWidth={1.6} className="c-scrub" aria-hidden="true" />
              <div>
                <p className="c-steel text-sm">{cta.email}</p>
                <a className="tlink c-ink font-semibold" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </div>
            </li>
            <li className="bd-line flex items-center gap-4 border-b py-5">
              <Phone size={22} strokeWidth={1.6} className="c-scrub" aria-hidden="true" />
              <div>
                <p className="c-steel text-sm">{cta.phone}</p>
                {contact.phones.map((p) => (
                  <a key={p} className="tlink c-ink block font-semibold" href={telHref(p)}>
                    {p}
                  </a>
                ))}
              </div>
            </li>
            {contact.whatsapp && (
              <li className="bd-line flex items-center gap-4 border-b py-5">
                <MessageCircle size={22} strokeWidth={1.6} className="c-scrub" aria-hidden="true" />
                <div>
                  <p className="c-steel text-sm">{cta.whatsapp}</p>
                  <a className="tlink c-ink font-semibold" href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    {cta.whatsappLink}
                  </a>
                </div>
              </li>
            )}
            <li className="c-steel pt-5 text-sm">{contact.hours}</li>
          </ul>
        </div>
      </HomeContainer>
    </section>
  );
}
