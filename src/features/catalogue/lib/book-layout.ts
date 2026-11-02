/**
 * How PDF pages sit in a bound book. Page numbers start at 1. A "spread" counts
 * the sheets already turned: spread 0 is the closed cover on the right, and each
 * later spread shows an even page on the left and an odd page on the right.
 */

export type PageSide = "left" | "right";

export const lastSpread = (pageCount: number) => Math.floor(pageCount / 2);

export const leftPage = (spread: number) => (spread > 0 ? spread * 2 : null);

export const rightPage = (spread: number, pageCount: number) => {
  const page = spread * 2 + 1;
  return page <= pageCount ? page : null;
};

export const spreadOfPage = (page: number) => Math.floor(page / 2);

export const sideOfPage = (page: number): PageSide => (page % 2 === 0 ? "left" : "right");

/** The pages on show, for the page counter. On a phone only one is visible. */
export function visiblePages(spread: number, pageCount: number, side: PageSide | null) {
  const left = leftPage(spread);
  const right = rightPage(spread, pageCount);
  if (side === "left" && left) return [left];
  if (side === "right" && right) return [right];
  return [left, right].filter((p): p is number => p !== null);
}
