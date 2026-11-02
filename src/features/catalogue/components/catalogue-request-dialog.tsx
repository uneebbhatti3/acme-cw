"use client";

import { Download } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import type { Catalogue } from "@/features/catalogue/data/catalogues";
import { catalogueCopy } from "@/features/catalogue/data/copy";

const c = catalogueCopy.request;
const e = c.errors;

type Step = { name: "details" } | { name: "code"; challenge: string; email: string } | { name: "ready"; url: string };

async function post(path: string, body: object) {
  try {
    const response = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    return (await response.json()) as { ok: boolean; challenge?: string; url?: string };
  } catch {
    return { ok: false };
  }
}

function Details({ catalogue, onSent }: { catalogue: Catalogue; onSent: (challenge: string, email: string) => void }) {
  const [startedAt] = useState(() => Date.now());
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; form?: string }>({});

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = (key: string) => String(form.get(key) ?? "").trim();
    const invalid = { name: text("name").length < 2 ? e.name : undefined, email: /^\S+@\S+\.\S+$/.test(text("email")) ? undefined : e.email };
    setErrors(invalid);
    if (invalid.name || invalid.email) return;

    setBusy(true);
    const data = await post("/api/catalogue/request", {
      slug: catalogue.slug,
      name: text("name"),
      email: text("email"),
      company: text("company"),
      website: text("website"),
      startedAt,
    });
    setBusy(false);
    if (data.challenge) onSent(data.challenge, text("email"));
    else setErrors({ form: e.send });
  };

  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      <Field data-invalid={errors.name ? true : undefined}>
        <FieldLabel htmlFor="catalogue-name">{c.name}</FieldLabel>
        <Input id="catalogue-name" name="name" autoComplete="name" required aria-invalid={Boolean(errors.name)} className="h-11" />
        {errors.name && <FieldError>{errors.name}</FieldError>}
      </Field>
      <Field data-invalid={errors.email ? true : undefined}>
        <FieldLabel htmlFor="catalogue-email">{c.email}</FieldLabel>
        <Input id="catalogue-email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} className="h-11" />
        {errors.email && <FieldError>{errors.email}</FieldError>}
      </Field>
      <Field>
        <FieldLabel htmlFor="catalogue-company">{c.company}</FieldLabel>
        <Input id="catalogue-company" name="company" autoComplete="organization" className="h-11" />
      </Field>
      {/* Hidden from people; bots fill it in. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="catalogue-website">{c.website}</label>
        <input id="catalogue-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {errors.form && (
        <p role="alert" className="text-sm text-destructive">
          {errors.form}
        </p>
      )}
      <Button type="submit" size="lg" disabled={busy}>
        {busy && <Spinner aria-hidden />}
        {busy ? c.sending : c.send}
      </Button>
    </form>
  );
}

function CodeEntry({ challenge, onVerified, onBack }: { challenge: string; onVerified: (url: string) => void; onBack: () => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const code = String(new FormData(event.currentTarget).get("code") ?? "").replace(/\D/g, "");
    if (code.length !== 6) return setError(e.code);
    setBusy(true);
    const data = await post("/api/catalogue/verify", { challenge, code });
    setBusy(false);
    if (data.url) onVerified(data.url);
    else setError(e.wrongCode);
  };

  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      <Field data-invalid={error ? true : undefined}>
        <FieldLabel htmlFor="catalogue-code">{c.code}</FieldLabel>
        <Input
          id="catalogue-code"
          name="code"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          autoFocus
          aria-invalid={Boolean(error)}
          className="h-12 font-mono text-lg tracking-[0.4em]"
        />
        {error && <FieldError>{error}</FieldError>}
      </Field>
      <Button type="submit" size="lg" disabled={busy}>
        {busy && <Spinner aria-hidden />}
        {busy ? c.verifying : c.verify}
      </Button>
      <button type="button" onClick={onBack} className="min-h-11 text-sm font-semibold text-link hover:underline">
        {c.changeEmail}
      </button>
    </form>
  );
}

/** Asks for an email, checks the code sent to it, then offers the PDF. */
export function CatalogueRequestDialog({ catalogue, onClose }: { catalogue: Catalogue; onClose: () => void }) {
  const [step, setStep] = useState<Step>({ name: "details" });

  const heading = {
    details: { title: c.title, description: c.description(catalogue.title) },
    code: { title: c.codeTitle, description: step.name === "code" ? c.codeDescription(step.email) : "" },
    ready: { title: c.readyTitle, description: c.readyDescription(catalogue.title) },
  }[step.name];

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent closeLabel={c.close} className="max-h-[90dvh] overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle>{heading.title}</DialogTitle>
          <DialogDescription>{heading.description}</DialogDescription>
        </DialogHeader>
        {step.name === "details" && <Details catalogue={catalogue} onSent={(challenge, email) => setStep({ name: "code", challenge, email })} />}
        {step.name === "code" && <CodeEntry challenge={step.challenge} onVerified={(url) => setStep({ name: "ready", url })} onBack={() => setStep({ name: "details" })} />}
        {step.name === "ready" && (
          <Button asChild size="lg">
            <a href={step.url} download>
              <Download aria-hidden strokeWidth={1.75} />
              {c.download}
            </a>
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
