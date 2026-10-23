import Link from "next/link";
import { homeCopy } from "@/features/home/data/copy";
import type { HingedKind } from "@/features/home/types";
import { getProductBySlug, productHref } from "@/features/products/lib/content";
import { HomeContainer } from "../home-container";
import { HomeHeading } from "../home-heading";
import { SpotlightViewer } from "./spotlight-viewer";

/** One product shown from every angle, with its key specifications. */
export function ProductSpotlight() {
  const copy = homeCopy.spotlight;
  const product = getProductBySlug(copy.productSlug);
  if (!product) return null;
  const variant: HingedKind = product.kind && product.kind !== "retractor" ? product.kind : "forceps";

  return (
    <section className="bg-surface bd-line border-y py-24 lg:py-32">
      <HomeContainer>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SpotlightViewer name={product.name} variant={variant} code={product.code} />
          </div>

          <div className="lg:col-span-5">
            <HomeHeading>{copy.title}</HomeHeading>
            <p className="c-steel mt-5 text-lg leading-relaxed">{copy.text}</p>
            <div className="bd-line mt-9 border-t pt-7">
              <p className="c-steel text-sm">{product.code}</p>
              <h3 className="font-display c-ink mt-1 text-3xl leading-tight">{product.name}</h3>
              <p className="c-steel mt-3 leading-relaxed">{product.shortDescription}</p>
              <dl className="mt-6 text-[0.95rem]">
                {product.specs.slice(0, 5).map((s) => (
                  <div key={s.label} className="bd-line grid grid-cols-[8.5rem_1fr] gap-4 border-b py-3">
                    <dt className="c-steel">{s.label}</dt>
                    <dd className="c-ink font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link href={`/contact?product=${product.slug}`} className="btn btn-primary">
                  {copy.quote}
                </Link>
                <Link href={productHref(product)} className="tlink c-ink font-semibold">
                  {copy.view}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </HomeContainer>
    </section>
  );
}
