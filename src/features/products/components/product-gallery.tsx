"use client";

import { Maximize2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ProductVisual } from "@/components/media/product-visual";
import { productDetailCopy } from "@/features/products/data/copy";
import { cn } from "@/lib/utils";
import type { InstrumentKind } from "@/types";
import type { ProductImage } from "@/features/products/types";
import { viewLabel } from "@/features/products/lib/view-label";

const Lightbox = dynamic(() => import("./lightbox"), { ssr: false });

const ZOOM = 2.2;

/**
 * Main stage with inner hover zoom (pointer devices), labelled thumbnails and
 * a full-screen lightbox. Works the same for placeholder art and real photos.
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
  const enlargeRef = useRef<HTMLButtonElement>(null);
  const current = images[index];
  const many = images.length > 1;

  const open = () => {
    setLightboxLoaded(true);
    setLightbox(true);
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !window.matchMedia("(hover: hover)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const onThumbKey = (e: KeyboardEvent) => {
    const last = images.length - 1;
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
        className="relative overflow-hidden rounded-[var(--radius-card)] border border-steel-100 bg-white"
      >
        <div
          className={cn("relative overflow-hidden", zoom ? "cursor-zoom-in" : "cursor-pointer")}
          onPointerMove={onMove}
          onPointerLeave={() => setZoom(null)}
          onClick={open}
        >
          <div
            className="transition-transform duration-200 ease-out will-change-transform"
            style={
              zoom
                ? { transform: `scale(${ZOOM})`, transformOrigin: `${zoom.x}% ${zoom.y}%` }
                : { transform: "scale(1)" }
            }
          >
            <ProductVisual
              image={current}
              kind={kind}
              seed={seed}
              ratio="4/3"
              priority={index === 0}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>

        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-steel-900 shadow-sm backdrop-blur-sm">
          {viewLabel(current)}
        </span>
        <button
          ref={enlargeRef}
          type="button"
          onClick={open}
          aria-haspopup="dialog"
          aria-label={productDetailCopy.enlarge}
          title={productDetailCopy.enlarge}
          className="absolute right-3 top-3 inline-flex size-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
        >
          <Maximize2 aria-hidden className="size-[18px]" strokeWidth={1.5} />
        </button>
        <p aria-live="polite" className="sr-only">
          {`${viewLabel(current)} view, ${index + 1} of ${images.length}`}
        </p>
      </div>

      {many && (
        <div
          role="tablist"
          aria-label="Product views"
          onKeyDown={onThumbKey}
          className="scrollbar-none -mx-6 mt-4 flex snap-x gap-3 overflow-x-auto px-6 pb-1 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0"
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
              className="group w-[22%] min-w-20 shrink-0 snap-start text-left sm:w-auto"
            >
              <span
                className={cn(
                  "block overflow-hidden rounded-[10px] border-2 transition-colors",
                  i === index ? "border-accent-strong" : "border-steel-100 group-hover:border-steel-300",
                )}
              >
                <ProductVisual image={img} kind={kind} seed={seed} ratio="1/1" sizes="120px" />
              </span>
              <span
                className={cn(
                  "mt-1.5 block text-center text-xs font-medium",
                  i === index ? "text-accent-strong" : "text-steel-600",
                )}
              >
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
