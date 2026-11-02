/**
 * Publishes the PDFs in private/catalogue (a git-ignored folder).
 * Run with `npm run catalogue:publish`. Add `-- --no-upload` to skip the bucket.
 *
 * For <slug>.pdf it writes watermarked page pictures to public/catalogue/pages/<slug>
 * and a cover to public/catalogue/covers, then uploads the PDF to the private bucket.
 * The website shows only the pictures, so the PDF itself never reaches a browser
 * until someone has a valid code.
 */
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { createCanvas } from "@napi-rs/canvas";
import { config } from "dotenv";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

config({ path: ".env.local", quiet: true });

const SOURCE = path.join(process.cwd(), "private", "catalogue");
const OUTPUT = path.join(process.cwd(), "public", "catalogue");
const BUCKET = "products";
const PAGE_HEIGHT = 1600;
const COVER_HEIGHT = 900;
const WATERMARK = "Acme Commercial Ways · Preview only";
const fontData = `${pathToFileURL(path.join(process.cwd(), "node_modules/pdfjs-dist/standard_fonts")).href}/`;

/** Draws one page on white, in the shape of the first page, without stretching it. */
async function drawPage(doc, number, height, aspect) {
  const page = await doc.getPage(number);
  const base = page.getViewport({ scale: 1 });
  const width = Math.round(height * aspect);
  const viewport = page.getViewport({ scale: Math.min(width / base.width, height / base.height) });
  const sheet = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  await page.render({ canvas: sheet, viewport }).promise;

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.drawImage(sheet, (width - sheet.width) / 2, (height - sheet.height) / 2);
  page.cleanup();
  return canvas;
}

/** Faint repeated text across the page, so a captured picture still names its source. */
function watermark(canvas) {
  const context = canvas.getContext("2d");
  const size = Math.round(canvas.height / 48);
  context.save();
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate(-Math.PI / 6);
  context.font = `600 ${size}px Arial, sans-serif`;
  context.fillStyle = "rgba(11, 31, 58, 0.09)";
  context.textAlign = "center";
  const reach = Math.hypot(canvas.width, canvas.height);
  const across = size * 24;
  const down = size * 8;
  for (let row = 0, y = -reach; y < reach; row++, y += down) {
    for (let x = -reach + (row % 2) * (across / 2); x < reach; x += across) context.fillText(WATERMARK, x, y);
  }
  context.restore();
}

const upload = !process.argv.includes("--no-upload");
const s3 = upload ? new S3Client({ forcePathStyle: true }) : null;
const files = (await readdir(SOURCE)).filter((f) => f.toLowerCase().endsWith(".pdf")).sort();
if (files.length === 0) throw new Error(`No PDFs in ${SOURCE}`);

for (const file of files) {
  const slug = path.basename(file, path.extname(file));
  const bytes = await readFile(path.join(SOURCE, file));
  const doc = await getDocument({ data: new Uint8Array(bytes), standardFontDataUrl: fontData, verbosity: 0 }).promise;
  const first = (await doc.getPage(1)).getViewport({ scale: 1 });
  const aspect = first.width / first.height;

  const folder = path.join(OUTPUT, "pages", slug);
  await rm(folder, { recursive: true, force: true });
  await mkdir(folder, { recursive: true });
  await mkdir(path.join(OUTPUT, "covers"), { recursive: true });

  for (let number = 1; number <= doc.numPages; number++) {
    const canvas = await drawPage(doc, number, PAGE_HEIGHT, aspect);
    watermark(canvas);
    await writeFile(path.join(folder, `${number}.webp`), await canvas.encode("webp", 80));
  }
  const cover = await drawPage(doc, 1, COVER_HEIGHT, aspect);
  await writeFile(path.join(OUTPUT, "covers", `${slug}.jpg`), await cover.encode("jpeg", 85));

  if (s3) {
    await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: `catalogues/${slug}.pdf`, Body: bytes, ContentType: "application/pdf" }));
  }
  console.log(`${slug}: ${doc.numPages} pages, aspect ${first.width.toFixed(0)}/${first.height.toFixed(0)}${s3 ? ", uploaded" : ""}`);
  await doc.loadingTask.destroy();
}
