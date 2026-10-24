import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { Container } from "./container";

/**
 * Header band for inner pages: breadcrumbs, eyebrow, title, lede and optional
 * actions on navy with a fine engineering grid. Starts under the transparent
 * fixed header, so its top padding includes the header height. Compact, so content starts
 * above the fold on phones.
 */
export function PageHero({
  title,
  subtitle,
  eyebrow,
  crumbs,
  children,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  /** Trail after Home. The last item is the current page. */
  crumbs?: Crumb[];
  /** Rendered below the subtitle (buttons, notes). */
  children?: ReactNode;
}) {
  return (
    <section className="surface-dark page-head border-b border-white/10 pb-12 pt-[calc(var(--header-h)+2.5rem)] md:pb-16 md:pt-[calc(var(--header-h)+3.5rem)] lg:pb-20 lg:pt-[calc(var(--header-h)+4.5rem)]">
      <Container>
        {crumbs && <Breadcrumbs items={crumbs} className="mb-6 text-sm md:mb-8" />}
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h1 className="text-h1 max-w-3xl">{title}</h1>
        {subtitle && <p className="text-lede mt-4 max-w-2xl text-muted-foreground">{subtitle}</p>}
        {children}
      </Container>
    </section>
  );
}
