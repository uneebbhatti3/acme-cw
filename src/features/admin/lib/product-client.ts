import { adminCopy } from "@/features/admin/data/copy";

/** Browser calls to the /api/admin/products routes. */

const e = adminCopy.form.errors;

export type ApiResult = { ok: true } | { ok: false; status: number; message: string; errors?: Record<string, string> };

async function send(url: string, init: RequestInit, fallback: string): Promise<ApiResult> {
  try {
    const res = await fetch(url, init);
    if (res.ok) return { ok: true };
    // A host's own error page, such as Vercel's 413, is not JSON.
    const body = await res.json().catch(() => null);
    return {
      ok: false,
      status: res.status,
      message: body?.message ?? (res.status === 413 ? e.imageSize : fallback),
      errors: body?.errors,
    };
  } catch {
    return { ok: false, status: 0, message: fallback };
  }
}

/** Creates a product, or updates it when `id` is given. */
export function saveProduct(form: FormData, id?: string) {
  return send(id ? `/api/admin/products/${id}` : "/api/admin/products", { method: id ? "PUT" : "POST", body: form }, e.storage);
}

export function deleteProduct(id: string) {
  return send(`/api/admin/products/${id}`, { method: "DELETE" }, e.deleteFailed);
}
