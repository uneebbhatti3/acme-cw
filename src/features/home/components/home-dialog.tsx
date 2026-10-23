"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";
import { Modal } from "@/components/ui/modal";
import { homeCopy } from "@/features/home/data/copy";
import { cn } from "@/lib/utils";

/** The shared native-dialog modal, dressed as a white panel with a title bar. */
export function HomeDialog({
  open,
  onClose,
  title,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <Modal open={open} onClose={onClose} label={title} hideClose className={cn(wide ? "max-w-[1100px]" : "max-w-[880px]")}>
      <div className="bg-surface flex max-h-[92vh] w-full flex-col overflow-hidden rounded-xl">
        <div className="bd-line flex items-center justify-between gap-4 border-b px-5 py-3">
          <p className="c-ink font-semibold">{title}</p>
          <button
            type="button"
            autoFocus
            onClick={onClose}
            aria-label={homeCopy.videos.close}
            className="c-ink grid h-10 w-10 place-items-center rounded-full hover:bg-[var(--mist)]"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto">{children}</div>
      </div>
    </Modal>
  );
}
