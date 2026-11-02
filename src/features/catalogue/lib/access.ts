import "server-only";
import { createHmac, randomInt, timingSafeEqual } from "node:crypto";

/**
 * Download codes and links, signed with CATALOGUE_SECRET. Nothing is stored:
 * the browser holds a signed "challenge" that proves which code was sent, without
 * revealing it. The code stays valid until it expires.
 */

const CODE_MINUTES = 15;
const LINK_MINUTES = 5;

interface Challenge {
  kind: "challenge";
  slug: string;
  email: string;
  expires: number;
  proof: string;
}

interface DownloadLink {
  kind: "download";
  slug: string;
  expires: number;
}

function secret() {
  const value = process.env.CATALOGUE_SECRET;
  if (!value) throw new Error("CATALOGUE_SECRET is not set");
  return value;
}

const hmac = (text: string) => createHmac("sha256", secret()).update(text).digest("base64url");

function sameText(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function sign(payload: Challenge | DownloadLink) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${hmac(body)}`;
}

function read(token: string) {
  const [body, signature] = token.split(".");
  if (!body || !signature || !sameText(hmac(body), signature)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as Challenge | DownloadLink;
    return payload.expires > Date.now() ? payload : null;
  } catch {
    return null;
  }
}

const proofOf = (slug: string, email: string, code: string, expires: number) => hmac(`code:${slug}:${email}:${code}:${expires}`);

export function createCode(slug: string, email: string) {
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const expires = Date.now() + CODE_MINUTES * 60 * 1000;
  return { code, challenge: sign({ kind: "challenge", slug, email, expires, proof: proofOf(slug, email, code, expires) }) };
}

/** Who a challenge belongs to, for the rate limit. Null when it is forged or expired. */
export function readChallenge(token: string) {
  const payload = read(token);
  return payload?.kind === "challenge" ? payload : null;
}

export function checkCode(challenge: Challenge, code: string) {
  return sameText(proofOf(challenge.slug, challenge.email, code, challenge.expires), challenge.proof);
}

export function createDownloadLink(slug: string) {
  const token = sign({ kind: "download", slug, expires: Date.now() + LINK_MINUTES * 60 * 1000 });
  return `/api/catalogue/download?token=${encodeURIComponent(token)}`;
}

export function readDownloadLink(token: string) {
  const payload = read(token);
  return payload?.kind === "download" ? payload.slug : null;
}
