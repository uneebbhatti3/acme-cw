import "server-only";
import { adminCopy } from "@/features/admin/data/copy";
import { getCurrentAdmin } from "@/features/admin/lib/auth";
import { detectImage, imageRules } from "@/features/admin/lib/media";
import { modelTaken, UNIQUE_VIOLATION, type ImageUpload } from "@/features/admin/lib/products";
import { readProductForm } from "@/features/admin/lib/schema";
import { getCategory } from "@/features/products/lib/content";
import { isSameOrigin, json, tooManyRequests } from "@/lib/api";
import { rateLimit } from "@/lib/rate-limit";

/** Shared by the /api/admin/products routes. Every error body is { ok: false, error, message, errors? }. */

const e = adminCopy.form.errors;

/** The image limit plus room for the text fields. Vercel refuses bodies over 4.5 MB before they reach the app. */
const MAX_BODY_BYTES = (imageRules.maxMb + 1) * 1024 * 1024;

function fail(status: number, error: string, message: string, errors?: Record<string, string>) {
  return json({ ok: false, error, message, errors }, status);
}

export const productNotFound = () => fail(404, "not_found", e.notFound);

/** The response refusing this write, or null when it may go ahead. Each write route calls this first. */
export async function denyProductWrite(request: Request) {
  if (!isSameOrigin(request)) return fail(403, "forbidden", e.forbidden);
  const admin = await getCurrentAdmin();
  if (!admin) return fail(401, "unauthorized", e.unauthorized);
  const limit = await rateLimit("adminSave", admin.id);
  return limit.ok ? null : tooManyRequests(limit.retryAfter);
}

/** Reads and checks the image field. `required` is false when editing, where an empty field keeps the old image. */
async function readImage(form: FormData, required: boolean): Promise<{ image?: ImageUpload; error?: string }> {
  const file = form.get("image");
  if (!(file instanceof File) || file.size === 0) return required ? { error: e.image } : {};
  if (file.size > imageRules.maxMb * 1024 * 1024) return { error: e.imageSize };
  const content = Buffer.from(await file.arrayBuffer());
  const kind = detectImage(content.subarray(0, 16));
  if (!kind) return { error: e.imageType };
  return { image: { ext: kind.ext, type: kind.type, content } };
}

/**
 * Reads a multipart product body. Returns the checked values, or the error
 * response to send. `id` is the product being edited, so it can keep its model.
 */
export async function readProduct(request: Request, imageRequired: boolean, id?: string) {
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) return fail(413, "too_large", e.imageSize);
  const form = await request.formData().catch(() => null);
  if (!form) return fail(400, "invalid_request", e.invalidRequest);

  const parsed = readProductForm(form);
  const errors: Record<string, string> = {};
  if (!parsed.success) {
    for (const issue of parsed.error.issues) errors[String(issue.path[0])] ??= issue.message;
  } else {
    if (!getCategory(parsed.data.categorySlug)) errors.categorySlug = e.category;
    if (await modelTaken(parsed.data.model, id)) errors.model = e.modelTaken;
  }
  const { image, error } = await readImage(form, imageRequired);
  if (error) errors.image = error;

  if (Object.keys(errors).length || !parsed.data) return fail(422, "validation_failed", adminCopy.form.fixErrors, errors);
  return { input: parsed.data, image };
}

/** Two saves can race past the model check; the database rule catches the second. */
export function saveFailed(err: unknown, action: "create" | "update" | "delete") {
  if ((err as { code?: string }).code === UNIQUE_VIOLATION) {
    return fail(422, "validation_failed", adminCopy.form.fixErrors, { model: e.modelTaken });
  }
  console.error(`[admin] Could not ${action} product`, err);
  return fail(500, "server_error", action === "delete" ? e.deleteFailed : e.storage);
}
