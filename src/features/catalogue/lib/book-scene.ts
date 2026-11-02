import * as THREE from "three";
import { lastSpread, leftPage, rightPage, sideOfPage, spreadOfPage, type PageSide } from "./book-layout";
import { gridIndices, gridUvs, vertexCount, writeCurl, writeFlat, type Grid } from "./page-curl";

/** A page is 1 unit tall. */
const HEIGHT = 1;
const FIELD_OF_VIEW = 15;
/** Room around the book, so a lifted page stays on screen. */
const MARGIN = 1.22;
const TURN_MS = 950;
const PAN_MS = 350;
const CURL_GRID: Grid = { columns: 40, rows: 12 };
const FLAT_GRID: Grid = { columns: 24, rows: 1 };
export const MAX_ZOOM = 3;

export interface BookView {
  spread: number;
  /** The page in view on a phone. Null when the whole spread shows. */
  side: PageSide | null;
  canPrevious: boolean;
  canNext: boolean;
  zoom: number;
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

function pageMaterial(side: THREE.Side) {
  return new THREE.MeshBasicMaterial({ color: 0xffffff, side, vertexColors: true, toneMapped: false });
}

function flatPage(width: number, spineAtLeft: boolean) {
  const positions = new Float32Array(vertexCount(FLAT_GRID) * 3);
  const colors = new Float32Array(positions.length);
  let i = 0;
  for (let row = 0; row <= FLAT_GRID.rows; row++) {
    for (let column = 0; column <= FLAT_GRID.columns; column++) {
      positions[i++] = (column / FLAT_GRID.columns - (spineAtLeft ? 0 : 1)) * width;
      positions[i++] = (row / FLAT_GRID.rows - 0.5) * HEIGHT;
      positions[i++] = 0;
    }
  }
  writeFlat(colors, FLAT_GRID, spineAtLeft);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(gridUvs(FLAT_GRID, false), 2));
  geometry.setIndex(gridIndices(FLAT_GRID));
  return new THREE.Mesh(geometry, pageMaterial(THREE.FrontSide));
}

/** A soft gradient, dark at the spine, for the shadow a turning page casts. */
function shadowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 1;
  const context = canvas.getContext("2d");
  if (context) {
    const gradient = context.createLinearGradient(0, 0, 128, 0);
    gradient.addColorStop(0, "rgba(10,20,40,0.75)");
    gradient.addColorStop(1, "rgba(10,20,40,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 1);
  }
  return new THREE.CanvasTexture(canvas);
}

interface Turn {
  /** Lower of the two spreads: the book at progress 0. */
  lower: number;
  upper: number;
  progress: number;
  direction: 1 | -1;
  /** Where the turn will rest, once it is running by itself. */
  end?: { spread: number; side: PageSide };
}

/**
 * The book, drawn with three.js. It draws only while something moves. Pages show
 * blank paper until their picture arrives through `setPage`.
 */
