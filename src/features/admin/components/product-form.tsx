"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { ImagePicker } from "@/features/admin/components/image-picker";
import { SizesInput } from "@/features/admin/components/sizes-input";
import { adminCopy } from "@/features/admin/data/copy";
import { saveProduct, type ApiResult } from "@/features/admin/lib/product-client";
import type { AdminProduct } from "@/features/admin/types";

const c = adminCopy.form;

/** Field order, for moving focus to the first error. */
const FIELDS = ["image", "name", "model", "title", "categorySlug", "sizes", "description"] as const;
type FieldName = (typeof FIELDS)[number];

type FormProps = {
  catalogs: { slug: string; name: string }[];
  product?: AdminProduct;
};

/**
 * Add / edit product form. Next.js keeps visited pages mounted, so a saved form
 * is replaced with a fresh one; otherwise "Add product" would reopen filled in.
 */
export function ProductForm(props: FormProps) {
  const [saves, setSaves] = useState(0);
  return <ProductFormFields key={saves} {...props} onSaved={() => setSaves((n) => n + 1)} />;
}

/** Posts to the products API without resetting, so nothing typed is lost when the server reports an error. */
function ProductFormFields({ catalogs, product, onSaved }: FormProps & { onSaved: () => void }) {
  const router = useRouter();
  const [failure, setFailure] = useState<Exclude<ApiResult, { ok: true }> | null>(null);
  const [pending, setPending] = useState(false);
  const [category, setCategory] = useState(product?.categorySlug ?? "");
  const [imageError, setImageError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const serverErrors = failure?.errors ?? {};
  const errors: Record<string, string | undefined> = { ...serverErrors, image: imageError ?? serverErrors.image };

  useEffect(() => {
    const first = FIELDS.find((f) => failure?.errors?.[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`#product-${first}`)?.focus();
  }, [failure]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imageError || pending) return;
    const data = new FormData(e.currentTarget);
    setPending(true);
    setFailure(null);
    const result = await saveProduct(data, product?.id);
    if (result.ok) {
      router.push("/dashboard/products");
      router.refresh();
      onSaved();
      return;
    }
    setPending(false);
    if (result.status === 401) router.replace("/admin/login");
    else setFailure(result);
  };

  /** Props shared by every field: id, error state and the ids of its hint and error. */
  const field = (name: FieldName) => ({
    id: `product-${name}`,
    invalid: !!errors[name],
    describedBy: `product-${name}-hint${errors[name] ? ` product-${name}-error` : ""}`,
  });

  const hint = (name: FieldName, text: string) => <FieldDescription id={`product-${name}-hint`}>{text}</FieldDescription>;
  const error = (name: FieldName) =>
    errors[name] ? <FieldError id={`product-${name}-error`}>{errors[name]}</FieldError> : null;

  const f = {
    image: field("image"),
    name: field("name"),
    model: field("model"),
    title: field("title"),
    category: field("categorySlug"),
    sizes: field("sizes"),
    description: field("description"),
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="mx-4 max-w-3xl rounded-xl border bg-card p-5 sm:p-8 lg:mx-6">
      {failure && (
        <p role="alert" className="mb-6 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {failure.message}
        </p>
      )}
      <fieldset disabled={pending} className="contents">
        <FieldGroup>
          <Field data-invalid={f.image.invalid || undefined}>
            <FieldLabel htmlFor={f.image.id}>{product ? c.imageEdit : c.image}</FieldLabel>
            <ImagePicker
              id={f.image.id}
              currentUrl={product?.image}
              invalid={f.image.invalid}
              describedBy={f.image.describedBy}
              onError={setImageError}
            />
            {hint("image", c.imageHint)}
            {error("image")}
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field data-invalid={f.name.invalid || undefined}>
              <FieldLabel htmlFor={f.name.id}>{c.name}</FieldLabel>
              <Input
                id={f.name.id}
                name="name"
                defaultValue={product?.name}
                maxLength={120}
                aria-invalid={f.name.invalid || undefined}
                aria-describedby={f.name.describedBy}
              />
              {hint("name", c.nameHint)}
              {error("name")}
            </Field>
            <Field data-invalid={f.model.invalid || undefined}>
              <FieldLabel htmlFor={f.model.id}>{c.model}</FieldLabel>
              <Input
                id={f.model.id}
                name="model"
                defaultValue={product?.model}
                maxLength={60}
                autoCapitalize="characters"
                spellCheck={false}
                className="font-mono"
                aria-invalid={f.model.invalid || undefined}
                aria-describedby={f.model.describedBy}
              />
              {hint("model", c.modelHint)}
              {error("model")}
            </Field>
          </div>

          <Field data-invalid={f.title.invalid || undefined}>
            <FieldLabel htmlFor={f.title.id}>{c.title}</FieldLabel>
            <Input
              id={f.title.id}
              name="title"
              defaultValue={product?.title}
              maxLength={200}
              aria-invalid={f.title.invalid || undefined}
              aria-describedby={f.title.describedBy}
            />
            {hint("title", c.titleHint)}
            {error("title")}
          </Field>

          <Field data-invalid={f.category.invalid || undefined}>
            <FieldLabel htmlFor={f.category.id}>{c.category}</FieldLabel>
            <input type="hidden" name="categorySlug" value={category} />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger
                id={f.category.id}
                className="h-12 w-full bg-white text-base"
                aria-invalid={f.category.invalid || undefined}
                aria-describedby={f.category.invalid ? "product-categorySlug-error" : undefined}
              >
                <SelectValue placeholder={c.categoryPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {catalogs.map((cat) => (
                  <SelectItem key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error("categorySlug")}
          </Field>

          <Field data-invalid={f.sizes.invalid || undefined}>
            <FieldLabel htmlFor={f.sizes.id}>{c.sizes}</FieldLabel>
            <SizesInput id={f.sizes.id} defaultValue={product?.sizes} invalid={f.sizes.invalid} describedBy={f.sizes.describedBy} />
            {hint("sizes", c.sizesHint)}
            {error("sizes")}
          </Field>

          <Field data-invalid={f.description.invalid || undefined}>
            <FieldLabel htmlFor={f.description.id}>{c.description}</FieldLabel>
            <Textarea
              id={f.description.id}
              name="description"
              defaultValue={product?.description}
              rows={7}
              maxLength={5000}
              aria-invalid={f.description.invalid || undefined}
              aria-describedby={f.description.describedBy}
            />
            {hint("description", c.descriptionHint)}
            {error("description")}
          </Field>
        </FieldGroup>
      </fieldset>

      <div className="mt-8 flex flex-wrap gap-2 border-t pt-6">
        <Button type="submit" size="sm" disabled={pending}>
          {pending && <Spinner aria-hidden />}
          {pending ? c.pending : product ? c.save : c.create}
        </Button>
        <Button asChild type="button" variant="outline" size="sm">
          <Link href="/dashboard/products">{c.cancel}</Link>
        </Button>
      </div>
    </form>
  );
}
