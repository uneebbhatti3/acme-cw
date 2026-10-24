"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, FileUp, LoaderCircle, Plus, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { quoteCopy as q } from "@/features/quote/data/copy";
import { attachmentRules, buyerTypes, maxLines } from "@/features/quote/data/options";
import { checkAttachments, enquirySchema, type EnquiryValues } from "@/features/quote/lib/schema";
import { cn } from "@/lib/utils";
import { CountryPicker } from "./country-picker";
import { Turnstile } from "./turnstile";

const f = q.fields;
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export type EnquiryKind = EnquiryValues["kind"];

/** Label, control, hint and error, linked by id. */
function FormField({
  id,
  label,
  error,
  hint,
  required,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: (describedBy: string | undefined) => ReactNode;
}) {
  const ids = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <Field data-invalid={!!error || undefined} className={cn("gap-1.5", className)}>
      <FieldLabel htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? (
          <span aria-hidden className="text-destructive">
            *
          </span>
        ) : (
          <span className="font-normal text-muted-foreground">({f.optional})</span>
        )}
      </FieldLabel>
      {children(ids)}
      {hint && (
        <p id={`${id}-hint`} className="text-[0.8125rem] text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <FieldError id={`${id}-error`} className="font-medium">
          {error}
        </FieldError>
      )}
    </Field>
  );
}

type Failure = { message: string } | null;

/**
 * Quote and enquiry form (react-hook-form + the shared Zod schema).
 * - `quote`: contact details, buyer type, product lines with quantities,
 *   requirements and optional drawings. Opened from a product page, the SKU
 *   arrives as ?sku= and fills the first product line.
 * - `general`: contact details and a message (contact page).
 * Posts to /api/quote, which validates again and emails the company. Spam
 * protection: honeypot, minimum fill time, rate limit and optional Turnstile.
 */
