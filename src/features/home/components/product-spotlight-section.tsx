import { SectionHeader } from "@/components/common/section-header";
import { ProductCard } from "@/features/home/components/product-card";
import { featuredProducts } from "@/features/products/data/featured-products";

export function ProductSpotlightSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeader
            eyebrow="Best sellers"
            title="Proven catalog staples."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {featuredProducts.slice(0, 2).map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader eyebrow="New arrivals" title="Recent additions." />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {featuredProducts.slice(2, 4).map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
