import { Camera } from "lucide-react";
import Image from "next/image";
import { PHOTO_RATIO } from "@/config/media";
import { mediaCopy } from "@/data/copy";
import { cn } from "@/lib/utils";

export interface Photo {
  /** Path under /public. Empty until the client supplies the photo. */
  src?: string;
  alt: string;
  /** What the photo should show, printed on the empty slot as a brief for the photographer. */
  brief: string;
}

/**
 * A reserved space for a factory, process or team photograph. Shows the photo
 * (cropped to fill, fixed ratio) when `src` is set; until then, a labelled
 * empty frame with the photo brief, so the layout is final either way.
 */
export function PhotoSlot({
  photo,
  ratio = PHOTO_RATIO,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  tone = "light",
  className,
}: {
  photo: Photo;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <figure className={cn("relative overflow-hidden rounded-lg", className)} style={{ aspectRatio: ratio }}>
      {photo.src ? (
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div
          role="img"
          aria-label={`${mediaCopy.photoPending}: ${photo.brief}`}
          className={cn(
            "flex size-full flex-col items-center justify-center gap-3 border border-dashed p-6 text-center",
            tone === "dark" ? "border-white/25 bg-navy-soft text-mist" : "border-grey-300 bg-grey-100 text-slate",
          )}
        >
          <Camera aria-hidden className="size-7 opacity-70" strokeWidth={1.5} />
          <span className="text-xs font-semibold uppercase tracking-wider">{mediaCopy.photoPending}</span>
          <span className="max-w-xs text-sm leading-snug">{photo.brief}</span>
        </div>
      )}
    </figure>
  );
}
