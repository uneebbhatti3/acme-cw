"use client";

import { ChevronLeft, ChevronRight, RotateCcw, X, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type WheelEvent } from "react";
import { ProductVisual } from "@/components/media/product-visual";
import { cn } from "@/lib/utils";
import type { InstrumentKind } from "@/types";
import type { ProductImage } from "@/features/products/types";
import { viewLabel } from "@/features/products/lib/view-label";

const MAX = 4;
const MIN = 1;

interface LightboxProps {
  open: boolean;
  images: ProductImage[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
  kind: InstrumentKind;
  seed: string;
  title: string;
}

/**
 * Full-screen viewer: zoom (buttons, wheel, pinch, double-click/tap) up to 4x,
 * drag to pan, swipe between views, swipe down to close, keyboard support.
 * Native <dialog> traps focus; focus returns to the trigger on close.
 */
export default function Lightbox({ open, images, index, onIndexChange, onClose, kind, seed, title }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ startX: number; startY: number; panX: number; panY: number; dist: number; scale: number; moved: boolean }>(
    { startX: 0, startY: 0, panX: 0, panY: 0, dist: 0, scale: 1, moved: false },
  );
  const lastTap = useRef(0);
  const count = images.length;
  const current = images[index];

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const reset = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const clampPan = useCallback((x: number, y: number, s: number) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return { x, y };
    const mx = (r.width * (s - 1)) / 2;
    const my = (r.height * (s - 1)) / 2;
    return { x: Math.max(-mx, Math.min(mx, x)), y: Math.max(-my, Math.min(my, y)) };
  }, []);

  const zoomTo = useCallback(
    (s: number) => {
      const next = Math.max(MIN, Math.min(MAX, s));
      setScale(next);
      setPan((p) => (next === 1 ? { x: 0, y: 0 } : clampPan(p.x, p.y, next)));
    },
    [clampPan],
  );

  const go = useCallback(
    (dir: 1 | -1) => {
      if (count < 2) return;
      onIndexChange((index + dir + count) % count);
      reset();
    },
    [count, index, onIndexChange, reset],
  );

  // Open / close the native dialog.
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      returnTo.current = document.activeElement as HTMLElement | null;
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const handle = () => {
      document.documentElement.style.overflow = "";
      reset();
      returnTo.current?.focus?.();
      onCloseRef.current();
    };
    d.addEventListener("close", handle);
    return () => {
      d.removeEventListener("close", handle);
      document.documentElement.style.overflow = "";
    };
  }, [reset]);

  // Prefetch the next real image so navigation feels instant.
  useEffect(() => {
    if (!open) return;
    const next = images[(index + 1) % count];
    if (next?.src) {
      const img = new window.Image();
      img.src = next.src;
    }
  }, [open, index, images, count]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "+" || e.key === "=") zoomTo(scale + 0.5);
    else if (e.key === "-" || e.key === "_") zoomTo(scale - 0.5);
    else if (e.key === "0") reset();
    else return;
    e.preventDefault();
  };

  const onWheel = (e: WheelEvent) => {
    zoomTo(scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15));
  };

  const distance = () => {
    const [a, b] = [...pointers.current.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  const onPointerDown = (e: PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    g.startX = e.clientX;
    g.startY = e.clientY;
    g.panX = pan.x;
    g.panY = pan.y;
    g.scale = scale;
    g.moved = false;
    if (pointers.current.size === 2) g.dist = distance();
    setDragging(true);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    const dx = e.clientX - g.startX;
    const dy = e.clientY - g.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) g.moved = true;

    if (pointers.current.size === 2 && g.dist) {
      zoomTo(g.scale * (distance() / g.dist));
    } else if (scale > 1) {
      setPan(clampPan(g.panX + dx, g.panY + dy, scale));
    } else if (e.pointerType !== "mouse" && dy > 0 && Math.abs(dy) > Math.abs(dx)) {
      setDragY(dy);
    }
  };

  const onPointerUp = (e: PointerEvent) => {
    const g = gesture.current;
    const dx = e.clientX - g.startX;
    const dy = e.clientY - g.startY;
    const wasPinch = pointers.current.size === 2;
    pointers.current.delete(e.pointerId);
    if (pointers.current.size > 0) return;
    setDragging(false);
    setDragY(0);
    if (wasPinch) return;

    if (scale === 1 && g.moved) {
      if (e.pointerType !== "mouse" && dy > 90 && Math.abs(dy) > Math.abs(dx)) {
        dialogRef.current?.close();
        return;
      }
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
      return;
    }
    if (!g.moved) {
      // Double-click / double-tap toggles zoom.
      const now = Date.now();
      if (now - lastTap.current < 300) {
        if (scale > 1) reset();
        else zoomTo(2.5);
        lastTap.current = 0;
      } else lastTap.current = now;
    }
  };

  const btn =
    "inline-flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-transparent";

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${title}: image viewer`}
      aria-modal="true"
      onKeyDown={onKeyDown}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/97 p-0 text-white backdrop:bg-ink/80"
    >
      {open && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-3 py-2 md:px-6">
            <p className="min-w-0 text-sm">
              <span className="font-mono tabular-nums text-steel-300">
                {index + 1} / {count}
              </span>
              <span className="ml-3 font-medium">{viewLabel(current)}</span>
              <span className="ml-3 hidden truncate text-steel-300 md:inline">{title}</span>
            </p>
            <div className="flex items-center gap-1">
              <button type="button" className={btn} onClick={() => zoomTo(scale - 0.5)} disabled={scale <= MIN} aria-label="Zoom out">
                <ZoomOut aria-hidden className="size-5" strokeWidth={1.5} />
              </button>
              <span className="w-12 text-center font-mono text-xs tabular-nums text-steel-300" aria-live="polite">
                {Math.round(scale * 100)}%
              </span>
              <button type="button" className={btn} onClick={() => zoomTo(scale + 0.5)} disabled={scale >= MAX} aria-label="Zoom in">
                <ZoomIn aria-hidden className="size-5" strokeWidth={1.5} />
              </button>
              <button type="button" className={btn} onClick={reset} disabled={scale === 1} aria-label="Reset zoom">
                <RotateCcw aria-hidden className="size-5" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                className={cn(btn, "ml-2 bg-white/10")}
                onClick={() => dialogRef.current?.close()}
                aria-label="Close viewer"
                autoFocus
              >
                <X aria-hidden className="size-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 md:px-20">
            <div
              ref={stageRef}
              onWheel={onWheel}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              className={cn(
                "relative w-full max-w-[min(100%,calc((100dvh-220px)*4/3))] touch-none select-none overflow-hidden rounded-[var(--radius-card)]",
                scale > 1 ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in",
              )}
              style={{
                transform: dragY ? `translateY(${dragY}px)` : undefined,
                opacity: dragY ? Math.max(0.4, 1 - dragY / 400) : undefined,
              }}
            >
              <div
                className={cn(!dragging && "transition-transform duration-200 ease-out")}
                style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})` }}
              >
                <ProductVisual image={current} kind={kind} seed={seed} ratio="4/3" sizes="100vw" priority />
              </div>
            </div>
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous view"
                  className="absolute left-2 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:inline-flex"
                >
                  <ChevronLeft aria-hidden className="size-6" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next view"
                  className="absolute right-2 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:inline-flex"
                >
                  <ChevronRight aria-hidden className="size-6" strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>

          {count > 1 && (
            <div className="scrollbar-none flex justify-center gap-2 overflow-x-auto px-4 pb-4 pt-3">
              {images.map((img, i) => (
                <button
                  key={`${img.view}-${i}`}
                  type="button"
                  onClick={() => {
                    onIndexChange(i);
                    reset();
                  }}
                  aria-label={`${viewLabel(img)} view`}
                  aria-current={i === index ? "true" : undefined}
                  className="w-16 shrink-0 md:w-20"
                >
                  <span
                    className={cn(
                      "block overflow-hidden rounded-md border-2 transition-opacity",
                      i === index ? "border-legacy-accent" : "border-transparent opacity-60 hover:opacity-100",
                    )}
                  >
                    <ProductVisual image={img} kind={kind} seed={seed} ratio="1/1" sizes="80px" />
                  </span>
                  <span className={cn("mt-1 block text-center text-[11px]", i === index ? "text-white" : "text-steel-300")}>
                    {viewLabel(img)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
