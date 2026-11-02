import { z } from "zod";
import { checkCode, createDownloadLink, readChallenge } from "@/features/catalogue/lib/access";
import { isSameOrigin, json } from "@/lib/api";

const schema = z.object({ challenge: z.string().max(1000), code: z.string().regex(/^\d{6}$/) });

/** Swaps a correct code for a short-lived download link. Responses: 200 { ok, url } | 4xx { ok: false, error }. */
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return json({ ok: false, error: "forbidden" }, 403);

  const parsed = schema.safeParse(await request.json().catch(() => null));
  const challenge = parsed.success ? readChallenge(parsed.data.challenge) : null;
  if (!parsed.success || !challenge) return json({ ok: false, error: "wrong_code" }, 400);

  if (!checkCode(challenge, parsed.data.code)) return json({ ok: false, error: "wrong_code" }, 400);
  return json({ ok: true, url: createDownloadLink(challenge.slug) });
}
