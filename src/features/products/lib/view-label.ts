import { VIEW_LABELS } from "@/components/media/placeholder-image";
import type { ProductImage } from "@/features/products/types";

export function viewLabel(img: ProductImage) {
  return img.label ?? VIEW_LABELS[img.view];
}
