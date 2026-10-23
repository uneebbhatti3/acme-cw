"use client";

import Link from "next/link";
import { useState } from "react";
import { homeCopy } from "@/features/home/data/copy";
import type { InstrumentKind } from "@/types";
import { KindArt } from "./art/instrument-art";
import { HomeContainer } from "./home-container";
import { HomeHeading } from "./home-heading";

export interface RangeItem {
  slug: string;
  name: string;
  line: string;
  kind: InstrumentKind;
  meta: string;
  href: string;
}

/**
 * Index of product ranges. Hovering or focusing a row swaps the drawing in the
 * sticky preview on the left.
 */
export function RangeIndex({ items }: { items: RangeItem[] }) {
  const [selected, setSelected] = useState(0);
  const current = items[selected];
  const { range } = homeCopy;

  return (
    <section id="range" className="py-24 lg:py-32">
      <HomeContainer>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <HomeHeading>{range.title}</HomeHeading>
            <p className="c-steel mt-5 max-w-[30rem] text-lg leading-relaxed">{range.text}</p>
            <div className="bg-surface bd-line sticky top-28 mt-10 hidden rounded-2xl border p-8 lg:block">
              <div key={current.slug} className="art-in">
                <KindArt kind={current.kind} />
              </div>
              <div className="bd-line mt-6 flex items-baseline justify-between gap-4 border-t pt-5">
                <p className="font-display c-ink text-2xl">{current.name}</p>
                <p className="c-steel text-sm">{current.meta}</p>
              </div>
            </div>
          </div>

          <ul className="bd-line border-t lg:col-span-7">
            {items.map((c, i) => (
              <li key={c.slug}>
                <Link
                  href={c.href}
                  className="row"
                  data-active={selected === i}
                  onMouseEnter={() => setSelected(i)}
                  onFocus={() => setSelected(i)}
                >
                  <span className="row-name font-display c-ink text-[clamp(1.8rem,3vw,2.6rem)] leading-tight">{c.name}</span>
                  <span className="c-steel text-sm">{c.meta}</span>
                  <span className="c-steel col-span-2 max-w-[34rem] text-[0.98rem] leading-relaxed">{c.line}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </HomeContainer>
    </section>
  );
}
