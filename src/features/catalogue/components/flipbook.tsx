"use client";

import { ChevronLeft, ChevronRight, EyeOff, LayoutGrid, Mail, Maximize, Minimize, X, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { FlipbookError } from "@/features/catalogue/components/states/flipbook-error";
import { FlipbookLoading } from "@/features/catalogue/components/states/flipbook-loading";
import { catalogueCopy } from "@/features/catalogue/data/copy";
import { pageUrl, type Catalogue } from "@/features/catalogue/data/catalogues";
import { useContentShield } from "@/features/catalogue/hooks/use-content-shield";
import { lastSpread, leftPage, rightPage, visiblePages } from "@/features/catalogue/lib/book-layout";
import { BookScene, MAX_ZOOM, type BookView } from "@/features/catalogue/lib/book-scene";
import { cn } from "@/lib/utils";
import { FlipbookThumbnails } from "./flipbook-thumbnails";

const c = catalogueCopy.viewer;

/** Below this stage width, or on a tall screen, one page shows at a time. */
const SINGLE_PAGE_WIDTH = 760;
/** Sheets kept ready either side of the open spread. Each page uses several MB of graphics memory. */
const KEEP_SPREADS = 2;
const DRAG_START_PX = 8;
const SWIPE_PX = 40;
const ZOOM_STEP = 0.5;

const iconButton =
  "inline-flex size-11 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-glow disabled:opacity-40 disabled:hover:bg-transparent";

function ToolButton({ label, onClick, disabled, pressed, children }: { label: string; onClick: () => void; disabled?: boolean; pressed?: boolean; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} aria-label={label} aria-pressed={pressed} title={label} className={cn(iconButton, pressed && "bg-white/15")}>
      {children}
    </button>
  );
}

function SideArrow({ side, label, disabled, onClick }: { side: "left" | "right"; label: string; disabled: boolean; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-glow disabled:invisible md:inline-flex",
        side === "left" ? "left-3" : "right-3",
      )}
    >
      <Icon aria-hidden className="size-6" strokeWidth={1.5} />
    </button>
  );
}

type Gesture =
  | { mode: "idle" }
  | { mode: "press"; x: number }
  | { mode: "turn"; x: number; direction: 1 | -1 }
  | { mode: "pan"; x: number; y: number };

async function loadPicture(url: string) {
  const image = new Image();
  image.src = url;
  await image.decode();
  return image;
}

