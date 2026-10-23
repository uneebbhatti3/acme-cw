import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { aboutCopy } from "@/features/about/data/copy";
import { team } from "@/features/about/data/team";
import { PortraitPlaceholder } from "./portrait-placeholder";

export function LeadershipSection() {
  if (!siteConfig.features.showTeam) return null;
  const { leadership } = aboutCopy;
  return (
    <Section tone="white">
      <SectionHeading eyebrow={leadership.eyebrow} title={leadership.title} />
      <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {team.map((m, i) => (
          <Reveal as="li" key={`${m.role}-${i}`} delay={i * 0.05}>
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-steel-100 bg-white">
              <PortraitPlaceholder src={m.image} alt={`${m.name}, ${m.role}`} />
              <div className="p-4 md:p-5">
                <p className="font-display text-xl text-ink">{m.name}</p>
                <p className="mt-1 text-sm text-steel-600">{m.role}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
