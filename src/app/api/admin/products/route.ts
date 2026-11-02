import { createAdminProduct } from "@/features/admin/lib/products";
import { denyProductWrite, readProduct, saveFailed } from "@/features/admin/lib/product-route";
import { json } from "@/lib/api";

/**
 * Uploads a new product. Needs an admin session.
 * Body: multipart/form-data with image (file), name, model, title, categorySlug,
 * description and one or more sizes.
 * Responses: 201 { ok, product } | 400 invalid_request | 401 unauthorized |
 * 403 forbidden | 413 too_large | 422 validation_failed { errors } |
 * 429 rate_limited | 500 server_error.
 */
export async function POST(request: Request) {
  const denied = await denyProductWrite(request);
  if (denied) return denied;
  try {
    const body = await readProduct(request, true);
    if (body instanceof Response) return body;
    return json({ ok: true, product: await createAdminProduct(body.input, body.image!) }, 201);
  } catch (err) {
    return saveFailed(err, "create");
  }
}
