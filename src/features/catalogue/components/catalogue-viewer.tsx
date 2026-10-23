"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import { Modal } from "@/components/ui/modal";
import { catalogueCopy } from "@/features/catalogue/data/copy";
import { cn } from "@/lib/utils";
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
    <S className="relative block aspect-[1/1.414] overflow-hidden bg-white text-left shadow-[var(--shadow-soft)]">
      {page === 0 ? (
        <S className="flex h-full flex-col bg-ink p-[8%] text-white">
          <S className="block text-[clamp(8px,1.4vw,13px)] text-steel-300">{brand}</S>
          <S className="mt-auto block">
            <PlaceholderImage as="span" kind={section.kind} ratio="4/3" tone="ink" seed={section.slug} />
          </S>
          <S className="mt-[6%] block font-display text-[clamp(16px,3vw,34px)] leading-tight">{section.name}</S>
          <S className="mt-[2%] block h-px w-1/4 bg-accent" />
        </S>
      ) : (
        <S className="flex h-full flex-col p-[8%]">
          <S className="flex items-baseline justify-between border-b border-steel-100 pb-[4%] text-[clamp(8px,1.2vw,12px)] text-steel-600">
            <S className="block">{section.name}</S>
            <S className="block font-mono">{page + 1}</S>
          </S>
          <S className="mt-[6%] grid flex-1 grid-cols-2 content-start gap-[5%]">
            {section.products.slice((page - 1) * 4, (page - 1) * 4 + 4).map((p, i) => (
              <S key={p.code} className="block">
                <S className="block overflow-hidden rounded-sm border border-steel-100">
                  <PlaceholderImage as="span" kind={section.kind} view={i % 2 ? "side" : "front"} ratio="1/1" seed={p.code} />
                </S>
                <S className="mt-[6%] block text-[clamp(7px,1.1vw,12px)] font-medium leading-tight text-ink">{p.name}</S>
                <S className="block font-mono text-[clamp(6px,0.9vw,10px)] text-steel-600">{p.code}</S>
              </S>
            ))}
          </S>
        </S>
      )}
    </S>
  );
}

export function CatalogueViewer({
  sections,
  brand,
}: {
  sections: CatalogueSection[];
  brand: string;
}) {
  const [open, setOpen] = useState<{ s: number; p: number } | null>(null);
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
              className="group block w-full text-left"
            >
              <span className="block transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:-translate-y-1">
                <Page section={s} page={0} brand={brand} as="span" />
              </span>
              <span className="mt-3 block font-medium text-ink">{s.name}</span>
              <span className="block text-sm text-steel-600">{catalogueCopy.pages(pageCount(s))}</span>
            </button>
          </li>
        ))}
      </ul>

      <Modal open={!!open} onClose={() => setOpen(null)} label={section?.name ?? ""} className="max-w-xl">
        {open && section && (
          <div onKeyDown={onKey}>
            <Page section={section} page={open.p} brand={brand} />
            <div className="mt-4 flex items-center justify-between text-white">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Previous page"
                className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <ChevronLeft aria-hidden className="size-5" strokeWidth={1.5} />
              </button>
              <p className="font-mono text-sm tabular-nums" aria-live="polite">
                {open.p + 1} / {total}
              </p>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Next page"
                className={cn("inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20")}
              >
                <ChevronRight aria-hidden className="size-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
