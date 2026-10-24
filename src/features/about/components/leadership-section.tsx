import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { Pending } from "@/components/ui/pending";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { aboutCopy } from "@/features/about/data/copy";
import { team } from "@/features/about/data/team";
import { PortraitPlaceholder } from "./portrait-placeholder";

/** Leadership cards; hidden when `features.showTeam` is off. */
export function LeadershipSection() {
  if (!siteConfig.features.showTeam) return null;
  const { leadership } = aboutCopy;
  return (
    <Band tone="white" labelledBy="leadership-title">
      <Container>
        <SectionIntro id="leadership-title" title={leadership.title} />
        <ul className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal as="li" key={`${m.role}-${i}`} delay={i * 0.05}>
              <div className="overflow-hidden rounded-lg border bg-white">
                <PortraitPlaceholder src={m.image} alt={`${m.name}, ${m.role}`} />
                <div className="p-4 md:p-5">
                  <p className="font-semibold text-navy"><Pending value={m.name} /></p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Band>
  );
}
