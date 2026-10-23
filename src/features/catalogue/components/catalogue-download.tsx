import { Download, FileText } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { catalogueCopy } from "@/features/catalogue/data/copy";

/** Download button and file note, shown inside the page hero. */
export function CatalogueDownload() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <a href={siteConfig.catalogueFile} download className={buttonClasses()}>
        <Download aria-hidden className="size-[18px]" strokeWidth={1.5} />
        {catalogueCopy.download}
      </a>
      <span className="inline-flex items-center gap-2 text-sm text-steel-300">
        <FileText aria-hidden className="size-4" strokeWidth={1.5} />
        {catalogueCopy.fileNote}
      </span>
    </div>
  );
}
