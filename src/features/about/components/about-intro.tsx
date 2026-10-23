import { Check } from "lucide-react";
import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { Reveal } from "@/components/ui/reveal";
import { aboutCopy } from "@/features/about/data/copy";

const { who } = aboutCopy;

/** Company profile: who we are, what sets us apart, mission, vision and values. */
export function AboutIntro() {
  return (
    <Band tone="paper" labelledBy="who-title">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow mb-4">{who.eyebrow}</p>
            <h2 id="who-title" className="text-h2">
              {who.title}
            </h2>
            <div className="measure text-lede mt-6 space-y-4 text-muted-foreground">
              {who.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {who.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-primary-deep" strokeWidth={2} />
                  {h}
                </li>
              ))}
            </ul>
            <dl className="mt-10 divide-y border-y">
              {who.principles.map((p) => (
                <div key={p.title} className="grid gap-1 py-5 sm:grid-cols-[140px_1fr] sm:gap-6">
                  <dt className="font-display text-xl">{p.title}</dt>
                  <dd className="text-muted-foreground">{p.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={0.06}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 overflow-hidden rounded-[1.75rem]">
                <PlaceholderImage kind="clamp" view="angle" ratio="16/9" tone="ink" />
              </div>
              <div className="overflow-hidden rounded-[1.75rem] border">
                <PlaceholderImage kind="scissors" view="detail" ratio="1/1" />
              </div>
              <div className="overflow-hidden rounded-[1.75rem] border">
                <PlaceholderImage kind="forceps" view="top" ratio="1/1" />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Band>
  );
}
