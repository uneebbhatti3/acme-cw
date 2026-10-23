"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { productDetailCopy } from "@/features/products/data/copy";
import { cn } from "@/lib/utils";

/** Native share sheet where available, otherwise copies the link. */
export function ShareButton({ title, className }: { title: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      type="button"
      variant="ghost"
      size="lg"
      className={className}
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
      {copied ? <Check aria-hidden strokeWidth={1.75} /> : <Share2 aria-hidden strokeWidth={1.75} />}
      <span aria-live="polite">{copied ? productDetailCopy.copied : productDetailCopy.share}</span>
    </Button>
  );
}

export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard?.writeText(code);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
          }}
          aria-label={copied ? productDetailCopy.codeCopied : `${productDetailCopy.copyCode} ${code}`}
          className={cn(
            "inline-flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            copied ? "text-link" : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          {copied ? <Check aria-hidden className="size-4" strokeWidth={1.75} /> : <Copy aria-hidden className="size-4" strokeWidth={1.5} />}
        </button>
      </TooltipTrigger>
      <TooltipContent>{copied ? productDetailCopy.codeCopied : productDetailCopy.copyCode}</TooltipContent>
    </Tooltip>
  );
}
