import { NotFoundView } from "@/features/not-found/components/not-found-view";
import { notFoundMetadata } from "@/features/not-found/data/seo";

export const metadata = notFoundMetadata;

export default function NotFound() {
  return <NotFoundView />;
}
