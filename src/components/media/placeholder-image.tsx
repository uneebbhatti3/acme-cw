import { preload } from "react-dom";
import { mediaCopy } from "@/data/copy";
import { cn } from "@/lib/utils";
import type { InstrumentKind, ViewType } from "@/types";
import { placeholderSrc, type Ratio, type Tone } from "./placeholder-svg";

export type { Ratio };

export const VIEW_LABELS: Record<ViewType, string> = {
  front: "Front",
  side: "Side",
  top: "Top",
  back: "Back",
  detail: "Detail",
  angle: "Angle",
};

export interface PlaceholderImageProps {
  kind?: InstrumentKind;
  view?: ViewType;
  ratio?: Ratio;
  showLabel?: boolean;
  label?: string;
  /** Kept for API compatibility; the artwork is shared per kind and view. */
  seed?: string;
  /** Accessible description. Empty string marks the art as decorative. */
  alt?: string;
  tone?: Tone;
  className?: string;
  /** Fill the parent box instead of setting a ratio. */
  fill?: boolean;
  /** Use "span" inside buttons and other phrasing content. */
  as?: "div" | "span";
  /** Load immediately (main product image). Everything else lazy-loads. */
  priority?: boolean;
  /** Show a small "Placeholder image" tag so the art is never mistaken for a final photo. */
  marked?: boolean;
}

/**
 * Generated placeholder art (see placeholder-svg.ts), shown as an image so it
 * lazy-loads and caches like the real photos that will replace it.
 */
export function PlaceholderImage({
  kind = "generic",
  view = "front",
  ratio = "4/3",
  showLabel = false,
  label,
  alt = "",
  tone = "steel",
  className,
  fill = false,
  as: Wrapper = "div",
  priority = false,
  marked = false,
}: PlaceholderImageProps) {
  const ink = tone !== "steel";
  const src = placeholderSrc(kind, view, ratio, tone);
  // Above-the-fold art: tell the browser about it from the document head, before it parses the body.
  if (priority) preload(src, { as: "image", fetchPriority: "high" });
  return (
    <Wrapper
      className={cn(
        "relative block overflow-hidden",
        tone === "clear" ? "bg-transparent" : ink ? "bg-navy" : "bg-white",
        fill ? "absolute inset-0" : "w-full",
        className,
      )}
      style={fill ? undefined : { aspectRatio: ratio }}
    >
      {/* SVG artwork: next/image adds nothing for vector files. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        draggable={false}
        className="absolute inset-0 size-full object-cover"
      />
      {showLabel && (
        <span
          className={cn(
            "absolute left-3 top-3 rounded-sm px-2 py-1 text-xs font-medium leading-none",
            ink ? "bg-white/10 text-white ring-1 ring-white/15" : "bg-white/90 text-foreground ring-1 ring-border",
          )}
        >
          {label ?? `${VIEW_LABELS[view]} view`}
        </span>
      )}
      {marked && (
        <span className="pointer-events-none absolute bottom-2 left-2 rounded-sm border border-dashed border-slate/40 bg-white/90 px-1.5 py-0.5 text-[0.6875rem] font-medium leading-none text-slate">
          {mediaCopy.imagePending}
        </span>
      )}
    </Wrapper>
  );
}
