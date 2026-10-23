"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { Reveal } from "@/components/ui/reveal";
import type { TimelineEvent } from "@/features/about/types";
import { cn } from "@/lib/utils";
import type { InstrumentKind } from "@/types";

const ART: InstrumentKind[] = ["forceps", "scissors", "clamp", "needleHolder", "retractor", "generic"];

/**
 * History timeline on a dark band. A steel rule runs down the middle (left on
 * mobile); its glowing fill follows the scroll (Motion `useScroll`). Cards
 * alternate sides on desktop with the year opposite. An ordered list with the
 * year in each heading for screen readers. Reduced motion: the rule shows filled.
 */
export function Timeline({ events }: { events: TimelineEvent[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative">
      {/* the rule */}
      <div aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-white/12 md:left-1/2 md:-translate-x-1/2">
        <div className="timeline-ticks absolute inset-y-0 left-0 w-2.5" />
        <motion.div
          className="absolute inset-0 origin-top bg-gradient-to-b from-primary via-glow to-glow shadow-[0_0_14px_var(--glow)]"
          style={{ scaleY: reduce ? 1 : fill }}
        />
      </div>

      <ol ref={ref} className="relative space-y-12 md:space-y-20">
        {events.map((e, i) => {
          const right = i % 2 === 1;
          return (
            <li key={`${e.year}-${e.title}`} className="relative grid gap-4 pl-10 md:grid-cols-2 md:gap-16 md:pl-0">
              <span
                aria-hidden
                className="absolute left-0 top-2 size-[15px] rounded-full border-2 border-glow bg-night shadow-[0_0_10px_color-mix(in_oklab,var(--glow)_60%,transparent)] md:left-1/2 md:-translate-x-1/2"
              />
              {/* year on the opposite side (desktop) */}
              <div className={cn("hidden md:flex md:items-start", right ? "md:order-1 md:justify-end" : "md:order-2")}>
                <Reveal>
                  <p
                    aria-hidden
                    className={cn(
                      "font-display text-[clamp(2.5rem,1.5rem+3.4vw,5rem)] font-semibold leading-none tracking-[-0.05em]",
                      e.highlight ? "text-metal" : "text-white/25",
                    )}
                  >
                    {e.year}
                  </p>
                </Reveal>
              </div>
              <Reveal className={cn(right ? "md:order-2" : "md:order-1 md:text-right")}>
                <article className={cn("overflow-hidden rounded-3xl border bg-card p-6 md:p-7", e.highlight && "border-glow/30")}>
                  {e.highlight && (
                    <div className="-mx-6 -mt-6 mb-6 overflow-hidden border-b md:-mx-7 md:-mt-7">
                      {e.image ? (
                        <div className="relative aspect-[16/9]">
                          <Image src={e.image} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                        </div>
                      ) : (
                        <PlaceholderImage kind={ART[i % ART.length]} view="angle" ratio="16/9" tone="ink" seed={e.title} />
                      )}
                    </div>
                  )}
                  <h3 className="flex flex-col gap-1">
                    <span className="font-mono text-sm text-glow md:hidden">{e.year}</span>
                    <span className={cn("font-display text-silver", e.highlight ? "text-[1.75rem] leading-tight" : "text-h3")}>
                      <span className="sr-only">{e.year}: </span>
                      {e.title}
                    </span>
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{e.description}</p>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
