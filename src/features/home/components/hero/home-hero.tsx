import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { homeCopy } from "@/features/home/data/copy";
import { HomeIcon } from "../home-icon";
import { HeroArt } from "./hero-art";

/**
 * Home hero (server-rendered) with the trust strip along its foot. The
 * headline and lede are static so they paint at once (they are the LCP
 * element); the motion lives in the instrument art.
 */
export function HomeHero() {
  const copy = homeCopy.hero;
  return (
    <section aria-labelledby="hero-title" className="surface-dark hero-ground grain sec-pre overflow-hidden pt-[calc(var(--header-h)+56px)] md:pt-[calc(var(--header-h)+88px)]">
      <Container className="relative z-[2]">
        <h1 id="hero-title" className="text-display pb-2">
          {copy.lines.map((line) => (
            <span key={line} className="block">
              <span className="text-metal">{line}</span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid items-end gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="order-2 lg:order-1 lg:col-span-4 lg:pb-16">
            <p className="text-lede max-w-[30rem] text-muted-foreground">{copy.text}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild variant="glow" size="lg">
                <Link href={copy.primary.href}>{copy.primary.label}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-silver hover:text-white">
                <Link href={copy.secondary.href}>{copy.secondary.label}</Link>
              </Button>
            </div>
            <p className="mt-6 max-w-[26rem] text-sm leading-relaxed text-steel-dim">{copy.note}</p>
          </div>
          <div className="order-1 mt-6 lg:order-2 lg:col-span-8 lg:-mt-24">
            <HeroArt />
          </div>
        </div>

        <ul aria-label={homeCopy.trust.label} className="mt-16 grid grid-cols-2 border-t border-border lg:mt-20 lg:grid-cols-4">
          {homeCopy.trust.items.map((item, i) => (
            <li
              key={item.title}
              className={`flex flex-col gap-2 py-6 pr-4 sm:flex-row sm:gap-3 ${i % 2 === 1 ? "border-l border-border pl-4" : ""} lg:border-l lg:pl-6 ${i === 0 ? "lg:border-l-0 lg:pl-0" : ""} ${i > 1 ? "border-t border-border lg:border-t-0" : ""}`}
            >
              <HomeIcon name={item.icon} className="mt-0.5 size-5 shrink-0 text-glow" />
              <span>
                <span className="block font-semibold text-silver">{item.title}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">{item.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
