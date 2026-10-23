import { Check } from "lucide-react";
import { Section } from "@/components/layout/section";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { Reveal } from "@/components/ui/reveal";
import { aboutCopy } from "@/features/about/data/copy";

const { who } = aboutCopy;

/** Company profile: who we are, what sets us apart, mission, vision and values. */
export function AboutIntro() {
  return (
    <Section tone="white">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow mb-4">{who.eyebrow}</p>
          <h2 className="text-h2">{who.title}</h2>
          <div className="measure mt-6 space-y-4 text-lg leading-relaxed text-steel-600">
            {who.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {who.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-ink">
                <Check aria-hidden className="mt-1 size-4 shrink-0 text-accent-strong" strokeWidth={2} />
                {h}
              </li>
            ))}
          </ul>
          <dl className="mt-10 divide-y divide-steel-100 border-y border-steel-100">
            {who.principles.map((p) => (
              <div key={p.title} className="grid gap-1 py-4 sm:grid-cols-[140px_1fr] sm:gap-6">
                <dt className="font-display text-xl text-ink">{p.title}</dt>
                <dd className="text-steel-600">{p.text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal className="lg:col-span-6" delay={0.06}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 overflow-hidden rounded-[var(--radius-card)]">
              <PlaceholderImage kind="clamp" view="angle" ratio="16/9" tone="ink" />
            </div>
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-steel-100">
              <PlaceholderImage kind="scissors" view="detail" ratio="1/1" />
            </div>
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-steel-100">
              <PlaceholderImage kind="forceps" view="top" ratio="1/1" />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
