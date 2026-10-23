"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  children: ReactNode;
  className?: string;
  closeLabel?: string;
  /** Hide the default close button (when the content renders its own). */
  hideClose?: boolean;
}

/**
 * Native <dialog> opened with showModal(): the browser traps focus, makes the
 * rest of the page inert and closes on Esc. Focus returns to the trigger.
 */
export function Modal({ open, onClose, label, children, className, closeLabel = "Close", hideClose }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      returnTo.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => {
      document.documentElement.style.overflow = "";
      returnTo.current?.focus?.();
      onCloseRef.current();
    };
    dialog.addEventListener("close", handleClose);
    return () => {
      dialog.removeEventListener("close", handleClose);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      aria-modal="true"
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
      className={cn(
        "m-auto w-[calc(100%-2rem)] max-w-4xl overflow-visible bg-transparent p-0 text-steel-900",
        className,
      )}
    >
      {open && (
        <div className="relative">
          {!hideClose && (
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label={closeLabel}
              className="absolute -top-14 right-0 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X aria-hidden className="size-5" strokeWidth={1.5} />
            </button>
          )}
          {children}
        </div>
      )}
    </dialog>
  );
}
