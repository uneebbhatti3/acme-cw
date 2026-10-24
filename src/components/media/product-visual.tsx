import Image from "next/image";
import type { InstrumentKind } from "@/types";
import type { ProductImage } from "@/features/products/types";
import { PRODUCT_RATIO } from "@/config/media";
import { PlaceholderImage, type Ratio } from "./placeholder-image";

/**
 * Shows a real photo when `src` is set, otherwise the generated placeholder
 * for the same view. Photos are letterboxed (object-contain) on the white
 * stage inside a fixed ratio, so a photo of any shape never breaks the layout.
 * next/image serves AVIF/WebP at the width `sizes` asks for.
 */
export function ProductVisual({
  image,
  kind,
  seed,
  ratio = PRODUCT_RATIO,
  sizes,
  priority = false,
  showLabel = false,
  marked = true,
  className,
}: {
  image: ProductImage;
  kind: InstrumentKind;
  seed?: string;
  ratio?: Ratio;
  sizes: string;
  priority?: boolean;
  showLabel?: boolean;
  /** Tag placeholder art as "Placeholder image". */
  marked?: boolean;
  className?: string;
}) {
  if (!image.src) {
    return (
      <PlaceholderImage
        as="span"
        kind={kind}
        view={image.view}
        ratio={ratio}
        seed={seed}
        alt={image.alt}
        showLabel={showLabel}
        label={image.label}
        priority={priority}
        marked={marked}
        className={className}
      />
    );
  }
  return (
    <span className={`relative block w-full overflow-hidden bg-white ${className ?? ""}`} style={{ aspectRatio: ratio }}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-contain" />
    </span>
  );
}
