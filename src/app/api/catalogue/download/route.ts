import type { NextRequest } from "next/server";
import { getCatalogue } from "@/features/catalogue/data/catalogues";
import { readDownloadLink } from "@/features/catalogue/lib/access";
import { getCatalogueFile } from "@/lib/storage";

/** The only way to the PDFs: a link from a correct code. Streamed, because Vercel limits buffered responses to 4.5 MB. */
export async function GET(request: NextRequest) {
  const slug = readDownloadLink(request.nextUrl.searchParams.get("token") ?? "");
  const catalogue = slug ? getCatalogue(slug) : undefined;
  if (!catalogue) return new Response("This download link is not valid or has expired.", { status: 403 });

  const file = await getCatalogueFile(catalogue.slug);
  if (!file) return new Response("Not found", { status: 404 });

  return new Response(file.stream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="acme-${catalogue.slug}.pdf"`,
      ...(file.size ? { "Content-Length": String(file.size) } : {}),
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
