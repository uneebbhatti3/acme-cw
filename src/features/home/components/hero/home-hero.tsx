import Link from "next/link";
import { homeCopy } from "@/features/home/data/copy";
import { HomeContainer } from "../home-container";
import { PartsDiagram } from "./parts-diagram";

/** Opening section: headline and actions beside the self-drawing forceps. */
export function HomeHero() {
  const { hero } = homeCopy;
  return (
    <section className="bd-line relative overflow-hidden border-b">
      <div aria-hidden="true" className="sheet-grid pointer-events-none absolute inset-0" />
      <HomeContainer className="relative pb-14 pt-[calc(var(--header-h)+48px)] lg:pb-20 lg:pt-[calc(var(--header-h)+80px)]">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-14">
          <div className="lg:col-span-5">
            <h1 className="font-display c-ink text-[clamp(2.4rem,3.9vw,3.6rem)] leading-[1.06]">{hero.title}</h1>
            <p className="c-steel mt-6 max-w-[34rem] text-lg leading-relaxed">{hero.text}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href={hero.primary.href} className="btn btn-primary">
                {hero.primary.label}
              </Link>
              <Link href={hero.secondary.href} className="tlink c-ink font-semibold">
                {hero.secondary.label}
              </Link>
            </div>
          </div>
          <PartsDiagram />
        </div>
      </HomeContainer>
    </section>
  );
}
