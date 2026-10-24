import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { Pending } from "@/components/ui/pending";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { productDetailCopy as pc } from "@/features/products/data/copy";
import { quoteHref } from "@/features/products/lib/quote-href";
import type { Product } from "@/features/products/types";
import { FeatureList, SpecTable } from "../spec-table";

/** Overview and features beside the full technical details, then the size and variant table. */
export function ProductSpecs({ product }: { product: Product }) {
  const technical = [
    { label: pc.sku, value: product.sku },
    { label: pc.type, value: product.type },
    { label: pc.material, value: product.material },
    { label: pc.finish, value: product.finish },
    ...product.specs,
  ];
  const withDescription = product.variants.some((v) => v.description);

  return (
    <Band tone="grey" label={pc.detailsLabel}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-h2">{pc.overview}</h2>
            <div className="mt-4 space-y-4 text-[1.0625rem] leading-relaxed">
              {product.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <h3 className="mt-8 text-base font-semibold">{pc.features}</h3>
            <div className="mt-3">
              <FeatureList features={product.features} />
            </div>
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-h2">{pc.specs}</h2>
            <div className="mt-4">
              <SpecTable specs={technical} caption={pc.specs} />
            </div>
          </div>
        </div>

        {product.variants.length > 0 && (
          <div className="mt-12 md:mt-16">
            <h2 id="variants" className="text-h2">
              {pc.variants}
            </h2>
            <p className="mt-2 text-muted-foreground">{pc.variantsIntro}</p>
            <div className="mt-5 overflow-x-auto rounded-lg border bg-white">
              <Table aria-labelledby="variants">
                <TableHeader>
                  <TableRow className="bg-grey-50 hover:bg-grey-50">
                    <TableHead className="px-4 sm:px-5">{pc.variantsHead.sku}</TableHead>
                    <TableHead className="px-4 sm:px-5">{pc.variantsHead.size}</TableHead>
                    {withDescription && <TableHead className="px-4 sm:px-5">{pc.variantsHead.description}</TableHead>}
                    <TableHead className="px-4 text-right sm:px-5">
                      <span className="sr-only">{pc.variantsHead.action}</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.variants.map((v) => (
                    <TableRow key={v.sku}>
                      <TableCell className="px-4 py-3 font-mono text-sm text-navy sm:px-5">
                        <Pending value={v.sku} />
                      </TableCell>
                      <TableCell className="px-4 py-3 text-[0.9375rem] sm:px-5">
                        <Pending value={v.size} />
                      </TableCell>
                      {withDescription && (
                        <TableCell className="whitespace-normal px-4 py-3 text-[0.9375rem] text-muted-foreground sm:px-5">
                          {v.description}
                        </TableCell>
                      )}
                      <TableCell className="px-4 py-2 text-right sm:px-5">
                        <Link
                          href={quoteHref(v.sku)}
                          aria-label={pc.variantQuote(v.sku)}
                          className="inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-link hover:underline"
                        >
                          {pc.variantsHead.action}
                          <ArrowRight aria-hidden className="size-4" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </Container>
    </Band>
  );
}
