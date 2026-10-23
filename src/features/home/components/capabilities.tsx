import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { SpotlightCard } from "@/components/sections/spotlight-card";
import { homeCopy } from "@/features/home/data/copy";
import { HomeIcon } from "./home-icon";
import { Band } from "@/components/layout/band";

/** Three capability cards on a light sheet; the glow uses the brand colour here. */
export function Capabilities() {
  const copy = homeCopy.capabilities;
  return (
    <Band tone="paper" labelledBy="capabilities-title">
      <Container>
        <SectionIntro id="capabilities-title" title={copy.title} text={copy.text} />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {copy.items.map((item) => (
            <li key={item.title}>
              <SpotlightCard className="h-full rounded-[1.75rem] border bg-card p-7 transition-[transform,box-shadow] duration-300 [--spot:var(--brand)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] md:p-8">
                <span className="grid size-12 place-items-center rounded-full bg-accent text-primary-deep">
                  <HomeIcon name={item.icon} className="size-6" />
                </span>
                <h3 className="text-h3 mt-8">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{item.text}</p>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </Container>
    </Band>
  );
}
