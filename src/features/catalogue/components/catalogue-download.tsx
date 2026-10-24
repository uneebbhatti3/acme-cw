import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { catalogueCopy } from "@/features/catalogue/data/copy";

/** Download button and file note, shown inside the page hero. */
export function CatalogueDownload() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <Button asChild variant="inverse" size="lg">
        <a href={siteConfig.catalogueFile} download>
          <Download aria-hidden strokeWidth={1.75} />
          {catalogueCopy.download}
        </a>
      </Button>
      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
        <FileText aria-hidden className="size-4" strokeWidth={1.5} />
        {catalogueCopy.fileNote}
      </span>
    </div>
  );
}
