"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { catalogueCopy } from "@/features/catalogue/data/copy";
import type { InstrumentKind } from "@/types";
import { PlaceholderImage } from "@/components/media/placeholder-image";

export interface CatalogueSection {
  slug: string;
  name: string;
  kind: InstrumentKind;
  products: { name: string; code: string }[];
}

/** One catalogue page, drawn from the data until real page scans arrive. */
function Page({
  section,
  page,
  brand,
  as: Tag = "div",
}: {
  section: CatalogueSection;
  page: number;
  brand: string;
  as?: "div" | "span";
}) {
  const S = Tag;
  return (
    <S className="@container relative block aspect-[1/1.414] overflow-hidden rounded-md bg-white text-left text-ink shadow-[var(--shadow-lift)]">
      {page === 0 ? (
        <S className="flex h-full flex-col bg-night p-[8%] text-white">
          <S className="block text-[6.5cqi] text-steel">{brand}</S>
          <S className="mt-auto block">
            <PlaceholderImage as="span" kind={section.kind} ratio="4/3" tone="ink" seed={section.slug} />
          </S>
          <S className="mt-[6%] block font-display text-[11cqi] [overflow-wrap:anywhere] leading-tight">{section.name}</S>
          <S className="mt-[2%] block h-px w-1/4 bg-glow" />
        </S>
      ) : (
        <S className="flex h-full flex-col p-[8%]">
          <S className="flex items-baseline justify-between border-b border-rule pb-[4%] text-[5.5cqi] text-ink/70">
            <S className="block">{section.name}</S>
            <S className="block font-mono">{page + 1}</S>
          </S>
          <S className="mt-[6%] grid flex-1 grid-cols-2 content-start gap-[5%]">
            {section.products.slice((page - 1) * 4, (page - 1) * 4 + 4).map((p, i) => (
              <S key={p.code} className="block">
                <S className="block overflow-hidden rounded-sm border border-rule">
                  <PlaceholderImage
                    as="span"
                    kind={section.kind}
                    view={i % 2 ? "side" : "front"}
                    ratio="1/1"
                    seed={p.code}
                  />
                </S>
                <S className="mt-[6%] block text-[5cqi] font-medium leading-tight text-ink">
                  {p.name}
                </S>
                <S className="block font-mono text-[4cqi] text-ink/70">{p.code}</S>
              </S>
            ))}
          </S>
        </S>
      )}
    </S>
  );
}

export function CatalogueViewer({ sections, brand }: { sections: CatalogueSection[]; brand: string }) {
  const [open, setOpen] = useState<{ s: number; p: number } | null>(null);
  // The dialog opens without a DialogTrigger, so focus is returned to the cover by hand.
  const returnTo = useRef<HTMLElement | null>(null);
  const pageCount = (s: CatalogueSection) => 1 + Math.ceil(s.products.length / 4);
  const section = open ? sections[open.s] : null;
  const total = section ? pageCount(section) : 0;
  const move = (d: 1 | -1) => open && setOpen({ ...open, p: (open.p + d + total) % total });
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") move(1);
    else if (e.key === "ArrowLeft") move(-1);
  };

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
        {sections.map((s, i) => (
          <li key={s.slug}>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => setOpen({ s: i, p: 0 })}
              className="group block w-full rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <span className="block transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:-translate-y-1">
                <Page section={s} page={0} brand={brand} as="span" />
              </span>
              <span className="mt-4 block font-medium">{s.name}</span>
              <span className="block text-sm text-muted-foreground">{catalogueCopy.pages(pageCount(s))}</span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent
          closeLabel={catalogueCopy.close}
          onKeyDown={onKey}
          onOpenAutoFocus={() => {
            returnTo.current = document.activeElement as HTMLElement | null;
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            returnTo.current?.focus();
          }}
          className="surface-dark max-w-xl gap-0 border-white/10 bg-deep p-5 pt-16 sm:max-w-xl sm:p-6 sm:pt-16"
        >
          <DialogTitle className="absolute left-6 top-6 font-display text-xl text-white">{section?.name}</DialogTitle>
          <DialogDescription className="sr-only">{catalogueCopy.viewerHint}</DialogDescription>
          {open && section && (
            <div>
              <Page section={section} page={open.p} brand={brand} />
              <div className="mt-4 flex items-center justify-between text-white">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label={catalogueCopy.previous}
                  className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-glow"
                >
                  <ChevronLeft aria-hidden className="size-5" strokeWidth={1.5} />
                </button>
                <p className="font-mono text-sm tabular-nums" aria-live="polite">
                  {open.p + 1} / {total}
                </p>
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label={catalogueCopy.next}
                  className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-glow"
                >
                  <ChevronRight aria-hidden className="size-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
