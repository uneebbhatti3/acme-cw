import { Section } from "@/components/layout/section";
import { Tabs } from "@/components/ui/tabs";
import { productDetailCopy as pc } from "@/features/products/data/copy";
import type { Product } from "@/features/products/types";
import { SpecTable } from "../spec-table";

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="measure space-y-4 leading-relaxed text-steel-900">
      {items.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

/** Description, full specifications, packaging and care, one tab each. */
export function ProductTabs({ product }: { product: Product }) {
  return (
    <Section className="border-t border-steel-100">
      <div className="max-w-4xl">
        <Tabs
          tabs={[
            { label: pc.tabs.description, content: <Paragraphs items={product.description.split(/\n{2,}/)} /> },
            {
              label: pc.tabs.specifications,
              content: <SpecTable specs={product.specs} code={product.code} codeLabel={pc.code} />,
            },
            { label: pc.tabs.packaging, content: <Paragraphs items={pc.packaging} /> },
            { label: pc.tabs.care, content: <Paragraphs items={pc.care} /> },
          ]}
        />
      </div>
    </Section>
  );
}