export default function Flipbook({ catalogue, onClose, onRequest }: { catalogue: Catalogue; onClose: () => void; onRequest: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const scene = useRef<BookScene | null>(null);
  const gesture = useRef<Gesture>({ mode: "idle" });
  const returnFocus = useRef<HTMLElement | null>(null);

  // Held in state because the dialog mounts its content after this component first renders.
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [view, setView] = useState<BookView | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [thumbnails, setThumbnails] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const shielded = useContentShield();

  // Build the book. Everything is released when the viewer closes.
  useEffect(() => {
    let live = true;
    let built: BookScene | undefined;
    let observer: ResizeObserver | undefined;

    (async () => {
      if (!live || !canvas || !stage.current) return;
      built = new BookScene(canvas, catalogue.pages, catalogue.aspect, setView);
      scene.current = built;
      const fit = () => {
        const { clientWidth: width, clientHeight: height } = stage.current ?? { clientWidth: 0, clientHeight: 0 };
        if (width && height) built?.resize(width, height, width < SINGLE_PAGE_WIDTH);
      };
      fit();
      observer = new ResizeObserver(fit);
      observer.observe(stage.current);
      setReady(true);
    })().catch((error) => {
      console.error("[catalogue] Could not open", catalogue.slug, error);
      if (live) setFailed(true);
    });

    return () => {
      live = false;
      observer?.disconnect();
      built?.dispose();
      scene.current = null;
    };
  }, [catalogue, canvas]);

  const spread = view?.spread;

  // Load the open spread first, then its neighbours, and free pages far from it.
  useEffect(() => {
    const open = scene.current;
    if (!ready || !open || spread === undefined) return;
    let live = true;
    const count = catalogue.pages;
    const pagesOf = (s: number) => (s < 0 || s > lastSpread(count) ? [] : [leftPage(s), rightPage(s, count)].filter((p): p is number => p !== null));
    const wanted = [...pagesOf(spread), ...pagesOf(spread + 1), ...pagesOf(spread - 1)];
    const visible = new Set(pagesOf(spread));
    const keep = new Set<number>();
    for (let s = spread - KEEP_SPREADS; s <= spread + KEEP_SPREADS; s++) pagesOf(s).forEach((p) => keep.add(p));

    (async () => {
      setDrawing([...visible].some((p) => !open.hasPage(p)));
      for (const page of wanted) {
        if (!live) return;
        if (!open.hasPage(page)) {
          const picture = await loadPicture(pageUrl(catalogue.slug, page));
          if (live) open.setPage(page, picture);
        }
        if (live && [...visible].every((p) => open.hasPage(p))) setDrawing(false);
      }
      if (live) open.loadedPages().filter((p) => !keep.has(p)).forEach((p) => open.dropPage(p));
    })().catch((error) => {
      console.error("[catalogue] Could not load a page", error);
      if (live) setDrawing(false);
    });

    return () => {
      live = false;
    };
  }, [ready, catalogue, spread]);

  useEffect(() => {
    const sync = () => setFullscreen(document.fullscreenElement !== null);
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  const count = catalogue.pages;
  const pages = view ? visiblePages(view.spread, count, view.side) : [1];
  const zoom = view?.zoom ?? 1;
  const next = useCallback(() => scene.current?.next(), []);
  const previous = useCallback(() => scene.current?.previous(), []);
  const zoomBy = useCallback((amount: number) => scene.current?.setZoom(zoom + amount), [zoom]);

  const goTo = useCallback((page: number) => {
    scene.current?.goToPage(page);
    if (window.innerWidth < SINGLE_PAGE_WIDTH) setThumbnails(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void root.current?.requestFullscreen();
  }, []);

  // The request dialog opens outside the full-screen element, where it would be hidden.
  const request = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    onRequest();
  }, [onRequest]);

  const onKeyDown = (event: KeyboardEvent) => {
    const actions: Record<string, () => void> = {
      ArrowRight: next,
      ArrowLeft: previous,
      Home: () => goTo(1),
      End: () => goTo(count),
      "+": () => zoomBy(ZOOM_STEP),
      "=": () => zoomBy(ZOOM_STEP),
      "-": () => zoomBy(-ZOOM_STEP),
    };
    const action = actions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    gesture.current = zoom > 1 ? { mode: "pan", x: event.clientX, y: event.clientY } : { mode: "press", x: event.clientX };
  };

  const onPointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    const now = gesture.current;
    const open = scene.current;
    if (!open || now.mode === "idle") return;
    const { clientWidth, clientHeight } = event.currentTarget;
    const left = event.currentTarget.getBoundingClientRect().left;

    if (now.mode === "pan") {
      open.panBy(event.clientX - now.x, event.clientY - now.y, clientHeight);
      gesture.current = { mode: "pan", x: event.clientX, y: event.clientY };
    } else if (now.mode === "press") {
      const moved = event.clientX - now.x;
      if (Math.abs(moved) < DRAG_START_PX) return;
      const direction = open.dragDirection(now.x - left, clientWidth);
      if (direction && Math.sign(moved) === -direction) {
        open.beginDrag(direction);
        gesture.current = { mode: "turn", x: now.x, direction };
      }
    } else {
      open.drag(((now.x - event.clientX) * now.direction) / open.dragSpan(clientWidth));
    }
  };

  const onPointerUp = (event: PointerEvent<HTMLCanvasElement>) => {
    const now = gesture.current;
    gesture.current = { mode: "idle" };
    const open = scene.current;
    if (!open) return;
    if (now.mode === "turn") {
      open.endDrag();
    } else if (now.mode === "press") {
      const moved = event.clientX - now.x;
      if (Math.abs(moved) >= SWIPE_PX) return moved < 0 ? open.next() : open.previous();
      if (Math.abs(moved) >= DRAG_START_PX) return;
      const { left, width } = event.currentTarget.getBoundingClientRect();
      if (event.clientX - left > width / 2) open.next();
      else open.previous();
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        onKeyDown={onKeyDown}
        onOpenAutoFocus={() => {
          returnFocus.current = document.activeElement as HTMLElement | null;
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocus.current?.focus?.();
        }}
        className="surface-dark top-0 left-0 h-dvh w-screen max-w-none translate-x-0 translate-y-0 gap-0 rounded-none border-0 bg-navy p-0 text-white shadow-none sm:max-w-none data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100"
      >
        <DialogDescription className="sr-only">{c.hint}</DialogDescription>
        <div ref={root} data-protected-content onContextMenu={(event) => event.preventDefault()} onDragStart={(event) => event.preventDefault()} className="flex h-full min-h-0 flex-col bg-navy select-none">
          <header className="flex items-center justify-between gap-4 border-b border-white/10 px-3 py-1.5 md:px-5">
            <DialogTitle className="min-w-0 truncate text-base font-medium text-white">{catalogue.title}</DialogTitle>
            <DialogClose className={iconButton} aria-label={c.close} title={c.close}>
              <X aria-hidden className="size-5" strokeWidth={1.5} />
            </DialogClose>
          </header>

          <div className="flex min-h-0 flex-1">
            <div ref={stage} className="relative min-w-0 flex-1 overflow-hidden">
              <canvas
                ref={setCanvas}
                role="img"
                aria-label={c.pageLabel(catalogue.title, pages, count)}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onWheel={(event) => zoomBy(event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP)}
                className={cn("block size-full touch-none select-none", zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-pointer", (!ready || shielded) && "invisible")}
              />
              {shielded && (
                <div role="status" className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-navy text-center text-mist">
                  <EyeOff aria-hidden className="size-7" strokeWidth={1.5} />
                  <p className="font-medium text-white">{c.shieldTitle}</p>
                  <p className="text-sm">{c.shieldText}</p>
                </div>
              )}
              {!ready && !failed && <FlipbookLoading />}
              {failed && <FlipbookError onRequest={request} />}
              {ready && (
                <>
                  <SideArrow side="left" label={c.previous} disabled={!view?.canPrevious} onClick={previous} />
                  <SideArrow side="right" label={c.next} disabled={!view?.canNext} onClick={next} />
                </>
              )}
              {drawing && (
                <div role="status" className="pointer-events-none absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-navy-deep/85 px-3 py-1.5 text-xs text-mist">
                  <Spinner aria-hidden className="size-3.5" />
                  {c.pageLoading}
                </div>
              )}
            </div>
            {thumbnails && ready && !shielded && <FlipbookThumbnails catalogue={catalogue} current={pages} onSelect={goTo} />}
          </div>

          {ready && (
            <footer className="flex flex-wrap items-center justify-center border-t border-white/10 px-2 py-1 sm:gap-x-1">
              <span className="md:hidden">
                <ToolButton label={c.previous} onClick={previous} disabled={!view?.canPrevious}>
                  <ChevronLeft aria-hidden className="size-5" strokeWidth={1.5} />
                </ToolButton>
              </span>
              <p className="min-w-14 text-center sm:min-w-20 font-mono text-sm tabular-nums" aria-live="polite">
                {c.counter(pages, count)}
              </p>
              <span className="md:hidden">
                <ToolButton label={c.next} onClick={next} disabled={!view?.canNext}>
                  <ChevronRight aria-hidden className="size-5" strokeWidth={1.5} />
                </ToolButton>
              </span>
              <ToolButton label={c.thumbnails} onClick={() => setThumbnails((open) => !open)} pressed={thumbnails}>
                <LayoutGrid aria-hidden className="size-5" strokeWidth={1.5} />
              </ToolButton>
              <ToolButton label={c.zoomOut} onClick={() => zoomBy(-ZOOM_STEP)} disabled={zoom <= 1}>
                <ZoomOut aria-hidden className="size-5" strokeWidth={1.5} />
              </ToolButton>
              <ToolButton label={c.zoomIn} onClick={() => zoomBy(ZOOM_STEP)} disabled={zoom >= MAX_ZOOM}>
                <ZoomIn aria-hidden className="size-5" strokeWidth={1.5} />
              </ToolButton>
              <span className="hidden sm:inline-flex">
                <ToolButton label={fullscreen ? c.exitFullscreen : c.fullscreen} onClick={toggleFullscreen} pressed={fullscreen}>
                  {fullscreen ? <Minimize aria-hidden className="size-5" strokeWidth={1.5} /> : <Maximize aria-hidden className="size-5" strokeWidth={1.5} />}
                </ToolButton>
              </span>
              <ToolButton label={catalogueCopy.requestPdf} onClick={request}>
                <Mail aria-hidden className="size-5" strokeWidth={1.5} />
              </ToolButton>
            </footer>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
