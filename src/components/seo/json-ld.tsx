import { jsonLdString } from "@/lib/seo";

/** Structured data for search engines. Pass one object or several. */
export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(data) }} />;
}
