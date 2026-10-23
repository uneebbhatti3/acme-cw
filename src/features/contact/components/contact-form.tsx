"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/legacy/button";
import { Checkbox, Field, Input, Textarea } from "@/components/ui/legacy/field";
import { siteConfig } from "@/config/site";
import { contactCopy } from "@/features/contact/data/copy";
import { countries } from "@/features/contact/data/countries";
import { contactSchema, type ContactValues } from "@/features/contact/lib/schema";

const f = contactCopy.form;

/**
 * Inquiry and quote form. Validates on submit and then per field; errors are
 * linked to their inputs and summarised for screen readers. In the demo
 * nothing is transmitted.
 */
export function ContactForm({ productNames }: { productNames: Record<string, string> }) {
  const params = useSearchParams();
  const slug = params.get("product") ?? "";
  const prefilled = productNames[slug];
  const [sent, setSent] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
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
  };

  if (sent) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-[var(--radius-card)] border border-steel-100 bg-white p-8 text-center focus:outline-none md:p-12"
      >
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
          <CircleCheck aria-hidden className="size-7" strokeWidth={1.5} />
        </span>
        <h2 className="text-h3 mt-6">{f.successTitle}</h2>
        <p className="mx-auto mt-3 max-w-md text-steel-600">{f.successText}</p>
        {siteConfig.demoMode && <p className="mt-3 text-sm text-steel-600">{f.successDemo}</p>}
        <Button
          variant="secondary"
          className="mt-8"
          onClick={() => {
            reset({ product: "", message: "", consent: false });
            setSent(false);
          }}
        >
          {f.again}
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      aria-labelledby="form-title"
      className="rounded-[var(--radius-card)] border border-steel-100 bg-white p-6 md:p-10"
    >
      <h2 id="form-title" className="text-h3">
        {f.title}
      </h2>

      <p
        role="alert"
        className={errorCount && submitCount ? "mt-4 rounded-[var(--radius-control)] border border-warn/30 bg-warn/5 px-4 py-3 text-sm font-medium text-warn" : "sr-only"}
      >
        {errorCount && submitCount ? f.errorSummary : ""}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Field id="name" label={f.name} error={errors.name?.message}>
          {(d) => <Input id="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={d} {...register("name")} />}
        </Field>
        <Field id="company" label={f.company} optionalLabel={f.optional}>
          {(d) => <Input id="company" autoComplete="organization" aria-describedby={d} {...register("company")} />}
        </Field>
        <Field id="email" label={f.email} error={errors.email?.message}>
          {(d) => (
            <Input id="email" type="email" autoComplete="email" inputMode="email" aria-invalid={!!errors.email} aria-describedby={d} {...register("email")} />
          )}
        </Field>
        <Field id="phone" label={f.phone} optionalLabel={f.optional}>
          {(d) => <Input id="phone" type="tel" autoComplete="tel" aria-describedby={d} {...register("phone")} />}
        </Field>
        <Field id="country" label={f.country} error={errors.country?.message}>
          {(d) => (
            <>
              <Input
                id="country"
                list="country-list"
                autoComplete="country-name"
                placeholder={f.countryPlaceholder}
                aria-invalid={!!errors.country}
                aria-describedby={d}
                {...register("country")}
              />
              <datalist id="country-list">
                {countries.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </>
          )}
        </Field>
        <Field id="product" label={f.product} optionalLabel={f.optional}>
          {(d) => <Input id="product" placeholder={f.productPlaceholder} aria-describedby={d} {...register("product")} />}
        </Field>
        <Field id="message" label={f.message} error={errors.message?.message} className="md:col-span-2">
          {(d) => (
            <Textarea
              id="message"
              rows={6}
              placeholder={f.messagePlaceholder}
              aria-invalid={!!errors.message}
              aria-describedby={d}
              {...register("message")}
            />
          )}
        </Field>

        <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
          <label htmlFor="website">Website</label>
          <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        <Checkbox id="consent" label={f.consent} error={errors.consent?.message} className="md:col-span-2" {...register("consent")} />
      </div>

      <Button type="submit" className="mt-8 w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting && <LoaderCircle aria-hidden className="size-4 animate-spin" strokeWidth={1.75} />}
        {isSubmitting ? f.submitting : f.submit}
      </Button>
    </form>
  );
}
