"use client";

import { ZoomIn, ZoomOut } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import { homeCopy } from "@/features/home/data/copy";
import { useHoverZoom } from "@/features/home/hooks/use-hover-zoom";
import { useStepper } from "@/features/home/hooks/use-stepper";
import type { HingedKind, SpotlightView } from "@/features/home/types";
import { ViewArt } from "../art/instrument-art";
import { HomeDialog } from "../home-dialog";

const VIEWS: { id: SpotlightView; label: string }[] = [
  { id: "front", label: "Front" },
  { id: "back", label: "Back" },
  { id: "side", label: "Side" },
  { id: "detail", label: "Detail" },
];
const ZOOM_STEPS = [1, 1.8, 2.6];

function ViewTabs({ view, onChange, keyboard = false }: { view: SpotlightView; onChange: (v: SpotlightView) => void; keyboard?: boolean }) {
  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const i = VIEWS.findIndex((v) => v.id === view);
    if (e.key === "ArrowRight") onChange(VIEWS[(i + 1) % VIEWS.length].id);
    if (e.key === "ArrowLeft") onChange(VIEWS[(i + VIEWS.length - 1) % VIEWS.length].id);
  };
  return (
    <>
      {VIEWS.map((v) => (
        <button
          key={v.id}
          type="button"
          role="tab"
          aria-selected={view === v.id}
          tabIndex={keyboard ? (view === v.id ? 0 : -1) : undefined}
          className="tab"
          onClick={() => onChange(v.id)}
          onKeyDown={keyboard ? onKey : undefined}
        >
          {v.label}
        </button>
      ))}
    </>
  );
}

/** Product drawing with view tabs, hover magnifier and a zoomable enlarged view. */
export function SpotlightViewer({ name, variant, code }: { name: string; variant: HingedKind; code: string }) {
  const [view, setView] = useState<SpotlightView>("front");
  const [open, setOpen] = useState(false);
  const zoom = useStepper(ZOOM_STEPS.length);
  const hoverZoom = useHoverZoom(2);
  const copy = homeCopy.spotlight;
  const label = VIEWS.find((v) => v.id === view)?.label ?? "";

  const close = () => {
    setOpen(false);
    zoom.reset();
  };

  return (
    <>
      <div
        className="bg-paper bd-line relative cursor-zoom-in overflow-hidden rounded-2xl border"
        {...hoverZoom.handlers}
        onClick={() => setOpen(true)}
      >
        <div key={view} className="art-in p-6 sm:p-10" style={hoverZoom.style}>
          <ViewArt view={view} variant={variant} engraving={code} />
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          className="bg-surface c-ink bd-line absolute right-4 top-4 inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold hover:border-[var(--ink)]"
        >
          <ZoomIn size={17} aria-hidden="true" />
          {copy.enlarge}
        </button>
      </div>
      <div role="tablist" aria-label={copy.viewsLabel} className="mt-5 flex flex-wrap gap-2.5">
        <ViewTabs view={view} onChange={setView} keyboard />
      </div>

      <HomeDialog open={open} onClose={close} title={copy.dialogTitle(name, label)} wide>
        <div className="flex items-center gap-2 px-5 py-3">
          <button type="button" className="btn btn-outline !h-10 !px-4" onClick={zoom.prev} disabled={zoom.atStart} aria-label={copy.zoomOut}>
            <ZoomOut size={18} aria-hidden="true" />
          </button>
          <button type="button" className="btn btn-outline !h-10 !px-4" onClick={zoom.next} disabled={zoom.atEnd} aria-label={copy.zoomIn}>
            <ZoomIn size={18} aria-hidden="true" />
          </button>
          <span className="c-steel ml-2 text-sm">{Math.round(ZOOM_STEPS[zoom.index] * 100)}%</span>
          <div role="tablist" aria-label={copy.viewsLabel} className="ml-auto hidden gap-2 sm:flex">
            <ViewTabs view={view} onChange={setView} />
          </div>
        </div>
        <div className="bg-paper overflow-auto p-4">
          <div style={{ width: `${ZOOM_STEPS[zoom.index] * 100}%`, minWidth: "100%" }}>
            <ViewArt view={view} variant={variant} engraving={code} />
          </div>
        </div>
      </HomeDialog>
    </>
  );
}
