"use client";

/*
 * Signature moment 2 (home): labelled views with a magnifier loupe on hover
 * and a full-screen lightbox. Adapted from the V2 design reference
 * (docs/reference/page-v2.tsx, Viewer and Stage). The loupe magnifies the
 * same image file, so it works unchanged when real photos replace the art.
 */

import { ZoomIn } from "lucide-react";
import dynamic from "next/dynamic";
import { useState, type PointerEvent } from "react";
import { ProductVisual } from "@/components/media/product-visual";
import { placeholderSrc } from "@/components/media/placeholder-svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { homeCopy } from "@/features/home/data/copy";
import { viewLabel } from "@/features/products/lib/view-label";
import type { ProductImage } from "@/features/products/types";
import type { InstrumentKind } from "@/types";

const Lightbox = dynamic(() => import("@/features/products/components/lightbox"), { ssr: false });

const LENS = 200;
const ZOOM = 2.5;

interface Lens {
  x: number;
  y: number;
  w: number;
  h: number;
}

function Stage({ image, kind, slug, onEnlarge }: { image: ProductImage; kind: InstrumentKind; slug: string; onEnlarge: () => void }) {
  const [lens, setLens] = useState<Lens | null>(null);
  const label = viewLabel(image);
  const src = image.src ?? placeholderSrc(kind, image.view, "4/3", "steel");

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    setLens({ x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height });
  };

  return (
    <div
      className="relative cursor-zoom-in overflow-hidden rounded-[2rem] border bg-card"
      onPointerMove={move}
      onPointerLeave={() => setLens(null)}
      onClick={onEnlarge}
    >
      <ProductVisual image={image} kind={kind} seed={slug} sizes="(min-width: 1024px) 720px, 100vw" />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onEnlarge();
        }}
        aria-label={homeCopy.viewer.enlargeLabel(label)}
        aria-haspopup="dialog"
        className="absolute right-4 top-4 inline-flex h-10 items-center gap-2 rounded-full border bg-card px-4 text-sm font-semibold shadow-sm transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <ZoomIn aria-hidden className="size-4" />
        {homeCopy.viewer.enlarge}
      </button>
      {lens && (
        <span
          aria-hidden
          className="pointer-events-none absolute rounded-full border-[3px] border-ink bg-card bg-no-repeat shadow-[0_18px_40px_-12px_rgb(8_23_28/0.5)]"
          style={{
            width: LENS,
            height: LENS,
            left: lens.x - LENS / 2,
            top: lens.y - LENS / 2,
            backgroundImage: `url(${src})`,
            backgroundSize: `${lens.w * ZOOM}px ${lens.h * ZOOM}px`,
            backgroundPosition: `${LENS / 2 - lens.x * ZOOM}px ${LENS / 2 - lens.y * ZOOM}px`,
          }}
        />
      )}
    </div>
  );
}

export function ProductViewer({ images, kind, slug, name }: { images: ProductImage[]; kind: InstrumentKind; slug: string; name: string }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const enlarge = () => {
    setLoaded(true);
    setOpen(true);
  };

  return (
    <>
      <Tabs value={String(index)} onValueChange={(v) => setIndex(Number(v))} className="gap-5">
        {images.map((img, i) => (
          <TabsContent key={img.view} value={String(i)} className="art-in">
            <Stage image={img} kind={kind} slug={slug} onEnlarge={enlarge} />
          </TabsContent>
        ))}
        <TabsList aria-label={homeCopy.viewer.viewsLabel} className="scrollbar-none h-auto max-w-full justify-start gap-1 self-start overflow-x-auto rounded-full border bg-card p-1">
          {images.map((img, i) => (
            <TabsTrigger
              key={img.view}
              value={String(i)}
              className="h-10 flex-none rounded-full px-3 text-[0.92rem] sm:px-4 font-semibold text-foreground/70 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:bg-ink data-[state=active]:text-white data-[state=active]:shadow-none"
            >
              {viewLabel(img)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {loaded && (
        <Lightbox open={open} images={images} index={index} onIndexChange={setIndex} onClose={() => setOpen(false)} kind={kind} seed={slug} title={name} />
      )}
    </>
  );
}
