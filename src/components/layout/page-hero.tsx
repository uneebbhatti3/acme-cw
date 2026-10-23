import type { ReactNode } from "react";
import { placeholderSrc } from "@/components/media/placeholder-svg";
import type { InstrumentKind } from "@/types";
import { Container } from "./container";

/**
 * Dark header for inner pages: metal-gradient title, one-line subtitle and
 * the instrument art fading in from the right. Leaves room at the bottom for
 * a following `.sheet` section to overlap it.
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
  return (
    <section className="surface-dark grain page-hero overflow-hidden pb-20 pt-[calc(var(--header-h)+48px)] md:pb-28 md:pt-[calc(var(--header-h)+80px)]">
      {/* Decorative art: the dark placeholder shares the section's background, so it blends in. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={placeholderSrc(kind, "angle", "16/9", "ink")}
        alt=""
        aria-hidden
        loading="eager"
        decoding="async"
        className="pointer-events-none absolute -right-[4%] top-1/2 -z-10 hidden w-[50%] max-w-[860px] -translate-y-1/2 opacity-70 [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,#000_45%),linear-gradient(to_bottom,transparent,#000_22%,#000_78%,transparent)] lg:block"
      />
      <Container className="relative z-[2]">
        {before && <div className="mb-8">{before}</div>}
        <h1 className="text-h1 text-metal max-w-3xl pb-1">{title}</h1>
        {subtitle && <p className="text-lede mt-5 max-w-xl text-muted-foreground">{subtitle}</p>}
        {children}
      </Container>
    </section>
  );
}
