import { attachmentRules, minFillSeconds } from "@/features/quote/data/options";
import { deliverEnquiry, type Attachment } from "@/features/quote/lib/deliver";
import { checkAttachments, enquirySchema } from "@/features/quote/lib/schema";
import { rateLimited, verifyCaptcha } from "@/features/quote/lib/spam";

/** Vercel rejects request bodies over 4.5 MB before they reach the function. */
const MAX_BODY = 4.5 * 1024 * 1024;

/** First bytes of the binary formats, to reject files whose extension lies. */
const SIGNATURES: Record<string, number[][]> = {
  pdf: [[0x25, 0x50, 0x44, 0x46]],
  png: [[0x89, 0x50, 0x4e, 0x47]],
  jpg: [[0xff, 0xd8, 0xff]],
  jpeg: [[0xff, 0xd8, 0xff]],
  webp: [[0x52, 0x49, 0x46, 0x46]],
};

function json(body: object, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function reference() {
  const d = new Date();
  const date = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  return `ACW-${date}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
}

/**
 * Receives quote and general enquiries (multipart: a JSON `data` field plus
 * optional `files`), checks them, and delivers them to the company.
 * Responses: 200 { ok, reference, preview } | 4xx/5xx { ok: false, error }.
 */
export async function POST(request: Request) {
  // Same-origin only: the form posts from this site.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return json({ ok: false, error: "forbidden" }, 403);

  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY) return json({ ok: false, error: "too_large" }, 413);

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return json({ ok: false, error: "rate_limited" }, 429);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "invalid" }, 400);
  }

  let raw: unknown;
  try {
    raw = JSON.parse(String(form.get("data") ?? ""));
  } catch {
    return json({ ok: false, error: "invalid" }, 400);
  }
  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    return json({ ok: false, error: "invalid", fields: parsed.error.issues.map((i) => i.path.join(".")) }, 400);
  }
  const values = parsed.data;

  // Bots: filled the hidden field, or submitted faster than a person can. Answer as if accepted.
  if (values.website || Date.now() - values.startedAt < minFillSeconds * 1000) {
    return json({ ok: true, reference: reference(), preview: false });
  }

  if (!(await verifyCaptcha(values.captcha, ip))) return json({ ok: false, error: "captcha" }, 400);

  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  const fileError = values.kind === "quote" ? checkAttachments(files) : files.length ? "files" : null;
  if (fileError) return json({ ok: false, error: "files" }, 400);

  const attachments: Attachment[] = [];
  for (const f of files) {
    const content = Buffer.from(await f.arrayBuffer());
    const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
    const sig = SIGNATURES[ext];
    if (sig && !sig.some((s) => s.every((b, i) => content[i] === b))) return json({ ok: false, error: "files" }, 400);
    // Keep the original name readable but safe for mail clients.
    const filename = f.name.replace(/[^\w.\- ]+/g, "_").slice(-120);
    attachments.push({ filename, content, type: f.type || "application/octet-stream" });
  }
  if (attachments.length > attachmentRules.maxFiles) return json({ ok: false, error: "files" }, 400);

  const ref = reference();
  const result = await deliverEnquiry(values, ref, attachments);
  if (!result.ok) {
    return json({ ok: false, error: result.reason }, result.reason === "not_configured" ? 503 : 502);
  }
  return json({ ok: true, reference: ref, preview: result.preview });
}
