import { connection } from "next/server";
import { imageType } from "@/features/admin/lib/media";
import { getProductImage } from "@/lib/storage";

/** Product images from the private bucket. Public, like the product pages they belong to. */
export async function GET(_req: Request, { params }: RouteContext<"/media/products/[file]">) {
  await connection();
  const { file } = await params;
  const type = imageType(file);
  const content = /^[\w-]+\.[a-z]+$/.test(file) && type ? await getProductImage(file) : null;
  if (!content || !type) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(content), {
    headers: {
      "Content-Type": type,
      // Each upload gets a new file name, so a stored file never changes.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
