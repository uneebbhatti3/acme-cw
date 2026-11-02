import { Container } from "@/components/layout/container";
import { ProductListLoading } from "./product-list-loading";

/** Suspense fallback for /products/<category>/<slug>. */
export function ProductDetailLoading() {
  return (
    <div data-solid-header className="bg-white pb-16 pt-[calc(var(--header-h)+1.5rem)] md:pt-[calc(var(--header-h)+2rem)]">
      <Container>
        <ProductListLoading />
      </Container>
    </div>
  );
}
