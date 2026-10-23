/**
 * Export markets highlighted on the About page world map, from the client's
 * current site. `box` is [firstColumn, firstRow, lastColumn, lastRow] on the
 * 72 x 28 dot grid (5° per cell, starting at 180°W and 80°N).
 */
export const reachRegions = [
  { name: "Europe", box: [34, 2, 45, 9] },
  { name: "USA & Canada", box: [9, 4, 22, 10] },
  { name: "Mexico", box: [13, 10, 18, 13] },
  { name: "Brazil", box: [21, 15, 29, 22] },
  { name: "Morocco", box: [33, 8, 35, 10] },
  { name: "Turkey", box: [41, 7, 45, 9] },
  { name: "South Africa", box: [39, 20, 42, 23] },
  { name: "Thailand", box: [55, 12, 57, 14] },
  { name: "Australia", box: [58, 18, 66, 23] },
] as const;
