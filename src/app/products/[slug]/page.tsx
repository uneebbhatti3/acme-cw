import { ProductDetailPage } from "@/features/products/components/product-detail-page";
import {
  generateProductMetadata,
  generateProductStaticParams,
} from "@/features/products/healper/get-product-page-data";
import type { ProductPageParams } from "@/features/products/types/product";

export const generateMetadata = generateProductMetadata;
export const generateStaticParams = generateProductStaticParams;

export default function Page({ params }: { params: ProductPageParams }) {
  return <ProductDetailPage params={params} />;
}
