import { FileWarning, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { catalogueCopy } from "@/features/catalogue/data/copy";

const c = catalogueCopy.viewer;

/** Shown when the 3D book cannot be drawn. The PDF can still be requested. */
export function FlipbookError({ onRequest }: { onRequest: () => void }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <Empty className="max-w-md border-0 text-white">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileWarning aria-hidden className="size-5" strokeWidth={1.5} />
          </EmptyMedia>
          <EmptyTitle className="text-white">{c.errorTitle}</EmptyTitle>
          <EmptyDescription className="text-mist">{c.errorText}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="accent" onClick={onRequest}>
            <Mail aria-hidden strokeWidth={1.75} />
            {catalogueCopy.requestPdf}
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
