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
}: PlaceholderImageProps) {
  const ink = tone === "ink";
  return (
    <Wrapper
      className={cn(
        "relative block overflow-hidden",
        ink ? "bg-night" : "bg-card",
        fill ? "absolute inset-0" : "w-full",
        className,
      )}
      style={fill ? undefined : { aspectRatio: ratio }}
    >
      {/* SVG artwork: next/image adds nothing for vector files. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={placeholderSrc(kind, view, ratio, tone)}
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
            "absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium leading-none",
            ink ? "bg-white/10 text-silver ring-1 ring-white/15" : "bg-card/90 text-foreground shadow-sm ring-1 ring-border",
          )}
        >
          {label ?? `${VIEW_LABELS[view]} view`}
        </span>
      )}
    </Wrapper>
  );
}
