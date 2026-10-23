"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Accessible tabs: arrow keys, Home and End move between tabs. */
export function Tabs({ tabs, className }: { tabs: { label: string; content: ReactNode }[]; className?: string }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent) => {
    const last = tabs.length - 1;
    let next = active;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="scrollbar-none -mx-4 flex gap-1 overflow-x-auto border-b border-steel-100 px-4 sm:mx-0 sm:px-0"
        onKeyDown={onKeyDown}
      >
        {tabs.map((t, i) => (
          <button
            key={t.label}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`${base}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${base}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              "relative min-h-12 shrink-0 px-4 text-[0.95rem] font-medium transition-colors",
              active === i ? "text-ink" : "text-steel-600 hover:text-ink",
            )}
          >
            {t.label}
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-3 -bottom-px h-0.5 origin-left bg-accent-strong transition-transform duration-300",
                active === i ? "scale-x-100" : "scale-x-0",
              )}
            />
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.label}
          role="tabpanel"
          id={`${base}-panel-${i}`}
          aria-labelledby={`${base}-tab-${i}`}
          hidden={active !== i}
          tabIndex={0}
          className="pt-6"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
