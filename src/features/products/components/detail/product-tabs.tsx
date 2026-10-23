import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { productDetailCopy as pc } from "@/features/products/data/copy";
import type { Product } from "@/features/products/types";
import { SpecTable } from "../spec-table";

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="measure space-y-4 text-lg leading-relaxed">
      {items.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

/** Description, full specifications, packaging and care, one tab each (arrow keys move between tabs). */
export function ProductTabs({ product }: { product: Product }) {
  const tabs = [
    { id: "description", label: pc.tabs.description, content: <Paragraphs items={product.description.split(/\n{2,}/)} /> },
    { id: "specifications", label: pc.tabs.specifications, content: <SpecTable specs={product.specs} code={product.code} codeLabel={pc.code} caption={pc.tabs.specifications} /> },
    { id: "packaging", label: pc.tabs.packaging, content: <Paragraphs items={pc.packaging} /> },
    { id: "care", label: pc.tabs.care, content: <Paragraphs items={pc.care} /> },
  ];
  return (
    <Band tone="white" label={pc.detailsLabel}>
      <Container>
        <Tabs defaultValue="description" className="max-w-4xl gap-8">
          <TabsList className="scrollbar-none h-auto w-full justify-start gap-1 overflow-x-auto rounded-full border bg-background p-1 sm:w-auto">
            {tabs.map((t) => (
              <TabsTrigger
                key={t.id}
                value={t.id}
                className="h-10 flex-none rounded-full px-4 text-[0.92rem] font-semibold text-foreground/70 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:bg-ink data-[state=active]:text-white data-[state=active]:shadow-none"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((t) => (
            <TabsContent key={t.id} value={t.id} className="art-in">
              {t.content}
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </Band>
  );
}
