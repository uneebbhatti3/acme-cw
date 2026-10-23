"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { InstrumentKind } from "@/types";
import type { TimelineEvent } from "@/features/about/types";

const ART: InstrumentKind[] = ["forceps", "scissors", "clamp", "needleHolder", "retractor", "generic"];

/**
 * History timeline. A steel rule runs down the middle (left on mobile); its
 * accent fill follows the scroll. Under reduced motion the rule shows filled.
 */
export function Timeline({ events }: { events: TimelineEvent[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative">
      {/* the rule */}
      <div
        aria-hidden
        className="absolute bottom-0 left-[7px] top-0 w-px bg-steel-300/70 md:left-1/2 md:-translate-x-1/2"
      >
        <div className="timeline-ticks absolute inset-y-0 left-0 w-2.5" />
        <motion.div
          className="absolute inset-0 origin-top bg-accent-strong"
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
                className="absolute left-0 top-2 size-[15px] rounded-full border-2 border-accent-strong bg-paper md:left-1/2 md:-translate-x-1/2"
              />
              {/* year on the opposite side (desktop) */}
              <div className={cn("hidden md:flex md:items-start", right ? "md:order-1 md:justify-end" : "md:order-2")}>
                <Reveal>
                  <p
                    aria-hidden
                    className={cn(
                      "font-display text-[clamp(2.5rem,1.5rem+3vw,4.5rem)] leading-none text-steel-300",
                      e.highlight && "text-steel-600",
                    )}
                  >
                    {e.year}
                  </p>
                </Reveal>
              </div>
              <Reveal className={cn(right ? "md:order-2" : "md:order-1 md:text-right")}>
                <article
                  className={cn(
                    "rounded-[var(--radius-card)] border border-steel-100 bg-white p-6 md:p-7",
                    e.highlight && "shadow-[var(--shadow-soft)]",
                  )}
                >
                  {e.highlight && (
                    <div className="-mx-6 -mt-6 mb-6 overflow-hidden rounded-t-[var(--radius-card)] md:-mx-7 md:-mt-7">
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
                    <span className="font-mono text-sm text-accent-strong md:hidden">{e.year}</span>
                    <span className={cn("font-display text-ink", e.highlight ? "text-[1.75rem] leading-tight" : "text-h3")}>
                      <span className="sr-only">{e.year}: </span>
                      {e.title}
                    </span>
                  </h3>
                  <p className="mt-3 leading-relaxed text-steel-600">{e.description}</p>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
