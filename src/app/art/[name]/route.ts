import { KINDS, parsePlaceholderName, placeholderSrc, placeholderSvg, RATIOS, TONES, VIEWS } from "@/components/media/placeholder-svg";

/** Every combination is prerendered at build time as a static SVG file. */
export function generateStaticParams() {
  return KINDS.flatMap((k) =>
    VIEWS.flatMap((v) => RATIOS.flatMap((r) => TONES.map((t) => ({ name: placeholderSrc(k, v, r, t).slice(5) })))),
  );
}

export async function GET(_req: Request, { params }: RouteContext<"/art/[name]">) {
  const parsed = parsePlaceholderName((await params).name);
  if (!parsed) return new Response("Not found", { status: 404 });
  return new Response(placeholderSvg(parsed.kind, parsed.view, parsed.ratio, parsed.tone), {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
