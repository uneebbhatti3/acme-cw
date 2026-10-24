import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { PhotoSlot } from "@/components/media/photo-slot";
import { Pending } from "@/components/ui/pending";
import { verifiedFacts } from "@/config/site";
import { aboutCopy } from "@/features/about/data/copy";
import { timeline } from "@/features/about/data/timeline";

/** Company profile beside mission, vision and values; verified facts below when there are any. */
export function AboutIntro() {
  const { who } = aboutCopy;
  const facts = verifiedFacts();
  return (
    <Band defer={false} labelledBy="who-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <SectionIntro id="who-title" eyebrow={who.eyebrow} title={who.title} />
            <div className="mt-5 space-y-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
              {who.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <dl className="divide-y self-start rounded-lg border lg:col-span-6">
            {who.principles.map((p) => (
              <div key={p.title} className="grid gap-1 p-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="font-semibold text-navy">{p.title}</dt>
                <dd className="text-muted-foreground">{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        {facts.length > 0 && (
          <dl aria-label={aboutCopy.facts.title} className="mt-12 grid grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.key}>
                <dt className="text-sm text-muted-foreground">{f.label}</dt>
                <dd className="text-h2 mt-1 font-semibold text-navy">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </Band>
  );
}

/** History as an ordered list on a vertical rule. */
export function HistorySection() {
  const { history } = aboutCopy;
  return (
    <Band tone="grey" id="history" labelledBy="history-title">
      <Container>
        <SectionIntro id="history-title" eyebrow={history.eyebrow} title={history.title} text={history.intro} />
        <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-2 lg:grid-cols-4">
          {timeline.map((e) => (
            <li key={e.title} className="bg-white p-5 md:p-6">
              <p className="font-mono text-sm font-medium text-teal-deep">
                <Pending value={e.year} />
              </p>
              <h3 className="mt-2 text-base font-semibold">{e.title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">{e.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Band>
  );
}

export function FacilitySection() {
  const { facility } = aboutCopy;
  return (
    <Band labelledBy="facility-title">
      <Container>
        <SectionIntro id="facility-title" eyebrow={facility.eyebrow} title={facility.title} text={facility.text} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {facility.photos.map((p) => (
            <PhotoSlot key={p.brief} photo={p} sizes="(min-width: 768px) 33vw, 100vw" />
          ))}
        </div>
      </Container>
    </Band>
  );
}

export function LearnMore() {
  const { more } = aboutCopy;
  return (
    <Band tone="grey" labelledBy="more-title">
      <Container>
        <h2 id="more-title" className="text-h2">
          {more.title}
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {more.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="group flex h-full flex-col rounded-lg border bg-white p-6 transition-shadow hover:shadow-[var(--shadow-lift)]">
                <span className="text-h3 text-navy">{l.title}</span>
                <span className="mt-2 text-[0.9375rem] text-muted-foreground">{l.text}</span>
                <ArrowRight aria-hidden className="mt-4 size-5 text-teal-deep transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Band>
  );
}
