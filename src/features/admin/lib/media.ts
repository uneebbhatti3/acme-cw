/** Product image rules and checks, shared by the form (client) and the server action. */

export const imageRules = {
  maxMb: 4,
  accept: "image/jpeg,image/png,image/webp,image/avif",
};

const ascii = (b: Uint8Array, from: number, to: number) => String.fromCharCode(...b.slice(from, to));

/** File signatures, so a file is accepted for what it is, not for its name. */
const SIGNATURES: { ext: string; type: string; test: (b: Uint8Array) => boolean }[] = [
  { ext: "jpg", type: "image/jpeg", test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { ext: "png", type: "image/png", test: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 },
  { ext: "webp", type: "image/webp", test: (b) => ascii(b, 0, 4) === "RIFF" && ascii(b, 8, 12) === "WEBP" },
  { ext: "avif", type: "image/avif", test: (b) => ascii(b, 4, 12) === "ftypavif" },
];

export function detectImage(bytes: Uint8Array) {
  return SIGNATURES.find((s) => s.test(bytes)) ?? null;
}

export function imageType(file: string) {
  const ext = file.split(".").pop() ?? "";
  return SIGNATURES.find((s) => s.ext === ext)?.type ?? null;
}

const IMAGE_PATH = "/media/products/";

/** The URL stored in the database. The route at this path serves the file from the private bucket. */
export function productImageUrl(key: string) {
  return `${IMAGE_PATH}${key}`;
}

export function productImageKey(url: string) {
  return url.slice(IMAGE_PATH.length);
}
