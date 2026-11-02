/**
 * The shape of a turning page. Paper bends but does not stretch, so each row is
 * walked out from the spine one short step at a time, with the angle changing
 * along the way. `progress` is 0 flat on the right and 1 flat on the left.
 */

/** How far the free edge leads the spine, in radians, halfway through a turn. */
const BEND = 0.9;
/** Extra bend towards one corner, so the page does not lift as a rigid cylinder. */
const TWIST = 0.4;
/** Keeps the sheet just above the pages lying under it. */
const LIFT = 0.002;
/** How much a page darkens when it stands at right angles to the viewer. */
const EDGE_SHADE = 0.42;

export interface Grid {
  columns: number;
  rows: number;
}

export const vertexCount = ({ columns, rows }: Grid) => (columns + 1) * (rows + 1);

/** Two triangles per cell, wound so the front of the page faces the viewer at progress 0. */
export function gridIndices({ columns, rows }: Grid) {
  const indices: number[] = [];
  const stride = columns + 1;
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const a = row * stride + column;
      const b = a + 1;
      const c = a + stride;
      const d = c + 1;
      indices.push(a, b, c, b, d, c);
    }
  }
  return indices;
}

/** Texture coordinates. The back of a sheet reads from the other edge, as a turned page does. */
export function gridUvs({ columns, rows }: Grid, mirrored: boolean) {
  const uvs = new Float32Array(vertexCount({ columns, rows }) * 2);
  let i = 0;
  for (let row = 0; row <= rows; row++) {
    for (let column = 0; column <= columns; column++) {
      const u = column / columns;
      uvs[i++] = mirrored ? 1 - u : u;
      uvs[i++] = row / rows;
    }
  }
  return uvs;
}

/**
 * Writes the curled sheet into `positions` and `colors`, and returns where the
 * free edge is, for the shadow it casts. `direction` is 1 turning forward and -1
 * turning back, so the free edge always lifts first.
 */
export function writeCurl(
  positions: Float32Array,
  colors: Float32Array,
  grid: Grid,
  size: { width: number; height: number },
  progress: number,
  direction: 1 | -1,
) {
  const { columns, rows } = grid;
  const step = size.width / columns;
  const lean = Math.sin(Math.PI * progress);
  const rootAngle = Math.PI * progress;
  let i = 0;
  let edge = 0;

  for (let row = 0; row <= rows; row++) {
    const v = row / rows;
    const bend = direction * BEND * lean * (1 + TWIST * (0.5 - v));
    const y = (v - 0.5) * size.height;
    let x = 0;
    let z = LIFT;
    for (let column = 0; column <= columns; column++) {
      const u = column / columns;
      const angle = Math.min(Math.PI, Math.max(0, rootAngle + bend * (u - 0.5)));
      const shade = 1 - EDGE_SHADE * Math.sin(angle) ** 2;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      colors[i * 3] = colors[i * 3 + 1] = colors[i * 3 + 2] = shade;
      x += Math.cos(angle) * step;
      z += Math.sin(angle) * step;
      i++;
    }
    if (row === Math.floor(rows / 2)) edge = positions[(i - 1) * 3];
  }
  return edge;
}

/** Flat page, darkening towards the spine where the paper dips into the binding. */
export function writeFlat(colors: Float32Array, grid: Grid, spineAtLeft: boolean) {
  const { columns, rows } = grid;
  let i = 0;
  for (let row = 0; row <= rows; row++) {
    for (let column = 0; column <= columns; column++) {
      const u = column / columns;
      const fromSpine = spineAtLeft ? u : 1 - u;
      const shade = 1 - 0.3 * Math.exp(-fromSpine / 0.035);
      colors[i++] = shade;
      colors[i++] = shade;
      colors[i++] = shade;
    }
  }
}
