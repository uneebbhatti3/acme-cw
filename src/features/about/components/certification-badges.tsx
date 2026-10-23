"use client";

import { FileText } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import type { Certification } from "@/types";

function Seal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="24" cy="24" r="15" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1.5 2.5" />
      <path d="M17 24.5l4.5 4.5L31 19.5" fill="none" stroke="var(--accent-strong)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Badge row. A badge with a `file` opens the document in a new tab; without
 * one it opens a modal with the details and a document placeholder.
 */
export function CertificationBadges({
  items,
  modalNote,
}: {
  items: Certification[];
  modalNote: string;
}) {
  const [active, setActive] = useState<Certification | null>(null);

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((c) => {
          const inner = (
            <>
              <Seal className="size-11 shrink-0 text-steel-600" />
              <span>
                <span className="block font-medium leading-snug text-ink">{c.name}</span>
                {c.description && <span className="mt-1 block text-sm text-steel-600">{c.description}</span>}
              </span>
            </>
          );
          const cls =
            "flex h-full w-full items-start gap-4 rounded-[var(--radius-card)] border border-steel-100 bg-white p-5 text-left transition-[border-color,box-shadow] duration-200 hover:border-steel-300 hover:shadow-[var(--shadow-soft)]";
          return (
            <li key={c.name}>
              {c.file ? (
                <a href={c.file} target="_blank" rel="noopener noreferrer" className={cls}>
                  {inner}
                </a>
              ) : (
                <button type="button" className={cls} aria-haspopup="dialog" onClick={() => setActive(c)}>
                  {inner}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <Modal open={!!active} onClose={() => setActive(null)} label={active?.name ?? ""} className="max-w-lg">
        {active && (
          <div className="rounded-[var(--radius-card)] bg-white p-6 md:p-8">
            <div className="relative mx-auto aspect-[1/1.3] max-w-[260px] rounded-md border border-steel-100 bg-paper p-6 shadow-[var(--shadow-soft)]">
              <div className="h-2 w-2/3 rounded bg-steel-100" />
              <div className="mt-2 h-2 w-1/2 rounded bg-steel-100" />
              <Seal className="mx-auto mt-8 size-20 text-steel-300" />
              <div className="mt-8 space-y-2">
                <div className="h-1.5 rounded bg-steel-100" />
                <div className="h-1.5 rounded bg-steel-100" />
                <div className="h-1.5 w-4/5 rounded bg-steel-100" />
              </div>
              <FileText aria-hidden className="absolute bottom-4 right-4 size-5 text-steel-300" strokeWidth={1.5} />
            </div>
            <h2 className="text-h3 mt-6">{active.name}</h2>
            {active.description && <p className="mt-2 text-steel-600">{active.description}</p>}
            <p className="mt-4 text-sm text-steel-600">{modalNote}</p>
          </div>
        )}
      </Modal>
    </>
  );
}
