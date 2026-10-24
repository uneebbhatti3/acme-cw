import { z } from "zod";
import { quoteCopy } from "@/features/quote/data/copy";
import { attachmentRules, buyerTypes, maxLines } from "@/features/quote/data/options";

const e = quoteCopy.errors;

/**
 * Enquiry rules, shared by the form (client) and /api/quote (server), so both
 * validate the same way. `kind` is "quote" for the full quote form and
 * "general" for the short form on the contact page.
 */
export const enquirySchema = z
  .object({
    kind: z.enum(["quote", "general"]),
    name: z.string().trim().min(2, e.name).max(100),
    company: z.string().trim().max(120),
    email: z.string().trim().max(160).email(e.email),
    phone: z.string().trim().max(40),
    country: z.string().trim().min(2, e.country).max(80),
    buyerType: z.string().trim().max(60),
    items: z
      .array(z.object({ product: z.string().trim().max(160), quantity: z.string().trim().max(60) }))
      .max(maxLines),
    message: z.string().trim().max(5000),
    consent: z.boolean().refine((v) => v, e.consent),
    /** Honeypot: hidden from people, so any value means a bot. */
    website: z.string().max(200),
    /** Time the form was first shown (ms since epoch), for the fill-time check. */
    startedAt: z.number(),
    /** Cloudflare Turnstile token, when enabled. */
    captcha: z.string().max(4096),
  })
  .superRefine((v, ctx) => {
    if (v.kind === "quote") {
      if (v.company.length < 2) ctx.addIssue({ code: "custom", path: ["company"], message: e.company });
      if (!(buyerTypes as readonly string[]).includes(v.buyerType)) ctx.addIssue({ code: "custom", path: ["buyerType"], message: e.buyerType });
      const hasProduct = v.items.some((i) => i.product.length > 0);
      if (!hasProduct && v.message.length < 10) ctx.addIssue({ code: "custom", path: ["items"], message: e.products });
    } else if (v.message.length < 10) {
      ctx.addIssue({ code: "custom", path: ["message"], message: e.message });
    }
  });

export type EnquiryValues = z.infer<typeof enquirySchema>;

/** Checks a set of attachments against the rules. Returns an error message, or null. */
export function checkAttachments(files: { name: string; size: number }[]): string | null {
  if (files.length > attachmentRules.maxFiles) return e.fileCount(attachmentRules.maxFiles);
  for (const f of files) {
    const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
    if (!(attachmentRules.extensions as readonly string[]).includes(ext)) return e.fileType(f.name);
  }
  const total = files.reduce((n, f) => n + f.size, 0);
  if (total > attachmentRules.maxTotalMb * 1024 * 1024) return e.fileSize(attachmentRules.maxTotalMb);
  return null;
}
