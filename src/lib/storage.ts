import "server-only";
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

/** Neon Object Storage. Endpoint, region and keys come from the standard AWS_* variables. */
const s3 = new S3Client({ forcePathStyle: true }); // Neon requires path-style addressing

const PRODUCTS_BUCKET = "products";

export async function putProductImage(key: string, body: Buffer, contentType: string) {
  await s3.send(new PutObjectCommand({ Bucket: PRODUCTS_BUCKET, Key: key, Body: body, ContentType: contentType }));
}

/** Returns the file, or null when it does not exist. */
export async function getProductImage(key: string) {
  try {
    const res = await s3.send(new GetObjectCommand({ Bucket: PRODUCTS_BUCKET, Key: key }));
    return res.Body ? await res.Body.transformToByteArray() : null;
  } catch (err) {
    if ((err as Error).name === "NoSuchKey") return null;
    throw err;
  }
}

/** A catalogue PDF as a stream, or null when it does not exist. The bucket is private; only the download route reads it. */
export async function getCatalogueFile(slug: string) {
  try {
    const res = await s3.send(new GetObjectCommand({ Bucket: PRODUCTS_BUCKET, Key: `catalogues/${slug}.pdf` }));
    return res.Body ? { stream: res.Body.transformToWebStream(), size: res.ContentLength } : null;
  } catch (err) {
    if ((err as Error).name === "NoSuchKey") return null;
    throw err;
  }
}

export async function deleteProductImage(key: string) {
  await s3.send(new DeleteObjectCommand({ Bucket: PRODUCTS_BUCKET, Key: key }));
}