export class BookScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(FIELD_OF_VIEW, 1, 0.1, 20);
  private book = new THREE.Group();
  private left: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
  private right: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
  private front: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
  private back: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
  private shadow: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  private positions: THREE.BufferAttribute;
  private colors: THREE.BufferAttribute;
  private textures = new Map<number, THREE.Texture>();
  private width: number;
  private spread = 0;
  private side: PageSide = "right";
  private single = false;
  private panning = false;
  private turn: Turn | null = null;
  private pan = { x: 0, y: 0 };
  private zoom = 1;
  private frame = 0;
  private fit = 1;
  private reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  constructor(
    canvas: HTMLCanvasElement,
    private pageCount: number,
    aspect: number,
    private onChange: (view: BookView) => void,
  ) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.width = HEIGHT * aspect;

    this.left = flatPage(this.width, false);
    this.right = flatPage(this.width, true);

    const geometry = new THREE.BufferGeometry();
    this.positions = new THREE.BufferAttribute(new Float32Array(vertexCount(CURL_GRID) * 3), 3);
    this.colors = new THREE.BufferAttribute(new Float32Array(vertexCount(CURL_GRID) * 3), 3);
    this.positions.setUsage(THREE.DynamicDrawUsage);
    this.colors.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute("position", this.positions);
    geometry.setAttribute("color", this.colors);
    geometry.setAttribute("uv", new THREE.BufferAttribute(gridUvs(CURL_GRID, false), 2));
    geometry.setIndex(gridIndices(CURL_GRID));
    this.front = new THREE.Mesh(geometry, pageMaterial(THREE.FrontSide));

    const backGeometry = new THREE.BufferGeometry();
    backGeometry.setAttribute("position", this.positions);
    backGeometry.setAttribute("color", this.colors);
    backGeometry.setAttribute("uv", new THREE.BufferAttribute(gridUvs(CURL_GRID, true), 2));
    backGeometry.setIndex(gridIndices(CURL_GRID));
    this.back = new THREE.Mesh(backGeometry, pageMaterial(THREE.BackSide));
    this.front.frustumCulled = this.back.frustumCulled = false;

    const texture = shadowTexture();
    this.shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1, HEIGHT).translate(0.5, 0, 0),
      new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide, depthWrite: false, toneMapped: false }),
    );
    this.shadow.position.z = 0.001;

    this.book.add(this.left, this.right, this.front, this.back, this.shadow);
    this.scene.add(this.book);
    this.placePages();
  }

  private canPrevious() {
    return this.single && this.side === "right" ? leftPage(this.spread) !== null : this.spread > 0;
  }

  private canNext() {
    if (this.single && this.side === "left" && rightPage(this.spread, this.pageCount)) return true;
    return this.spread < lastSpread(this.pageCount);
  }

  private notify() {
    this.onChange({
      spread: this.spread,
      side: this.single ? this.side : null,
      canPrevious: this.canPrevious(),
      canNext: this.canNext(),
      zoom: this.zoom,
    });
  }

  /** Sideways position that centres what is on show: a lone cover, or a phone's single page. */
  private offsetFor(spread: number, side: PageSide) {
    if (this.single) return side === "right" ? -this.width / 2 : this.width / 2;
    if (spread === 0) return -this.width / 2;
    if (rightPage(spread, this.pageCount) === null) return this.width / 2;
    return 0;
  }

  private setMap(mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>, page: number | null) {
    mesh.visible = page !== null;
    const map = page === null ? null : (this.textures.get(page) ?? null);
    if (mesh.material.map !== map) {
      mesh.material.map = map;
      mesh.material.needsUpdate = true;
    }
  }

  /** Pictures and positions for the pages at rest or in the current turn. */
  private placePages() {
    const { turn, pageCount } = this;
    if (turn) {
      this.setMap(this.left, leftPage(turn.lower));
      this.setMap(this.right, rightPage(turn.upper, pageCount));
      this.setMap(this.front, rightPage(turn.lower, pageCount));
      this.setMap(this.back, leftPage(turn.upper));
      const edge = writeCurl(
        this.positions.array as Float32Array,
        this.colors.array as Float32Array,
        CURL_GRID,
        { width: this.width, height: HEIGHT },
        turn.progress,
        turn.direction,
      );
      this.positions.needsUpdate = true;
      this.colors.needsUpdate = true;
      this.shadow.visible = true;
      this.shadow.scale.x = edge * 1.15 || 0.0001;
      this.shadow.material.opacity = Math.sin(Math.PI * turn.progress) * 0.8;
    } else {
      this.setMap(this.left, leftPage(this.spread));
      this.setMap(this.right, rightPage(this.spread, pageCount));
      this.front.visible = this.back.visible = this.shadow.visible = false;
      // On a phone the facing page would show at the screen edge.
      if (this.single && !this.panning) {
        this.left.visible &&= this.side === "left";
        this.right.visible &&= this.side === "right";
      }
    }
  }

  private draw() {
    this.camera.position.set(this.pan.x, this.pan.y, this.fit);
    this.camera.zoom = this.zoom;
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  }

  private animate(duration: number, step: (t: number) => void, done: () => void) {
    cancelAnimationFrame(this.frame);
    if (this.reducedMotion || duration <= 0) {
      step(1);
      done();
      this.draw();
      return;
    }
    const started = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / duration);
      step(easeInOut(t));
      if (t < 1) {
        this.draw();
        this.frame = requestAnimationFrame(tick);
      } else {
        done();
        this.draw();
      }
    };
    this.frame = requestAnimationFrame(tick);
  }

  /** Finishes a running turn at once, so quick clicks are never lost. */
  private settle() {
    cancelAnimationFrame(this.frame);
    const turn = this.turn;
    if (turn) {
      const first = turn.progress < 0.5;
      const end = turn.end ?? { spread: first ? turn.lower : turn.upper, side: first ? "right" : "left" };
      this.spread = end.spread;
      this.side = end.side;
      this.turn = null;
    }
    this.panning = false;
    this.placePages();
    this.book.position.x = this.offsetFor(this.spread, this.side);
  }

  private moveBook(from: number, to: number, t: number) {
    this.book.position.x = from + (to - from) * t;
  }

  /** Runs one page turn from its current progress to `target` (0 or 1), then rests there. */
  private runTurn(target: 0 | 1, side: PageSide, duration = TURN_MS) {
    const turn = this.turn;
    if (!turn) return;
    const startProgress = turn.progress;
    const startOffset = this.book.position.x;
    const endSpread = target === 1 ? turn.upper : turn.lower;
    const endOffset = this.offsetFor(endSpread, side);
    turn.end = { spread: endSpread, side };
    this.animate(
      duration * Math.max(0.3, Math.abs(target - startProgress)),
      (t) => {
        turn.progress = startProgress + (target - startProgress) * t;
        this.moveBook(startOffset, endOffset, t);
        this.placePages();
      },
      () => {
        this.spread = endSpread;
        this.side = side;
        this.turn = null;
        this.placePages();
        this.notify();
      },
    );
  }

  private startTurn(to: number) {
    const direction = to > this.spread ? 1 : -1;
    this.turn = {
      lower: Math.min(this.spread, to),
      upper: Math.max(this.spread, to),
      progress: direction === 1 ? 0 : 1,
      direction,
    };
  }

  private panTo(side: PageSide) {
    const from = this.book.position.x;
    const to = this.offsetFor(this.spread, side);
    this.side = side;
    this.panning = true;
    this.placePages();
    this.animate(
      PAN_MS,
      (t) => this.moveBook(from, to, t),
      () => {
        this.panning = false;
        this.placePages();
        this.notify();
      },
    );
  }

  next() {
    this.settle();
    if (!this.canNext()) return;
    if (this.single && this.side === "left" && rightPage(this.spread, this.pageCount)) return this.panTo("right");
    this.startTurn(this.spread + 1);
    this.runTurn(1, "left");
  }

  previous() {
    this.settle();
    if (!this.canPrevious()) return;
    if (this.single && this.side === "right") return this.panTo("left");
    this.startTurn(this.spread - 1);
    this.runTurn(0, "right");
  }

  goToPage(page: number) {
    this.settle();
    const spread = spreadOfPage(page);
    const side = sideOfPage(page);
    if (spread === this.spread) return this.panTo(side);
    this.startTurn(spread);
    this.runTurn(spread > this.spread ? 1 : 0, side);
  }

  /** Whether a drag starting at this horizontal position can lift a page, and which way. */
  dragDirection(pointerX: number, canvasWidth: number): 1 | -1 | null {
    if (this.zoom > 1) return null;
    const spine = canvasWidth / 2 + (this.book.position.x / this.visibleWidth()) * canvasWidth;
    const onRight = this.single ? this.side === "right" : pointerX > spine;
    if (onRight) return this.spread < lastSpread(this.pageCount) && rightPage(this.spread, this.pageCount) ? 1 : null;
    return this.spread > 0 ? -1 : null;
  }

  private visibleWidth() {
    return 2 * this.fit * Math.tan(THREE.MathUtils.degToRad(FIELD_OF_VIEW / 2)) * this.camera.aspect;
  }

  beginDrag(direction: 1 | -1) {
    this.settle();
    this.startTurn(this.spread + direction);
  }

  /** `distance` is how far the pointer has travelled across the book, 0 to 1. */
  drag(distance: number) {
    const turn = this.turn;
    if (!turn) return;
    const moved = Math.min(0.98, Math.max(0.02, distance));
    turn.progress = turn.direction === 1 ? moved : 1 - moved;
    this.moveBook(this.offsetFor(turn.lower, "right"), this.offsetFor(turn.upper, "left"), turn.progress);
    this.placePages();
    this.draw();
  }

  endDrag() {
    const turn = this.turn;
    if (!turn) return;
    const target = turn.progress > 0.5 ? 1 : 0;
    this.runTurn(target, target === 1 ? "left" : "right", TURN_MS * 0.8);
  }

  /** The book's width on screen, in pixels, for turning a drag into page progress. */
  dragSpan(canvasWidth: number) {
    return ((this.single ? this.width : this.width * 2) / this.visibleWidth()) * canvasWidth;
  }

  setZoom(zoom: number) {
    this.zoom = Math.min(MAX_ZOOM, Math.max(1, zoom));
    if (this.zoom === 1) this.pan = { x: 0, y: 0 };
    this.clampPan();
    this.draw();
    this.notify();
  }

  /** Moves the zoomed book by a number of pixels. */
  panBy(dx: number, dy: number, canvasHeight: number) {
    const unitsPerPixel = (2 * this.fit * Math.tan(THREE.MathUtils.degToRad(FIELD_OF_VIEW / 2))) / this.zoom / canvasHeight;
    this.pan.x -= dx * unitsPerPixel;
    this.pan.y += dy * unitsPerPixel;
    this.clampPan();
    this.draw();
  }

  private clampPan() {
    const reachX = ((this.single ? this.width : this.width * 2) * (this.zoom - 1)) / (2 * this.zoom) + 0.02;
    const reachY = (HEIGHT * (this.zoom - 1)) / (2 * this.zoom) + 0.02;
    this.pan.x = Math.min(reachX, Math.max(-reachX, this.pan.x));
    this.pan.y = Math.min(reachY, Math.max(-reachY, this.pan.y));
  }

  resize(width: number, height: number, single: boolean) {
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    const changed = single !== this.single;
    this.single = single;
    const tangent = Math.tan(THREE.MathUtils.degToRad(FIELD_OF_VIEW / 2));
    const content = single ? this.width : this.width * 2;
    this.fit = Math.max((HEIGHT * MARGIN) / (2 * tangent), (content * MARGIN) / (2 * tangent * this.camera.aspect));
    this.camera.far = this.fit + 4;
    if (changed && !this.turn) {
      if (rightPage(this.spread, this.pageCount) === null) this.side = "left";
      else if (leftPage(this.spread) === null) this.side = "right";
    }
    if (!this.turn) {
      this.book.position.x = this.offsetFor(this.spread, this.side);
      this.placePages();
    }
    this.draw();
    this.notify();
  }

  setPage(page: number, image: HTMLImageElement) {
    const texture = new THREE.Texture(image);
    texture.needsUpdate = true;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
    this.textures.get(page)?.dispose();
    this.textures.set(page, texture);
    this.placePages();
    this.draw();
  }

  dropPage(page: number) {
    this.textures.get(page)?.dispose();
    this.textures.delete(page);
    this.placePages();
  }

  hasPage(page: number) {
    return this.textures.has(page);
  }

  loadedPages() {
    return [...this.textures.keys()];
  }

  dispose() {
    cancelAnimationFrame(this.frame);
    this.textures.forEach((texture) => texture.dispose());
    this.textures.clear();
    for (const mesh of [this.left, this.right, this.front, this.back]) {
      mesh.geometry.dispose();
      mesh.material.dispose();
    }
    this.shadow.geometry.dispose();
    this.shadow.material.map?.dispose();
    this.shadow.material.dispose();
    this.renderer.dispose();
  }
}
