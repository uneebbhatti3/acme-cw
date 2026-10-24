"use client";

import { Maximize2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ProductVisual } from "@/components/media/product-visual";
import { productDetailCopy } from "@/features/products/data/copy";
import { viewLabel } from "@/features/products/lib/view-label";
import type { ProductImage } from "@/features/products/types";
import { cn } from "@/lib/utils";
import type { InstrumentKind } from "@/types";

const Lightbox = dynamic(() => import("./lightbox"), { ssr: false });

const ZOOM = 2.2;
const SWIPE = 50;

/**
 * Main stage with inner hover zoom (mouse), swipe between views (touch),
 * labelled thumbnails (arrow keys move the selection) and a full-screen
 * lightbox. Works the same for placeholder art and real photos.
 */
export function ProductGallery({
  images,
  kind,
  seed,
  productName,
}: {
  images: ProductImage[];
  kind: InstrumentKind;
  seed: string;
  productName: string;
}) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [lightbox, setLightbox] = useState(false);
  const [lightboxLoaded, setLightboxLoaded] = useState(false);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const swipe = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const current = images[index];
  const many = images.length > 1;
  const last = images.length - 1;

  const open = () => {
    setLightboxLoaded(true);
    setLightbox(true);
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return;
    swipe.current = { x: e.clientX, y: e.clientY, moved: false };
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") {
      const s = swipe.current;
      if (s && (Math.abs(e.clientX - s.x) > 8 || Math.abs(e.clientY - s.y) > 8)) s.moved = true;
      return;
    }
    if (!window.matchMedia("(hover: hover)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    const s = swipe.current;
    swipe.current = null;
    if (e.pointerType === "mouse" || !s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (many && Math.abs(dx) > SWIPE && Math.abs(dx) > Math.abs(dy)) {
      setIndex((i) => (dx < 0 ? (i === last ? 0 : i + 1) : i === 0 ? last : i - 1));
    } else if (!s.moved) open();
  };

  const onThumbKey = (e: KeyboardEvent) => {
    let next = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setIndex(next);
    thumbs.current[next]?.focus();
  };

  return (
    <div>
      <div
        id={`${seed}-stage`}
        role="group"
        aria-roledescription="carousel"
        aria-label={`${productName} images`}
        className="relative overflow-hidden rounded-lg border bg-white"
      >
        <div
          className={cn("relative touch-pan-y overflow-hidden", zoom ? "cursor-zoom-in" : "cursor-pointer")}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={() => setZoom(null)}
          onClick={(e) => {
            // Touch taps open the viewer from onUp; mouse clicks open it here.
            if ((e.nativeEvent as globalThis.PointerEvent).pointerType !== "touch") open();
          }}
        >
          <div
            key={index}
            className="art-in transition-transform duration-200 ease-out will-change-transform"
            style={zoom ? { transform: `scale(${ZOOM})`, transformOrigin: `${zoom.x}% ${zoom.y}%` } : { transform: "scale(1)" }}
          >
            <ProductVisual image={current} kind={kind} seed={seed} priority={index === 0} sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw" />
          </div>
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-sm border bg-white/90 px-2 py-1 text-xs font-semibold">
          {viewLabel(current)}
        </span>
        <button
          type="button"
          onClick={open}
          aria-haspopup="dialog"
          aria-label={productDetailCopy.enlarge}
          className="absolute right-3 top-3 inline-flex h-11 items-center gap-2 rounded-md border bg-white px-3.5 text-sm font-semibold transition-colors hover:border-grey-300 hover:bg-grey-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Maximize2 aria-hidden className="size-4" strokeWidth={1.75} />
          <span className="hidden sm:inline">{productDetailCopy.enlargeShort}</span>
        </button>
        {many && (
          <span aria-hidden className="pointer-events-none absolute bottom-3 right-3 rounded-sm bg-navy/80 px-2 py-1 font-mono text-xs text-white">
            {index + 1} / {images.length}
          </span>
        )}
        <p aria-live="polite" className="sr-only">
          {`${viewLabel(current)} view, ${index + 1} of ${images.length}`}
        </p>
      </div>

      {many && (
        <div
          role="tablist"
          aria-label={productDetailCopy.viewsLabel}
          onKeyDown={onThumbKey}
          className="scrollbar-none -mx-4 mt-3 flex snap-x gap-2.5 overflow-x-auto scroll-px-4 px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {images.map((img, i) => (
            <button
              key={`${img.view}-${i}`}
              ref={(el) => {
                thumbs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-controls={`${seed}-stage`}
              tabIndex={i === index ? 0 : -1}
              aria-label={`${viewLabel(img)} view`}
              onClick={() => setIndex(i)}
              className="group w-[23%] min-w-20 max-w-28 shrink-0 snap-start rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-24"
            >
              <span
                className={cn(
                  "block overflow-hidden rounded-md border-2 bg-white transition-colors",
                  i === index ? "border-teal" : "border-border group-hover:border-grey-300",
                )}
              >
                <ProductVisual image={img} kind={kind} seed={seed} sizes="120px" marked={false} />
              </span>
              <span className={cn("mt-1.5 block text-center text-xs font-semibold", i === index ? "text-link" : "text-muted-foreground")}>
                {viewLabel(img)}
              </span>
            </button>
          ))}
        </div>
      )}

      {lightboxLoaded && (
        <Lightbox
          open={lightbox}
          images={images}
          index={index}
          onIndexChange={setIndex}
          onClose={() => setLightbox(false)}
          kind={kind}
          seed={seed}
          title={productName}
        />
      )}
    </div>
  );
}
