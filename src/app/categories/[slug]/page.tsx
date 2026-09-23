import { CategoryDetailPage } from "@/features/categories/components/category-detail-page";
import {
  generateCategoryMetadata,
  generateCategoryStaticParams,
} from "@/features/categories/healper/get-category-page-data";
import type { CategoryPageParams } from "@/features/categories/types/category";

export const generateMetadata = generateCategoryMetadata;
export const generateStaticParams = generateCategoryStaticParams;

export default function Page({ params }: { params: CategoryPageParams }) {
  return <CategoryDetailPage params={params} />;
}
