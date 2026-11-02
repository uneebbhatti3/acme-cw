import { z } from "zod";
import { adminCopy } from "@/features/admin/data/copy";

const e = adminCopy.form.errors;

/** Product form rules for the add and edit forms. The image is checked separately (lib/media.ts). */
export const productSchema = z.object({
  name: z.string().trim().min(2, e.name).max(120, e.name),
  model: z
    .string()
    .trim()
    .min(1, e.model)
    .max(60, e.model)
    .regex(/^[A-Za-z0-9][A-Za-z0-9 ._/-]*$/, e.model),
  title: z.string().trim().min(2, e.title).max(200, e.title),
  categorySlug: z.string().trim().min(1, e.category),
  sizes: z.array(z.string().trim().min(1).max(40, e.size)).min(1, e.sizes).max(30),
  description: z.string().trim().min(10, e.description).max(5000),
});

export type ProductInput = z.infer<typeof productSchema>;

export function readProductForm(form: FormData) {
  const text = (key: string) => String(form.get(key) ?? "");
  return productSchema.safeParse({
    name: text("name"),
    model: text("model"),
    title: text("title"),
    categorySlug: text("categorySlug"),
    sizes: [...new Set(form.getAll("sizes").map((s) => String(s).trim()).filter(Boolean))],
    description: text("description").replace(/\r\n/g, "\n"),
  });
}
