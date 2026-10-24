import { Info } from "lucide-react";
import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Pending } from "@/components/ui/pending";
import { siteConfig } from "@/config/site";
import { legalCopy, type LegalDocument } from "@/features/legal/data/content";

/** Renders a legal document: a draft notice, the update date and numbered sections. */
export function LegalPage({ doc, path }: { doc: LegalDocument; path: string }) {
  return (
    <>
      <PageHero title={doc.title} subtitle={doc.intro} crumbs={[{ name: doc.title, href: path }]} />
      <Band defer={false}>
        <Container>
          <div className="max-w-3xl">
            <p className="flex items-start gap-2.5 rounded-md border border-dashed border-grey-300 bg-grey-50 px-4 py-3 text-sm text-muted-foreground">
              <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
              {legalCopy.draftNotice}
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              {legalCopy.updated}: <Pending value={siteConfig.legalUpdated} />
            </p>
            <div className="mt-8 grid gap-8">
              {doc.sections.map((s, i) => (
                <section key={s.heading} aria-labelledby={`s${i}`}>
                  <h2 id={`s${i}`} className="text-h3">
                    {i + 1}. {s.heading}
                  </h2>
                  {s.paragraphs?.map((p) => (
                    <p key={p} className="mt-3 leading-relaxed">
                      <Pending value={p} className="border-none px-0 text-inherit" />
                    </p>
                  ))}
                  {s.list && (
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed">
                      {s.list.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Band>
    </>
  );
}
