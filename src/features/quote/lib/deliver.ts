import { siteConfig } from "@/config/site";
import type { EnquiryValues } from "./schema";

/*
 * Server only. Sends a validated enquiry to the company. Two channels, either
 * or both, set with environment variables (see .env.example):
 *
 *   Email via Resend:  RESEND_API_KEY, QUOTE_TO_EMAIL, QUOTE_FROM_EMAIL
 *   CRM / automation:  QUOTE_WEBHOOK_URL (+ optional QUOTE_WEBHOOK_SECRET)
 *
 * QUOTE_DELIVERY=log accepts and logs enquiries without sending them, for
 * preview deployments only. With nothing configured, enquiries are refused,
 * so a request is never reported as sent when it was not.
 */

export interface Attachment {
  filename: string;
  content: Buffer;
  type: string;
}

export type DeliveryResult = { ok: true; preview: boolean } | { ok: false; reason: "not_configured" | "failed" };

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function summary(v: EnquiryValues) {
  return [
    ["Type", v.kind === "quote" ? "Quotation request" : "General enquiry"],
    ["Name", v.name],
    ["Company", v.company],
    ["Email", v.email],
    ["Phone", v.phone],
    ["Country", v.country],
    ["Buyer type", v.buyerType],
  ].filter(([, value]) => value) as [string, string][];
}

function textBody(v: EnquiryValues, ref: string, files: Attachment[]) {
  const lines = [`Reference: ${ref}`, "", ...summary(v).map(([k, val]) => `${k}: ${val}`)];
  const items = v.items.filter((i) => i.product);
  if (items.length) lines.push("", "Products:", ...items.map((i, n) => `${n + 1}. ${i.product}${i.quantity ? ` | Qty: ${i.quantity}` : ""}`));
  if (v.message) lines.push("", v.kind === "quote" ? "Additional requirements:" : "Message:", v.message);
  if (files.length) lines.push("", `Attachments: ${files.map((f) => f.filename).join(", ")}`);
  return lines.join("\n");
}

function htmlBody(v: EnquiryValues, ref: string, files: Attachment[]) {
  const row = (k: string, val: string) =>
    `<tr><th align="left" style="padding:6px 12px 6px 0;color:#4a5869;font-weight:500;vertical-align:top">${esc(k)}</th><td style="padding:6px 0">${esc(val)}</td></tr>`;
  const items = v.items.filter((i) => i.product);
  return `<div style="font-family:Arial,sans-serif;font-size:14px;color:#0f1b2d">
<p style="font-size:16px;font-weight:600">${v.kind === "quote" ? "New quotation request" : "New enquiry"} <span style="color:#4a5869">${esc(ref)}</span></p>
<table cellspacing="0" cellpadding="0">${summary(v).map(([k, val]) => row(k, val)).join("")}</table>
${
  items.length
    ? `<p style="margin-top:20px;font-weight:600">Products</p><table cellspacing="0" cellpadding="0" style="border-collapse:collapse">
<tr><th align="left" style="padding:6px 16px 6px 0;border-bottom:1px solid #dfe5ec">Product / SKU</th><th align="left" style="padding:6px 0;border-bottom:1px solid #dfe5ec">Quantity</th></tr>
${items.map((i) => `<tr><td style="padding:6px 16px 6px 0">${esc(i.product)}</td><td style="padding:6px 0">${esc(i.quantity)}</td></tr>`).join("")}</table>`
    : ""
}
${v.message ? `<p style="margin-top:20px;font-weight:600">${v.kind === "quote" ? "Additional requirements" : "Message"}</p><p style="white-space:pre-wrap">${esc(v.message)}</p>` : ""}
${files.length ? `<p style="margin-top:20px;color:#4a5869">Attachments: ${files.map((f) => esc(f.filename)).join(", ")}</p>` : ""}
<p style="margin-top:24px;color:#4a5869;font-size:12px">Sent from the enquiry form on ${esc(siteConfig.url)}. Reply to this email to answer the buyer.</p>
</div>`;
}

async function sendEmail(v: EnquiryValues, ref: string, files: Attachment[]) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL || `${siteConfig.brandName} website <onboarding@resend.dev>`;
  if (!key || !to) return null;
  const subject = `${v.kind === "quote" ? "Quote request" : "Enquiry"} ${ref}: ${v.company || v.name} (${v.country})`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": ref },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: v.email,
      subject,
      text: textBody(v, ref, files),
      html: htmlBody(v, ref, files),
      attachments: files.map((f) => ({ filename: f.filename, content: f.content.toString("base64") })),
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) console.error("[quote] Resend error", res.status, await res.text().catch(() => ""));
  return res.ok;
}

async function sendWebhook(v: EnquiryValues, ref: string, files: Attachment[]) {
  const url = process.env.QUOTE_WEBHOOK_URL;
  if (!url) return null;
  const { kind, name, company, email, phone, country, buyerType, items, message, consent } = v;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.QUOTE_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.QUOTE_WEBHOOK_SECRET}` } : {}),
    },
    body: JSON.stringify({
      reference: ref,
      receivedAt: new Date().toISOString(),
      source: siteConfig.url,
      kind,
      name,
      company,
      email,
      phone,
      country,
      buyerType,
      items: items.filter((i) => i.product),
      message,
      consent,
      attachments: files.map((f) => ({ filename: f.filename, type: f.type, size: f.content.length, contentBase64: f.content.toString("base64") })),
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) console.error("[quote] Webhook error", res.status);
  return res.ok;
}

export async function deliverEnquiry(v: EnquiryValues, ref: string, files: Attachment[]): Promise<DeliveryResult> {
  const results = await Promise.all([
    sendEmail(v, ref, files).catch((err) => (console.error("[quote] Email failed", err), false)),
    sendWebhook(v, ref, files).catch((err) => (console.error("[quote] Webhook failed", err), false)),
  ]);
  const attempted = results.filter((r) => r !== null);
  if (attempted.length === 0) {
    if (process.env.QUOTE_DELIVERY === "log") {
      console.info(`[quote] ${ref} (preview, not delivered)\n${textBody(v, ref, files)}`);
      return { ok: true, preview: true };
    }
    return { ok: false, reason: "not_configured" };
  }
  // Delivered if at least one channel accepted it.
  return attempted.some(Boolean) ? { ok: true, preview: false } : { ok: false, reason: "failed" };
}
