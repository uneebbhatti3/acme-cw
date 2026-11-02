import { Spinner } from "@/components/ui/spinner";
import { catalogueCopy } from "@/features/catalogue/data/copy";

/** Shown over the dark stage until the PDF and its first pages are ready. */
export function FlipbookLoading() {
  return (
    <div role="status" className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-mist">
      <Spinner aria-hidden className="size-7" />
      <p className="text-sm">{catalogueCopy.viewer.loading}</p>
    </div>
  );
}
