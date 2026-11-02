"use client";

import Image from "next/image";
import { catalogueCopy } from "@/features/catalogue/data/copy";
import { pageUrl, type Catalogue } from "@/features/catalogue/data/catalogues";
import { cn } from "@/lib/utils";

const c = catalogueCopy.viewer;

/** Side panel of every page. */
export function FlipbookThumbnails({ catalogue, current, onSelect }: { catalogue: Catalogue; current: number[]; onSelect: (page: number) => void }) {
  return (
    <nav aria-label={c.thumbnails} className="w-44 shrink-0 overflow-y-auto border-l border-white/10 bg-navy-deep/60 p-3 sm:w-52">
      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Array.from({ length: catalogue.pages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <button
              type="button"
              onClick={() => onSelect(page)}
              aria-label={c.goToPage(page)}
              aria-current={current.includes(page) ? "page" : undefined}
              className={cn(
                "relative block w-full overflow-hidden rounded-lg border-2 bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow",
                current.includes(page) ? "border-glow" : "border-transparent hover:border-white/40",
              )}
              style={{ aspectRatio: catalogue.aspect }}
            >
              <Image src={pageUrl(catalogue.slug, page)} alt="" fill sizes="96px" draggable={false} className="object-contain" />
            </button>
            <span className="mt-1 block text-center font-mono text-[11px] text-mist">{page}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
