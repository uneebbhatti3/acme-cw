import type { Metadata } from "next";
import { SearchPage as SearchFeaturePage } from "@/features/search/components/search-page";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search across Acme Commercial Ways products, instrument categories, and site pages. Find surgical scissors, dental forceps, needle holders, and more.",
  robots: { index: false },
};

export default function SearchPage() {
  return <SearchFeaturePage />;
}
