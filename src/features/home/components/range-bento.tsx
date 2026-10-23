import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { SpotlightCard } from "@/components/sections/spotlight-card";
import { homeCopy } from "@/features/home/data/copy";
import { productsCopy } from "@/features/products/data/copy";
import { categoryHref, getCategories } from "@/features/products/lib/content";
import { cn } from "@/lib/utils";
import { HomeSection } from "./home-section";

/** Bento placement on large screens, by position. Extra ranges fall back to a half-width tile. */
const SPANS = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-6",
  "lg:col-span-6",
];

/**
 * Featured ranges as a bento grid on a dark sheet: a horizontal snap row on
 * phones, two columns on tablets. Each tile is one link with a pointer glow.
 */
export function RangeBento() {
  const copy = homeCopy.range;
  const categories = getCategories();
  return (
    <HomeSection tone="night" labelledBy="range-title">
      <Container>
        <SectionIntro id="range-title" title={copy.title} text={copy.text} metal />
        <ul className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:auto-rows-[300px] lg:grid-cols-12">
          {categories.map((c, i) => (
            <li key={c.slug} className={cn("w-[82%] shrink-0 snap-start sm:w-[60%] md:w-auto", SPANS[i] ?? "lg:col-span-6")}>
              <SpotlightCard
                href={categoryHref(c.slug)}
                className="group flex h-full min-h-[320px] flex-col rounded-[1.75rem] border border-white/10 bg-card p-6 transition-colors duration-300 hover:border-glow/40 md:p-8 lg:min-h-0"
              >
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl leading-tight text-silver md:text-[1.75rem]">{c.name}</h3>
                    <p className={cn("mt-2 max-w-[38ch] text-[0.95rem] leading-relaxed text-muted-foreground", i > 0 ? "line-clamp-2" : "line-clamp-3 lg:line-clamp-none")}>
                      {c.description}
                    </p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 text-silver transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-night">
                    <ArrowUpRight aria-hidden className="size-5" />
                  </span>
                </div>
                <div className="relative my-2 min-h-[120px] flex-1">
                  <PlaceholderImage kind={c.placeholderKind} tone="clear" ratio="16/9" fill className="transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <span className="relative z-10 inline-flex h-8 items-center self-start rounded-full border border-white/12 bg-white/[0.06] px-3.5 text-[0.82rem] font-medium text-silver">
                  {productsCopy.rangeLabel(c.rangeSize)}
                </span>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </Container>
    </HomeSection>
  );
}
