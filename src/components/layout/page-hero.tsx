import type { ReactNode } from "react";
import { instrumentShapes } from "@/components/media/instrument-shapes";
import type { InstrumentKind } from "@/types";
import { Container } from "./container";

/**
 * Dark page header for inner pages: title, one-line subtitle and a faint
 * line drawing of an instrument, continuing the hero's drawing-office theme.
 */
export function PageHero({
  title,
  subtitle,
  kind = "scissors",
  before,
  children,
}: {
  title: string;
  subtitle?: string;
  kind?: InstrumentKind;
  /** Rendered above the title (breadcrumbs). */
  before?: ReactNode;
  /** Rendered below the subtitle. */
  children?: ReactNode;
}) {
  const shape = instrumentShapes[kind];
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink pb-14 pt-[calc(var(--header-h)+40px)] text-steel-300 md:pb-20 md:pt-[calc(var(--header-h)+64px)]">
      <div aria-hidden className="drafting-grid absolute inset-0 -z-10" />
      <svg
        aria-hidden
        viewBox="0 0 400 300"
        className="absolute -right-24 top-1/2 -z-10 hidden w-[720px] -translate-y-1/2 opacity-[0.35] md:block lg:-right-10"
      >
        <g fill="none" stroke="#B8C2CA" strokeOpacity="0.5" strokeWidth="1" vectorEffect="non-scaling-stroke">
          {shape.plan.map((d, i) => (
            <path key={i} d={d} fillRule="evenodd" vectorEffect="non-scaling-stroke" />
          ))}
        </g>
        <path d="M0 150 H400" stroke="#B8C2CA" strokeOpacity="0.25" strokeDasharray="14 4 2 4" vectorEffect="non-scaling-stroke" />
      </svg>
      <Container>
        {before && <div className="mb-6">{before}</div>}
        <h1 className="text-h1 max-w-3xl text-white">{title}</h1>
        {subtitle && <p className="mt-5 max-w-xl text-lg leading-relaxed text-steel-300">{subtitle}</p>}
        {children}
      </Container>
    </section>
  );
}
