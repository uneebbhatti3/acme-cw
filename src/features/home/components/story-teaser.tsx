import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { CountUp } from "@/components/sections/count-up";
import { Button } from "@/components/ui/button";
import { homeCopy, homeStats, milestones } from "@/features/home/data/copy";
import { cn } from "@/lib/utils";
import { HomeSection } from "./home-section";

/** Story teaser with a sideways history strip (dark sheet). */
export function StoryTeaser() {
  const copy = homeCopy.story;
  return (
    <HomeSection tone="deep" pre={false} labelledBy="story-title">
      <Container>
        <SectionIntro id="story-title" title={copy.title} metal text={copy.text}>
          <Button asChild variant="link" className="mt-5 h-auto px-0 text-silver">
            <Link href="/about#history">{copy.link}</Link>
          </Button>
        </SectionIntro>
      </Container>
      <div className="mt-12">
        <ol className="hscroll" aria-label={copy.stripLabel} tabIndex={0}>
          {milestones.map((m, i) => {
            const last = i === milestones.length - 1;
            return (
              <li
                key={m.title}
                className={cn(
                  "flex min-h-[15rem] w-[min(78vw,19rem)] flex-col rounded-3xl border p-7",
                  last ? "border-transparent bg-primary text-primary-foreground" : "bg-card",
                )}
              >
                <p className={cn("text-sm font-semibold", last ? "text-white" : "text-link")}>{m.when}</p>
                <h3 className="mt-auto font-display text-2xl text-inherit">{m.title}</h3>
                <p className={cn("mt-3 leading-relaxed", last ? "text-white" : "text-muted-foreground")}>{m.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </HomeSection>
  );
}

/** Count-up figures that close the story band. */
export function HomeStats() {
  return (
    <section aria-label={homeCopy.stats.label} className="surface-dark sec-pre bg-deep pt-4">
      <Container>
        <dl className="grid grid-cols-2 gap-y-10 border-t md:grid-cols-4">
          {homeStats.map((s, i) => (
            <div key={s.label} className={cn("flex flex-col-reverse pt-8", i % 2 === 1 && "pl-6", i > 1 && "md:pl-6", i === 2 && "pl-0 md:pl-6")}>
              <dt className="mt-3 text-sm text-muted-foreground">{s.label}</dt>
              <dd className="text-metal font-display text-[clamp(2.75rem,6vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
                {s.display ?? <CountUp value={s.value} suffix={s.suffix} />}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
