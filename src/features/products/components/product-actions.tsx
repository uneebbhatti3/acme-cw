"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { buttonClasses } from "@/components/ui/button";
import { productDetailCopy } from "@/features/products/data/copy";
import { cn } from "@/lib/utils";

/** Native share sheet where available, otherwise copies the link. */
export function ShareButton({ title, className }: { title: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={buttonClasses({ variant: "quiet", className })}
      onClick={async () => {
        const url = window.location.href;
        if (navigator.share) {
          try {
            await navigator.share({ title, url });
            return;
          } catch {
            // Dismissed by the user; fall through to copy.
          }
        }
        await navigator.clipboard?.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }}
    >
      {copied ? <Check aria-hidden className="size-4" strokeWidth={1.5} /> : <Share2 aria-hidden className="size-4" strokeWidth={1.5} />}
      <span aria-live="polite">{copied ? productDetailCopy.copied : productDetailCopy.share}</span>
    </button>
  );
}

export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard?.writeText(code);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }}
      aria-label={copied ? productDetailCopy.codeCopied : `${productDetailCopy.copyCode} ${code}`}
      title={productDetailCopy.copyCode}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md transition-colors",
        copied ? "text-accent-strong" : "text-steel-600 hover:bg-steel-100 hover:text-ink",
      )}
    >
      {copied ? <Check aria-hidden className="size-4" strokeWidth={1.75} /> : <Copy aria-hidden className="size-4" strokeWidth={1.5} />}
    </button>
  );
}
