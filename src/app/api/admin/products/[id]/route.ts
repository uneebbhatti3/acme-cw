import { deleteAdminProduct, getAdminProduct, updateAdminProduct } from "@/features/admin/lib/products";
import { denyProductWrite, productNotFound, readProduct, saveFailed } from "@/features/admin/lib/product-route";
import { json } from "@/lib/api";

type Context = RouteContext<"/api/admin/products/[id]">;

/**
 * Updates a product. Same body and errors as POST /api/admin/products, plus
 * 404 not_found. Leave out the image to keep the current one.
 * Responses: 200 { ok, product }.
 */
export async function PUT(request: Request, { params }: Context) {
  const denied = await denyProductWrite(request);
  if (denied) return denied;
  try {
    const current = await getAdminProduct((await params).id);
    if (!current) return productNotFound();
    const body = await readProduct(request, false, current.id);
    if (body instanceof Response) return body;
    const product = await updateAdminProduct(current, body.input, body.image);
    return product ? json({ ok: true, product }) : productNotFound();
  } catch (err) {
    return saveFailed(err, "update");
  }
}

/** Deletes a product and its image. Responses: 200 { ok } | 401 | 403 | 404 not_found | 429 | 500. */
export async function DELETE(request: Request, { params }: Context) {
  const denied = await denyProductWrite(request);
  if (denied) return denied;
  try {
    const deleted = await deleteAdminProduct((await params).id);
    return deleted ? json({ ok: true }) : productNotFound();
  } catch (err) {
    return saveFailed(err, "delete");
  }
}