export function EnquiryForm({ kind, lookup }: { kind: EnquiryKind; lookup: Record<string, string> }) {
  const params = useSearchParams();
  const prefill = (() => {
    const sku = params.get("sku")?.replace(/[[\]]/g, "").trim().toUpperCase();
    const slug = params.get("product") ?? "";
    return (sku && (lookup[sku] ?? sku)) || lookup[slug] || "";
  })();

  const [sent, setSent] = useState<{ reference: string; preview: boolean } | null>(null);
  const [failure, setFailure] = useState<Failure>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [captcha, setCaptcha] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const [captchaReset, setCaptchaReset] = useState(0);
  const statusRef = useRef<HTMLDivElement>(null);
  const failureRef = useRef<HTMLDivElement>(null);
  const isQuote = kind === "quote";

  const defaults: EnquiryValues = {
    kind,
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    buyerType: "",
    items: isQuote ? [{ product: prefill, quantity: "" }] : [],
    message: "",
    consent: false,
    website: "",
    startedAt: 0,
    captcha: "",
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<EnquiryValues>({ resolver: zodResolver(enquirySchema), mode: "onTouched", defaultValues: defaults });
  const lines = useFieldArray({ control, name: "items" });

  // Start of the fill-time check (bots submit within a second or two).
  useEffect(() => {
    setValue("startedAt", Date.now());
  }, [setValue]);
  useEffect(() => {
    if (sent) statusRef.current?.focus();
  }, [sent]);
  useEffect(() => {
    if (failure) failureRef.current?.focus();
  }, [failure]);

  const errorCount = Object.keys(errors).length + (fileError ? 1 : 0);

  const pickFiles = (picked: FileList | null) => {
    if (!picked?.length) return;
    const next = [...files, ...Array.from(picked)].filter((file, i, all) => all.findIndex((o) => o.name === file.name && o.size === file.size) === i);
    setFileError(checkAttachments(next));
    setFiles(next);
  };
  const removeFile = (i: number) => {
    const next = files.filter((_, n) => n !== i);
    setFileError(checkAttachments(next));
    setFiles(next);
  };

  const onSubmit = async (values: EnquiryValues) => {
    setFailure(null);
    if (fileError) return;
    if (SITE_KEY && !captcha) {
      setCaptchaError(true);
      return;
    }
    const body = new FormData();
    body.set("data", JSON.stringify({ ...values, kind, captcha, items: values.items.filter((i) => i.product || i.quantity) }));
    if (isQuote) for (const file of files) body.append("files", file);

    let res: Response;
    try {
      res = await fetch("/api/quote", { method: "POST", body });
    } catch {
      setFailure({ message: q.failure.network });
      return;
    }
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; reference?: string; preview?: boolean; error?: string };
    if (res.ok && data.ok && data.reference) {
      setSent({ reference: data.reference, preview: !!data.preview });
      return;
    }
    setCaptcha("");
    setCaptchaReset((n) => n + 1);
    const message =
      data.error === "rate_limited"
        ? q.failure.rateLimited
        : data.error === "not_configured"
          ? q.failure.notConfigured
          : data.error === "captcha"
            ? q.errors.captcha
            : data.error === "files"
              ? q.failure.files
              : q.failure.generic;
    setFailure({ message });
  };

  if (sent) {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-lg border bg-white p-6 focus:outline-none md:p-10">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent text-teal-deep">
          <CircleCheck aria-hidden className="size-6" strokeWidth={1.75} />
        </span>
        <h2 className="text-h2 mt-5">{q.success.title}</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">{q.success.text}</p>
        <p className="mt-5 text-sm">
          {q.success.reference}: <span className="font-mono font-medium text-navy">{sent.reference}</span>
        </p>
        {sent.preview && <p className="mt-4 rounded-md border border-dashed border-grey-300 bg-grey-50 p-3 text-sm text-muted-foreground">{q.success.preview}</p>}
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            reset({ ...defaults, items: isQuote ? [{ product: "", quantity: "" }] : [], startedAt: Date.now() });
            setFiles([]);
            setSent(null);
          }}
        >
          {q.success.again}
        </Button>
      </div>
    );
  }

  const mailto = `mailto:${q.failure.email}?subject=${encodeURIComponent(q.failure.fallbackSubject)}`;

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} aria-labelledby="form-title" className="rounded-lg border bg-white p-5 sm:p-6 md:p-8">
      <h2 id="form-title" className="text-h2">
        {isQuote ? q.form.quoteTitle : q.form.generalTitle}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{q.form.required}</p>

      <p
        role="alert"
        className={errorCount && submitCount ? "mt-5 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive" : "sr-only"}
      >
        {errorCount && submitCount ? q.errorSummary : ""}
      </p>

      {failure && (
        <div ref={failureRef} tabIndex={-1} role="alert" className="mt-5 flex gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm focus:outline-none">
          <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-destructive" />
          <div>
            <p className="font-semibold text-destructive">{q.failure.title}</p>
            <p className="mt-1">{failure.message}</p>
            <p className="mt-1">
              {q.failure.fallback}{" "}
              <a href={mailto} className="font-medium text-link underline">
                {q.failure.email}
              </a>
            </p>
          </div>
        </div>
      )}

      <fieldset className="mt-8">
        <legend className="text-base font-semibold text-navy">{q.form.sections.contact}</legend>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <FormField id="name" label={f.name} required error={errors.name?.message}>
            {(d) => <Input id="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={d} {...register("name")} />}
          </FormField>
          <FormField id="company" label={f.company} required={isQuote} error={errors.company?.message}>
            {(d) => <Input id="company" autoComplete="organization" aria-invalid={!!errors.company} aria-describedby={d} {...register("company")} />}
          </FormField>
          <FormField id="email" label={f.email} required hint={f.emailHint} error={errors.email?.message}>
            {(d) => (
              <Input id="email" type="email" autoComplete="email" inputMode="email" aria-invalid={!!errors.email} aria-describedby={d} {...register("email")} />
            )}
          </FormField>
          <FormField id="phone" label={f.phone}>
            {(d) => <Input id="phone" type="tel" autoComplete="tel" inputMode="tel" aria-describedby={d} {...register("phone")} />}
          </FormField>
          <FormField id="country" label={f.country} required error={errors.country?.message}>
            {(d) => (
              <Controller
                control={control}
                name="country"
                render={({ field }) => (
                  <CountryPicker
                    id="country"
                    buttonRef={field.ref}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    invalid={!!errors.country}
                    describedBy={d}
                  />
                )}
              />
            )}
          </FormField>
          {isQuote && (
            <FormField id="buyerType" label={f.buyerType} required error={errors.buyerType?.message}>
              {(d) => (
                <select
                  id="buyerType"
                  aria-invalid={!!errors.buyerType}
                  aria-describedby={d}
                  className="h-12 w-full rounded-md border border-input bg-white px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 aria-invalid:border-destructive"
                  {...register("buyerType")}
                >
                  <option value="">{f.buyerTypePlaceholder}</option>
                  {buyerTypes.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              )}
            </FormField>
          )}
        </div>
      </fieldset>

      {isQuote && (
        <fieldset className="mt-10" aria-describedby={errors.items?.message ? "items-error" : undefined}>
          <legend className="text-base font-semibold text-navy">{q.form.sections.products}</legend>
          <ol className="mt-4 grid gap-4">
            {lines.fields.map((line, i) => (
              <li key={line.id} className="grid gap-3 rounded-md border bg-grey-50 p-4 sm:grid-cols-[1fr_11rem_auto] sm:items-end">
                <div className="grid gap-1.5">
                  <label htmlFor={`items.${i}.product`} className="text-sm font-medium">
                    <span className="sr-only">{f.lineLabel(i + 1)}: </span>
                    {f.product}
                  </label>
                  <Input id={`items.${i}.product`} placeholder={f.productPlaceholder} {...register(`items.${i}.product`)} />
                </div>
                <div className="grid gap-1.5">
                  <label htmlFor={`items.${i}.quantity`} className="text-sm font-medium">
                    {f.quantity}
                  </label>
                  <Input id={`items.${i}.quantity`} placeholder={f.quantityPlaceholder} {...register(`items.${i}.quantity`)} />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={f.removeLine(i + 1)}
                  disabled={lines.fields.length === 1}
                  onClick={() => lines.remove(i)}
                  className="justify-self-end text-muted-foreground"
                >
                  <Trash2 aria-hidden className="size-5" strokeWidth={1.5} />
                </Button>
              </li>
            ))}
          </ol>
          {errors.items?.message && (
            <FieldError id="items-error" className="mt-2 font-medium">
              {errors.items.message}
            </FieldError>
          )}
          {lines.fields.length < maxLines && (
            <Button type="button" variant="outline" className="mt-4" onClick={() => lines.append({ product: "", quantity: "" })}>
              <Plus aria-hidden />
              {f.addLine}
            </Button>
          )}
        </fieldset>
      )}

      <fieldset className="mt-10">
        <legend className="text-base font-semibold text-navy">{q.form.sections.details}</legend>
        <div className="mt-4 grid gap-5">
          <FormField
            id="message"
            label={isQuote ? f.message : f.generalMessage}
            required={!isQuote}
            hint={isQuote ? f.messageHint : undefined}
            error={errors.message?.message}
          >
            {(d) => <Textarea id="message" rows={5} aria-invalid={!!errors.message} aria-describedby={d} {...register("message")} />}
          </FormField>

          {isQuote && (
            <div>
              <p id="files-label" className="text-sm font-medium">
                {f.attachments} <span className="font-normal text-muted-foreground">({f.optional})</span>
              </p>
              <p id="files-hint" className="mt-1 text-[0.8125rem] text-muted-foreground">
                {f.attachmentsHint(attachmentRules.maxFiles, attachmentRules.maxTotalMb, attachmentRules.label)}
              </p>
              <div className="mt-2">
                <input
                  id="files"
                  type="file"
                  multiple
                  accept={attachmentRules.accept}
                  aria-labelledby="files-label"
                  aria-describedby={["files-hint", fileError && "files-error"].filter(Boolean).join(" ")}
                  className="peer sr-only"
                  onChange={(e) => {
                    pickFiles(e.target.files);
                    e.target.value = "";
                  }}
                />
                <label
                  htmlFor="files"
                  className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-md border border-dashed border-grey-300 bg-grey-50 px-4 text-sm font-semibold text-navy hover:border-navy/40 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2"
                >
                  <FileUp aria-hidden className="size-4" />
                  {f.attachmentsButton}
                </label>
              </div>
              {files.length > 0 && (
                <ul className="mt-3 grid gap-2">
                  {files.map((file, i) => (
                    <li key={`${file.name}-${file.size}`} className="flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm">
                      <span className="min-w-0 truncate">{file.name}</span>
                      <span className="flex shrink-0 items-center gap-2 text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(1)} MB
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          aria-label={f.removeFile(file.name)}
                          className="inline-flex size-9 items-center justify-center rounded-md hover:bg-grey-100 focus-visible:outline-2 focus-visible:outline-ring"
                        >
                          <X aria-hidden className="size-4" />
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {fileError && (
                <FieldError id="files-error" className="mt-2 font-medium">
                  {fileError}
                </FieldError>
              )}
            </div>
          )}
        </div>
      </fieldset>

      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="mt-8">
        <Controller
          control={control}
          name="consent"
          render={({ field }) => (
            <div className="flex items-start gap-3">
              <Checkbox
                ref={field.ref}
                id="consent"
                checked={field.value}
                onCheckedChange={(v) => field.onChange(v === true)}
                onBlur={field.onBlur}
                aria-invalid={!!errors.consent || undefined}
                aria-describedby={errors.consent ? "consent-error" : undefined}
                className="mt-0.5"
              />
              <label htmlFor="consent" className="text-sm leading-relaxed">
                {f.consentBefore}{" "}
                <Link href="/privacy" className="font-medium text-link underline">
                  {f.consentLink}
                </Link>
                .
              </label>
            </div>
          )}
        />
        {errors.consent && (
          <FieldError id="consent-error" className="mt-1.5 pl-8 font-medium">
            {errors.consent.message}
          </FieldError>
        )}
      </div>

      {SITE_KEY && (
        <div className="mt-6">
          <Turnstile
            siteKey={SITE_KEY}
            resetKey={captchaReset}
            onToken={(t) => {
              setCaptcha(t);
              if (t) setCaptchaError(false);
            }}
          />
          {captchaError && <FieldError className="mt-1.5 font-medium">{q.errors.captcha}</FieldError>}
        </div>
      )}

      <Button type="submit" variant="accent" size="lg" className="mt-8 w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting && <LoaderCircle aria-hidden className="animate-spin" strokeWidth={1.75} />}
        {isSubmitting ? q.submitting : isQuote ? q.submit : q.submitGeneral}
      </Button>
    </form>
  );
}
