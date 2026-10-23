import Image from "next/image";
import type { InstrumentKind } from "@/types";
import type { ProductImage } from "@/features/products/types";
import { PlaceholderImage, type Ratio } from "./placeholder-image";

/**
 * Shows a real photo when `src` is set (next/image with sizes), otherwise the
 * generated placeholder for the same view. Keeps the aspect ratio reserved.
 */
export function ProductVisual({
  image,
  kind,
  seed,
  ratio = "4/3",
  sizes,
  priority = false,
  showLabel = false,
  className,
}: {
  image: ProductImage;
  kind: InstrumentKind;
  seed?: string;
  ratio?: Ratio;
  sizes: string;
  priority?: boolean;
  showLabel?: boolean;
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
