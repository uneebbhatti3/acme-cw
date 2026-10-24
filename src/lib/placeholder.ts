/**
 * Placeholder convention: any value written in [square brackets] is content
 * still to be supplied or confirmed by the client, e.g. "[ACME-HF-205]" or
 * "[140 to 200] mm". Components style these values so they are easy to spot,
 * and the styling disappears as soon as the real value replaces them.
 */
export function isPlaceholder(value: string | undefined | null) {
  return !!value && /\[[^\]]+\]/.test(value);
}

/** The value without brackets, for search and structured data. */
export function stripBrackets(value: string) {
  return value.replace(/[[\]]/g, "");
}
