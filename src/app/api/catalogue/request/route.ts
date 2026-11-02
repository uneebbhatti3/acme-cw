import { z } from "zod";
import { getCatalogue } from "@/features/catalogue/data/catalogues";
import { createCode } from "@/features/catalogue/lib/access";
import { sendCatalogueCode } from "@/features/catalogue/lib/send-code";
import { isSameOrigin, json } from "@/lib/api";
import { mailIsConfigured } from "@/lib/mail";

const MIN_FILL_MS = 2000;

const schema = z.object({
  slug: z.string(),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(200),
  company: z.string().trim().max(160).optional().default(""),
  website: z.string().optional().default(""),
  startedAt: z.number(),
});

/**
 * Emails a download code to the visitor, and a notice to the company.
 * Responses: 200 { ok, challenge } | 4xx/5xx { ok: false, error }.
 */
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return json({ ok: false, error: "forbidden" }, 403);

  const parsed = schema.safeParse(await request.json().catch(() => null));
  const catalogue = parsed.success ? getCatalogue(parsed.data.slug) : undefined;
  if (!parsed.success || !catalogue) return json({ ok: false, error: "invalid" }, 400);
  const { name, email, company, website, startedAt } = parsed.data;

  // Bots: filled the hidden field, or submitted faster than a person can. Answer as if accepted.
  const { code, challenge } = createCode(catalogue.slug, email);
  if (website || Date.now() - startedAt < MIN_FILL_MS) return json({ ok: true, challenge });

  if (!mailIsConfigured()) {
    console.error("[catalogue] SMTP_HOST, SMTP_USER and SMTP_PASSWORD are not all set");
    return json({ ok: false, error: "not_configured" }, 503);
  }

  try {
    await sendCatalogueCode(catalogue, { name, email, company }, code);
  } catch (error) {
    console.error("[catalogue] Could not send the code", error);
    return json({ ok: false, error: "send_failed" }, 502);
  }
  return json({ ok: true, challenge });
}
