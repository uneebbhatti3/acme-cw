"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import { contactCopy } from "@/features/contact/data/copy";
import { contactSchema, type ContactValues } from "@/features/contact/lib/schema";
import { cn } from "@/lib/utils";
import { CountryPicker } from "./country-picker";

const f = contactCopy.form;

/** Label, control and error text, linked by id. */
function FormField({
  id,
  label,
  error,
  optional,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: (describedBy: string | undefined) => ReactNode;
}) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <Field data-invalid={!!error || undefined} className={cn("gap-2", className)}>
      <FieldLabel htmlFor={id} className="text-sm font-medium">
        {label}
        {optional && <span className="font-normal text-muted-foreground">({f.optional})</span>}
      </FieldLabel>
      {children(errorId)}
      {error && (
        <FieldError id={errorId} className="font-medium">
          {error}
        </FieldError>
      )}
    </Field>
  );
}

/**
 * Inquiry and quote form (react-hook-form + Zod). Validates on submit, then
 * per field once touched; errors are linked to their inputs and summarised for
 * screen readers. Honeypot field for bots. In the demo nothing is transmitted.
 */
export function ContactForm({ productNames }: { productNames: Record<string, string> }) {
  const params = useSearchParams();
  const slug = params.get("product") ?? "";
  const prefilled = productNames[slug];
  const [sent, setSent] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      country: "",
      product: prefilled ?? "",
      message: prefilled ? `${f.quoteSubject(prefilled)}\n\n` : "",
      consent: false,
    },
  });

  // react-hook-form moves focus to the first invalid field; the summary is announced.
  const errorCount = Object.keys(errors).length;

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  const onSubmit = async (values: ContactValues) => {
    if (values.website) return; // bot
    // Demo mode: simulate a short request; nothing leaves the browser.
    await new Promise((r) => setTimeout(r, 700));
    setSent(true);
    toast.success(f.successTitle, { description: siteConfig.demoMode ? f.successDemo : f.successText });
  };

  if (sent) {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="rounded-[2rem] border bg-card p-8 text-center focus:outline-none md:p-12">
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-accent text-primary-deep">
          <CircleCheck aria-hidden className="size-7" strokeWidth={1.5} />
        </span>
        <h2 className="text-h3 mt-6">{f.successTitle}</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">{f.successText}</p>
        {siteConfig.demoMode && <p className="mt-3 text-sm text-muted-foreground">{f.successDemo}</p>}
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            reset({ country: "", product: "", message: "", consent: false });
            setSent(false);
          }}
        >
          {f.again}
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} aria-labelledby="form-title" className="rounded-[2rem] border bg-card p-6 md:p-10">
      <h2 id="form-title" className="text-h3">
        {f.title}
      </h2>

      <p
        role="alert"
        className={
          errorCount && submitCount
            ? "mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive"
            : "sr-only"
        }
      >
        {errorCount && submitCount ? f.errorSummary : ""}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <FormField id="name" label={f.name} error={errors.name?.message}>
          {(d) => <Input id="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={d} {...register("name")} />}
        </FormField>
        <FormField id="company" label={f.company} optional>
          {() => <Input id="company" autoComplete="organization" {...register("company")} />}
        </FormField>
        <FormField id="email" label={f.email} error={errors.email?.message}>
          {(d) => (
            <Input id="email" type="email" autoComplete="email" inputMode="email" aria-invalid={!!errors.email} aria-describedby={d} {...register("email")} />
          )}
        </FormField>
        <FormField id="phone" label={f.phone} optional>
          {() => <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />}
        </FormField>
        <FormField id="country" label={f.country} error={errors.country?.message}>
          {(d) => (
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <CountryPicker id="country" buttonRef={field.ref} value={field.value} onChange={field.onChange} onBlur={field.onBlur} invalid={!!errors.country} describedBy={d} />
              )}
            />
          )}
        </FormField>
        <FormField id="product" label={f.product} optional>
          {() => <Input id="product" placeholder={f.productPlaceholder} {...register("product")} />}
        </FormField>
        <FormField id="message" label={f.message} error={errors.message?.message} className="md:col-span-2">
          {(d) => <Textarea id="message" rows={6} placeholder={f.messagePlaceholder} aria-invalid={!!errors.message} aria-describedby={d} {...register("message")} />}
        </FormField>

        <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
          <label htmlFor="website">Website</label>
          <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        <div className="md:col-span-2">
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
                <label htmlFor="consent" className="cursor-pointer text-sm leading-relaxed">
                  {f.consent}
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
      </div>

      <Button type="submit" size="lg" className="mt-8 w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting && <LoaderCircle aria-hidden className="animate-spin" strokeWidth={1.75} />}
        {isSubmitting ? f.submitting : f.submit}
      </Button>
    </form>
  );
}
